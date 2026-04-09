import Link from "next/link";
import { BookOpen, Users, BarChart3, GraduationCap } from "lucide-react";

export default function AdminPage() {
  const cards = [
    {
      title: "Modules",
      description: "Gérer les modules de formation, leçons et quiz",
      href: "/admin/modules",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Apprenants",
      description: "Suivi de progression, certifications, relances",
      href: "/admin/learners",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Analytics",
      description: "Statistiques de formation, performances par module",
      href: "/admin/analytics",
      icon: BarChart3,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Administration ScaleAcademy</h1>
          <p className="text-muted-foreground">
            Gestion du contenu, suivi des apprenants, analytics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition block"
          >
            <card.icon className={`w-8 h-8 ${card.color} mb-3`} />
            <h3 className="font-semibold mb-1">{card.title}</h3>
            <p className="text-sm text-muted-foreground">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
