import { db } from "@/lib/db";
import { notFound } from "next/navigation";
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

      {/* Lessons list */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Programme</h2>
        {module.lessons.map((lesson, i) => {
          const Icon = lessonTypeIcons[lesson.type] || BookOpen;
          return (
            <div
              key={lesson.id}
              className="bg-card border border-border rounded-lg p-4 flex items-center gap-4"
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
                </div>
              </div>
              <CheckCircle className="w-5 h-5 text-muted-foreground/30" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
