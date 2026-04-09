import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSimulationResponse, scoreSimulation } from "@/lib/services/call-simulation";

// POST: Start a new simulation or send a message
export async function POST(req: Request) {
  const { action, simulationId, profileId, userId, message } = await req.json();

  if (action === "start") {
    // Start a new simulation
    if (!profileId || !userId) {
      return NextResponse.json({ error: "profileId and userId required" }, { status: 400 });
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
    const aiResponse = await getSimulationResponse(
      profile.systemPrompt,
      [{ role: "user", content: "Bonjour, je vous appelle au sujet de..." }]
    );

    const initialTranscript = [
      { role: "assistant", content: aiResponse || "Allô, oui ?", timestamp: Date.now() },
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

    const aiResponse = await getSimulationResponse(
      simulation.profile.systemPrompt,
      conversationForAI
    );

    if (aiResponse) {
      transcript.push({ role: "assistant", content: aiResponse, timestamp: Date.now() });
    }

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
