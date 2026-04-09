import { getLearnerStats } from "@/lib/services/training-analytics";
import { Users, AlertTriangle, Award, TrendingUp } from "lucide-react";

export default async function AdminLearnersPage() {
  const learners = await getLearnerStats();

  const activeCount = learners.filter((l) => !l.isInactive).length;
  const inactiveCount = learners.filter((l) => l.isInactive).length;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Suivi des apprenants</h1>
        <p className="text-muted-foreground">
          {learners.length} apprenants ({activeCount} actifs, {inactiveCount} inactifs)
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4">
          <Users className="w-5 h-5 text-blue-600 mb-1" />
          <p className="text-2xl font-bold">{learners.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-4">
          <TrendingUp className="w-5 h-5 text-green-600 mb-1" />
          <p className="text-2xl font-bold">{activeCount}</p>
          <p className="text-xs text-muted-foreground">Actifs (7j)</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-4">
          <AlertTriangle className="w-5 h-5 text-orange-600 mb-1" />
          <p className="text-2xl font-bold">{inactiveCount}</p>
          <p className="text-xs text-muted-foreground">Inactifs</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4">
          <Award className="w-5 h-5 text-purple-600 mb-1" />
          <p className="text-2xl font-bold">
            {learners.filter((l) => l.simulationsCompleted > 0).length}
          </p>
          <p className="text-xs text-muted-foreground">Ont simulé</p>
        </div>
      </div>

      {/* Learners table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3">Apprenant</th>
              <th className="text-center px-4 py-3">Modules</th>
              <th className="text-center px-4 py-3">Quiz moy.</th>
              <th className="text-center px-4 py-3">Simulations</th>
              <th className="text-center px-4 py-3">Score sim.</th>
              <th className="text-center px-4 py-3">Dernière activité</th>
              <th className="text-center px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {learners.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-muted-foreground">
                  Aucun apprenant inscrit
                </td>
              </tr>
            ) : (
              learners.map((l) => (
                <tr key={l.userId} className="border-t border-border hover:bg-muted/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{l.name || "Sans nom"}</p>
                      <p className="text-xs text-muted-foreground">{l.email}</p>
                    </div>
                  </td>
                  <td className="text-center px-4 py-3">
                    {l.modulesCompleted}/{l.totalModules}
                  </td>
                  <td className="text-center px-4 py-3">
                    {l.avgQuizScore > 0 ? `${l.avgQuizScore}%` : "-"}
                  </td>
                  <td className="text-center px-4 py-3">
                    {l.simulationsCompleted}
                  </td>
                  <td className="text-center px-4 py-3">
                    {l.avgSimulationScore > 0 ? `${l.avgSimulationScore}/100` : "-"}
                  </td>
                  <td className="text-center px-4 py-3 text-muted-foreground">
                    {l.lastActive
                      ? l.lastActive.toLocaleDateString("fr-FR")
                      : "Jamais"}
                  </td>
                  <td className="text-center px-4 py-3">
                    {l.isInactive ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                        <AlertTriangle className="w-3 h-3" /> Inactif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Actif
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
