import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Video, HelpCircle, Phone, PenTool, Clock, CheckCircle } from "lucide-react";

const lessonTypeIcons: Record<string, typeof BookOpen> = {
  ARTICLE: BookOpen,
  VIDEO: Video,
  QUIZ: HelpCircle,
  SIMULATION: Phone,
  EXERCISE: PenTool,
};

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  const { moduleId } = await params;

  const module = await db.module.findUnique({
    where: { id: moduleId },
    include: {
      lessons: {
        orderBy: { position: "asc" },
        include: {
          _count: { select: { questions: true } },
        },
      },
      prerequisite: { select: { id: true, title: true } },
      feedback: {
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { rating: true, strengths: true, remarks: true },
      },
    },
  });

  if (!module) notFound();

  // Fetch user progress for lessons in this module
  const userProgress = userId
    ? await db.lessonProgress.findMany({
        where: {
          userId,
          lessonId: { in: module.lessons.map((l) => l.id) },
        },
        select: { lessonId: true, completed: true, score: true },
      })
    : [];
  const progressMap = new Map(userProgress.map((p) => [p.lessonId, p]));
  const completedCount = userProgress.filter((p) => p.completed).length;

  const avgRating =
    module.feedback.length > 0
      ? Math.round(
          (module.feedback.reduce((s, f) => s + f.rating, 0) / module.feedback.length) * 10
        ) / 10
      : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{module.title}</h1>
        {module.description && (
          <p className="text-muted-foreground mt-1">{module.description}</p>
        )}
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span>{module.lessons.length} leçons</span>
          {module.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {module.duration} min
            </span>
          )}
          <span className="capitalize">{module.difficulty.toLowerCase()}</span>
          {avgRating && <span>Note: {avgRating}/5</span>}
        </div>
      </div>

      {/* Prerequisite */}
      {module.prerequisite && (
        <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
          <p className="text-sm">
            Prérequis : <strong>{module.prerequisite.title}</strong>
          </p>
        </div>
      )}

      {/* Progress overview */}
      {module.lessons.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Progression : {completedCount} / {module.lessons.length} leçons
            </span>
            <span className="font-medium">
              {Math.round((completedCount / module.lessons.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{
                width: `${(completedCount / module.lessons.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Lessons list */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Programme</h2>
        {module.lessons.map((lesson, i) => {
          const Icon = lessonTypeIcons[lesson.type] || BookOpen;
          const lessonProgress = progressMap.get(lesson.id);
          const isComplete = lessonProgress?.completed || false;
          return (
            <Link
              key={lesson.id}
              href={`/academy/modules/${moduleId}/lessons/${lesson.id}`}
              className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 hover:border-primary/50 transition block"
            >
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-muted-foreground">
                  {i + 1}
                </span>
              </div>
              <Icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{lesson.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="capitalize">{lesson.type.toLowerCase()}</span>
                  {lesson.duration && <span>{lesson.duration} min</span>}
                  {lesson._count.questions > 0 && (
                    <span>{lesson._count.questions} questions</span>
                  )}
                  {lessonProgress?.score != null && (
                    <span className="text-primary font-medium">
                      Score: {lessonProgress.score}%
                    </span>
                  )}
                </div>
              </div>
              <CheckCircle
                className={`w-5 h-5 flex-shrink-0 ${
                  isComplete
                    ? "text-green-500"
                    : "text-muted-foreground/30"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
