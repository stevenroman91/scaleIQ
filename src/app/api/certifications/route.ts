import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: List certifications
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const certifications = await db.certification.findMany({
    where: { userId },
    orderBy: { issuedAt: "desc" },
  });

  return NextResponse.json(certifications);
}

// POST: Issue certification
export async function POST(req: Request) {
  const { userId, title, level } = await req.json();

  if (!userId || !title) {
    return NextResponse.json({ error: "userId and title required" }, { status: 400 });
  }

  // Calculate stats for certification
  const [modulesCompleted, simulations, quizAttempts] = await Promise.all([
    db.lessonProgress.count({
      where: { userId, completed: true },
    }),
    db.callSimulation.findMany({
      where: { userId, status: "COMPLETED" },
      select: { overallScore: true },
    }),
    db.quizAttempt.findMany({
      where: { userId },
      select: { isCorrect: true },
    }),
  ]);

  const simulationScores = simulations.filter((s) => s.overallScore).map((s) => s.overallScore!);
  const avgSimScore = simulationScores.length > 0
    ? Math.round(simulationScores.reduce((a, b) => a + b, 0) / simulationScores.length)
    : 0;

  const correctQuiz = quizAttempts.filter((a) => a.isCorrect).length;
  const avgQuizScore = quizAttempts.length > 0
    ? Math.round((correctQuiz / quizAttempts.length) * 100)
    : 0;

  const certification = await db.certification.create({
    data: {
      userId,
      title,
      level: level || "BRONZE",
      modulesCompleted,
      avgQuizScore,
      simulationsCompleted: simulations.length,
      avgSimulationScore: avgSimScore,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    },
  });

  return NextResponse.json(certification, { status: 201 });
}
