import { getModuleStats, getLearnerStats } from "@/lib/services/training-analytics";
import { BarChart3, Users, BookOpen, TrendingUp } from "lucide-react";

export default async function AnalyticsPage() {
  const [moduleStats, learnerStats] = await Promise.all([
    getModuleStats(),
    getLearnerStats(),
  ]);

  const totalLearners = learnerStats.length;
  const activeLearners = learnerStats.filter((l) => !l.isInactive).length;
  const avgCompletion =
    learnerStats.length > 0
      ? Math.round(
          learnerStats.reduce(
            (sum, l) => sum + (l.totalModules > 0 ? (l.modulesCompleted / l.totalModules) * 100 : 0),
            0
          ) / learnerStats.length
        )
      : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Analytics Formation</h1>

      {/* Overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4">
          <Users className="w-5 h-5 text-blue-600 mb-2" />
          <p className="text-2xl font-bold">{totalLearners}</p>
          <p className="text-xs text-muted-foreground">Apprenants</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-4">
          <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
          <p className="text-2xl font-bold">{activeLearners}</p>
          <p className="text-xs text-muted-foreground">Actifs (7j)</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4">
          <BookOpen className="w-5 h-5 text-purple-600 mb-2" />
          <p className="text-2xl font-bold">{moduleStats.length}</p>
          <p className="text-xs text-muted-foreground">Modules publiés</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-4">
          <BarChart3 className="w-5 h-5 text-orange-600 mb-2" />
          <p className="text-2xl font-bold">{avgCompletion}%</p>
          <p className="text-xs text-muted-foreground">Complétion moy.</p>
        </div>
      </div>

      {/* Module performance */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Performance des modules</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-3">Module</th>
                <th className="text-center px-4 py-3">Inscrits</th>
                <th className="text-center px-4 py-3">Complétion</th>
                <th className="text-center px-4 py-3">Score moy.</th>
                <th className="text-center px-4 py-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {moduleStats.map((mod) => (
                <tr key={mod.moduleId} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{mod.title}</td>
                  <td className="text-center px-4 py-3">{mod.totalEnrolled}</td>
                  <td className="text-center px-4 py-3">{mod.completionRate}%</td>
                  <td className="text-center px-4 py-3">
                    {mod.avgScore !== null ? `${mod.avgScore}%` : "-"}
                  </td>
                  <td className="text-center px-4 py-3">
                    {mod.avgRating !== null ? `${mod.avgRating}/5` : "-"}
                  </td>
                </tr>
              ))}
              {moduleStats.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-muted-foreground">
                    Aucun module publié
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
