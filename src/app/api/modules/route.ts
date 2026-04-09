import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET: List all published modules
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  const where: Record<string, unknown> = { published: true };
  if (category) where.category = category;

  const modules = await db.module.findMany({
    where,
    include: {
      lessons: { select: { id: true, title: true, type: true, position: true } },
      _count: { select: { feedback: true } },
    },
    orderBy: { position: "asc" },
  });

  return NextResponse.json(modules);
}

// POST: Create module (admin only)
export async function POST(req: Request) {
  const data = await req.json();

  const module = await db.module.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category || "FUNDAMENTALS",
      difficulty: data.difficulty || "BEGINNER",
      duration: data.duration,
      position: data.position || 0,
    },
  });

  return NextResponse.json(module, { status: 201 });
}
