import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Get user progress
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const [progress, simulations, certifications, onboarding] = await Promise.all([
    db.lessonProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: { module: { select: { id: true, title: true, category: true } } },
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
    db.onboardingProgress.findUnique({
      where: { userId },
    }),
  ]);

  // Calculate per-module completion
  const moduleProgress: Record<string, { total: number; completed: number; avgScore: number | null }> = {};
  for (const p of progress) {
    const modId = p.lesson.module.id;
    if (!moduleProgress[modId]) {
      moduleProgress[modId] = { total: 0, completed: 0, avgScore: null };
    }
    moduleProgress[modId].total++;
    if (p.completed) moduleProgress[modId].completed++;
  }

  return NextResponse.json({
    lessonProgress: progress,
    moduleProgress,
    simulations,
    certifications,
    onboarding,
  });
}

// POST: Update lesson progress
export async function POST(req: Request) {
  const { userId, lessonId, completed, score, timeSpent } = await req.json();

  if (!userId || !lessonId) {
    return NextResponse.json({ error: "userId and lessonId required" }, { status: 400 });
  }

  const progress = await db.lessonProgress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    create: {
      userId,
      lessonId,
      completed: completed || false,
      score,
      timeSpent: timeSpent || 0,
      completedAt: completed ? new Date() : null,
    },
    update: {
      completed: completed || undefined,
      score: score || undefined,
      timeSpent: timeSpent ? { increment: timeSpent } : undefined,
      completedAt: completed ? new Date() : undefined,
    },
  });

  return NextResponse.json(progress);
}
