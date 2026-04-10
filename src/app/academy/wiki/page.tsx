import Link from "next/link";
import { db } from "@/lib/db";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function WikiPage() {
  const articles = await db.wikiArticle.findMany({
    where: { published: true },
    orderBy: [{ category: "asc" }, { position: "asc" }],
  });

  const grouped = articles.reduce<Record<string, typeof articles>>((acc, art) => {
    (acc[art.category] = acc[art.category] || []).push(art);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Wiki</h1>
        <p className="text-muted-foreground">
          Base de connaissances SDR — processus, techniques, bonnes pratiques
        </p>
      </div>

      {Object.entries(grouped).length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Le wiki est en cours de rédaction</p>
          <p className="text-sm mt-1">
            Les articles seront alimentés par le Content Manager à partir des processus SDR
          </p>
        </div>
      ) : (
        Object.entries(grouped).map(([category, arts]) => (
          <div key={category}>
            <h2 className="text-lg font-semibold mb-3 capitalize">{category}</h2>
            <div className="grid gap-2">
              {arts.map((article) => (
                <Link
                  key={article.id}
                  href={`/academy/wiki/${article.slug}`}
                  className="bg-card border border-border rounded-lg p-4 flex items-center gap-3 hover:bg-accent transition-colors"
                >
                  <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sm">{article.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      Mis à jour le {article.updatedAt.toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
