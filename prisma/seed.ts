import { PrismaClient } from "@prisma/client";
import { seedLessons } from "./seed-lessons";

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
    // Modules from ScaleFast training program
    {
      title: "Le Mindset du SDR",
      description: "Développez l'état d'esprit gagnant pour performer en cold calling. Surmonter la peur du rejet, discipline quotidienne, énergie et posture vocale.",
      category: "FUNDAMENTALS" as const,
      difficulty: "BEGINNER" as const,
      position: 7,
      duration: 40,
      published: true,
    },
    {
      title: "Le Gatekeeper",
      description: "Techniques pour passer les barrages et atteindre le décideur. 5 techniques éprouvées avec exemples d'appels réels.",
      category: "COLD_CALLING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 8,
      duration: 35,
      published: true,
    },
    {
      title: "L'Opener — les 10 premières secondes",
      description: "Les 10 premières secondes font la différence. Structure d'un opener efficace, personnalisation et recherche.",
      category: "COLD_CALLING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 9,
      duration: 30,
      published: true,
    },
    {
      title: "Construire son Pitch",
      description: "Présentez votre proposition de valeur de manière percutante. Adapter le pitch au persona, démonstration en live.",
      category: "COLD_CALLING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 10,
      duration: 45,
      published: true,
    },
    {
      title: "La Structure d'appel complète",
      description: "Le framework OPQA complet d'un appel cold calling réussi. Transitions fluides entre chaque étape.",
      category: "COLD_CALLING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 11,
      duration: 50,
      published: true,
    },
    {
      title: "La Qualification BANT avancée",
      description: "Critères BANT revisités pour le cold calling moderne. Questions de qualification puissantes.",
      category: "PROSPECTING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 12,
      duration: 35,
      published: true,
    },
    {
      title: "La Disqualification stratégique",
      description: "Savoir dire non pour mieux convertir. Quand et pourquoi disqualifier un prospect pour maximiser votre temps.",
      category: "PROSPECTING" as const,
      difficulty: "ADVANCED" as const,
      position: 13,
      duration: 25,
      published: true,
    },
    {
      title: "La Performance SDR",
      description: "Optimisez vos métriques et atteignez l'excellence. KPIs essentiels, routine de performance quotidienne.",
      category: "ADVANCED" as const,
      difficulty: "ADVANCED" as const,
      position: 14,
      duration: 40,
      published: true,
    },
    {
      title: "Psychologie de la vente",
      description: "20 principes psychologiques pour améliorer vos conversations de vente. Biais cognitifs, techniques d'influence éthique.",
      category: "ADVANCED" as const,
      difficulty: "ADVANCED" as const,
      position: 15,
      duration: 60,
      published: true,
    },
    {
      title: "Certification SDR Scale",
      description: "Évaluation finale couvrant l'ensemble du parcours. Simulation d'appel notée + QCM complet pour obtenir la certification.",
      category: "CERTIFICATION" as const,
      difficulty: "EXPERT" as const,
      position: 16,
      duration: 90,
      published: true,
    },
    // Cold calling techniques modules
    {
      title: "L'Ouverture parfaite : capter l'attention en 20 secondes",
      description: "Maîtrisez les techniques d'ouverture en cold calling : les patterns d'accroche qui fonctionnent, la personnalisation en temps réel et comment éviter les erreurs classiques des 20 premières secondes.",
      category: "COLD_CALLING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 17,
      duration: 40,
      published: true,
    },
    {
      title: "Qualification en profondeur : identifier les vrais besoins",
      description: "Techniques avancées de qualification pour découvrir les pain points cachés, évaluer l'urgence et valider le potentiel business. Questions ouvertes, écoute active et mapping des enjeux.",
      category: "COLD_CALLING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 18,
      duration: 50,
      published: true,
    },
    {
      title: "Gestion des objections en cold calling",
      description: "Méthode LAER (Listen, Acknowledge, Explore, Respond) appliquée aux objections les plus fréquentes en cold calling. Transformer chaque objection en opportunité de qualifier davantage.",
      category: "OBJECTION_HANDLING" as const,
      difficulty: "ADVANCED" as const,
      position: 19,
      duration: 55,
      published: true,
    },
    {
      title: "Le Closing en cold call : obtenir le rendez-vous",
      description: "Techniques de closing adaptées au cold calling : le trial close, le assumptive close et le soft close. Savoir quand et comment demander le rendez-vous pour maximiser le taux de conversion.",
      category: "CLOSING" as const,
      difficulty: "ADVANCED" as const,
      position: 20,
      duration: 45,
      published: true,
    },
    {
      title: "Le Follow-up stratégique après le cold call",
      description: "Construire une séquence de suivi efficace après le premier appel : timing optimal, canaux complémentaires (email, LinkedIn), messages personnalisés et gestion des non-réponses pour relancer sans agacer.",
      category: "COLD_CALLING" as const,
      difficulty: "INTERMEDIATE" as const,
      position: 21,
      duration: 35,
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

  // Create lessons with quiz questions for each module
  const allModules = await prisma.module.findMany({ orderBy: { position: "asc" } });

  const moduleLessons: Record<string, { title: string; type: string; content: string; duration: number; questions?: { question: string; options: string[]; correctIndex: number; explanation: string }[] }[]> = {
    "Who we are — Onboarding Scale": [
      {
        title: "La mission Scale",
        type: "ARTICLE",
        content: `# La mission Scale\n\nLe groupe Scale a pour mission de **démocratiser l'accès à des forces de vente externalisées de haute qualité**.\n\nNous croyons que chaque entreprise B2B mérite une équipe de prospection performante, formée aux meilleures pratiques et équipée des meilleurs outils.\n\n## Nos filiales\n\n- **ScaleFast** — Agence SDR premium, spécialisée dans les RDV qualifiés\n- **ScaleCall** — Agence SDR à volume d'appels\n- **ScaleAcademy** — Formation et certification SDR\n- **ScaleHQ** — Plateforme SaaS pour les agences SDR\n\n## Notre vision\n\nDevenir la référence européenne de la prospection B2B externalisée, en combinant expertise humaine et intelligence artificielle.`,
        duration: 10,
      },
      {
        title: "Notre culture",
        type: "ARTICLE",
        content: `# La culture Scale\n\n## Nos 4 piliers\n\n### 1. Data-driven\nToutes nos décisions sont basées sur les données. Chaque appel est analysé, chaque technique est mesurée.\n\n### 2. Apprentissage continu\nLe métier de SDR évolue constamment. Nous investissons massivement dans la formation.\n\n### 3. Esprit d'équipe\nLa prospection est un sport collectif. Le succès d'un SDR profite à toute l'équipe.\n\n### 4. Excellence opérationnelle\nNous visons l'excellence dans chaque interaction avec un prospect.`,
        duration: 8,
      },
      {
        title: "Quiz Onboarding",
        type: "QUIZ",
        content: "Vérifiez que vous avez bien compris la mission et la culture Scale.",
        duration: 5,
        questions: [
          {
            question: "Quelle est la mission principale du groupe Scale ?",
            options: ["Vendre des logiciels CRM", "Démocratiser l'accès à des forces de vente externalisées de haute qualité", "Former des développeurs", "Créer des chatbots IA"],
            correctIndex: 1,
            explanation: "Scale vise à démocratiser l'accès à des équipes de prospection B2B performantes.",
          },
          {
            question: "Quelle filiale gère la plateforme SaaS ?",
            options: ["ScaleFast", "ScaleCall", "ScaleAcademy", "ScaleHQ"],
            correctIndex: 3,
            explanation: "ScaleHQ est la filiale SaaS qui fournit les outils aux agences SDR.",
          },
          {
            question: "Quel pilier culturel est le plus important chez Scale ?",
            options: ["Hiérarchie stricte", "Data-driven", "Travail individuel", "Quantité sur qualité"],
            correctIndex: 1,
            explanation: "L'approche data-driven est au cœur de la culture Scale : chaque décision est basée sur les données.",
          },
        ],
      },
    ],
    "Les fondamentaux du SDR": [
      {
        title: "Le rôle du SDR",
        type: "ARTICLE",
        content: `# Le rôle du SDR (Sales Development Representative)\n\nLe SDR est le **premier point de contact** entre une entreprise et ses futurs clients. Son rôle est de générer des rendez-vous qualifiés pour l'équipe commerciale.\n\n## Responsabilités\n\n- **Prospection** : identifier et contacter les prospects pertinents\n- **Qualification** : évaluer le potentiel du prospect (BANT)\n- **Prise de RDV** : obtenir des meetings pour les Account Executives\n- **CRM** : documenter chaque interaction\n\n## KPIs principaux\n\n| KPI | Cible | Description |\n|-----|-------|-------------|\n| Appels/jour | 50-80 | Volume d'activité |\n| Taux de connexion | 15-25% | % de prospects décrochés |\n| RDV/semaine | 5-10 | Meetings qualifiés posés |\n| Taux de conversion | 20-30% | % de RDV qui deviennent opportunité |`,
        duration: 15,
      },
      {
        title: "La méthode BANT",
        type: "ARTICLE",
        content: `# La qualification BANT\n\nBANT est un framework de qualification inventé par IBM. Il permet d'évaluer rapidement si un prospect est prêt à avancer.\n\n## B — Budget\n\nLe prospect a-t-il le budget pour notre solution ?\n- "Quel budget avez-vous alloué pour ce type de projet ?"\n- "Avez-vous déjà investi dans une solution similaire ?"\n\n## A — Authority\n\nParlez-vous au décideur ?\n- "Qui d'autre serait impliqué dans cette décision ?"\n- "Quel est le processus de validation chez vous ?"\n\n## N — Need\n\nLe prospect a-t-il un vrai besoin ?\n- "Quel est votre plus grand défi en ce moment ?"\n- "Qu'est-ce qui se passe si vous ne résolvez pas ce problème ?"\n\n## T — Timeline\n\nQuand veut-il prendre une décision ?\n- "Quand souhaitez-vous avoir mis en place une solution ?"\n- "Y a-t-il une échéance particulière ?"`,
        duration: 12,
      },
      {
        title: "Les outils du SDR",
        type: "ARTICLE",
        content: `# Les outils essentiels du SDR\n\n## CRM\n- **HubSpot / Salesforce** : gestion des contacts et du pipeline\n- Documentation de chaque interaction\n\n## Prospection\n- **LinkedIn Sales Navigator** : recherche de prospects\n- **Kaspr / FullEnrich** : enrichissement de contacts (email, téléphone)\n\n## Téléphonie\n- **Ringover / Aircall** : appels avec enregistrement et analytics\n- Intégration CRM automatique\n\n## Intelligence artificielle\n- **ScaleHQ** : analyse d'appels, coaching, transcription\n- **Claude / GPT** : aide à la rédaction d'emails, recherche\n\n## Séquençage\n- **Lemlist / La Growth Machine** : automatisation des séquences multi-canal`,
        duration: 10,
      },
      {
        title: "Quiz Fondamentaux",
        type: "QUIZ",
        content: "Testez vos connaissances sur les fondamentaux du SDR.",
        duration: 8,
        questions: [
          {
            question: "Quel est le principal objectif d'un SDR ?",
            options: ["Closer des deals", "Générer des RDV qualifiés", "Gérer le support client", "Développer le produit"],
            correctIndex: 1,
            explanation: "Le SDR génère des RDV qualifiés pour les Account Executives qui closent les deals.",
          },
          {
            question: "Que signifie le 'A' dans BANT ?",
            options: ["Availability", "Authority", "Alignment", "Action"],
            correctIndex: 1,
            explanation: "Authority : s'assurer qu'on parle au décideur ou à quelqu'un qui influence la décision.",
          },
          {
            question: "Combien d'appels par jour un SDR devrait-il viser ?",
            options: ["10-20", "30-40", "50-80", "100+"],
            correctIndex: 2,
            explanation: "50-80 appels/jour est la fourchette standard pour maintenir un bon volume de prospection.",
          },
          {
            question: "Quel outil permet d'enrichir les contacts avec email et téléphone ?",
            options: ["Ringover", "HubSpot", "Kaspr", "Lemlist"],
            correctIndex: 2,
            explanation: "Kaspr et FullEnrich sont des outils d'enrichissement de contacts à partir de LinkedIn.",
          },
        ],
      },
    ],
    "L'art du cold call": [
      {
        title: "Structure d'un appel réussi",
        type: "ARTICLE",
        content: `# Structure d'un cold call réussi\n\nUn appel de prospection B2B suit une structure en 5 étapes :\n\n## 1. L'accroche (10 secondes)\n\nVous avez 10 secondes pour capter l'attention. Soyez direct et pertinent.\n\n**Mauvais** : "Bonjour, je m'appelle Jean de la société X, on est spécialisé dans..."\n**Bon** : "Bonjour [Prénom], je vous appelle suite à [trigger event]. J'aide des [titre] comme vous à [bénéfice concret]."\n\n## 2. Le pitch (30 secondes)\n\nExpliquez votre proposition de valeur en une phrase.\n- Qui vous aidez (persona)\n- Quel problème vous résolvez\n- Comment vous le résolvez\n- Résultat concret (chiffré si possible)\n\n## 3. La découverte (2-5 minutes)\n\nPosez des questions ouvertes pour comprendre le contexte.\n- Situation actuelle\n- Problèmes rencontrés\n- Impact sur le business\n\n## 4. Le bridge (1 minute)\n\nFaites le lien entre leur problème et votre solution.\n\n## 5. Le closing (30 secondes)\n\nProposez un next step clair : "Je propose qu'on se cale un créneau de 30 min mardi ou mercredi pour approfondir. Qu'est-ce qui vous arrange ?"`,
        duration: 20,
      },
      {
        title: "Les meilleures accroches",
        type: "ARTICLE",
        content: `# Les accroches qui fonctionnent\n\n## Pattern 1 : Le trigger event\n"Bonjour [Prénom], j'ai vu que vous venez de [recruter / lever des fonds / lancer un nouveau produit]. C'est souvent le moment où les entreprises comme la vôtre cherchent à [bénéfice]."\n\n## Pattern 2 : La référence\n"Bonjour [Prénom], je travaille avec [entreprise similaire] qui avait le même défi que vous sur [sujet]. On les a aidés à [résultat chiffré]."\n\n## Pattern 3 : La question\n"Bonjour [Prénom], question rapide : comment gérez-vous actuellement [problème] chez [entreprise] ?"\n\n## Pattern 4 : Le constat\n"Bonjour [Prénom], j'ai remarqué que [observation sur leur site/LinkedIn]. La plupart des [titre] dans votre secteur rencontrent [problème]. Est-ce votre cas aussi ?"\n\n## À éviter\n- "Est-ce que je vous dérange ?" → Vous vous excusez d'appeler\n- Monologue de 30 secondes sur votre entreprise\n- Questions fermées en ouverture`,
        duration: 15,
      },
      {
        title: "Exercice pratique : votre accroche",
        type: "EXERCISE",
        content: `# Exercice : Construisez votre accroche\n\nUtilisez le framework suivant pour construire votre accroche personnalisée :\n\n1. **Identifiez votre persona type** (titre, secteur, taille d'entreprise)\n2. **Identifiez le problème principal** qu'il rencontre\n3. **Choisissez un pattern** d'accroche parmi les 4 étudiés\n4. **Rédigez 3 variantes** de votre accroche\n5. **Testez-les** en simulation avec l'AI Tutor Bot\n\nCritères de qualité :\n- Moins de 15 secondes\n- Personnalisé au prospect\n- Orienté valeur (pas produit)\n- Se termine par une question ouverte`,
        duration: 20,
      },
      {
        title: "Quiz Cold Calling",
        type: "QUIZ",
        content: "Testez vos connaissances sur le cold calling.",
        duration: 10,
        questions: [
          {
            question: "Combien de temps dure l'accroche idéale ?",
            options: ["5 secondes", "10 secondes", "30 secondes", "1 minute"],
            correctIndex: 1,
            explanation: "10 secondes suffisent pour capter l'attention et donner envie d'écouter la suite.",
          },
          {
            question: "Quelle est la meilleure façon de commencer un cold call ?",
            options: ["Se présenter longuement", "Demander si on dérange", "Mentionner un trigger event pertinent", "Lire un script mot pour mot"],
            correctIndex: 2,
            explanation: "Un trigger event (recrutement, levée de fonds, etc.) montre que vous avez fait vos recherches.",
          },
          {
            question: "Que devez-vous éviter en accroche ?",
            options: ["Poser une question ouverte", "Mentionner une référence client", "Faire un monologue de 30 secondes", "Utiliser le prénom du prospect"],
            correctIndex: 2,
            explanation: "Un long monologue perd l'attention du prospect. Soyez concis et engageant.",
          },
        ],
      },
    ],
    "Maîtriser les objections": [
      {
        title: "Les 10 objections les plus courantes",
        type: "ARTICLE",
        content: `# Les 10 objections les plus courantes en prospection B2B\n\n## 1. "Je n'ai pas le temps"\n**Réponse** : "Je comprends, c'est exactement pour ça que je vous appelle. En 30 secondes : [pitch]. Si ça ne vous parle pas, on s'arrête là."\n\n## 2. "Envoyez-moi un email"\n**Réponse** : "Bien sûr, je vous l'envoie. Juste pour que l'email soit pertinent, est-ce que [question de qualification] ?"\n\n## 3. "C'est trop cher"\n**Réponse** : "Je comprends. Quel est le coût de ne rien faire ? Si [problème] vous coûte [montant], notre solution se rembourse en [délai]."\n\n## 4. "On a déjà une solution"\n**Réponse** : "Super, c'est un bon signe que le sujet est important pour vous. Par curiosité, qu'est-ce qui fonctionne bien et qu'est-ce qui pourrait être amélioré ?"\n\n## 5. "Ce n'est pas moi qui décide"\n**Réponse** : "Je comprends. Qui serait la bonne personne ? Et si je vous donnais les éléments clés, seriez-vous à l'aise pour lui en parler ?"\n\n## 6-10\n- "Rappelez-moi dans 3 mois"\n- "On n'a pas le budget"\n- "Je ne suis pas intéressé"\n- "Je ne connais pas votre entreprise"\n- "Votre concurrent est mieux"`,
        duration: 25,
      },
      {
        title: "La technique de reformulation",
        type: "ARTICLE",
        content: `# La technique de reformulation\n\nLa reformulation est LA technique de base pour gérer les objections.\n\n## Le framework ACR\n\n### A — Accuser réception\nMontrez que vous avez entendu et compris.\n"Je comprends tout à fait votre point."\n\n### C — Clarifier\nCreusez pour comprendre la vraie raison derrière l'objection.\n"Quand vous dites que c'est trop cher, est-ce par rapport à votre budget global ou par rapport à un concurrent ?"\n\n### R — Répondre\nApportez une réponse adaptée à la vraie objection.\n"OK, donc le sujet est plutôt le ROI. Nos clients mesurent en moyenne [résultat] dans les [délai] premiers mois."`,
        duration: 15,
      },
      {
        title: "Simulation : gestion d'objections",
        type: "SIMULATION",
        content: "Pratiquez la gestion d'objections avec l'AI Tutor Bot. Choisissez un profil de prospect et entraînez-vous à répondre à ses objections en temps réel.",
        duration: 20,
      },
      {
        title: "Quiz Objections",
        type: "QUIZ",
        content: "Testez vos connaissances sur la gestion d'objections.",
        duration: 8,
        questions: [
          {
            question: "Quelle est la première étape quand un prospect dit 'c'est trop cher' ?",
            options: ["Baisser le prix", "Accuser réception et reformuler", "Raccrocher", "Envoyer un email avec une remise"],
            correctIndex: 1,
            explanation: "Il faut d'abord accuser réception ('Je comprends') puis clarifier ce que 'trop cher' signifie exactement.",
          },
          {
            question: "Quand un prospect dit 'envoyez-moi un email', que faites-vous ?",
            options: ["Vous envoyez l'email immédiatement", "Vous posez une question de qualification avant d'accepter", "Vous insistez pour un appel", "Vous demandez son numéro de portable"],
            correctIndex: 1,
            explanation: "Profitez de l'occasion pour qualifier le prospect avant d'envoyer un email pertinent et ciblé.",
          },
          {
            question: "Que signifie le 'C' dans la technique ACR ?",
            options: ["Closer", "Clarifier", "Convaincre", "Conclure"],
            correctIndex: 1,
            explanation: "Clarifier : creuser la vraie raison derrière l'objection pour y répondre précisément.",
          },
        ],
      },
    ],
  };

  for (const mod of allModules) {
    const lessons = moduleLessons[mod.title];
    if (!lessons) continue;

    const existingLessons = await prisma.lesson.count({ where: { moduleId: mod.id } });
    if (existingLessons > 0) continue;

    for (let i = 0; i < lessons.length; i++) {
      const lessonData = lessons[i];
      const lesson = await prisma.lesson.create({
        data: {
          moduleId: mod.id,
          title: lessonData.title,
          type: lessonData.type as "VIDEO" | "ARTICLE" | "QUIZ" | "SIMULATION" | "EXERCISE",
          content: lessonData.content,
          position: i,
          duration: lessonData.duration,
        },
      });

      if (lessonData.questions) {
        for (let j = 0; j < lessonData.questions.length; j++) {
          const q = lessonData.questions[j];
          await prisma.quizQuestion.create({
            data: {
              lessonId: lesson.id,
              question: q.question,
              options: q.options,
              correctIndex: q.correctIndex,
              explanation: q.explanation,
              position: j,
            },
          });
        }
      }
    }
  }

  // Wiki articles
  const wikiArticles = [
    {
      title: "Processus de prospection",
      slug: "processus-prospection",
      category: "processus",
      content: `# Processus de prospection\n\n## Étape 1 : Identification\nUtiliser LinkedIn Sales Navigator pour identifier les prospects correspondant à l'ICP.\n\n## Étape 2 : Enrichissement\nEnrichir les contacts via Kaspr ou FullEnrich pour obtenir email + téléphone.\n\n## Étape 3 : Séquençage\nCréer une séquence multi-canal (email + LinkedIn + téléphone) de 8-12 touchpoints.\n\n## Étape 4 : Appel\nSuivre la structure d'appel en 5 étapes.\n\n## Étape 5 : Suivi\nDocumenter dans le CRM, envoyer un récap email, relancer si pas de réponse.`,
      position: 0,
    },
    {
      title: "Les objections par secteur",
      slug: "objections-par-secteur",
      category: "techniques",
      content: `# Objections spécifiques par secteur\n\n## SaaS / Tech\n- "On développe ça en interne"\n- "Notre CTO préfère les solutions open-source"\n\n## Finance / Banque\n- "Les contraintes réglementaires nous empêchent de..."\n- "Notre processus de validation prend 6 mois"\n\n## Industrie\n- "On a toujours fait comme ça"\n- "Notre ERP ne s'intègre pas facilement"`,
      position: 1,
    },
    {
      title: "Scripts d'appels validés",
      slug: "scripts-appels",
      category: "techniques",
      content: `# Scripts d'appels validés\n\nCes scripts ont été extraits des appels les plus performants de ScaleFast.\n\n## Script 1 : Approche trigger event\n"Bonjour [Prénom], je suis [Nom] de Scale. J'ai vu que [entreprise] vient de [trigger]. Les entreprises dans cette phase cherchent souvent à [bénéfice]. Est-ce un sujet pour vous en ce moment ?"\n\n## Script 2 : Approche référence\n"Bonjour [Prénom], je travaille avec [référence similaire] qui avait exactement le même défi que vous sur [sujet]. On les a aidés à passer de [avant] à [après] en [délai]. Ça vous parlerait d'en discuter ?"`,
      position: 2,
    },
    {
      title: "Guide CRM",
      slug: "guide-crm",
      category: "outils",
      content: `# Guide d'utilisation du CRM\n\n## Règles de saisie\n\n1. **Chaque appel** doit être documenté dans les 5 minutes\n2. **Chaque RDV** doit avoir : nom, entreprise, date, statut, notes\n3. **Les objections** doivent être catégorisées pour alimenter la formation\n\n## Statuts des contacts\n- **New** : jamais contacté\n- **Contacted** : premier contact effectué\n- **Qualified** : correspond à l'ICP + BANT validé\n- **Meeting Set** : RDV fixé\n- **Nurture** : pas maintenant mais potentiel futur`,
      position: 3,
    },
    {
      title: "KPIs et objectifs",
      slug: "kpis-objectifs",
      category: "processus",
      content: `# KPIs et objectifs SDR\n\n## KPIs quotidiens\n| Métrique | Objectif |\n|----------|----------|\n| Appels passés | 60/jour |\n| Emails envoyés | 30/jour |\n| Connexions LinkedIn | 20/jour |\n\n## KPIs hebdomadaires\n| Métrique | Objectif |\n|----------|----------|\n| RDV qualifiés | 8/semaine |\n| Taux de no-show | < 15% |\n| Score qualité appels | > 3.5/5 |\n\n## KPIs mensuels\n| Métrique | Objectif |\n|----------|----------|\n| Pipeline généré | Selon contrat client |\n| Taux de conversion RDV→Opportunité | > 25% |`,
      position: 4,
    },
    // Articles importés des fiches e-learning ScaleFast
    {
      title: "Les 17 objections les plus difficiles",
      slug: "17-objections",
      category: "objections",
      content: `# Surmonter les 17 objections les plus difficiles\n\n## Le cadre méthodologique\n\n### 1. Pause\nFaites une pause de 2 à 3 secondes. Mettez-vous en sourdine si nécessaire.\n\n### 2. Reconnaître\n- "Je pensais que tu dirais ça."\n- "Ne pas avoir de budget doit être frustrant."\n- Répéter l'objection réduit la tension.\n\n### 3. Demander la permission\n- "Puis-je vous poser une question ?"\n- Cela donne le contrôle à l'acheteur et établit la confiance.\n\n### 4. Poser une question\n- "Cela signifie-t-il que l'appel était parfait ?"\n\n## Les objections clés\n\n### "Envoyez-moi un email"\nBien sûr. Quel est le meilleur email ? Avant que je le fasse, serais-tu opposé à ce que je t'explique de quoi il s'agit pour m'assurer qu'il soit pertinent ?\n\n### "Nous avons déjà un fournisseur"\nJe pensais que vous en auriez. C'est la première fois que j'entends ça. Qu'est-ce qui vous rend satisfait avec eux ?\n\n### "Nous n'avons pas de budget"\nCela doit être frustrant. Je suppose qu'on a ce dont on a besoin, donc ça ne serait pas une priorité de toute façon, n'est-ce pas ?\n\n### "Rappelle-moi dans six mois"\nY aura-t-il quelque chose de spécifique qui se passera dans six mois ?\n\n### "Je suis occupé"\nMon timing est terrible. Serait-ce une idée stupide de t'expliquer brièvement pourquoi je t'appelle maintenant ?\n\n### "Pas intéressé" (immédiatement)\nMon approche était-elle si bizarre ? Je ne suis pas surpris, je suis un parfait inconnu interrompant ta journée.\n\n### "Je dois en discuter avec quelqu'un"\nÇa a du sens. Que penses-tu qu'ils diront quand tu en parleras avec eux ?\n\n## Tonalité recommandée\n\n| À éviter | À utiliser |\n|----------|------------|\n| Sarcasme | Calme |\n| Aigu | Curieux |\n| Agacé | Posé |`,
      position: 5,
    },
    {
      title: "Structure ultime de l'appel à froid",
      slug: "structure-appel",
      category: "techniques",
      content: `# La structure ultime de l'appel à froid\n\n## Étape 1 : Ouverture\n"Salut [Nom], je vous appelle car je pense que vous pourriez m'aider avec [sujet]. Ai-je 30 secondes ?"\n\nSi le prospect dit Non :\n- "Si ce n'est pas pertinent, vous m'enverrez jamais rappeler ?"\n- "Mon introduction était-elle si désastreuse ?"\n\n## Étape 2 : Présentation\nNous travaillons avec [type clients] sur ces problèmes :\n- Problème 1\n- Problème 2\n- Problème 3\n\nL'un d'eux vous affecte-t-il ?\n\nTechnique Miroitage : Répétez 1-3 mots clés pour les inciter à développer.\n\n## Étape 3 : Qualification\n"Comment savez-vous exactement que c'est un problème ?"\nObtenez des données concrètes et résultats mesurables.\n\nTechnique Étiquetage : "Cela semble/paraît..." pour diffuser leurs émotions.\n\n## Étape 4 : Approfondissement\n"Que signifie cela concrètement pour l'équipe ?"\n- "Sur une échelle de 1 à 10, quelle est l'importance ?"\n- "Depuis combien de temps ? Qu'avez-vous essayé ?"\n\n## Étape 5 : Conclusion\n"Laissez-moi voir si j'ai bien compris..." (Résumez)\n- Produit adéquat : "Je pense pouvoir vous aider. Pouvons-nous planifier un temps ?"\n- Non adéquat : "Ce n'est pas une priorité. Je vous envoie un email de suivi."`,
      position: 6,
    },
    {
      title: "Le guide du pitch parfait",
      slug: "pitch-parfait",
      category: "techniques",
      content: `# Le Guide du Pitch Parfait\n\n## Mindset\nLes êtres humains ont tous un sujet préféré : eux-mêmes. Plus votre discours parle de vous, plus ils se désintéresseront.\n\n## Des caractéristiques aux problèmes\nNos cerveaux sont câblés pour être deux fois plus réactifs à s'éloigner de la douleur qu'à se diriger vers le plaisir. Commencez par les problèmes.\n\n## Définir les problèmes\n- Trop vague : "Je suis invité par des startups pour résoudre des problèmes liés aux ventes."\n- Spécifique : "Je suis invité par des fondateurs de SaaS pour résoudre des problèmes concernant la création d'une fonction de vente sortante."\n- Très spécifique : "Je suis invité par des fondateurs de SaaS B2B en phase pré-série A qui n'ont aucune idée de comment construire une fonction de vente sortante."\n\nN'utilisez jamais plus de 3 problèmes. Trop large = pas crédible.\n\n## Langue\nPlus vous utilisez le langage exact de vos prospects, plus vous serez efficace.\n\n## Impact & Conséquences\n- Fondateur pré-série A : manque d'opportunités → investisseurs perdent confiance → faillite possible\n- Fondateur post-série A : manque d'opportunités → concentration excessive sur les ventes → croissance ralentie\n\n## La formule\nNos clients sont [adjectif] [ICP] qui rencontrent des obstacles pour atteindre [résultat] :\n- [Problème 1]\n- [Problème 2]\n- [Problème 3]\n\nCe qui conduit à [Conséquences].`,
      position: 7,
    },
    {
      title: "20 principes psychologiques de vente",
      slug: "psychologie-vente",
      category: "psychologie",
      content: `# 20 principes psychologiques pour améliorer les conversations de vente\n\n## Les 6 piliers de Cialdini\n\n1. **Réciprocité** : Offrez quelque chose de valeur gratuitement, sans rien attendre en retour.\n2. **Engagement/Consistance** : Obtenez des micro-engagements à chaque étape.\n3. **Preuve sociale** : Partagez des témoignages de clients similaires.\n4. **Autorité** : Affichez vos qualifications et utilisez les recommandations d'experts.\n5. **Sympathie** : Liez-vous d'amitié avec le prospect de manière sincère.\n6. **Rareté** : Concentrez-vous sur un aspect unique ou sensible au temps.\n\n## Aversion à la perte\nVous êtes 2x plus influencé par les pertes que par les gains. Mettez l'accent sur les douleurs avant les résultats.\n\n## Techniques de rapport\n- **Miroir** : Répétez 1-3 mots clés pour inciter le prospect à continuer.\n- **Étiquetage** : "Il semble que vous pensiez que cela serait trop difficile."\n- **Cadre négatif** : Au lieu de "Cherchez-vous X ?", dites "Ce n'est probablement pas ce que vous cherchez..."\n\n## Astuces\n- **Pied-dans-la-porte** : Petite demande d'abord → grande demande ensuite.\n- **Porte-au-nez** : Grande demande d'abord (refusée) → demande raisonnable acceptée.\n- **Ancrage** : Mentionnez le prix le plus élevé en premier.\n\n## Biais cognitifs\n- **Biais négatif** : Évoquez les positifs d'un concurrent, les prospects verront les négatifs eux-mêmes.\n- **Biais de confirmation** : Ne critiquez jamais les concurrents ; utilisez les points communs.\n- **Réactance** : Accompagnez le prospect plutôt que de le presser.`,
      position: 8,
    },
    {
      title: "33 habitudes pour maîtriser le cold calling",
      slug: "33-habitudes",
      category: "mindset",
      content: `# 33 habitudes pour maîtriser les appels à froid\n\n## Réticence à l'appel\n1. 10 pompes pour faire circuler le sang\n2. Acceptez que les autres aient leurs propres problèmes\n3. Jouez un scénario d'appel seul ou avec un collègue\n4. Commencez par un appel amical (suivi ou rappel)\n5. Écoutez de la musique motivante avant de commencer\n6. Même les meilleurs sont rejetés. C'est le processus.\n\n## Terminer la session\n7. Tenez-vous debout pendant les appels\n8. Notez chaque appel passé\n9. Bloquez du temps dans votre calendrier\n10. Souriez — c'est perceptible au téléphone\n11. Commencez par un objectif réalisable\n12. Gardez un script à portée de main\n13. Maintenez la cohérence — jamais 2 jours sans appels\n\n## Peur du rejet\n14. Riez de vos peurs\n15. Appel difficile ? Composez immédiatement le suivant\n16. Organisez un concours "qui se fait raccrocher le plus"\n17. Comptez les rejets, pas les conversations\n18. Célébrez les petites victoires\n19. Comptez les prospects vraiment impolis — ils sont rares\n\n## Maîtriser l'appel\n20. Ajoutez un petit quelque chose à votre routine chaque jour\n21. Faites une chose inconfortable par appel\n22. Notez les points faibles pour les étudier plus tard\n23. Investissez en vous-même\n24. Pratiquez le jeu de rôle\n25. Choisissez un cadre et tenez-vous-y\n26. Écoutez quelques appels enregistrés chaque jour\n27. Gardez votre ego sous contrôle\n\n## Stress post-appel\n28. Méditation — 5 minutes par jour\n29. Écrivez dans un journal\n30. Promenade de 15 minutes après une session\n31. Exercice physique\n32. Visualisez votre objectif\n33. Le défi : choisissez 1-2 habitudes et appliquez-les pendant une semaine`,
      position: 9,
    },
  ];

  for (const article of wikiArticles) {
    await prisma.wikiArticle.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }

  // Seed lesson content and quizzes
  await seedLessons();

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
