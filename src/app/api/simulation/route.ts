import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { getSimulationResponse, scoreSimulation } from "@/lib/services/call-simulation";

function classifySimError(error: unknown): { error: string; code: string; retryable: boolean } {
  const msg = error instanceof Error ? error.message : "Erreur inconnue";
  if (msg.startsWith("ANTHROPIC_API_KEY") || msg.startsWith("LLM_AUTH")) {
    return { error: "La simulation est indisponible : clé API manquante. Contactez l'administrateur.", code: "LLM_AUTH", retryable: false };
  }
  if (msg.startsWith("LLM_RATE_LIMITED")) {
    return { error: "Trop de requêtes. Réessayez dans quelques secondes.", code: "LLM_RATE_LIMITED", retryable: true };
  }
  if (msg.startsWith("LLM_TIMEOUT")) {
    return { error: "Délai d'attente dépassé. Réessayez.", code: "LLM_TIMEOUT", retryable: true };
  }
  return { error: "La simulation est temporairement indisponible.", code: "LLM_UNAVAILABLE", retryable: true };
}

// POST: Start a new simulation or send a message
export async function POST(req: Request) {
  const { action, simulationId, profileId, message } = await req.json();

  if (action === "start") {
    // Start a new simulation
    const session = await auth();
    const userId = session?.user?.id;
    if (!profileId || !userId) {
      return NextResponse.json({ error: "profileId required and user must be authenticated" }, { status: 400 });
    }

    const profile = await db.objectionProfile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const simulation = await db.callSimulation.create({
      data: {
        userId,
        profileId,
        transcript: [],
      },
    });

    // Get initial AI greeting
    let aiResponse: string;
    try {
      aiResponse = await getSimulationResponse(
        profile.systemPrompt,
        [{ role: "user", content: "Bonjour, je vous appelle au sujet de..." }]
      );
    } catch (error) {
      await db.callSimulation.delete({ where: { id: simulation.id } });
      return NextResponse.json(classifySimError(error), { status: 503 });
    }

    const initialTranscript = [
      { role: "assistant", content: aiResponse, timestamp: Date.now() },
    ];

    await db.callSimulation.update({
      where: { id: simulation.id },
      data: { transcript: initialTranscript },
    });

    return NextResponse.json({
      simulationId: simulation.id,
      transcript: initialTranscript,
      profileName: profile.name,
    }, { status: 201 });
  }

  if (action === "message") {
    // Send a message in an ongoing simulation
    if (!simulationId || !message) {
      return NextResponse.json({ error: "simulationId and message required" }, { status: 400 });
    }

    const simulation = await db.callSimulation.findUnique({
      where: { id: simulationId },
      include: { profile: true },
    });

    if (!simulation || simulation.status !== "IN_PROGRESS") {
      return NextResponse.json({ error: "Active simulation not found" }, { status: 404 });
    }

    const transcript = Array.isArray(simulation.transcript)
      ? (simulation.transcript as { role: string; content: string; timestamp: number }[])
      : [];

    // Add user message
    transcript.push({ role: "user", content: message, timestamp: Date.now() });

    // Get AI response
    const conversationForAI = transcript.map((t) => ({
      role: t.role === "user" ? "user" : "assistant",
      content: t.content,
    }));

    let aiResponse: string;
    try {
      aiResponse = await getSimulationResponse(
        simulation.profile.systemPrompt,
        conversationForAI
      );
    } catch (error) {
      return NextResponse.json(classifySimError(error), { status: 503 });
    }

    transcript.push({ role: "assistant", content: aiResponse, timestamp: Date.now() });

    await db.callSimulation.update({
      where: { id: simulationId },
      data: { transcript },
    });

    return NextResponse.json({
      transcript,
      lastResponse: aiResponse,
    });
  }

  if (action === "end") {
    // End simulation and score it
    if (!simulationId) {
      return NextResponse.json({ error: "simulationId required" }, { status: 400 });
    }

    const simulation = await db.callSimulation.findUnique({
      where: { id: simulationId },
    });

    if (!simulation) {
      return NextResponse.json({ error: "Simulation not found" }, { status: 404 });
    }

    const startTime = simulation.createdAt.getTime();
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);

    await db.callSimulation.update({
      where: { id: simulationId },
      data: { durationSeconds, status: "COMPLETED" },
    });

    // Score asynchronously
    await scoreSimulation(simulationId);

    const scored = await db.callSimulation.findUnique({
      where: { id: simulationId },
    });

    return NextResponse.json(scored);
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

// GET: List simulation profiles
export async function GET() {
  const profiles = await db.objectionProfile.findMany({
    where: { isActive: true },
    orderBy: { difficulty: "asc" },
  });

  return NextResponse.json(profiles);
}
