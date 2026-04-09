import { anthropic } from "@/lib/ai";
import { db } from "@/lib/db";

const SCORING_PROMPT = `Tu es un coach SDR expert. Évalue cette simulation d'appel de prospection.

Critères (chacun sur 20) :
1. **Ouverture (0-20)** : qualité de l'accroche, présentation, tonalité
2. **Découverte (0-20)** : questions posées, écoute active, compréhension des besoins
3. **Argumentation (0-20)** : pertinence des arguments, valeur ajoutée, personnalisation
4. **Gestion objections (0-20)** : identification, reformulation, réponses adaptées
5. **Closing (0-20)** : proposition de next steps, obtention d'engagement, professionnalisme

Retourne un JSON :
{
  "overallScore": number (0-100, somme des 5 critères),
  "openingScore": number,
  "discoveryScore": number,
  "argumentScore": number,
  "objectionScore": number,
  "closingScore": number,
  "feedback": {
    "strengths": ["point fort 1", "point fort 2"],
    "improvements": ["axe 1", "axe 2"],
    "tips": ["conseil 1", "conseil 2"]
  }
}

Transcription de la simulation :
`;

/**
 * Get the next AI response in a call simulation.
 * The AI plays the role of a prospect with the given objection profile.
 */
export async function getSimulationResponse(
  profileSystemPrompt: string,
  conversation: { role: string; content: string }[]
): Promise<string | null> {
  if (!anthropic) return null;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: profileSystemPrompt,
      messages: conversation.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    });

    return response.content[0].type === "text" ? response.content[0].text : null;
  } catch (error) {
    console.error("Simulation response failed:", error);
    return null;
  }
}

/**
 * Score a completed call simulation.
 */
export async function scoreSimulation(simulationId: string): Promise<void> {
  const simulation = await db.callSimulation.findUnique({
    where: { id: simulationId },
  });

  if (!simulation?.transcript || !anthropic) return;

  const transcriptText = JSON.stringify(simulation.transcript);

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        { role: "user", content: SCORING_PROMPT + transcriptText },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const scores = JSON.parse(text);

    await db.callSimulation.update({
      where: { id: simulationId },
      data: {
        status: "COMPLETED",
        overallScore: scores.overallScore,
        openingScore: scores.openingScore,
        discoveryScore: scores.discoveryScore,
        argumentScore: scores.argumentScore,
        objectionScore: scores.objectionScore,
        closingScore: scores.closingScore,
        feedback: scores.feedback,
      },
    });
  } catch (error) {
    console.error("Simulation scoring failed:", error);
  }
}
