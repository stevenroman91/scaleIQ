import { PrismaClient } from "@prisma/client";
import { welcomeLessons } from "./seed-data/welcome";

const prisma = new PrismaClient();

type LessonData = {
  title: string;
  type: "VIDEO" | "ARTICLE" | "QUIZ" | "SIMULATION" | "EXERCISE";
  position: number;
  duration: number;
  content?: string;
  questions?: Array<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    position: number;
  }>;
};

async function seedModuleLessons(
  moduleTitle: string,
  lessons: LessonData[]
): Promise<void> {
  const module = await prisma.module.findFirst({
    where: { title: moduleTitle },
  });
  if (!module) {
    console.log(`  Module not found: "${moduleTitle}", skipping`);
    return;
  }

  // Always delete and recreate to replace any invented content
  await prisma.lesson.deleteMany({ where: { moduleId: module.id } });

  for (const lessonData of lessons) {
    const { questions, ...lessonFields } = lessonData as LessonData & {
      questions?: LessonData["questions"];
    };

    const lesson = await prisma.lesson.create({
      data: {
        ...lessonFields,
        moduleId: module.id,
      },
    });

    if (questions) {
      for (const q of questions) {
        await prisma.quizQuestion.create({
          data: {
            ...q,
            options: q.options,
            lessonId: lesson.id,
          },
        });
      }
    }
  }

  console.log(
    `  ✓ Created ${lessons.length} lessons for "${moduleTitle}"`
  );
}

async function seedLessons(): Promise<void> {
  console.log("Seeding lesson content and quizzes for all modules...");

  const moduleMap: Array<[string, LessonData[]]> = [
    ["Welcome", welcomeLessons as LessonData[]],
    // Additional modules added as they are imported:
    // ["01 - The Mindset", mindsetLessons as LessonData[]],
    // ["02A - The Gatekeeper", gatekeeperLessons as LessonData[]],
    // ["02B - The Opener", openerLessons as LessonData[]],
    // ["03 - The Pitch", pitchLessons as LessonData[]],
    // ["04 - The Structure", structureLessons as LessonData[]],
    // ["05 - Objection", objectionLessons as LessonData[]],
    // ["06 - Qualifying Questions", qualifyingLessons as LessonData[]],
    // ["07 - Disqualifying", disqualifyingLessons as LessonData[]],
    // ["08 - One Last Question", oneLastQuestionLessons as LessonData[]],
    // ["09 - Closing", closingLessons as LessonData[]],
    // ["10 - Understanding Performance", understandingPerformanceLessons as LessonData[]],
  ];

  for (const [moduleTitle, lessons] of moduleMap) {
    await seedModuleLessons(moduleTitle, lessons);
  }

  console.log("✓ All module lessons seeded.");
}

export { seedLessons };
