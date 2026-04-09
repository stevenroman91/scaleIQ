import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import { TrendingUp, BookOpen, Phone, Award, CheckCircle, Clock } from "lucide-react";

export default async function ProgressPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const [
    modules,
    lessonProgress,
    simulations,
    certifications,
  ] = await Promise.all([
    db.module.findMany({
      where: { published: true },
      include: {
        lessons: { select: { id: true, title: true, type: true } },
      },
      orderBy: [{ category: "asc" }, { position: "asc" }],
    }),
    db.lessonProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          select: {
            id: true,
            title: true,
            type: true,
            moduleId: true,
          },
        },
      },
    }),
    db.callSimulation.findMany({
      where: { userId, status: "COMPLETED" },
      include: { profile: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    db.certification.findMany({
      where: { userId },
      orderBy: { issuedAt: "desc" },
    }),
  ]);

  // Build progress map: lessonId -> progress
  const progressMap = new Map(
    lessonProgress.map((p) => [p.lessonId, p])
  );

  // Calculate per-module stats
  const moduleStats = modules.map((mod) => {
    const totalLessons = mod.lessons.length;
    const completedLessons = mod.lessons.filter(
      (l) => progressMap.get(l.id)?.completed
    ).length;
    const quizLessons = mod.lessons.filter((l) => l.type === "QUIZ");
    const quizScores = quizLessons
      .map((l) => progressMap.get(l.id)?.score)
      .filter((s): s is number => s != null);
    const avgQuizScore =
      quizScores.length > 0
        ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
        : null;
    const totalTime = mod.lessons.reduce(
      (acc, l) => acc + (progressMap.get(l.id)?.timeSpent || 0),
      0
    );

    return {
      id: mod.id,
      title: mod.title,
      totalLessons,
      completedLessons,
      avgQuizScore,
      totalTime,
      pct: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    };
  });

  const totalCompleted = lessonProgress.filter((p) => p.completed).length;
  const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
  const totalTimeSpent = lessonProgress.reduce((a, p) => a + p.timeSpent, 0);

  function formatDuration(secs: number) {
    if (secs < 60) return `${secs}s`;
    const m = Math.floor(secs / 60);
    if (m < 60) return `${m} min`;
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}min`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Ma progression</h1>
        <p className="text-muted-foreground">
          Bonjour {session.user.name || session.user.email} — suivez votre avancement
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Leçons complétées",
            value: `${totalCompleted} / ${totalLessons}`,
            icon: CheckCircle,
            color: "text-green-600",
            bg: "bg-green-50 dark:bg-green-950/20",
          },
          {
            label: "Temps total",
            value: formatDuration(totalTimeSpent),
            icon: Clock,
            color: "text-blue-600",
            bg: "bg-blue-50 dark:bg-blue-950/20",
          },
          {
            label: "Simulations",
            value: simulations.length.toString(),
            icon: Phone,
            color: "text-purple-600",
            bg: "bg-purple-50 dark:bg-purple-950/20",
          },
          {
            label: "Certifications",
            value: certifications.length.toString(),
            icon: Award,
            color: "text-yellow-600",
            bg: "bg-yellow-50 dark:bg-yellow-950/20",
          },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} rounded-xl p-4`}>
            <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Per-module progress */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Progression par module</h2>
        {moduleStats.map((mod) => (
          <div
            key={mod.id}
            className="bg-card border border-border rounded-xl p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                <h3 className="font-medium text-sm">{mod.title}</h3>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {mod.avgQuizScore != null && (
                  <span className="text-primary font-medium">
                    Quiz : {mod.avgQuizScore}%
                  </span>
                )}
                <span>
                  {mod.completedLessons}/{mod.totalLessons} leçons
                </span>
                {mod.totalTime > 0 && (
                  <span>{formatDuration(mod.totalTime)}</span>
                )}
              </div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${mod.pct}%` }}
              />
            </div>
          </div>
        ))}
        {moduleStats.length === 0 && (
          <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
            Aucun module disponible.
          </div>
        )}
      </div>

      {/* Simulation history */}
      {simulations.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Historique des simulations</h2>
          <div className="space-y-2">
            {simulations.map((sim) => (
              <div
                key={sim.id}
                className="bg-card border border-border rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{sim.profile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(sim.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {sim.durationSeconds &&
                      ` — ${formatDuration(sim.durationSeconds)}`}
                  </p>
                </div>
                {sim.overallScore != null && (
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {sim.overallScore}/100
                    </p>
                    <p className="text-xs text-muted-foreground">Score global</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Certifications obtenues</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certifications.map((cert) => {
              const levelColors: Record<string, string> = {
                BRONZE: "text-amber-700 bg-amber-50 dark:bg-amber-950/20",
                SILVER: "text-gray-600 bg-gray-50 dark:bg-gray-950/20",
                GOLD: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20",
                PLATINUM: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20",
              };
              return (
                <div
                  key={cert.id}
                  className={`rounded-xl p-4 ${levelColors[cert.level] || ""}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-5 h-5" />
                    <span className="font-bold text-sm">{cert.level}</span>
                  </div>
                  <p className="font-medium text-sm">{cert.title}</p>
                  <p className="text-xs opacity-75 mt-1">
                    Obtenue le{" "}
                    {new Date(cert.issuedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
