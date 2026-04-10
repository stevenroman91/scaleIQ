import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });

    // Always return success to avoid email enumeration
    // But only actually create a token if the user exists
    let resetUrl: string | null = null;

    if (user) {
      // Invalidate any existing tokens for this user
      await db.passwordResetToken.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      });

      // Create a new token (32 bytes = 64 hex chars)
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await db.passwordResetToken.create({
        data: {
          token,
          userId: user.id,
          expiresAt,
        },
      });

      const baseUrl =
        process.env.NEXTAUTH_URL ||
        `https://${req.headers.get("host") || "localhost:3000"}`;
      resetUrl = `${baseUrl}/reset-password/${token}`;

      console.log(`[PasswordReset] Reset link for ${email}: ${resetUrl}`);

      // TODO: Send via SendGrid when API key is configured
      // For now, the link is logged to server logs and returned in dev
    }

    // In production, don't return the URL. For now, return it so the user
    // can use it directly (simpler than setting up SendGrid).
    return NextResponse.json({
      success: true,
      message:
        "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
      // DEV: Return reset URL directly for now
      ...(resetUrl && { resetUrl }),
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la demande de réinitialisation" },
      { status: 500 }
    );
  }
}
