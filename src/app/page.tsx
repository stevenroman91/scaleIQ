import Link from "next/link";
import { GraduationCap, Phone, BookOpen, Award, Bot } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-purple-600" />
          <span className="text-xl font-bold text-slate-900">ScaleAcademy</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/academy"
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-purple-600 transition"
          >
            Formation
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
          >
            Administration
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 text-slate-900">
          Devenez un <span className="text-purple-600">SDR d&apos;élite</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-8">
          Formation data-driven construite à partir d&apos;appels réels.
          Simulation IA, coaching temps réel, certification reconnue.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/academy/modules"
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition"
          >
            Commencer la formation
          </Link>
          <Link
            href="/academy/simulation"
            className="px-6 py-3 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition"
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
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <feature.icon className="w-10 h-10 text-purple-600 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
