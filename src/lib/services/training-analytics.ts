import { db } from "@/lib/db";

export interface LearnerStats {
  userId: string;
  name: string | null;
  email: string;
  modulesCompleted: number;
  totalModules: number;
  avgQuizScore: number;
  simulationsCompleted: number;
  avgSimulationScore: number;
  lastActive: Date | null;
  isInactive: boolean;
}

/**
 * Get progress stats for all learners
 */
export async function getLearnerStats(): Promise<LearnerStats[]> {
  const learners = await db.user.findMany({
    where: { role: "LEARNER" },
    include: {
      progress: {
        include: { lesson: { include: { module: true } } },
      },
      simulations: {
        where: { status: "COMPLETED" },
      },
      quizAttempts: true,
    },
  });

  const totalModules = await db.module.count({ where: { published: true } });

  return learners.map((learner) => {
    const completedModuleIds = new Set(
      learner.progress
        .filter((p) => p.completed)
        .map((p) => p.lesson.moduleId)
    );

    const correctAttempts = learner.quizAttempts.filter((a) => a.isCorrect).length;
    const totalAttempts = learner.quizAttempts.length;
    const avgQuizScore = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

    const simulationScores = learner.simulations
      .filter((s) => s.overallScore !== null)
      .map((s) => s.overallScore!);
    const avgSimulationScore = simulationScores.length > 0
      ? Math.round(simulationScores.reduce((a, b) => a + b, 0) / simulationScores.length)
      : 0;

    const lastActivity = learner.progress
      .map((p) => p.updatedAt)
      .sort((a, b) => b.getTime() - a.getTime())[0] || null;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return {
      userId: learner.id,
      name: learner.name,
      email: learner.email,
      modulesCompleted: completedModuleIds.size,
      totalModules,
      avgQuizScore,
      simulationsCompleted: learner.simulations.length,
      avgSimulationScore,
      lastActive: lastActivity,
      isInactive: !lastActivity || lastActivity < sevenDaysAgo,
    };
  });
}

/**
 * Get module performance stats
 */
export async function getModuleStats() {
  const modules = await db.module.findMany({
    where: { published: true },
    include: {
      lessons: {
        include: {
          progress: true,
        },
      },
      feedback: true,
    },
  });

  return modules.map((mod) => {
    const allProgress = mod.lessons.flatMap((l) => l.progress);
    const completedCount = allProgress.filter((p) => p.completed).length;
    const totalEnrolled = new Set(allProgress.map((p) => p.userId)).size;
    const completionRate = totalEnrolled > 0
      ? Math.round((completedCount / (totalEnrolled * mod.lessons.length)) * 100)
      : 0;

    const scores = allProgress.filter((p) => p.score !== null).map((p) => p.score!);
    const avgScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : null;

    const ratings = mod.feedback.map((f) => f.rating);
    const avgRating = ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
      : null;

    const npsScores = mod.feedback.filter((f) => f.npsScore !== null).map((f) => f.npsScore!);
    const avgNps = npsScores.length > 0
      ? Math.round((npsScores.reduce((a, b) => a + b, 0) / npsScores.length) * 10) / 10
      : null;

    return {
      moduleId: mod.id,
      title: mod.title,
      category: mod.category,
      totalEnrolled,
      completionRate,
      avgScore,
      avgRating,
      avgNps,
      lessonCount: mod.lessons.length,
    };
  });
}
