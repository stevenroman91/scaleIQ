import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";
import { db } from "@/lib/db";
import MarkdownRenderer from "@/components/academy/MarkdownRenderer";

export const dynamic = "force-dynamic";

interface WikiArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function WikiArticlePage({ params }: WikiArticlePageProps) {
  const { slug } = await params;

  const article = await db.wikiArticle.findUnique({
    where: { slug },
  });

  if (!article || !article.published) {
    notFound();
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link
          href="/academy/wiki"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au wiki
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <FileText className="w-4 h-4" />
          <span className="capitalize">{article.category}</span>
          <span>·</span>
          <span>Mis à jour le {article.updatedAt.toLocaleDateString("fr-FR")}</span>
        </div>
        <h1 className="text-2xl font-bold">{article.title}</h1>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <MarkdownRenderer content={article.content} />
      </div>
    </div>
  );
}
