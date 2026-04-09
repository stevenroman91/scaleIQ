import Link from "next/link";
import { GraduationCap, Phone, BookOpen, Award, Bot } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">ScaleAcademy</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/academy"
            className="px-4 py-2 text-sm font-medium hover:text-primary transition"
          >
            Formation
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
          >
            Administration
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Devenez un <span className="text-primary">SDR d'élite</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Formation data-driven construite à partir d'appels réels.
          Simulation IA, coaching temps réel, certification reconnue.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/academy/modules"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition"
          >
            Commencer la formation
          </Link>
          <Link
            href="/academy/simulation"
            className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-accent transition"
          >
            Essayer une simulation
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BookOpen,
              title: "Modules e-learning",
              desc: "Cours structurés du débutant à l'expert, avec quiz interactifs",
            },
            {
              icon: Phone,
              title: "Simulation d'appels IA",
              desc: "Entraînez-vous face à un prospect IA avec des objections réalistes",
            },
            {
              icon: Bot,
              title: "Coaching IA temps réel",
              desc: "Feedback instantané sur votre technique, ton et argumentation",
            },
            {
              icon: Award,
              title: "Certifications",
              desc: "Validez vos compétences et obtenez des certifications reconnues",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-xl p-6"
            >
              <feature.icon className="w-10 h-10 text-primary mb-3" />
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
