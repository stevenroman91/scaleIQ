FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

RUN npm install prisma@6 --save-exact --omit=dev 2>/dev/null || true

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --chown=nextjs:nodejs <<'EOF' /app/start.sh
#!/bin/sh
echo "[STARTUP] Running database migrations..."
npx prisma db push --skip-generate --accept-data-loss 2>&1 || echo "[STARTUP] Migration warning (may be OK on first run)"
echo "[STARTUP] Seeding database..."
npx tsx prisma/seed.ts 2>&1 || echo "[STARTUP] Seed skipped (may be OK if already seeded)"
echo "[STARTUP] Starting ScaleAcademy..."
exec node server.js
EOF
RUN chmod +x /app/start.sh

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["/bin/sh", "/app/start.sh"]
