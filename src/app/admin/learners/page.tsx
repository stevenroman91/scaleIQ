import { getLearnerStats } from "@/lib/services/training-analytics";
import { Users, AlertTriangle, TrendingUp, Award, Clock } from "lucide-react";

export default async function AdminLearnersPage() {
  const learners = await getLearnerStats();

  const totalLearners = learners.length;
  const activeLearners = learners.filter((l) => !l.isInactive).length;
  const inactiveLearners = learners.filter((l) => l.isInactive).length;
  const avgCompletion =
    learners.length > 0
      ? Math.round(
          learners.reduce(
            (sum, l) =>
              sum + (l.totalModules > 0 ? (l.modulesCompleted / l.totalModules) * 100 : 0),
            0
          ) / learners.length
        )
      : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Suivi des apprenants</h1>
        <p className="text-muted-foreground">
          Progression, alertes, certifications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4">
          <Users className="w-5 h-5 text-blue-600 mb-1" />
          <p className="text-2xl font-bold">{totalLearners}</p>
          <p className="text-xs text-muted-foreground">Total apprenants</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-4">
          <TrendingUp className="w-5 h-5 text-green-600 mb-1" />
          <p className="text-2xl font-bold">{activeLearners}</p>
          <p className="text-xs text-muted-foreground">Actifs (7j)</p>
        </div>
        <div className={`${inactiveLearners > 0 ? "bg-red-50 dark:bg-red-950/20" : "bg-gray-50 dark:bg-gray-950/20"} rounded-xl p-4`}>
          <AlertTriangle className={`w-5 h-5 ${inactiveLearners > 0 ? "text-red-600" : "text-gray-600"} mb-1`} />
          <p className="text-2xl font-bold">{inactiveLearners}</p>
          <p className="text-xs text-muted-foreground">Inactifs (&gt;7j)</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-4">
          <Award className="w-5 h-5 text-purple-600 mb-1" />
          <p className="text-2xl font-bold">{avgCompletion}%</p>
          <p className="text-xs text-muted-foreground">Complétion moy.</p>
        </div>
      </div>

      {/* Learner table */}
      {learners.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
          <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Aucun apprenant inscrit</p>
          <p className="text-sm mt-1">Les apprenants apparaîtront ici quand ils commenceront la formation</p>
        </div>
      ) : (
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
              {learners
                .sort((a, b) => {
                  if (a.isInactive !== b.isInactive) return a.isInactive ? -1 : 1;
                  return (b.modulesCompleted / (b.totalModules || 1)) - (a.modulesCompleted / (a.totalModules || 1));
                })
                .map((learner) => {
                  const completionPct = learner.totalModules > 0
                    ? Math.round((learner.modulesCompleted / learner.totalModules) * 100)
                    : 0;

                  return (
                    <tr key={learner.userId} className={`border-t border-border ${learner.isInactive ? "bg-red-50/50 dark:bg-red-950/10" : ""}`}>
                      <td className="px-4 py-3">
                        <p className="font-medium">{learner.name || "Sans nom"}</p>
                        <p className="text-xs text-muted-foreground">{learner.email}</p>
                      </td>
                      <td className="text-center px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <span>{learner.modulesCompleted}/{learner.totalModules}</span>
                          <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${completionPct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center px-4 py-3">
                        {learner.avgQuizScore > 0 ? (
                          <span className={learner.avgQuizScore >= 60 ? "text-green-600" : "text-orange-600"}>
                            {learner.avgQuizScore}%
                          </span>
                        ) : "-"}
                      </td>
                      <td className="text-center px-4 py-3">{learner.simulationsCompleted}</td>
                      <td className="text-center px-4 py-3">
                        {learner.avgSimulationScore > 0 ? (
                          <span className={learner.avgSimulationScore >= 50 ? "text-green-600" : "text-orange-600"}>
                            {learner.avgSimulationScore}/100
                          </span>
                        ) : "-"}
                      </td>
                      <td className="text-center px-4 py-3 text-xs text-muted-foreground">
                        {learner.lastActive ? (
                          <span className="flex items-center justify-center gap-1">
                            <Clock className="w-3 h-3" />
                            {learner.lastActive.toLocaleDateString("fr-FR")}
                          </span>
                        ) : "Jamais"}
                      </td>
                      <td className="text-center px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          learner.isInactive
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}>
                          {learner.isInactive ? "Inactif" : "Actif"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
