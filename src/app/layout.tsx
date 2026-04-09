import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScaleAcademy — Formation SDR",
  description: "Centre de formation SDR avec e-learning, coaching IA et simulation d'appels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
