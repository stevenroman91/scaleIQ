import { CheckCircle, Circle, Award } from "lucide-react";

const steps = [
  {
    id: "mission",
    title: "Notre Mission",
    description: "Découvrez la mission du groupe Scale et comment ScaleAcademy contribue à former les meilleurs SDR du marché.",
  },
  {
    id: "culture",
    title: "Notre Culture",
    description: "Les valeurs qui nous guident : excellence, data-driven, apprentissage continu, esprit d'équipe.",
  },
  {
    id: "values",
    title: "Nos Valeurs",
    description: "Transparence, performance mesurable, feedback constructif, célébration des succès.",
  },
  {
    id: "process",
    title: "Nos Processus",
    description: "Comment nous travaillons : méthodologie de prospection, outils utilisés, cycle de formation.",
  },
];

export default function OnboardingPage() {
  // In production, this would fetch from OnboardingProgress
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Who we are</h1>
        <p className="text-muted-foreground">
          Parcours d'onboarding — découvrez le groupe Scale
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className="bg-card border border-border rounded-xl p-5 flex items-start gap-4"
          >
            <div className="mt-0.5">
              <Circle className="w-6 h-6 text-muted-foreground/30" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">
                Étape {i + 1} : {step.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-5 flex items-center gap-4">
        <Award className="w-8 h-8 text-purple-600" />
        <div>
          <h3 className="font-semibold">Certification Onboarding</h3>
          <p className="text-sm text-muted-foreground">
            Complétez les 4 étapes pour obtenir votre certification d'onboarding
          </p>
        </div>
      </div>
    </div>
  );
}
