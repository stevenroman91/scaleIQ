import { db } from "@/lib/db";
import { BookOpen, Plus, Eye, EyeOff, Clock, FileText, Pencil } from "lucide-react";
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

const difficultyColors: Record<string, string> = {
  BEGINNER: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  INTERMEDIATE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ADVANCED: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  EXPERT: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
  const totalQuizzes = modules.reduce(
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
            {modules.length} modules ({publishedCount} publiés) - {totalLessons} leçons - {totalQuizzes} quiz
          </p>
        </div>
        <Link
          href="/admin/modules/new"
          className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4" />
          Nouveau module
        </Link>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4">
          <BookOpen className="w-5 h-5 text-blue-600 mb-1" />
          <p className="text-2xl font-bold">{modules.length}</p>
          <p className="text-xs text-muted-foreground">Modules</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-4">
          <FileText className="w-5 h-5 text-green-600 mb-1" />
          <p className="text-2xl font-bold">{totalLessons}</p>
          <p className="text-xs text-muted-foreground">Leçons</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4">
          <Eye className="w-5 h-5 text-purple-600 mb-1" />
          <p className="text-2xl font-bold">{publishedCount}</p>
          <p className="text-xs text-muted-foreground">Publiés</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-4">
          <Clock className="w-5 h-5 text-orange-600 mb-1" />
          <p className="text-2xl font-bold">
            {modules.reduce((sum, m) => sum + (m.duration || 0), 0)}min
          </p>
          <p className="text-xs text-muted-foreground">Durée totale</p>
        </div>
      </div>

      {/* Module table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">#</th>
              <th className="text-left px-4 py-3">Module</th>
              <th className="text-center px-4 py-3">Catégorie</th>
              <th className="text-center px-4 py-3">Difficulté</th>
              <th className="text-center px-4 py-3">Leçons</th>
              <th className="text-center px-4 py-3">Durée</th>
              <th className="text-center px-4 py-3">Status</th>
              <th className="text-center px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((mod, i) => (
              <tr key={mod.id} className="border-t border-border hover:bg-muted/50">
                <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{mod.title}</p>
                    {mod.description && (
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {mod.description}
                      </p>
                    )}
                  </div>
                </td>
                <td className="text-center px-4 py-3 text-xs">
                  {categoryLabels[mod.category] || mod.category}
                </td>
                <td className="text-center px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[mod.difficulty]}`}>
                    {mod.difficulty}
                  </span>
                </td>
                <td className="text-center px-4 py-3">{mod.lessons.length}</td>
                <td className="text-center px-4 py-3">
                  {mod.duration ? `${mod.duration}min` : "-"}
                </td>
                <td className="text-center px-4 py-3">
                  {mod.published ? (
                    <Eye className="w-4 h-4 text-green-600 mx-auto" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-muted-foreground mx-auto" />
                  )}
                </td>
                <td className="text-center px-4 py-3">
                  <Link
                    href={`/academy/modules/${mod.id}`}
                    className="text-primary hover:underline text-xs"
                  >
                    <Pencil className="w-3.5 h-3.5 inline" /> Voir
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
