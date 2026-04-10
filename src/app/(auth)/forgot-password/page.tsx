"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setResetUrl(null);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        if (data.resetUrl) {
          setResetUrl(data.resetUrl);
        }
      } else {
        setError(data.error || "Une erreur est survenue");
      }
    } catch {
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            <span className="text-xl font-bold text-slate-900">ScaleAcademy</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Mot de passe oublié</h1>
          <p className="text-slate-500 text-sm mt-1">
            Entrez votre email pour recevoir un lien de réinitialisation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          {message && !resetUrl && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm">
              {message}
            </div>
          )}

          {resetUrl && (
            <div className="bg-blue-50 border border-blue-200 text-blue-700 rounded-lg p-3 text-sm space-y-2">
              <p className="font-medium">Lien de réinitialisation généré</p>
              <p className="text-xs">
                En mode dev, le lien est affiché directement. Cliquez pour
                réinitialiser :
              </p>
              <a
                href={resetUrl}
                className="block text-xs break-all underline text-blue-800 font-mono bg-white px-2 py-1 rounded"
              >
                {resetUrl}
              </a>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="vous@exemple.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Envoyer le lien
          </button>
        </form>

        <p className="text-center text-sm text-slate-500">
          <Link href="/login" className="text-purple-600 hover:underline font-medium">
            Retour à la connexion
          </Link>
        </p>
      </div>
    </div>
  );
}
