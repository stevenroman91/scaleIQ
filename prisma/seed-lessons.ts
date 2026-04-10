import { PrismaClient } from "@prisma/client";
import { onboardingLessons } from "./seed-data/onboarding";
import { fundamentalsLessons, mindsetLessons } from "./seed-data/fundamentals";
import {
  prospectingLessons,
  bantAdvancedLessons,
  disqualificationLessons,
} from "./seed-data/prospecting";
import {
  coldCallLessonsEnriched,
  gatekeeperLessons,
  openerLessons,
  pitchLessons,
  callStructureLessons,
  openingPerfectLessons,
  deepQualificationLessons,
  followUpLessons,
} from "./seed-data/cold-calling";
import {
  objectionsEnrichedLessons,
  coldCallObjectionsLessons,
} from "./seed-data/objections";
import {
  closingAdvancedLessons,
  coldCallClosingLessons,
} from "./seed-data/closing";
import {
  sdrExpertLessons,
  performanceLessons,
  psychologyLessons,
} from "./seed-data/advanced";
import { certificationLessons } from "./seed-data/certification";

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

const MIN_LESSONS = 8;

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

  const existingCount = await prisma.lesson.count({
    where: { moduleId: module.id },
  });

  if (existingCount >= MIN_LESSONS) {
    console.log(
      `  Module "${moduleTitle}" already has ${existingCount} lessons (≥${MIN_LESSONS}), skipping`
    );
    return;
  }

  // Delete existing lessons (cascades quiz questions and progress)
  if (existingCount > 0) {
    await prisma.lesson.deleteMany({ where: { moduleId: module.id } });
    console.log(
      `  Deleted ${existingCount} existing lessons for "${moduleTitle}"`
    );
  }

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
    ["Who we are — Onboarding Scale", onboardingLessons as LessonData[]],
    ["Les fondamentaux du SDR", fundamentalsLessons as LessonData[]],
    ["Recherche et ciblage prospect", prospectingLessons as LessonData[]],
    ["L'art du cold call", coldCallLessonsEnriched as LessonData[]],
    ["Maîtriser les objections", objectionsEnrichedLessons as LessonData[]],
    ["Techniques de closing avancées", closingAdvancedLessons as LessonData[]],
    [
      "SDR Expert : multi-threading et social selling",
      sdrExpertLessons as LessonData[],
    ],
    ["Le Mindset du SDR", mindsetLessons as LessonData[]],
    ["Le Gatekeeper", gatekeeperLessons as LessonData[]],
    ["L'Opener — les 10 premières secondes", openerLessons as LessonData[]],
    ["Construire son Pitch", pitchLessons as LessonData[]],
    ["La Structure d'appel complète", callStructureLessons as LessonData[]],
    ["La Qualification BANT avancée", bantAdvancedLessons as LessonData[]],
    ["La Disqualification stratégique", disqualificationLessons as LessonData[]],
    ["La Performance SDR", performanceLessons as LessonData[]],
    ["Psychologie de la vente", psychologyLessons as LessonData[]],
    ["Certification SDR Scale", certificationLessons as LessonData[]],
    [
      "L'Ouverture parfaite : capter l'attention en 20 secondes",
      openingPerfectLessons as LessonData[],
    ],
    [
      "Qualification en profondeur : identifier les vrais besoins",
      deepQualificationLessons as LessonData[],
    ],
    [
      "Gestion des objections en cold calling",
      coldCallObjectionsLessons as LessonData[],
    ],
    [
      "Le Closing en cold call : obtenir le rendez-vous",
      coldCallClosingLessons as LessonData[],
    ],
    [
      "Le Follow-up stratégique après le cold call",
      followUpLessons as LessonData[],
    ],
  ];

  for (const [moduleTitle, lessons] of moduleMap) {
    await seedModuleLessons(moduleTitle, lessons);
  }

  console.log("✓ All module lessons seeded.");
}

export { seedLessons };
