import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowLeft, BookOpen, Video, HelpCircle } from "lucide-react";
import QuizPlayer from "@/components/academy/QuizPlayer";
import LessonActions from "@/components/academy/LessonActions";
import MarkdownRenderer from "@/components/academy/MarkdownRenderer";

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { moduleId, lessonId } = await params;

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      module: { select: { id: true, title: true } },
      questions: {
        orderBy: { position: "asc" },
      },
    },
  });

  if (!lesson || lesson.module.id !== moduleId) {
    notFound();
  }

  const progress = await db.lessonProgress.findUnique({
    where: {
      userId_lessonId: { userId: session.user.id, lessonId },
    },
  });

  const typeIcon = {
    ARTICLE: BookOpen,
    VIDEO: Video,
    QUIZ: HelpCircle,
    SIMULATION: BookOpen,
    EXERCISE: BookOpen,
  };

  const Icon = typeIcon[lesson.type] || BookOpen;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href={`/academy/modules/${moduleId}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au module : {lesson.module.title}
      </Link>

      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span className="capitalize">{lesson.type.toLowerCase()}</span>
            {lesson.duration && <span>{lesson.duration} min</span>}
            {progress?.completed && (
              <span className="text-green-600 dark:text-green-400 font-medium">
                Complété
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {lesson.type === "ARTICLE" && lesson.content && (
        <div className="bg-card border border-border rounded-xl p-6">
          <MarkdownRenderer content={lesson.content} />
        </div>
      )}

      {lesson.type === "VIDEO" && lesson.content && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="aspect-video">
            <iframe
              src={lesson.content}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={lesson.title}
            />
          </div>
        </div>
      )}

      {lesson.type === "QUIZ" && (
        <QuizPlayer
          questions={lesson.questions.map((q) => ({
            id: q.id,
            question: q.question,
            options: q.options as string[],
            correctIndex: q.correctIndex,
            explanation: q.explanation,
            position: q.position,
          }))}
          lessonId={lessonId}
          userId={session.user.id}
        />
      )}

      {(lesson.type === "SIMULATION" || lesson.type === "EXERCISE") && (
        <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
          <p className="text-lg font-medium mb-2">
            {lesson.type === "SIMULATION"
              ? "Simulation d'appel"
              : "Exercice pratique"}
          </p>
          <p className="text-sm">
            {lesson.type === "SIMULATION"
              ? "Rendez-vous dans la section Simulation pour pratiquer."
              : "Cet exercice sera bientôt disponible."}
          </p>
        </div>
      )}

      {/* Actions */}
      <LessonActions
        lessonId={lessonId}
        userId={session.user.id}
        isCompleted={progress?.completed || false}
        lessonType={lesson.type}
      />
    </div>
  );
}
