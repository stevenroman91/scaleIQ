import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowLeft, BookOpen, Video, HelpCircle } from "lucide-react";
import QuizPlayer from "@/components/academy/QuizPlayer";
import LessonActions from "@/components/academy/LessonActions";

function renderMarkdown(content: string): string {
  let html = content;

  // Escape HTML
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-muted px-1.5 py-0.5 rounded text-sm">$1</code>'
  );

  // Unordered lists
  html = html.replace(
    /^- (.+)$/gm,
    '<li class="ml-4 list-disc text-sm leading-relaxed">$1</li>'
  );

  // Ordered lists
  html = html.replace(
    /^\d+\. (.+)$/gm,
    '<li class="ml-4 list-decimal text-sm leading-relaxed">$1</li>'
  );

  // Blockquotes
  html = html.replace(
    /^&gt; (.+)$/gm,
    '<blockquote class="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">$1</blockquote>'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="my-6 border-border" />');

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-primary underline hover:text-primary/80" target="_blank" rel="noopener">$1</a>'
  );

  // Paragraphs: replace double newlines with paragraph breaks
  html = html.replace(/\n\n/g, '</p><p class="text-sm leading-relaxed mb-4">');

  // Single newlines to <br> within paragraphs
  html = html.replace(/\n/g, "<br />");

  // Wrap in paragraph
  html = '<p class="text-sm leading-relaxed mb-4">' + html + "</p>";

  // Clean up empty paragraphs
  html = html.replace(/<p class="text-sm leading-relaxed mb-4"><\/p>/g, "");

  return html;
}

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
        <div
          className="bg-card border border-border rounded-xl p-6 prose-custom"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }}
        />
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
