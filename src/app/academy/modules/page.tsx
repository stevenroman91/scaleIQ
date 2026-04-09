import { db } from "@/lib/db";
import { BookOpen, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const difficultyColors: Record<string, string> = {
  BEGINNER: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  INTERMEDIATE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ADVANCED: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  EXPERT: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const categoryLabels: Record<string, string> = {
  ONBOARDING: "Onboarding",
  FUNDAMENTALS: "Fondamentaux",
  PROSPECTING: "Prospection",
  COLD_CALLING: "Cold Calling",
  OBJECTION_HANDLING: "Gestion d'objections",
  CLOSING: "Closing",
  ADVANCED: "Avancé",
  CERTIFICATION: "Certification",
};

export default async function ModulesPage() {
  const modules = await db.module.findMany({
    where: { published: true },
    include: {
      lessons: { select: { id: true } },
      _count: { select: { feedback: true } },
    },
    orderBy: [{ category: "asc" }, { position: "asc" }],
  });

  // Group by category
  const grouped = modules.reduce<Record<string, typeof modules>>((acc, mod) => {
    (acc[mod.category] = acc[mod.category] || []).push(mod);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Modules de formation</h1>
        <p className="text-muted-foreground">
          Parcours complet du SDR débutant à expert
        </p>
      </div>

      {Object.entries(grouped).map(([category, mods]) => (
        <div key={category}>
          <h2 className="text-lg font-semibold mb-3">
            {categoryLabels[category] || category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mods.map((mod) => (
              <Link
                key={mod.id}
                href={`/academy/modules/${mod.id}`}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition block"
              >
                <div className="flex items-start justify-between mb-3">
                  <BookOpen className="w-8 h-8 text-primary" />
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      difficultyColors[mod.difficulty] || ""
                    }`}
                  >
                    {mod.difficulty}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{mod.title}</h3>
                {mod.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {mod.description}
                  </p>
                )}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {mod.lessons.length} leçons
                  </span>
                  {mod.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mod.duration} min
                    </span>
                  )}
                  {mod._count.feedback > 0 && (
                    <span className="flex items-center gap-1">
                      <BarChart3 className="w-3 h-3" />
                      {mod._count.feedback} avis
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {modules.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
          Aucun module disponible. Les modules sont en cours de création.
        </div>
      )}
    </div>
  );
}
