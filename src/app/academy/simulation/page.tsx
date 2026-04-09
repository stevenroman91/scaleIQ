import { db } from "@/lib/db";
import { Phone, Shield, Zap, Target } from "lucide-react";
import { SimulationLauncher } from "@/components/simulation/SimulationLauncher";

export const dynamic = "force-dynamic";

const difficultyIcons: Record<string, typeof Shield> = {
  BEGINNER: Shield,
  INTERMEDIATE: Zap,
  ADVANCED: Target,
  EXPERT: Phone,
};

export default async function SimulationPage() {
  const profiles = await db.objectionProfile.findMany({
    where: { isActive: true },
    orderBy: { difficulty: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Simulation d'appels</h1>
        <p className="text-muted-foreground">
          Entraînez-vous face à un prospect IA avec des objections réalistes
        </p>
      </div>

      {profiles.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
          <Phone className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Aucun profil de simulation disponible</p>
          <p className="text-sm mt-1">
            Les profils seront créés par le Curriculum Designer à partir des données d'appels réels
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profiles.map((profile) => {
            const Icon = difficultyIcons[profile.difficulty] || Phone;
            return (
              <div
                key={profile.id}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{profile.name}</h3>
                    <span className="text-xs text-muted-foreground capitalize">
                      {profile.difficulty.toLowerCase()}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {profile.description}
                </p>
                <SimulationLauncher profileId={profile.id} profileName={profile.name} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
