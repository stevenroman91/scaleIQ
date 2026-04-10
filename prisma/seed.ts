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
    {
      title: "Prospection LinkedIn avancée pour SDR",
      slug: "linkedin-avance",
      category: "techniques",
      content: `# Prospection LinkedIn avancée pour SDR\n\nLinkedIn est devenu le canal incontournable de la prospection B2B moderne. Avec plus de 900 millions de membres dont 65 millions de décideurs, c'est le terrain de chasse idéal pour tout SDR ambitieux. Mais la différence entre un SDR moyen et un SDR exceptionnel tient à la maîtrise des techniques avancées de la plateforme.\n\n## 1. Optimiser son profil avant de prospecter\n\nVotre profil est votre vitrine commerciale. Avant d'envoyer un seul message, assurez-vous que :\n\n- **La photo de profil** est professionnelle, souriante et bien cadrée (augmente les acceptations de +40%)\n- **La bannière** reflète votre entreprise et votre proposition de valeur\n- **Le titre** ne dit pas "SDR chez X" mais parle du bénéfice que vous apportez : "J'aide les directeurs commerciaux B2B à générer 3x plus de RDV qualifiés"\n- **Le résumé** commence par une accroche orientée problème client, pas par votre CV\n- **Les recommandations** sont visibles et viennent de clients ou managers crédibles\n\n## 2. Sales Navigator : les filtres qui font la différence\n\nSales Navigator est l'investissement qui rentabilise le plus rapidement. Voici les filtres avancés à maîtriser :\n\n### Filtres de ciblage précis\n- **Changement de poste** (< 90 jours) : un nouveau responsable cherche à prouver sa valeur, il est plus ouvert aux nouvelles solutions\n- **Croissance de l'entreprise** : une entreprise qui recrute massivement a des budgets disponibles\n- **Publications récentes** : les prospects qui publient sont plus actifs et réceptifs au social selling\n- **Connexions de 2ème degré** avec vos meilleurs clients : la preuve sociale est immédiate\n\n### Construire des listes intelligentes\nCréez des listes par segment ICP, pas une liste générique. Une liste "Directeurs Commerciaux SaaS 50-200 salariés Île-de-France" vaut infiniment plus qu'une liste de 10 000 contacts non qualifiés.\n\n## 3. La stratégie de séquence LinkedIn en 5 étapes\n\n**Jour 1 — Vue de profil intentionnelle**\nVisitez le profil du prospect. Beaucoup consultent "qui a vu mon profil". Vous existez maintenant dans leur radar.\n\n**Jour 3 — Interaction sur leur contenu**\nSi le prospect publie, commentez avec une valeur ajoutée réelle (pas un "Super post !"). Une analyse, une question, un point de vue. Cela établit votre expertise.\n\n**Jour 5 — Demande de connexion sans note**\nContre-intuitif, mais les connexions sans note sont acceptées 70% plus souvent selon les données Expandi. La note viendra après.\n\n**Jour 7 — Premier message post-connexion**\n"Bonjour [Prénom], merci pour la connexion. J'ai lu votre post sur [sujet] — votre point sur [élément spécifique] m'a fait penser à un problème que rencontrent beaucoup de [leur fonction] : [problème]. Est-ce quelque chose que vous gérez actuellement ?"\n\n**Jour 14 — Relance avec valeur**\nPartagez un article, une étude de cas, un insight pertinent pour leur secteur. Pas un pitch, de la valeur pure.\n\n## 4. Les messages LinkedIn qui convertissent\n\n### Ce qu'il faut éviter absolument\n- Les messages génériques copiés-collés (les prospects les détectent immédiatement)\n- Les pitches produit dès le premier message\n- Les messages trop longs (plus de 5 lignes = pas lu)\n- Les fautes d'orthographe et les prénoms mal orthographiés\n\n### Le framework AIDA adapté à LinkedIn\n- **A**ttention : une phrase d'accroche personnalisée basée sur leur activité récente\n- **I**ntérêt : un problème spécifique à leur secteur/fonction\n- **D**ésir : une transformation ou un résultat que vous avez obtenu pour des pairs\n- **A**ction : une demande simple et sans friction (question ouverte, pas "bookez un appel de 30 min")\n\n## 5. Mesurer et optimiser\n\n### KPIs LinkedIn à suivre\n| Métrique | Benchmark moyen | Objectif SDR expert |\n|----------|----------------|--------------------|\n| Taux d'acceptation | 25-35% | 45-55% |\n| Taux de réponse message 1 | 8-12% | 20-30% |\n| Taux de conversion vers appel | 3-5% | 8-15% |\n\n### Tests A/B à mener\n- Longueur des messages (court vs moyen)\n- Personnalisation (trigger event vs secteur vs rôle)\n- Heure d'envoi (mardi-jeudi matin performent mieux)\n- Avec ou sans question de clôture\n\n## 6. L'erreur fatale : la sur-automatisation\n\nLes outils d'automatisation (Dux-Soup, Phantombuster, Expandi) peuvent être utiles pour la gestion du volume, mais attention : LinkedIn détecte et sanctionne les comportements non-humains. Un compte banni = perte de tout votre réseau et de votre historique de messages.\n\nRègle d'or : automatisez les tâches répétitives (vues de profil, demandes de connexion), mais personnalisez toujours les messages. La qualité prime sur la quantité en 2024.\n\n## Conclusion\n\nLinkedIn prospecté avec méthode peut générer 40 à 60% de vos RDV qualifiés. L'investissement dans Sales Navigator, combiné à une approche authentique et personnalisée, est le différenciateur des meilleurs SDR du marché. Commencez par optimiser votre profil, construisez des listes précises, et testez vos séquences de manière rigoureuse.`,
      position: 10,
    },
    {
      title: "Scripts par secteur : SaaS et Tech",
      slug: "scripts-saas-tech",
      category: "secteur",
      content: `# Scripts d'appels par secteur : SaaS et Tech\n\nProspecter dans le secteur SaaS et Tech demande une approche spécifique. Vos interlocuteurs sont souvent tech-savvy, ont déjà été approchés des dizaines de fois, et ont des objections très précises liées à l'intégration, la sécurité, et le make-or-buy. Voici les scripts et techniques validés sur ce segment.\n\n## Comprendre l'acheteur SaaS/Tech\n\n### Les personas décisionnaires\n- **CTO / VP Engineering** : focalisé sur l'architecture, les APIs, la sécurité, la scalabilité\n- **VP Sales / Chief Revenue Officer** : obsédé par la pipeline, le win rate, le cycle de vente\n- **Directeur Produit** : pense roadmap, NPS, adoption feature\n- **Fondateur/CEO (startups)** : pense CAC, LTV, time-to-value\n\n### Les objections spécifiques SaaS\n1. "On développe ça en interne" — La plus courante et la plus dangereuse si mal gérée\n2. "Notre stack technique ne s'intègre pas" — Objection technique à déconstruire\n3. "On vient de signer avec [concurrent direct]" — Nécessite une approche différenciante\n4. "Notre CTO préfère les solutions open-source" — Argument coût/contrôle à challenger\n5. "On est en phase de fundraising, pas le bon moment" — Souvent un prétexte\n\n## Script 1 : Approche "Trigger — Financement"\n\n**Contexte** : l'entreprise vient de lever des fonds (source : Crunchbase, LinkedIn, presse)\n\n**Accroche** :\n"Bonjour [Prénom], je suis [Nom] de [Entreprise]. J'ai vu que [Société] vient de boucler sa Série A — félicitations. Les équipes commerciales qui passent cette étape font souvent face au même défi : comment scaler la prospection outbound sans perdre en qualité. C'est un sujet chez vous en ce moment ?"\n\n**Si oui** :\n"Ce qu'on entend souvent c'est que le passage de 3 à 10 SDR crée des problèmes de cohérence dans les pitchs et de suivi des performances. On travaille avec [Référence SaaS similaire] qui a multiplié son taux de conversion d'appel par 2,3 en 6 mois. Ça vous intéresserait d'en parler 20 minutes cette semaine ?"\n\n**Si pas maintenant** :\n"Totalement compréhensible, vous avez 50 sujets en même temps post-levée. Est-ce que je peux vous recontacter dans 6 semaines quand la poussière sera retombée ? Et d'ici là, je vous envoie l'étude de cas [Référence] — 2 minutes à lire, ça vaut le coup."\n\n## Script 2 : Approche "Make or Buy"\n\n**Contexte** : le prospect a mentionné développer en interne\n\n**Réponse à "On développe ça en interne"** :\n"C'est souvent la première réflexion, et ça fait sens — vous avez une super équipe tech. Mais je suis curieux : quand votre CTO a fait l'arbitrage, est-ce qu'il a inclus le coût d'opportunité de l'équipe sur les 12 prochains mois ? Les entreprises avec qui on travaille ont généralement estimé 6-8 mois de dev pour arriver à 60% de nos fonctionnalités. Qu'est-ce qui vous a conduit vers le build plutôt que le buy ?"\n\n**Technique** : la question finale déplace la conversation de l'objection vers leur raisonnement. Vous comprenez le vrai problème.\n\n## Script 3 : Approche CTO — Sécurité et Conformité\n\n**Accroche** :\n"Bonjour [Prénom], [Nom] de [Entreprise]. Je ne vais pas vous faire le pitch classique — vous avez sûrement déjà été sollicité 10 fois ce mois-ci. Ce que je voulais vous demander : est-ce que la conformité RGPD de vos outils de prospection est quelque chose qui est remonté dans vos audits récemment ?"\n\n**Pourquoi ça marche** : on adresse d'emblée la lassitude commerciale, et on pose une question qui touche à un vrai angle mort (conformité données = sujet brûlant post-Schrems II).\n\n## Script 4 : Approche VP Sales — ROI et Pipeline\n\n**Accroche** :\n"Bonjour [Prénom], [Nom] ici. Question directe : quelle est votre conversion appel → RDV qualifié en ce moment chez vos SDR ?"\n\n**Après leur réponse** :\n"[Répétez leur chiffre]. D'accord. Les équipes avec qui on travaille partent généralement de là, et on les amène entre 18 et 25% en 90 jours. La différence vient de [votre différenciateur]. Vous avez 15 minutes jeudi matin pour qu'on regarde si votre situation est similaire ?"\n\n**Pourquoi ça marche** : on commence par leur demander leur métrique clé, ce qui force l'engagement cognitif. Le benchmark crée immédiatement la comparaison.\n\n## Gestion des objections spécifiques SaaS\n\n### "On est satisfait de notre solution actuelle"\n"Tant mieux ! Qu'est-ce que vous aimez le plus dedans ?" → Identifiez ce qu'ils valorisent, puis trouvez l'angle mort que vous couvrez mieux.\n\n### "Notre stack ne s'intègre pas facilement"\n"Quelle est votre stack actuelle ?" → Si vous avez une intégration native, mentionnez-la. Si non : "On a une API ouverte et on a des connecteurs Zapier/Make. Votre équipe tech a déjà évalué des intégrations de ce type ?"\n\n### "On est en période de gel des budgets"\n"Je comprends. Est-ce un gel complet ou est-ce que les projets avec ROI démontré passent quand même en revue ? Parce que [Référence similaire] a réussi à faire passer son projet en Q4 en documentant le ROI sur 90 jours."\n\n## Checklist avant chaque appel SaaS/Tech\n\n- [ ] Stack technique de l'entreprise identifiée (BuiltWith, Sifdata)\n- [ ] Dernière levée de fonds ou événement déclencheur noté\n- [ ] Référence client dans le même secteur prête à citer\n- [ ] Objection "build vs buy" préparée\n- [ ] Métrique clé de leur fonction identifiée (ARR pour CEO, pipeline pour VP Sales, uptime pour CTO)\n\n## Conclusion\n\nLa prospection SaaS/Tech nécessite de parler le langage de la tech. Investissez 10 minutes de recherche par compte pour comprendre leur stack, leur stade de croissance et leurs enjeux spécifiques. Les SDR qui traitent ce segment comme tous les autres laissent 70% de leur potentiel sur la table.`,
      position: 11,
    },
    {
      title: "Scripts par secteur : Finance et Banque",
      slug: "scripts-finance-banque",
      category: "secteur",
      content: `# Scripts d'appels par secteur : Finance et Banque\n\nLe secteur financier est l'un des plus difficiles à prospecter : cycles de vente longs, conformité réglementaire stricte, culture du risque zéro, et interlocuteurs très sollicités. Pourtant, c'est aussi l'un des secteurs avec les plus grands deals et la meilleure LTV. Voici les clés pour y réussir.\n\n## Comprendre l'écosystème Finance/Banque\n\n### Les contraintes spécifiques du secteur\n- **Conformité réglementaire** : RGPD, DORA, DSP2, Bâle III/IV, ACPR, AMF — tout achat doit passer par un prisme réglementaire\n- **Comités de validation** : les achats > 50K€ nécessitent souvent 3 à 6 mois de validation interne\n- **DSI et RSSI très impliqués** : la sécurité des données est non-négociable\n- **Culture du consensus** : pas de décisions unilatérales, il faut convaincre plusieurs parties prenantes\n- **Réputation et discrétion** : vos références doivent être disponibles et votre image irréprochable\n\n### Personas décisionnaires en Finance\n- **DAF / CFO** : vision ROI, réduction de coûts, conformité comptable\n- **DSI / CIO** : architecture, sécurité, intégration avec le core banking\n- **Chief Risk Officer** : gestion des risques opérationnels et réglementaires\n- **Directeur Conformité** : réglementation, audit, reporting\n- **Directeur Commercial Banque Privée / Entreprises** : performance des équipes de vente\n\n## Script 1 : Approche Réglementation — L'angle DORA\n\n**Contexte** : pour les DSI/RSSI de banques et assurances\n\n**Accroche** :\n"Bonjour [Prénom], [Nom] chez [Entreprise]. Je vous contacte car on travaille avec plusieurs DSI de [type d'établissement] sur un sujet qui prend de plus en plus de place : la résilience opérationnelle numérique dans le cadre de DORA. C'est quelque chose qui est déjà en haut de votre agenda ou vous êtes encore en phase d'analyse ?"\n\n**Si en analyse** :\n"Ce qu'on observe c'est que les établissements qui attendent Q4 se retrouvent à court de temps pour les tests de pénétration et la documentation des tiers critiques. On a accompagné [Référence banque] dans ce processus — ils sont passés d'une posture réactive à une posture proactive en 4 mois. Ça vous intéresserait de voir comment ils ont structuré ça ?"\n\n## Script 2 : Approche Efficacité Commerciale — Banque de Détail\n\n**Contexte** : directeur réseau / responsable performance commerciale\n\n**Accroche** :\n"Bonjour [Prénom], [Nom] de [Entreprise]. On travaille avec des directeurs de réseau bancaire sur un problème qu'on entend souvent : les conseillers passent 60 à 70% de leur temps sur des tâches administratives plutôt que sur le conseil client. C'est quelque chose que vous mesurez chez vous ?"\n\n**Développement** :\n"Ce qu'on a observé chez [Référence], c'est qu'en réduisant ce ratio de 20 points, le NPS a augmenté de 15 points et le cross-sell a progressé de 30%. L'enjeu c'est souvent l'outillage mais surtout les processus. Comment ça se passe chez vous sur ce sujet ?"\n\n## Script 3 : Approche Gestion de Patrimoine\n\n**Contexte** : directeur banque privée / wealth management\n\n**Accroche** :\n"Bonjour [Prénom], [Nom] ici. Je vous contacte car on travaille avec des équipes de gestion de patrimoine qui font face à un paradoxe : leurs clients fortunés attendent une expérience digitale premium, mais la relation humaine reste leur critère #1. Comment vous gérez cet équilibre digital/humain chez vous ?"\n\n**Pourquoi ça marche** : la question ouverte sur leur propre vision évite le pitch produit et génère une conversation authentique.\n\n## Gestion des objections spécifiques Finance/Banque\n\n### "Les contraintes réglementaires nous empêchent d'adopter de nouveaux outils facilement"\n"C'est justement pourquoi on travaille avec votre secteur depuis X ans — on est certifiés [ISO 27001 / SOC 2 / eIDAS] et nos contrats incluent les clauses DPA conformes ACPR. Quel est votre processus d'homologation habituellement ? On l'a déjà suivi chez [Référence banque]."\n\n### "Notre processus de validation prend 6 à 9 mois"\n"Je comprends parfaitement. Est-ce qu'on peut anticiper et commencer le dossier technique maintenant pour que quand votre comité se réunit en [date], vous ayez tous les éléments ? Ça évite de repartir à zéro. On peut commencer par un POC sans engagement ?"\n\n### "On a déjà un partenaire en place"\n"Depuis combien de temps ? Et est-ce que le scope du partenaire couvre bien [problème spécifique que vous adressez] ? Parce que ce qu'on voit souvent c'est que les outils existants ont été déployés avant que ce besoin ne devienne critique."\n\n### "Ce n'est pas le bon moment, on est en pleine transformation"\n"Justement, c'est souvent dans ces phases qu'une brique manquante peut soit accélérer soit bloquer la transformation. Qu'est-ce qui pilote votre transformation en ce moment — SI core, organisation, ou parcours client ?"\n\n## Bonnes pratiques secteur Finance\n\n### Le vocabulaire qui crédibilise\n- Parlez de "conformité", "audit", "reporting réglementaire", "risk framework", "SLA"\n- Évitez le jargon startup ("move fast", "disruptif", "scale")\n- Montrez que vous connaissez leurs régulateurs (ACPR, AMF, BCE, EBA)\n\n### La patience est une compétence\nCycle moyen : 6 à 18 mois. Planifiez des touchpoints réguliers à valeur ajoutée (livres blancs, invitations à des conférences sectorielles, insights réglementaires).\n\n### Construire le dossier multi-parties prenantes\nEn Finance, vous devrez convaincre 4 à 7 personnes. Créez un "champion" interne et aidez-le à construire son business case pour présenter en comité.\n\n## Checklist avant un appel Finance/Banque\n\n- [ ] Certifications sécurité/conformité de votre solution identifiées\n- [ ] Actualité réglementaire du secteur connue (DORA, NIS2, IA Act)\n- [ ] Référence client dans le même type d'établissement prête\n- [ ] Processus de procurement typique du secteur compris\n- [ ] Vocabulaire métier et acronymes sectoriels maîtrisés\n\n## Conclusion\n\nLa Finance est un secteur qui récompense la patience, la crédibilité et la connaissance réglementaire. Les SDR qui y réussissent sont ceux qui parlent conformité avant fonctionnalités, et qui construisent des relations de confiance sur le long terme plutôt que de chercher le closing rapide.`,
      position: 12,
    },
    {
      title: "La méthode SPIN Selling",
      slug: "spin-selling",
      category: "techniques",
      content: `# La méthode SPIN Selling\n\nDéveloppée par Neil Rackham suite à l'analyse de 35 000 appels de vente dans 23 pays sur 12 ans, SPIN Selling est la méthode de vente consultative la plus éprouvée scientifiquement. Elle est particulièrement efficace pour les ventes complexes B2B avec des cycles longs et des montants élevés.\n\n## Qu'est-ce que SPIN ?\n\nSPIN est un acronyme pour les 4 types de questions à poser dans un ordre précis :\n\n- **S** — Situation\n- **P** — Problème\n- **I** — Implication\n- **N** — Need-Payoff (besoin de bénéfice)\n\nL'insight clé de Rackham : les vendeurs qui posent le plus de questions **Implication** et **Need-Payoff** closent 3x plus que leurs pairs. Pas les questions Situation (trop passives) ni même Problème (insuffisantes seules).\n\n## Les 4 types de questions en détail\n\n### 1. Questions de Situation (S)\n\n**Objectif** : comprendre le contexte actuel du prospect\n\nCes questions sont nécessaires mais à utiliser avec parcimonie — trop de questions Situation = prospect qui s'ennuie et qui pense "il n'a pas fait sa recherche".\n\n**Exemples** :\n- "Combien de SDR avez-vous actuellement dans votre équipe ?"\n- "Quelle solution CRM utilisez-vous aujourd'hui ?"\n- "Quel est votre cycle de vente moyen ?"\n- "Comment organisez-vous actuellement votre prospection outbound ?"\n\n**À faire** : préparez les questions Situation AVANT l'appel grâce à votre recherche. Ne posez que celles auxquelles vous ne pouvez pas répondre vous-même.\n\n### 2. Questions de Problème (P)\n\n**Objectif** : identifier les difficultés, insatisfactions et problèmes du prospect\n\nCes questions révèlent les douleurs. Mais attention : les prospects ne partagent pas toujours spontanément leurs problèmes avec des inconnus.\n\n**Exemples** :\n- "Quels défis rencontrez-vous dans la montée en compétences de vos nouveaux SDR ?"\n- "Quelle est la partie de votre process de prospection que vous trouvez la plus chronophage ?"\n- "Est-ce que la cohérence des pitchs entre SDR est quelque chose qui vous pose problème ?"\n- "À quelle fréquence perdez-vous des deals faute de suivi au bon moment ?"\n\n**À faire** : listez 5 à 8 problèmes typiques de votre ICP. Transformez chacun en question.\n\n### 3. Questions d'Implication (I) — LE différenciateur\n\n**Objectif** : faire prendre conscience au prospect des conséquences de ses problèmes\n\nC'est ici que les meilleurs vendeurs se distinguent. Ces questions transforment un problème mineur en urgence business. Elles amplifient la douleur de manière authentique — pas manipulatrice.\n\n**Exemples** :\n- "Si vos SDR mettent 4 mois à atteindre leur plein régime, quel est l'impact sur votre pipeline au Q1 ?"\n- "Quand un SDR quitte l'entreprise sans documentation, combien de temps faut-il pour re-former son remplaçant ?"\n- "Si votre taux de conversion appel→RDV reste à 8%, qu'est-ce que ça implique sur vos objectifs annuels ?"\n- "Comment ce problème affecte-t-il votre capacité à tenir vos engagements envers les investisseurs ?"\n\n**Pourquoi ça marche** : le prospect *lui-même* verbalise l'impact. Ce qu'on dit soi-même est 10x plus convaincant que ce qu'on nous dit.\n\n### 4. Questions Need-Payoff / Bénéfice (N)\n\n**Objectif** : faire articuler au prospect la valeur d'une solution\n\nCes questions préparent le terrain pour votre proposition. Le prospect décrit lui-même ce qu'il veut, et vous n'avez plus qu'à montrer que vous le fournissez.\n\n**Exemples** :\n- "Si vous pouviez réduire de moitié le temps de montée en compétences d'un SDR, quel impact ça aurait sur votre recrutement ?"\n- "Si vos SDR avaient accès à des scripts validés par les meilleurs performers, comment ça changerait leur confiance en appel ?"\n- "En quoi serait-ce utile d'avoir une plateforme où chaque appel est analysé automatiquement ?"\n- "Si ce problème était résolu, qu'est-ce que ça vous permettrait de faire que vous ne pouvez pas faire aujourd'hui ?"\n\n## La séquence SPIN en pratique\n\n### Structure d'un appel SPIN (30 minutes)\n\n**0-5 min — Ouverture**\nDéclarez l'intention : "Je voudrais comprendre où vous en êtes sur X avant de vous parler de ce qu'on fait."\n\n**5-12 min — Situation (2-3 questions max)**\nContexte essentiel que vous n'avez pas pu trouver en recherche.\n\n**12-20 min — Problème puis Implication**\nPassez de la surface (problème) à la profondeur (conséquences). C'est le cœur de l'appel.\n\n**20-25 min — Need-Payoff**\n2-3 questions qui font articuler la valeur d'une solution idéale.\n\n**25-30 min — Présentation et prochaine étape**\nSeulement maintenant vous présentez votre solution, alignée sur ce qu'ils viennent de décrire.\n\n## Erreurs courantes en SPIN\n\n1. **Trop de questions Situation** : perd le prospect, ressemble à une interview d'embauche\n2. **Sauter à la solution après le Problème** : sans Implication, le problème n'est pas assez urgent\n3. **Poser les questions dans le désordre** : SPIN est une séquence, pas une boîte à outils\n4. **Forcer les réponses** : les questions doivent sembler naturelles, pas scripter\n5. **Oublier le silence** : après une question d'Implication forte, laissez le prospect réfléchir\n\n## SPIN vs autres méthodes\n\n| Méthode | Meilleure pour | Limite |\n|---------|---------------|--------|\n| SPIN Selling | Ventes complexes, cycle long | Moins efficace en transactionnel |\n| MEDDIC | Qualification enterprise | Moins axé sur la découverte |\n| Challenger Sale | Teachable moments, insights | Demande forte expertise secteur |\n| Solution Selling | Mapping besoin-solution | Peut paraître formulaïque |\n\n## Conclusion\n\nSPIN Selling reste la méthode la mieux documentée pour les ventes B2B complexes. Sa force : elle repose sur la psychologie réelle de l'acheteur, pas sur des techniques de manipulation. Maîtrisez les questions d'Implication et Need-Payoff, et vous transformerez vos conversations de prospection en diagnostics à haute valeur.`,
      position: 13,
    },
    {
      title: "Guide CRM avancé : Salesforce pour SDR",
      slug: "crm-salesforce-avance",
      category: "outils",
      content: `# Guide CRM avancé : Salesforce pour SDR\n\nSalesforce est le CRM le plus utilisé en prospection B2B enterprise. Maîtriser Salesforce n'est pas optionnel pour un SDR performant : c'est le différenciateur entre quelqu'un qui gère son activité et quelqu'un qui la subit. Ce guide couvre les fonctionnalités avancées qui font la différence au quotidien.\n\n## 1. Structure des données Salesforce : les fondamentaux\n\n### Leads vs Contacts vs Accounts\nL'une des confusions les plus courantes chez les SDR juniors :\n\n- **Lead** : prospect non qualifié, pas encore rattaché à un compte. Utilisé pour les nouvelles entrées (scraping, événements, inbound)\n- **Contact** : personne qualifiée rattachée à un **Account**. Un Lead devient Contact lors de la conversion\n- **Account** : l'entreprise cible. Un Account peut avoir plusieurs Contacts\n- **Opportunity** : deal potentiel rattaché à un Account, créé quand le prospect est qualifié pour un RDV\n\n**Règle d'or** : ne convertissez un Lead en Contact que lorsque vous avez confirmé l'adéquation ICP. Sinon votre base Account se pollue.\n\n### Les champs critiques à remplir\nPour chaque Contact/Account, ces champs sont non-négociables :\n- Titre exact et fonction (pas "Manager" mais "Head of Sales EMEA")\n- Taille d'entreprise et secteur\n- Source (LinkedIn, événement, appel entrant...)\n- Statut de prospection (Cold / In Progress / Meeting Set / Disqualified)\n- Date du dernier contact et prochain contact prévu\n\n## 2. Vues et rapports : travailler intelligemment\n\n### Créer ses vues personnalisées\nNe travaillez jamais depuis la vue par défaut. Créez des vues filtrées :\n\n**Vue "Mon pipeline actif"**\n- Filtre : Assigné à moi + Statut = In Progress + Dernière activité < 30 jours\n- Colonnes : Prénom, Nom, Entreprise, Titre, Dernière activité, Prochain rappel\n\n**Vue "À relancer aujourd'hui"**\n- Filtre : Prochain rappel = Aujourd'hui + Assigné à moi\n- Triée par heure de rappel prévue\n\n**Vue "Comptes non contactés depuis 60 jours"**\n- Filtre : Statut ≠ Disqualified + Dernière activité > 60 jours\n- Utilisée pour réactiver les comptes dormants\n\n### Rapports essentiels pour le management\n- **Activité par SDR** : appels, emails, LinkedIn par semaine (identifie les écarts de volume)\n- **Conversion par source** : quel canal génère les RDV qualifiés ? (oriente l'investissement)\n- **Vitesse de traitement des Leads** : combien de temps entre Lead entrant et premier contact ? (< 5 min = meilleur taux de réponse)\n\n## 3. Automatisations et flows : gagner du temps\n\n### Les automatisations incontournables\n\n**Task auto-creation**\nConfigurer Salesforce pour créer automatiquement une tâche de suivi 3 jours après un appel sans réponse. Évite l'oubli de relance.\n\n**Lead Assignment Rules**\nDistribuer automatiquement les Leads entrants selon des critères ICP (taille, secteur, géographie) pour que chaque SDR reçoive ses leads dans son territoire.\n\n**Duplicate Management**\nActivez les règles de déduplication pour éviter que deux SDR contactent le même prospect sans le savoir — catastrophique pour l'image de marque.\n\n### Salesforce + Outreach/Salesloft\nLa plupart des équipes performantes utilisent Salesforce en combinaison avec un outil de séquençage. Le workflow type :\n1. Lead qualifié entrant dans Salesforce\n2. Synchronisation automatique vers Outreach\n3. Enrôlement dans la séquence appropriée\n4. Chaque activité (email ouvert, call, réponse) remonte automatiquement dans Salesforce\n5. Meeting booké → Opportunity créée automatiquement\n\n## 4. Gestion des activités : logs et notes\n\n### La règle des 5 minutes\nToute interaction avec un prospect doit être loggée dans les 5 minutes. Plus tard = oubli = données pourries = rapports inutilisables.\n\n### Comment logger un appel efficacement\n\n**Champs obligatoires** :\n- Type : Appel sortant / Appel entrant / Message vocal\n- Résultat : Réponse / Messagerie / Faux numéro / Rejeté\n- Durée\n- Notes structurées :\n  - **Contexte** : raison de l'appel\n  - **Découverte** : ce que vous avez appris\n  - **Objection(s)** rencontrée(s)\n  - **Prochaine étape** : qui fait quoi et quand\n\n**Exemple de bonne note** :\n"A/O 10min. Directeur commercial, 8 SDR. Pain : onboarding lent (3-4 mois). A mentionné une évaluation en cours de 2 outils. Budget Q3. Prochain appel : vendredi 14h, préparer étude de cas Fintech."\n\n## 5. Salesforce Mobile : prospecter partout\n\nL'application mobile Salesforce est sous-utilisée. Pourtant elle permet de :\n- Logger un appel immédiatement depuis votre téléphone après une conversation\n- Consulter le dossier d'un prospect avant un RDV\n- Créer une tâche de suivi en 30 secondes\n- Accéder à vos rapports d'activité\n\n## 6. Salesforce Einstein : l'IA au service de la prospection\n\nEinstein Lead Scoring analyse automatiquement vos Leads et leur attribue un score de probabilité de conversion basé sur l'historique de vos données. Utilisez-le pour :\n- Prioriser les Leads entrants (traitez les scores > 80 en priorité)\n- Identifier les caractéristiques communes de vos meilleurs convertisseurs\n- Ajuster votre ICP en fonction des données réelles\n\n## Bonnes pratiques et pièges à éviter\n\n| À faire | À éviter |\n|---------|----------|\n| Logger chaque interaction dans les 5 min | Laisser les Leads stagner sans activité > 14 jours |\n| Mettre à jour le statut après chaque contact | Créer des doublons Contact/Lead |\n| Utiliser des vues personnalisées | Travailler depuis la vue "All Leads" par défaut |\n| Documenter les objections avec précision | Mettre "Left voicemail" sans details |\n| Planifier les prochaines étapes dans Salesforce | Gérer les relances dans sa tête ou sur papier |\n\n## Conclusion\n\nSalesforce n'est pas juste un outil de reporting pour votre manager — c'est votre partenaire de performance. Les SDR qui le maîtrisent ont toujours une longueur d'avance : ils ne manquent aucune relance, leurs données sont fiables, et ils peuvent analyser ce qui fonctionne pour s'améliorer continuellement.`,
      position: 14,
    },
    {
      title: "Qualification MEDDIC : closer les deals enterprise",
      slug: "qualification-meddic",
      category: "techniques",
      content: `# Qualification MEDDIC : closer les deals enterprise\n\nMEDDIC est le framework de qualification le plus utilisé dans les ventes B2B enterprise. Développé par Dick Dunkel et Jack Napoli chez PTC dans les années 90, il a permis à l'entreprise de passer de 300M à 1 milliard de dollars de revenus en 4 ans. Aujourd'hui, il est utilisé par Salesforce, Gartner, MongoDB, et des centaines d'éditeurs logiciels.\n\n## Qu'est-ce que MEDDIC ?\n\nMEDDIC qualifie 6 dimensions d'un deal :\n\n- **M** — Metrics (Métriques)\n- **E** — Economic Buyer (Acheteur économique)\n- **D** — Decision Criteria (Critères de décision)\n- **D** — Decision Process (Processus de décision)\n- **I** — Identify Pain (Identifier la douleur)\n- **C** — Champion (Champion interne)\n\nPlus un deal coche ces 6 cases, plus il est qualifié. Un deal non qualifié MEDDIC ne devrait pas entrer en pipeline.\n\n## Les 6 composantes en détail\n\n### M — Metrics : quantifier la valeur\n\n**Question clé** : "Quels sont les indicateurs mesurables que l'amélioration de ce problème impacterait ?"\n\nSans métrique, il n'y a pas de business case, et sans business case, il n'y a pas d'achat en enterprise. Votre objectif est d'attacher un chiffre à la douleur :\n\n- "Combien de temps vos SDR perdent-ils par semaine sur X ?"\n- "Quel est votre taux de conversion actuel et quel est votre objectif ?"\n- "Si vous amélioriez ce point de 20%, quel serait l'impact sur votre ARR ?"\n\n**Exemple concret** : "Vos SDR font 60 appels/jour mais convertissent à 8%. Si on passe à 15%, ça représente X RDV supplémentaires par mois, soit Y en pipeline et Z en revenus projetés."\n\n### E — Economic Buyer : trouver celui qui signe\n\n**Question clé** : "Qui a l'autorité finale et le budget pour cette décision ?"\n\nL'Economic Buyer (EB) est souvent différent de votre interlocuteur principal. C'est lui qui :\n- Contrôle le budget\n- Dit oui ou non en dernier ressort\n- Peut accélérer ou bloquer un deal\n\n**Comment l'identifier** :\n- "Si nous arrivons à un accord, qui doit signer le bon de commande ?"\n- "Quel est le processus pour valider un investissement de cette taille ?"\n- "Y a-t-il quelqu'un au-dessus de vous qui devra approuver cette décision ?"\n\n**Erreur fatale** : travailler uniquement avec un champion sans rencontrer l'EB. Résultat : "Mon directeur a décidé de ne pas aller de l'avant" en fin de cycle.\n\n### D — Decision Criteria : comprendre comment ils choisissent\n\n**Question clé** : "Sur quels critères allez-vous évaluer et choisir votre solution ?"\n\nCes critères sont souvent fonctionnels (features), mais aussi :\n- Financiers (ROI, TCO, modèle de pricing)\n- Techniques (intégration, sécurité, scalabilité)\n- Relationnels (réputation fournisseur, support, références)\n- Temporels (rapidité d'implémentation, time-to-value)\n\n**Votre objectif** : influencer ces critères tôt dans le cycle pour les aligner sur vos points forts.\n\n"Est-ce que la rapidité d'onboarding est un critère important pour vous ? [Oui] Parce que c'est là où on est le plus différencié — nos clients sont autonomes en 2 semaines vs 3 mois en moyenne dans le marché."\n\n### D — Decision Process : cartographier le processus d'achat\n\n**Question clé** : "Comment se déroule votre processus d'évaluation et de décision de bout en bout ?"\n\nComprendre le processus évite les mauvaises surprises :\n- "Quel est le calendrier de votre évaluation ?"\n- "Qui d'autre sera impliqué dans l'évaluation ?"\n- "Y a-t-il un appel d'offres formel ou une liste de fournisseurs présélectionnés ?"\n- "Quel est votre processus juridique et achats pour ce type de contrat ?"\n- "Qu'est-ce qui pourrait faire que ce projet ne se ferait pas dans les délais prévus ?"\n\n### I — Identify Pain : la douleur qui justifie l'urgence\n\n**Question clé** : "Quel est le problème critique qui fait que ce projet est une priorité maintenant ?"\n\nSans douleur = pas d'urgence. Sans urgence = pas de décision. MEDDIC insiste sur la douleur **partagée** entre votre champion et l'Economic Buyer.\n\n**Niveaux de douleur** :\n1. **Douleur implicite** : "ça serait bien d'améliorer X" — insuffisant\n2. **Douleur explicite** : "X nous coûte Y euros par trimestre" — mieux\n3. **Douleur critique** : "Si X n'est pas résolu d'ici Q3, voici l'impact sur nos objectifs annuels" — deal qui avance\n\n### C — Champion : votre allié interne\n\n**Question clé** : "Qui, à l'intérieur de l'entreprise, a intérêt à ce que ce projet réussisse et a assez d'influence pour le pousser ?"\n\nUn bon Champion :\n- A accès à l'Economic Buyer et au Comité de Direction\n- Bénéficie personnellement de la réussite du projet (promotion, reconnaissance, résolution d'un problème qui lui appartient)\n- Vend pour vous quand vous n'êtes pas dans la pièce\n- Vous donne un accès honnête aux informations internes\n\n**Comment développer votre champion** :\n- Donnez-lui les armes pour vendre en interne (slide deck, business case, ROI calculator)\n- Entraînez-le à répondre aux objections de l'EB\n- Informez-le avant chaque meeting important\n- Célébrez ses victoires internes\n\n## MEDDIC en pratique : le scorecard\n\nCréez un scorecard MEDDIC pour chaque deal en pipeline :\n\n| Critère | Non qualifié (0) | Partiellement qualifié (1) | Qualifié (2) |\n|---------|-----------------|--------------------------|-------------|\n| Metrics | Aucune métrique | Métrique identifiée | Business case chiffré validé |\n| Economic Buyer | Non identifié | Identifié, non rencontré | Rencontré et aligné |\n| Decision Criteria | Inconnue | Partiellement connue | Influencée en notre faveur |\n| Decision Process | Inconnu | Partiellement connu | Calendrier et étapes validés |\n| Identify Pain | Intérêt vague | Douleur exprimée | Douleur critique confirmée EB |\n| Champion | Aucun | Contact sympathique | Champion actif et influent |\n\n**Score < 6** : deal non qualifié, sortez du pipe ou retravaillez la qualification\n**Score 6-9** : deal en cours de qualification, actions précises à mener\n**Score 10-12** : deal qualifié, focus sur le closing\n\n## Conclusion\n\nMEDDIC n'est pas une checklist à remplir mécaniquement — c'est un mindset de qualification continue. Les meilleurs SDR et AE revisitent leur scorecard MEDDIC à chaque interaction et n'hésitent pas à disqualifier rapidement les deals qui ne cochent pas les cases. Mieux vaut un pipe petit et fiable qu'un pipe volumineux et inexact.`,
      position: 15,
    },
    {
      title: "Social Selling et Personal Branding pour SDR",
      slug: "social-selling",
      category: "techniques",
      content: `# Social Selling et Personal Branding pour SDR\n\nLe Social Selling n'est pas une mode — c'est une transformation profonde de la façon dont les acheteurs B2B se renseignent et prennent leurs décisions. Selon Gartner, 75% des acheteurs B2B préfèrent un parcours d'achat sans interaction commerciale. Ceux qui préfèrent avoir un commercial dans la boucle veulent quelqu'un qui leur apporte de la valeur, pas quelqu'un qui leur vend. Le Social Selling répond exactement à cette attente.\n\n## Pourquoi le Social Selling est devenu incontournable\n\n### Les chiffres qui parlent\n- Les SDR avec un fort Social Selling Index (SSI) LinkedIn génèrent 45% d'opportunités en plus\n- 78% des représentants qui utilisent le social selling dépassent leurs quotas (vs 38% pour ceux qui ne l'utilisent pas)\n- Un acheteur B2B consulte en moyenne 10 sources avant de prendre une décision d'achat\n- 57% du parcours d'achat est réalisé avant le premier contact commercial\n\n### Le nouveau cycle d'achat\nLes acheteurs arrivent en réunion déjà informés. Ils ont lu vos contenus, regardé vos concurrents, consulté des pairs. Votre rôle évolue : vous n'êtes plus un transmetteur d'information, mais un expert qui aide à interpréter, prioriser et décider.\n\n## Construire son Personal Brand : les fondations\n\n### Définir son positionnement\nAvant de publier quoi que ce soit, répondez à ces 3 questions :\n1. **Pour qui** : quel ICP lisez-vous exclusivement ? (ex : "Directeurs Commerciaux SaaS B2B en France")\n2. **Sur quoi** : dans quel territoire thématique êtes-vous crédible ? (ex : "efficacité commerciale, prospection outbound, coaching SDR")\n3. **Avec quelle POV** : quel point de vue distinctif avez-vous sur votre sujet ? (ex : "L'automatisation tue les relations commerciales si mal utilisée")\n\n### Les 3 piliers du contenu SDR\n\n**Pilier 1 — Expertise métier**\nInsights sur la prospection, les techniques de vente, les tendances du marché. Ce contenu établit votre crédibilité.\n\n*Exemples* :\n- "Ce que j'ai appris après 1 000 appels à froid cette année"\n- "3 signaux d'achat que la plupart des SDR manquent sur LinkedIn"\n- "Pourquoi votre pitch de 30 secondes fait fuir vos prospects"\n\n**Pilier 2 — Succès clients**\nHistoires de transformation, témoignages (avec accord), cas d'usage. Ce contenu prouve la valeur.\n\n*Exemples* :\n- "Comment [Entreprise] a doublé ses RDV qualifiés en 90 jours"\n- "Retour d'expérience : ce qui a vraiment fonctionné dans notre approche secteur Finance"\n\n**Pilier 3 — Behind the scenes**\nVotre quotidien, vos apprentissages, vos échecs. Ce contenu crée la connexion humaine.\n\n*Exemples* :\n- "Je me suis fait raccrocher 23 fois aujourd'hui. Voici ce que j'ai appris."\n- "Mon processus de préparation avant un appel important"\n\n## Le rythme de publication optimal\n\n### Fréquence recommandée\n- **Débutant** : 2 posts par semaine (mardi et jeudi, 8h-9h ou 17h-18h)\n- **Intermédiaire** : 3-4 posts par semaine\n- **Avancé** : 5 posts par semaine + commentaires quotidiens\n\n### Les formats qui performent sur LinkedIn\n\n| Format | Portée | Engagement | Idéal pour |\n|--------|--------|------------|------------|\n| Document PDF/carrousel | Très haute | Élevé | Tutoriels, listes, frameworks |\n| Post texte seul | Haute | Moyen | Opinions, stories, observations |\n| Vidéo native | Très haute | Élevé | Démonstrations, témoignages |\n| Post avec image | Moyenne | Moyen | Visuels de données, citations |\n| Newsletter LinkedIn | Moyenne | Très élevé | Contenu long format |\n\n**À éviter** : les liens externes dans le post (LinkedIn pénalise le reach). Mettez le lien en commentaire.\n\n## Stratégie d'engagement : construire des relations\n\n### La règle du 80/20\n- **80% du temps** : engagez-vous sur le contenu des autres (commentaires, partages)\n- **20% du temps** : publiez votre propre contenu\n\nUn commentaire de qualité sur le post d'un prospect est souvent plus efficace qu'un DM froid.\n\n### L'art du commentaire stratégique\nUn bon commentaire :\n- Ajoute une perspective, un exemple, une nuance\n- Ne fait pas dans la flatterie vide ("Super post !")\n- Peut inclure une question qui invite à la conversation\n- Est visible par toute la communauté du auteur (= exposition gratuite)\n\n**Exemple de mauvais commentaire** : "Totalement d'accord, excellent contenu !"\n\n**Exemple de bon commentaire** : "Le point sur la qualification précoce résonne avec ce qu'on observe : les SDR qui disqualifient rapidement ont un win rate 2x supérieur. Ce qui m'intéresse : comment vous gérez la pression du management pour garder un pipe volumineux même si non qualifié ?"\n\n## Social Selling et prospection : l'intégration\n\n### Le warm calling grâce au social\nAvant un appel froid, :\n1. Interagissez sur 2-3 posts du prospect\n2. Connectez-vous sans note\n3. Envoyez un message de valeur post-connexion\n4. Appelez en mentionnant votre échange LinkedIn : "J'ai vu votre post sur X, j'avais commenté..."\n\nLe cold call devient un warm call. Votre taux de réponse triple.\n\n### Mesurer son Social Selling Index (SSI)\nLinkedIn calcule automatiquement votre SSI sur 100 points (4 piliers x 25) :\n1. **Établir sa marque professionnelle** (profil complet, contenu)\n2. **Trouver les bonnes personnes** (utilisation de Sales Navigator)\n3. **Interagir avec des insights** (partage de contenu de valeur)\n4. **Construire des relations** (élargir et entretenir son réseau)\n\n**Objectif SDR** : SSI > 70. Score moyen sur LinkedIn : 46.\n\n## Conclusion\n\nLe Social Selling n'est pas une alternative au cold calling — c'est un multiplicateur de force. Les SDR qui combinent prospection directe et présence content génèrent 3x plus d'opportunités inbound et transforment leur cold outreach en warm outreach. L'investissement est de 30 à 45 minutes par jour. Le retour se mesure en réputation, en réseau, et en pipeline.`,
      position: 16,
    },
    {
      title: "L'email de cold outreach parfait",
      slug: "cold-email-parfait",
      category: "techniques",
      content: `# L'email de cold outreach parfait\n\nL'email de prospection est mort... si vous l'utilisez mal. La réalité : les taux d'ouverture moyens en prospection B2B tournent autour de 15-25%, avec des taux de réponse de 1-3%. Les meilleurs SDR atteignent 45-60% d'ouverture et 8-15% de réponse. La différence ? La méthode.\n\n## Les fondamentaux : pourquoi la plupart des emails échouent\n\n### Les 5 raisons d'échec les plus courantes\n1. **L'objet générique** : "Améliorer vos ventes" → spam immédiat\n2. **Le pitch trop long** : > 150 mots = taux de réponse divisé par 3\n3. **Le focus sur soi** : "Nous sommes les leaders de..." → personne ne s'en fiche\n4. **Le CTA trop engageant** : "Réservez 45 minutes avec nous" → friction maximale\n5. **L'absence de personnalisation** : le prospect le détecte en 2 secondes\n\n### La psychologie de l'email froid\nVotre email arrive dans une boîte qui reçoit 100 à 200 emails par jour. Le prospect consacre 3 secondes pour décider : lire, archiver ou supprimer. Ces 3 secondes se jouent sur :\n1. L'**expéditeur** (vous connaît-il ?)\n2. L'**objet** (est-ce pertinent pour moi maintenant ?)\n3. **Les 2 premières lignes** (est-ce que ça me parle ?)\n\n## Anatomie de l'email parfait\n\n### 1. L'objet : le juge des 0,5 seconde\n\n**Principes** :\n- 5 à 7 mots maximum\n- Personnalisé ou intriguant\n- Évitez les mots spam : "gratuit", "offre", "promotion", "urgent", "exclusif"\n- Testez des objets en minuscules (plus naturel, moins commercial)\n\n**Exemples par catégorie** :\n\n*Personnalisation directe* :\n- "[Prénom], une question sur [Entreprise]"\n- "Suite à votre levée de fonds"\n- "Votre post sur [sujet] m'a interpellé"\n\n*Curiosité* :\n- "Avez-vous essayé ça ?"\n- "Idée rapide pour [objectif de leur poste]"\n- "Question sur votre process [X]"\n\n*Référence* :\n- "[Nom client similaire] m'a suggéré de vous contacter"\n- "Même défi que [Concurrent ou pair]"\n\n### 2. L'accroche : les 2 premières lignes\n\nC'est ce qui s'affiche dans l'aperçu de la boîte mail avant l'ouverture. Votre arme la plus puissante.\n\n**Formules qui fonctionnent** :\n\n*Trigger event* :\n"J'ai vu que [Entreprise] vient d'ouvrir un bureau à [Ville] / de recruter 5 SDR / de lever X€. Les équipes commerciales dans cette phase font souvent face à [problème spécifique]."\n\n*Observation personnalisée* :\n"J'ai lu votre post LinkedIn sur [sujet] — votre point sur [élément précis] résonne avec ce qu'on observe chez nos clients [type d'entreprise]."\n\n*Référence* :\n"[Nom du référent] chez [Entreprise] m'a suggéré de vous contacter — il pensait que le défi sur [problème] que vous partagez vous parlerait."\n\n### 3. Le corps : value first, pitch second\n\n**Structure optimale (80-120 mots)** :\n\n*Ligne 1-2* : Accroche personnalisée (voir ci-dessus)\n*Ligne 3-4* : Le problème spécifique que vous résolvez + pourquoi maintenant\n*Ligne 5-6* : La preuve (un résultat client similaire, chiffré)\n*Ligne 7* : Le CTA\n\n**Exemple complet** :\n\n---\n*Objet : votre recrutement de SDR*\n\nBonjour Sarah,\n\nJ'ai vu que vous recrutez 3 SDR ce mois-ci chez TechCorp — votre stack commerciale va doubler. Les équipes dans cette phase perdent souvent 3 à 4 mois en montée en compétences avant d'atteindre la productivité cible.\n\nOn travaille avec Finleo et Payfit sur ce sujet. Leurs nouveaux SDR ont atteint 80% de quota dès le 2ème mois grâce à un programme de formation adapté à leur ICP.\n\nAuriez-vous 15 minutes jeudi ou vendredi pour en discuter ?\n\nBonne journée,\n[Nom]\n\n---\n\n### 4. Le CTA : frictionless ou nothing\n\nRègles du CTA :\n- Une seule demande par email\n- Demande la plus simple possible (pas "book a 45-min demo")\n- Proposez des options (réduit l'anxiété de décision)\n\n**Exemples de CTA par niveau de friction** :\n\n| Friction | Exemple |\n|----------|--------|\n| Très faible | "Est-ce un sujet pour vous en ce moment ?" |\n| Faible | "Ça vous intéresserait d'en savoir plus ?" |\n| Moyenne | "Vous avez 15 minutes jeudi ou vendredi ?" |\n| Haute | "Réservez un créneau dans mon calendrier" |\n\nRègle : plus c'est tôt dans la relation, plus le CTA doit être à faible friction.\n\n## Les séquences email : la persistance payante\n\n### Combien de relances ?\nLes données montrent que 80% des réponses arrivent après la 2ème relance. Pourtant, 70% des SDR abandonnent après 1 tentative.\n\n**Séquence recommandée sur 21 jours** :\n- **J0** : Email 1 (accroche personnalisée + CTA léger)\n- **J4** : Email 2 (valeur ajoutée : article, insight, étude de cas pertinente)\n- **J9** : Email 3 (angle différent : témoignage client ou trigger event récent)\n- **J14** : Email 4 (follow-up ultra court : "Pertinent ou pas ?")\n- **J21** : Email 5 (break-up email)\n\n### Le break-up email : l'email le plus performant\n\nContre-intuitif mais prouvé : l'email de "rupture" génère souvent le meilleur taux de réponse.\n\n**Template** :\n"Bonjour [Prénom], je vous ai contacté plusieurs fois sans retour. Je suppose que ce n'est pas une priorité en ce moment — pas de souci. Je ferme votre dossier. Si la situation change, n'hésitez pas. Bonne continuation, [Nom]"\n\nPourquoi ça marche : la peur de perdre quelque chose (FOMO) active une réponse chez ~15% des prospects silencieux.\n\n## Tests A/B : l'amélioration continue\n\n### Ce qu'il faut tester (un élément à la fois)\n- Objet long vs court\n- Personnalisation secteur vs persona\n- CTA question ouverte vs proposition de créneau\n- Envoi mardi matin vs jeudi après-midi\n- Avec vs sans signature HTML\n- Prénom seul vs Bonjour + Prénom\n\n### Outils recommandés\n- **Lemlist** : personnalisation visuelle, A/B testing, warm-up\n- **Outreach** : séquences, analytics, intégration CRM\n- **Instantly** : volume, warm-up de domaine, analytics\n- **Mailreach** : delivrabilité et réputation domaine\n\n## Conclusion\n\nL'email de prospection performant combine art et science : l'art de la personnalisation et du storytelling, la science des données et des tests. Commencez par maîtriser la structure de base, puis itérez sur vos objets, vos accroches et vos CTAs. Un email parfait que personne ne reçoit ne sert à rien — la delivrabilité est votre première priorité.`,
      position: 17,
    },
    {
      title: "Gestion avancée des objections : 10 tactiques",
      slug: "objections-avancees",
      category: "objections",
      content: `# Gestion avancée des objections : 10 tactiques\n\nLes objections ne sont pas des obstacles — ce sont des signaux d'intérêt. Un prospect qui objecte est un prospect qui réfléchit à votre proposition. Un prospect qui dit "pas intéressé" et raccroche vous donne moins d'information qu'un prospect qui dit "c'est trop cher". Ce guide vous donne 10 tactiques avancées pour transformer chaque objection en opportunité.\n\n## Le mindset fondamental\n\nAvant d'apprendre les tactiques, internalisez ce principe : **l'objection est rarement la vraie raison**. "C'est trop cher" peut cacher :\n- Un manque de budget réel\n- Un manque de confiance dans le ROI\n- Une peur du changement\n- Une relation avec un concurrent\n- Un problème avec votre interlocuteur (pas décisionnaire)\n- Un mauvais timing\n\nVotre première mission : découvrir l'objection réelle.\n\n## Tactique 1 : La Pause Armée\n\n**Principe** : 2 à 3 secondes de silence avant de répondre.\n\n**Pourquoi ça marche** : La précipitation à répondre signale la défensive. La pause signale la confiance et donne l'impression que vous considérez sérieusement l'objection.\n\n**Application** : Dès que l'objection est formulée, respirez, faites une pause courte. Ne la remplissez pas avec "Oui mais..." ou "Je comprends que..." — attendez vraiment.\n\n## Tactique 2 : Le Miroir Réflexif\n\n**Principe** : Répétez les 3 derniers mots de l'objection sous forme de question.\n\n**Exemple** :\n- Prospect : "On n'a pas le budget pour ça."\n- Vous : "Pas le budget ?"\n- Prospect : "Oui, on vient d'avoir des coupures de budget au Q3, donc tous les projets >10K sont gelés jusqu'en Q1."\n\n**Pourquoi ça marche** : Le miroir invite le prospect à développer sans que vous posiez une question ouverte (moins menaçant). Vous obtenez plus de contexte sans effort.\n\n## Tactique 3 : L'Acknowledge-Explore-Respond (AER)\n\n**Principe** : Reconnaître → Explorer → Répondre (dans cet ordre)\n\n**Framework** :\n1. **Acknowledge** : "Je comprends ce que vous dites. C'est une préoccupation légitime."\n2. **Explore** : "Pour m'assurer que je comprends bien — qu'est-ce qui vous amène à cette conclusion ?"\n3. **Respond** : Seulement après avoir compris la vraie source de l'objection\n\n**Erreur à éviter** : Répondre à l'objection sans explorer = vous répondez peut-être à la mauvaise objection.\n\n## Tactique 4 : Le Cadrage Négatif Inversé\n\n**Principe** : Anticiper l'objection et la formuler vous-même, avant le prospect.\n\n**Exemple** :\n"Je suppose que comme la plupart des directeurs commerciaux, votre première réaction sera que c'est trop cher. Est-ce que je me trompe ?"\n\nOu en réponse à une objection :\n"C'est trop cher" → "Je ne suis pas surpris que vous disiez ça — c'est ce que me disent 80% de mes prospects au départ. Et c'est généralement parce que la comparaison ne prend pas en compte [X]. Est-ce votre cas ?"\n\n**Pourquoi ça marche** : En nommant l'objection vous-même, vous la neutralisez et montrez que vous l'avez déjà entendue (vous êtes crédible).\n\n## Tactique 5 : La Technique du Boomerang\n\n**Principe** : Transformez l'objection en raison d'agir.\n\n**Exemples** :\n- "C'est trop cher" → "C'est justement parce que votre budget est serré que vous ne pouvez pas vous permettre de continuer avec une solution qui ne délivre pas. Vous perdez [X] chaque mois."\n- "On n'a pas le temps de s'en occuper" → "C'est exactement pourquoi nos clients font appel à nous — pour récupérer du temps. En combien de temps estimez-vous gérer ce problème en interne ?"\n\n## Tactique 6 : L'Isolement de l'Objection\n\n**Principe** : Vérifier que c'est la seule vraie objection avant d'y répondre.\n\n**Script** :\n"Je comprends. À part la question du budget, y a-t-il autre chose qui vous ferait hésiter si on trouvait une solution sur ce point ?"\n\nSi d'autres objections émergent → traitez-les d'abord, le budget en dernier.\nSi non → "Parfait. Alors si on peut résoudre la question du budget, on avance ensemble ?" → micro-engagement avant de négocier.\n\n## Tactique 7 : Le Recadrage Temporel\n\n**Principe** : Déplacer la perception de coût de l'immédiat au long terme.\n\n**Application pour "C'est trop cher"** :\n"Rapporté à l'année, ça représente [X]€ par mois. Sachant que vous perdez actuellement [Y] par mois à cause de [problème], c'est en réalité un gain net de [Z] dès le 3ème mois. Comment vous voyez ça ?"\n\n**Application pour "Pas maintenant"** :\n"Si on attend 6 mois, qu'est-ce qui change ? Est-ce que le problème se résout seul pendant ce temps, ou il continue à vous coûter [X] par mois ?"\n\n## Tactique 8 : La Preuve par le Pair\n\n**Principe** : Utiliser une référence client dans une situation similaire.\n\n**Script** :\n"[Nom] chez [Entreprise similaire] avait exactement la même hésitation. Voici ce qu'il s'est passé quand ils ont décidé d'avancer malgré cette réserve : [résultat chiffré]. Leur situation vous semble comparable ?"\n\n**Condition d'efficacité** : la référence doit être :\n- Dans le même secteur\n- De taille similaire\n- Avec la même objection initiale\n- Avec des résultats quantifiés\n\n## Tactique 9 : La Question Hypothétique\n\n**Principe** : "Si [l'objection était résolue], est-ce que vous avanceriez ?"\n\n**Exemples** :\n- "Si je pouvais vous proposer un étalement du paiement sur 12 mois, est-ce que le budget ne serait plus un frein ?"\n- "Si votre directeur vous donnait le feu vert demain, est-ce que vous seriez prêt à avancer ?"\n- "Si on pouvait garantir un ROI positif en 90 jours, qu'est-ce que ça changerait pour vous ?"\n\n**Utilité** : Cette question révèle si l'objection est réelle ou un prétexte. Si la réponse est "non, il y a aussi...", vous avez d'autres objections à traiter.\n\n## Tactique 10 : Le Let It Go Stratégique\n\n**Principe** : Accepter l'objection et lâcher prise temporairement.\n\n**Quand l'utiliser** : Quand le prospect est fermé et que la pression augmente la résistance.\n\n**Script** :\n"Écoutez, je ne suis pas là pour vous convaincre de quelque chose qui ne vous convient pas. Si [votre solution] n'est pas la bonne pour vous maintenant, c'est ok. Mais j'aurais juste une curiosité : si vous deviez résoudre [problème] autrement, comment vous l'adresseriez ?"\n\n**Pourquoi ça marche** : Vous retirez la pression (le prospect se détend), et la question ouverte finale vous donne de l'information précieuse sur la vraie situation.\n\n## Tableau de référence rapide\n\n| Objection | Tactique prioritaire | Question clé |\n|-----------|---------------------|-------------|\n| "C'est trop cher" | Recadrage temporel + Boomerang | "Par rapport à quoi ?" |\n| "Pas le temps" | Boomerang | "Combien de temps ça vous prend actuellement ?" |\n| "Pas intéressé" | Cadrage négatif + Miroir | "Pas intéressé par..." |\n| "On a déjà un fournisseur" | AER + Preuve par le pair | "Qu'est-ce que vous aimez le plus chez eux ?" |\n| "Rappelle-moi dans 6 mois" | Recadrage temporel + Hypothétique | "Que se passera-t-il dans 6 mois ?" |\n| "Envoie-moi un email" | Cadrage négatif | "Bien sûr. Avant ça, 30 secondes ?" |\n\n## Conclusion\n\nMaîtriser les objections se fait par la pratique délibérée. Enregistrez vos appels, identifiez les objections récurrentes, et testez une nouvelle tactique par semaine. En 3 mois, vous aurez un répertoire de réponses naturelles pour chaque situation. Le secret des meilleurs closers n'est pas qu'ils ne reçoivent pas d'objections — c'est qu'ils les accueillent avec curiosité plutôt qu'avec défensive.`,
      position: 18,
    },
    {
      title: "Reporting et analyse des performances SDR",
      slug: "reporting-performances",
      category: "processus",
      content: `# Reporting et analyse des performances SDR\n\nLe reporting n'est pas un exercice bureaucratique imposé par le management — c'est l'outil le plus puissant d'amélioration continue à disposition d'un SDR. Les équipes qui analysent leurs données améliorent leurs performances 2x plus vite que celles qui travaillent à l'aveugle. Ce guide vous montre comment construire un système de reporting actionnable.\n\n## Les métriques fondamentales du SDR\n\n### La pyramide des métriques\n\nToutes les métriques ne se valent pas. Organisez-les en 3 niveaux :\n\n**Niveau 1 — Métriques d'activité (Input)**\nCe que vous contrôlez directement :\n- Nombre d'appels passés\n- Emails envoyés\n- Messages LinkedIn\n- Connexions LinkedIn demandées\n- Comptes travaillés\n\n**Niveau 2 — Métriques de conversion (Conversion)**\nCe que révèle la qualité de votre exécution :\n- Taux de connexion (appels avec réponse / appels passés)\n- Taux de conversation (conversations significatives / connexions)\n- Taux de RDV (RDV fixés / conversations)\n- Taux d'attrition (RDV tenus / RDV fixés)\n\n**Niveau 3 — Métriques de résultat (Output)**\nCe qui impacte le business :\n- RDV qualifiés par semaine\n- Pipeline généré (valeur)\n- Taux de conversion RDV → Opportunité\n- Taux de conversion Opportunité → Deal (nécessite collaboration AE)\n\n### Benchmarks du marché\n\n| Métrique | Junior (< 1 an) | Intermédiaire | Expert |\n|----------|----------------|---------------|--------|\n| Appels/jour | 30-40 | 50-70 | 70-100 |\n| Taux de connexion | 5-8% | 10-15% | 15-25% |\n| Taux de conversation | 30-40% | 50-60% | 65-75% |\n| Taux de RDV | 8-12% | 15-20% | 20-30% |\n| RDV qualifiés/semaine | 3-5 | 6-8 | 8-12 |\n| Taux de no-show | 25-30% | 15-20% | < 12% |\n\n## Construire son tableau de bord personnel\n\n### Le daily tracker\n\nTous les jours, trackez :\n\n```\nDate : ___________\nAppels passés : ___\nConversations : ___\nRDV fixés : ___\nEmails envoyés : ___\nMessages LinkedIn : ___\nNotes : (objections, insights, éléments à améliorer)\n```\n\nCet outil simple permet d'identifier rapidement si un écart de performance vient du volume (pas assez d'appels) ou de la qualité (assez d'appels mais pas assez de conversions).\n\n### Le weekly review\n\nChaque vendredi, 20 minutes d'analyse :\n\n1. **Volume vs objectif** : Ai-je atteint mes objectifs d'activité ?\n2. **Taux de conversion** : Où est-ce que je perds le plus de prospects dans le funnel ?\n3. **Qualité des RDV** : Mes RDV étaient-ils vraiment qualifiés ?\n4. **Top 3 objections de la semaine** : Quelle réponse dois-je améliorer ?\n5. **1 chose qui a bien fonctionné** : Comment la répliquer ?\n6. **1 chose à améliorer la semaine prochaine** : Quel est mon objectif de progression ?\n\n### Le monthly deep-dive\n\nChaque mois, analysez :\n- **Sources de RDV** : quel canal génère le plus ? Le meilleur ratio ?\n- **Secteurs** : dans quels secteurs avez-vous les meilleurs taux de conversion ?\n- **Personas** : quel titre/fonction répond le mieux ?\n- **Messages** : quel email/script a le meilleur taux de réponse ?\n- **Timing** : quel jour/heure vos appels convertissent le mieux ?\n\n## Analyse des calls : l'amélioration continue\n\n### Pourquoi écouter ses propres appels\n\nL'auto-écoute est l'exercice le plus inconfortable et le plus efficace pour progresser. Les données montrent que les SDR qui écoutent 3 appels par semaine progressent 40% plus vite que leurs pairs.\n\n### Grille d'analyse d'un appel\n\n**Évaluation sur 5 points pour chaque dimension** :\n\n| Dimension | 1-2 | 3 | 4-5 |\n|-----------|-----|---|-----|\n| Accroche | Générique, pas mémorable | Correcte mais prévisible | Personnalisée, crée la curiosité |\n| Tonalité | Monocorde, nerveux | Correcte | Confiant, naturel, adaptatif |\n| Questions | Fermées, leading | Mixte | Ouvertes, explore en profondeur |\n| Gestion objections | Défensif, élude | Traite mais sans conviction | Transforme en conversation |\n| CTA | Vague ou forcé | Présent mais sans conviction | Clair, naturel, prochaine étape évidente |\n\n**Score < 10** : focus sur les fondamentaux\n**Score 10-15** : bon niveau, travaillez les points < 3\n**Score > 15** : niveau expert, partagez vos pratiques avec l'équipe\n\n### Les patterns à identifier\n\nEn écoutant vos appels, cherchez :\n- À quel moment les prospects décident-ils de s'engager ou de se fermer ?\n- Quelles formulations créent de l'énergie vs font baisser l'intérêt ?\n- Combien de temps laissez-vous parler le prospect ? (objectif : 60-70% eux, 30-40% vous)\n- Posez-vous réellement des questions ou faites-vous surtout des déclarations ?\n\n## Outils de reporting recommandés\n\n### Stack minimal efficace\n\n- **CRM (Salesforce/HubSpot)** : données brutes d'activité et conversion\n- **Excel/Google Sheets** : tracker personnel, analyses personnalisées\n- **Gong/Chorus** : analyse automatisée des calls, transcription, coaching IA\n- **Outreach/Salesloft** : analytics email et séquences\n\n### Les rapports Salesforce indispensables\n\n**Rapport d'activité SDR**\n- Appels/emails/LinkedIn par semaine par SDR\n- Comparaison à l'objectif\n- Trend sur 4 semaines\n\n**Rapport de conversion funnel**\n- Taux de conversion à chaque étape\n- Identification des étapes où le funnel "fuit"\n- Comparaison entre SDR (best practices)\n\n**Rapport sources de leads**\n- RDV et pipeline par canal (outbound, inbound, référence, événement)\n- ROI par canal pour orienter les investissements\n\n## Présenter ses performances au management\n\n### La réunion 1-on-1 productive\n\nPréparez pour chaque 1-on-1 :\n1. **Votre dashboard personnel** : activité et conversion vs objectifs\n2. **1-2 appels à écouter ensemble** : choisissez un qui a bien marché ET un où vous avez bloqué\n3. **Vos hypothèses** : "Je pense que mon taux de connexion baisse car [hypothèse]"\n4. **Vos demandes spécifiques** : aide sur une objection précise, accès à une ressource, feedback sur un script\n\n### Ce que les managers regardent en premier\n\n1. **L'activité** : Fait-il le volume ?\n2. **La constance** : Progresse-t-il semaine après semaine ?\n3. **La qualité des RDV** : Le show rate et la qualification sont-ils bons ?\n4. **La progression** : Apprend-il de ses erreurs ?\n\n## Conclusion\n\nLe reporting n'est pas une fin en soi — c'est un miroir qui vous aide à voir ce que vous ne pouvez pas voir dans l'action. Les SDR qui construisent une culture data personnelle prennent de meilleures décisions, améliorent plus vite leurs compétences, et progressent plus rapidement vers des rôles d'AE ou de manager. Commencez par le daily tracker — 5 minutes par jour, et dans 3 mois, vous aurez des données suffisantes pour des insights actionnables.`,
      position: 19,
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
