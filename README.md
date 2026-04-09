# ScaleAcademy (ScaleIQ)

Centre de formation SDR du groupe Scale — e-learning, coaching IA, simulation d'appels, certification.

## Architecture

```
src/
├── app/
│   ├── academy/              # Pages apprenants
│   │   ├── modules/          # Catalogue et détail des modules
│   │   ├── simulation/       # Simulation d'appels IA
│   │   ├── progress/         # Suivi de progression
│   │   ├── wiki/             # Base de connaissances
│   │   └── onboarding/       # Parcours "Who we are"
│   ├── admin/                # Pages administration
│   │   ├── modules/          # Gestion des modules
│   │   ├── learners/         # Suivi apprenants
│   │   └── analytics/        # Statistiques formation
│   └── api/
│       ├── modules/          # CRUD modules
│       ├── simulation/       # Simulation d'appels
│       ├── progress/         # Progression apprenants
│       └── certifications/   # Gestion certifications
├── components/
│   ├── academy/              # Composants formation
│   └── simulation/           # Composants simulation
└── lib/
    ├── services/
    │   ├── call-simulation.ts    # IA simulation d'appels
    │   └── training-analytics.ts # Statistiques formation
    ├── ai.ts                 # Clients IA (Anthropic, OpenAI)
    └── db.ts                 # Client Prisma
```

## Stack technique

- **Next.js 15** (App Router)
- **Prisma** + PostgreSQL
- **Claude** (Anthropic SDK) — simulation d'appels, scoring, coaching
- **Tailwind CSS** — UI
- **Lucide React** — Icônes

## Démarrage

```bash
npm install
cp .env.example .env  # Configurer DATABASE_URL, ANTHROPIC_API_KEY
npx prisma db push
npm run db:seed
npm run dev
```

## Profils de simulation

6 profils d'objections pré-configurés, du débutant à l'expert :
- Le Pressé (débutant)
- Le Sceptique (intermédiaire)
- Le Satisfait (intermédiaire)
- Le Décideur Fantôme (avancé)
- Le Chasseur de Prix (avancé)
- Le Mix (expert)

## Lien avec le Scale Group

ScaleAcademy fait partie du [Scale Group](https://github.com/stevenroman91/scale-paperclip/tree/main/companies/scaleacademy) et s'intègre avec :
- **ScaleFast** / **ScaleCall** : données d'appels réels pour le contenu
- **ScaleHQ** : intégration plateforme, dashboards
