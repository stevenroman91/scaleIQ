import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding ScaleAcademy database...");

  // Objection profiles for call simulation
  const profiles = [
    {
      name: "Le Pressé",
      slug: "le-presse",
      description:
        "Ce prospect est toujours pressé et essaie d'écourter l'appel. Il utilise le manque de temps comme excuse pour ne pas écouter votre proposition.",
      difficulty: "BEGINNER" as const,
      systemPrompt: `Tu es un prospect B2B pressé. Tu n'as pas le temps pour les appels commerciaux.
Comportement : coupe la parole, demande d'être bref, menace de raccrocher, propose de rappeler dans 3 mois.
Ton : agacé mais poli. Tu peux être convaincu si le SDR est concis et montre de la valeur rapidement.
Réponds en français, de manière courte et directe.`,
      objections: [
        "Je n'ai pas le temps",
        "Rappelez-moi dans 3 mois",
        "Envoyez-moi un email plutôt",
        "Je suis en réunion là",
      ],
    },
    {
      name: "Le Sceptique",
      slug: "le-sceptique",
      description:
        "Ce prospect remet tout en question et veut des preuves concrètes. Il compare avec la concurrence et doute de la valeur ajoutée.",
      difficulty: "INTERMEDIATE" as const,
      systemPrompt: `Tu es un prospect B2B sceptique. Tu ne fais pas confiance aux commerciaux.
Comportement : demande des preuves, des références clients, des études de cas. Compare avec les concurrents.
Ton : méfiant mais ouvert si on apporte des éléments concrets et chiffrés.
Réponds en français.`,
      objections: [
        "Qu'est-ce qui vous différencie de la concurrence ?",
        "Vous avez des références dans mon secteur ?",
        "Les chiffres que vous annoncez sont-ils vérifiables ?",
        "J'ai lu des avis mitigés sur votre solution",
      ],
    },
    {
      name: "Le Satisfait",
      slug: "le-satisfait",
      description:
        "Ce prospect est déjà équipé et satisfait de sa solution actuelle. Il ne voit pas l'intérêt de changer.",
      difficulty: "INTERMEDIATE" as const,
      systemPrompt: `Tu es un prospect B2B satisfait de ta solution actuelle. Tu ne cherches pas à changer.
Comportement : explique que tu es déjà bien équipé, que ça fonctionne, pas envie de perdre du temps à migrer.
Ton : aimable mais ferme. Tu peux être intéressé si on te montre un angle mort de ta solution actuelle.
Réponds en français.`,
      objections: [
        "On a déjà une solution qui fonctionne très bien",
        "On ne veut pas changer, la migration serait trop coûteuse",
        "Notre outil actuel fait tout ce dont on a besoin",
        "On vient de renouveler notre contrat",
      ],
    },
    {
      name: "Le Décideur Fantôme",
      slug: "le-decideur-fantome",
      description:
        "Ce prospect n'est pas le décideur final. Il renvoie systématiquement vers un supérieur ou un comité.",
      difficulty: "ADVANCED" as const,
      systemPrompt: `Tu es un prospect B2B qui n'est pas décisionnaire. Tu dois valider avec ton directeur/comité.
Comportement : intéressé personnellement mais renvoie toujours la décision à quelqu'un d'autre.
Ton : sympathique, un peu gêné de ne pas pouvoir décider seul. Tu peux aider si le SDR te donne les bons arguments.
Réponds en français.`,
      objections: [
        "Ce n'est pas moi qui décide, il faut voir avec mon directeur",
        "Il faudrait que j'en parle en comité de direction",
        "Je ne suis pas habilité à prendre ce type de décision",
        "Mon N+1 gère ces sujets, je peux lui transférer votre email",
      ],
    },
    {
      name: "Le Chasseur de Prix",
      slug: "le-chasseur-de-prix",
      description:
        "Ce prospect négocie tout sur le prix. Il a toujours un devis concurrent moins cher.",
      difficulty: "ADVANCED" as const,
      systemPrompt: `Tu es un prospect B2B focalisé sur le prix. Tu veux toujours le meilleur deal.
Comportement : compare les prix, demande des remises, mentionne des concurrents moins chers, négocie agressivement.
Ton : direct et business. Tu peux accepter si on te montre le ROI et la valeur au-delà du prix.
Réponds en français.`,
      objections: [
        "C'est trop cher, on a des devis à moitié prix",
        "Votre concurrent X propose la même chose pour 30% moins cher",
        "Notre budget ne permet pas ce type d'investissement",
        "Vous pouvez faire un geste commercial ?",
      ],
    },
    {
      name: "Le Mix",
      slug: "le-mix",
      description:
        "Combinaison aléatoire de plusieurs profils. Le prospect change d'objection au cours de l'appel, testant la capacité d'adaptation du SDR.",
      difficulty: "EXPERT" as const,
      systemPrompt: `Tu es un prospect B2B complexe qui utilise PLUSIEURS types d'objections au cours d'un même appel.
Comportement : commence par être pressé, puis devient sceptique, puis parle du prix, puis dit qu'il doit valider en interne.
Ton : change selon le moment de l'appel. Teste la résilience et l'adaptabilité du SDR.
Réponds en français. Utilise 2-3 types d'objections différents au cours de la conversation.`,
      objections: [
        "Je n'ai que 2 minutes",
        "Qu'est-ce qui vous différencie ?",
        "C'est combien ?",
        "Il faudrait que j'en parle à mon équipe",
      ],
    },
  ];

  for (const profile of profiles) {
    await prisma.objectionProfile.upsert({
      where: { slug: profile.slug },
      update: profile,
      create: profile,
    });
  }

  // Sample modules
  const modules = [
    {
      title: "Who we are — Onboarding Scale",
      description: "Découvrez la mission, la culture et les valeurs du groupe Scale.",
      category: "ONBOARDING" as const,
      difficulty: "BEGINNER" as const,
      position: 0,
      duration: 30,
      published: true,
    },
    {
      title: "Les fondamentaux du SDR",
      description: "Les bases du métier de Sales Development Representative : rôle, KPIs, outils et mindset.",
      category: "FUNDAMENTALS" as const,
      difficulty: "BEGINNER" as const,
      position: 1,
      duration: 45,
      published: true,
    },
    {
      title: "Recherche et ciblage prospect",
      description: "Techniques de recherche LinkedIn, qualification BANT, et construction de listes de prospection.",
      category: "PROSPECTING" as const,
      difficulty: "BEGINNER" as const,
      position: 2,
      duration: 60,
      published: true,
    },
    {
      title: "L'art du cold call",
      description: "Structure d'un appel réussi : accroche, pitch, qualification, closing. Basé sur les données réelles de ScaleFast.",
      category: "COLD_CALLING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 3,
      duration: 90,
      published: true,
    },
    {
      title: "Maîtriser les objections",
      description: "Les 10 objections les plus courantes et comment les gérer. Techniques de reformulation et rebond.",
      category: "OBJECTION_HANDLING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 4,
      duration: 75,
      published: true,
    },
    {
      title: "Techniques de closing avancées",
      description: "Obtenir un engagement : trial close, assumptive close, urgency close. Patterns gagnants des top performers.",
      category: "CLOSING" as const,
      difficulty: "ADVANCED" as const,
      position: 5,
      duration: 60,
      published: true,
    },
    {
      title: "SDR Expert : multi-threading et social selling",
      description: "Stratégies avancées : multi-threading dans les grands comptes, social selling LinkedIn, séquences multi-canal.",
      category: "ADVANCED" as const,
      difficulty: "EXPERT" as const,
      position: 6,
      duration: 120,
      published: true,
    },
  ];

  for (const mod of modules) {
    const existing = await prisma.module.findFirst({
      where: { title: mod.title },
    });
    if (!existing) {
      await prisma.module.create({ data: mod });
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
