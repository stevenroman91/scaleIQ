import { db } from "@/lib/db";
import { BookOpen, Plus, Eye, EyeOff, Pencil, GraduationCap } from "lucide-react";
import Link from "next/link";

const categoryLabels: Record<string, string> = {
  ONBOARDING: "Onboarding",
  FUNDAMENTALS: "Fondamentaux",
  PROSPECTING: "Prospection",
  COLD_CALLING: "Cold Calling",
  OBJECTION_HANDLING: "Objections",
  CLOSING: "Closing",
  ADVANCED: "Avancé",
  CERTIFICATION: "Certification",
};

export default async function AdminModulesPage() {
  const modules = await db.module.findMany({
    include: {
      lessons: { select: { id: true, type: true } },
      _count: { select: { feedback: true } },
    },
    orderBy: [{ category: "asc" }, { position: "asc" }],
  });

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const quizCount = modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => l.type === "QUIZ").length,
    0
  );
  const publishedCount = modules.filter((m) => m.published).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestion des modules</h1>
          <p className="text-muted-foreground">
            {modules.length} modules, {totalLessons} leçons, {quizCount} quiz
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4">
          <p className="text-2xl font-bold">{modules.length}</p>
          <p className="text-xs text-muted-foreground">Modules total</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-4">
          <p className="text-2xl font-bold">{publishedCount}</p>
          <p className="text-xs text-muted-foreground">Publiés</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4">
          <p className="text-2xl font-bold">{totalLessons}</p>
          <p className="text-xs text-muted-foreground">Leçons totales</p>
        </div>
      </div>

      {/* Modules table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">Module</th>
              <th className="text-center px-4 py-3">Catégorie</th>
              <th className="text-center px-4 py-3">Difficulté</th>
              <th className="text-center px-4 py-3">Leçons</th>
              <th className="text-center px-4 py-3">Durée</th>
              <th className="text-center px-4 py-3">Statut</th>
              <th className="text-center px-4 py-3">Avis</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod) => (
              <tr key={mod.id} className="border-t border-border hover:bg-muted/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{mod.title}</span>
                  </div>
                </td>
                <td className="text-center px-4 py-3 text-muted-foreground">
                  {categoryLabels[mod.category] || mod.category}
                </td>
                <td className="text-center px-4 py-3 capitalize text-muted-foreground">
                  {mod.difficulty.toLowerCase()}
                </td>
                <td className="text-center px-4 py-3">{mod.lessons.length}</td>
                <td className="text-center px-4 py-3">
                  {mod.duration ? `${mod.duration} min` : "-"}
                </td>
                <td className="text-center px-4 py-3">
                  {mod.published ? (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <Eye className="w-3 h-3" /> Publié
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <EyeOff className="w-3 h-3" /> Brouillon
                    </span>
                  )}
                </td>
                <td className="text-center px-4 py-3 text-muted-foreground">
                  {mod._count.feedback}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
