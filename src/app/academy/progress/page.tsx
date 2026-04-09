import { db } from "@/lib/db";
import { TrendingUp, BookOpen, Phone, Award, CheckCircle } from "lucide-react";

export default async function ProgressPage() {
  // In production, get userId from auth session
  // For now, show global stats

  const [totalModules, totalLessons, totalSimulations, totalCerts] = await Promise.all([
    db.module.count({ where: { published: true } }),
    db.lesson.count(),
    db.callSimulation.count({ where: { status: "COMPLETED" } }),
    db.certification.count(),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ma progression</h1>
        <p className="text-muted-foreground">
          Suivez votre avancement dans la formation
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Modules disponibles", value: totalModules, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/20" },
          { label: "Leçons totales", value: totalLessons, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/20" },
          { label: "Simulations complétées", value: totalSimulations, icon: Phone, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/20" },
          { label: "Certifications", value: totalCerts, icon: Award, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/20" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-4`}>
            <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
        <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>Connectez-vous pour voir votre progression détaillée</p>
        <p className="text-sm mt-1">
          Modules complétés, scores de quiz, historique de simulations
        </p>
      </div>
    </div>
  );
}
