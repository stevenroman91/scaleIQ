import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: Module detail with lessons
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const module = await db.module.findUnique({
    where: { id },
    include: {
      lessons: {
        include: {
          questions: { orderBy: { position: "asc" } },
        },
        orderBy: { position: "asc" },
      },
      feedback: { take: 10, orderBy: { createdAt: "desc" } },
      prerequisite: { select: { id: true, title: true } },
    },
  });

  if (!module) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }

  return NextResponse.json(module);
}

// PATCH: Update module
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();

  const updated = await db.module.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      difficulty: data.difficulty,
      published: data.published,
      duration: data.duration,
      position: data.position,
    },
  });

  return NextResponse.json(updated);
}
