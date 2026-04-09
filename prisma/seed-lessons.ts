import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Lesson content for "Les fondamentaux du SDR" module
 */
const fundamentalsLessons = [
  {
    title: "Qu'est-ce qu'un SDR ?",
    type: "ARTICLE" as const,
    position: 0,
    duration: 10,
    content: `# Qu'est-ce qu'un SDR ?

Le **Sales Development Representative** (SDR) est le premier maillon de la chaîne commerciale B2B.

## Rôle principal
Le SDR ne vend pas. Il **qualifie** et **génère des rendez-vous** pour les Account Executives (AE). Son travail consiste à :

1. **Identifier** les prospects qui correspondent au profil client idéal (ICP)
2. **Contacter** ces prospects par téléphone, email et LinkedIn
3. **Qualifier** l'opportunité selon les critères BANT
4. **Fixer un RDV** qualifié pour l'AE

## Les KPIs d'un SDR
| Métrique | Objectif quotidien |
|----------|-------------------|
| Appels passés | 60-120 |
| Emails envoyés | 30-50 |
| Connexions LinkedIn | 20-30 |
| RDV fixés | 1-2/jour |

## Le mindset gagnant
- La **constance** bat le talent : 80 appels/jour, chaque jour
- Le **rejet** fait partie du jeu : même les meilleurs ont un taux de connexion de 15-25%
- La **curiosité** est votre meilleur outil : posez des questions, écoutez plus que vous ne parlez
- L'**apprentissage continu** : écoutez vos appels, analysez vos stats, demandez du feedback`,
  },
  {
    title: "Le parcours type d'un SDR",
    type: "ARTICLE" as const,
    position: 1,
    duration: 8,
    content: `# Le parcours type d'un SDR

## Les 3 phases de progression

### Phase 1 : Junior (0-3 mois)
- Apprentissage du produit et du marché
- Maîtrise du script de base
- Objectif : 60 appels/jour, taux de connexion > 15%
- Focus : volume et régularité

### Phase 2 : Confirmé (3-12 mois)
- Personnalisation des approches
- Gestion autonome des objections
- Objectif : 80 appels/jour, conversion > 12%
- Focus : qualité et conversion

### Phase 3 : Senior (12+ mois)
- Mentorat des juniors
- Stratégies multi-canal avancées
- Objectif : 100 appels/jour, conversion > 15%
- Focus : efficience et leadership

## Évolution de carrière
SDR → Senior SDR → Team Lead → Account Executive → Sales Manager`,
  },
  {
    title: "Quiz : Les fondamentaux",
    type: "QUIZ" as const,
    position: 2,
    duration: 5,
    content: null,
    questions: [
      {
        question: "Quel est le rôle principal d'un SDR ?",
        options: ["Vendre le produit", "Qualifier et générer des RDV", "Gérer les comptes clients", "Faire du support technique"],
        correctIndex: 1,
        explanation: "Le SDR ne vend pas directement. Son rôle est de qualifier les prospects et de fixer des rendez-vous qualifiés pour les Account Executives.",
        position: 0,
      },
      {
        question: "Que signifie BANT ?",
        options: ["Business, Authority, Need, Timeline", "Budget, Authority, Need, Timeline", "Budget, Account, Need, Technology", "Business, Analysis, Negotiation, Timeline"],
        correctIndex: 1,
        explanation: "BANT = Budget, Authority (décideur), Need (besoin réel), Timeline (calendrier de décision). C'est le framework de qualification le plus utilisé.",
        position: 1,
      },
      {
        question: "Combien d'appels par jour un SDR confirmé doit-il viser ?",
        options: ["30-40", "50-60", "80-100", "150-200"],
        correctIndex: 2,
        explanation: "Un SDR confirmé vise 80-100 appels/jour. La constance dans le volume est clé pour générer suffisamment de conversations.",
        position: 2,
      },
      {
        question: "Quel est le taux de connexion cible pour un SDR ?",
        options: ["5-10%", "15-25%", "40-50%", "60-70%"],
        correctIndex: 1,
        explanation: "Un taux de connexion de 15-25% est considéré comme bon en cold calling B2B. Cela signifie que sur 100 appels, 15 à 25 décrochent et parlent.",
        position: 3,
      },
    ],
  },
];

/**
 * Lesson content for "L'art du cold call" module
 */
const coldCallLessons = [
  {
    title: "Structure d'un appel réussi",
    type: "ARTICLE" as const,
    position: 0,
    duration: 15,
    content: `# Structure d'un appel réussi — Le framework OPQA

## Les 5 étapes

### 1. Ouverture (10 secondes)
"Salut [Prénom], je vous appelle car je pense que vous pourriez m'aider avec [sujet]. Ai-je 30 secondes ?"

**Règles d'or :**
- Commencez par le prénom (crée de la proximité)
- Donnez une raison d'appel claire
- Demandez la permission (réduit la résistance)

### 2. Présentation (20 secondes)
"Nous travaillons avec [type de clients] qui rencontrent ces problèmes :
- [Problème 1]
- [Problème 2]
- [Problème 3]

L'un d'eux vous affecte-t-il ?"

### 3. Qualification (2-3 minutes)
Utilisez le framework BANT :
- **Budget** : "Avez-vous un budget prévu pour ce type de solution ?"
- **Authority** : "Qui d'autre est impliqué dans cette décision ?"
- **Need** : "Comment ce problème impacte-t-il concrètement votre équipe ?"
- **Timeline** : "Quand souhaitez-vous avoir résolu ce problème ?"

### 4. Approfondissement
- "Sur une échelle de 1 à 10, quelle est l'importance ?"
- "Depuis combien de temps ?"
- "Qu'avez-vous essayé ?"

### 5. Conclusion
- Si qualifié : "Je pense pouvoir vous aider. Pouvons-nous planifier 30 minutes ?"
- Si non qualifié : "Ce n'est pas une priorité. Je vous envoie un email de suivi."`,
  },
  {
    title: "La tonalité et l'énergie",
    type: "ARTICLE" as const,
    position: 1,
    duration: 10,
    content: `# La tonalité et l'énergie en cold call

## Les 3 tonalités gagnantes

### 1. Calme et confiant
- Parlez légèrement plus lentement que d'habitude
- Baissez légèrement le ton en fin de phrase (affirmatif, pas interrogatif)
- Projetez la voix depuis le diaphragme, pas la gorge

### 2. Curieux et engagé
- Montez légèrement le ton quand vous posez une question
- Utilisez des pauses de 2-3 secondes après vos questions
- Montrez un intérêt sincère pour les réponses

### 3. Enthousiaste mais mesuré
- L'énergie doit être au service du message, pas l'inverse
- Évitez le ton "vendeur" surexcité
- Souriez en parlant — ça s'entend

## Les erreurs à éviter
| Erreur | Impact |
|--------|--------|
| Parler trop vite | Le prospect décroche mentalement |
| Ton monotone | Ennui, impression de script récité |
| Trop d'enthousiasme | Manque de crédibilité |
| Fin de phrase interrogative | Impression d'incertitude |

## Exercice pratique
Enregistrez-vous pendant un appel. Réécoutez en notant :
1. Votre vitesse de parole
2. Vos tics de langage ("euh", "voilà", "du coup")
3. Le ratio parole SDR vs prospect (cible : 40/60)`,
  },
  {
    title: "Simulation : Premier cold call",
    type: "SIMULATION" as const,
    position: 2,
    duration: 10,
    content: `# Simulation : Votre premier cold call

## Contexte
Vous appelez **Marie Dupont**, Directrice Marketing chez **TechCorp** (SaaS B2B, 50 employés).

## Votre mission
1. Passez le barrage (si secrétaire)
2. Ouvrez l'appel correctement
3. Présentez 2-3 problèmes pertinents
4. Qualifiez avec BANT
5. Obtenez un RDV ou un prochain pas clair

## Profil recommandé
Utilisez le profil **"Le Pressé"** pour commencer — c'est le plus courant en cold call.

## Critères d'évaluation
- Ouverture : /20
- Découverte : /20
- Argumentation : /20
- Gestion objections : /20
- Closing : /20

Rendez-vous sur la page **Simulation** pour lancer l'exercice.`,
  },
  {
    title: "Quiz : L'art du cold call",
    type: "QUIZ" as const,
    position: 3,
    duration: 5,
    content: null,
    questions: [
      {
        question: "Quelle est la durée idéale de l'ouverture d'un cold call ?",
        options: ["5 secondes", "10 secondes", "30 secondes", "1 minute"],
        correctIndex: 1,
        explanation: "L'ouverture doit durer environ 10 secondes. Assez pour vous présenter et donner une raison d'appel, assez court pour ne pas perdre l'attention.",
        position: 0,
      },
      {
        question: "Quel ratio parole SDR/prospect devez-vous viser ?",
        options: ["70/30 (SDR parle plus)", "50/50 (équilibré)", "40/60 (prospect parle plus)", "20/80 (prospect parle beaucoup plus)"],
        correctIndex: 2,
        explanation: "Le ratio idéal est 40/60 : le prospect doit parler plus que vous. Cela signifie que vous posez les bonnes questions et écoutez activement.",
        position: 1,
      },
      {
        question: "Que faire si le prospect dit 'Je n'ai pas le temps' ?",
        options: ["Raccrocher et rappeler plus tard", "Insister en parlant plus vite", "Reconnaître et demander 30 secondes", "Envoyer un email"],
        correctIndex: 2,
        explanation: "Reconnaissez l'objection puis demandez un micro-engagement : 'Je comprends, mon timing est terrible. Serait-ce une idée stupide de vous expliquer en 30 secondes pourquoi je vous appelle ?'",
        position: 2,
      },
      {
        question: "Dans le framework BANT, que représente le 'A' ?",
        options: ["Account (compte)", "Authority (décideur)", "Agreement (accord)", "Availability (disponibilité)"],
        correctIndex: 1,
        explanation: "Le A de BANT signifie Authority — identifier si votre interlocuteur est le décideur ou s'il doit impliquer d'autres personnes.",
        position: 3,
      },
    ],
  },
];

/**
 * Lesson content for "Maîtriser les objections" module
 */
const objectionLessons = [
  {
    title: "Le framework PRDQ",
    type: "ARTICLE" as const,
    position: 0,
    duration: 12,
    content: `# Le framework PRDQ — Gérer toute objection

## 4 étapes pour transformer une objection en opportunité

### 1. Pause (2-3 secondes)
- Mettez-vous en sourdine si nécessaire
- Respirez, ne réagissez pas impulsivement
- Le silence montre que vous réfléchissez, pas que vous récitez un script

### 2. Reconnaître
- "Je pensais que vous diriez ça"
- "Ne pas avoir de budget doit être frustrant"
- "C'est une question très pertinente"
- **Pourquoi ça marche** : répéter l'objection réduit la tension et montre de l'empathie

### 3. Demander la permission
- "Puis-je vous poser une question ?"
- "Je suis curieux, une dernière question ?"
- **Pourquoi ça marche** : donner le contrôle au prospect réduit sa résistance

### 4. Question
- "Quand vous dites [objection], que voulez-vous dire exactement ?"
- "Cela signifie-t-il que [reformulation] ?"
- **Pourquoi ça marche** : creuser l'objection la transforme souvent en opportunité

## Les 6 catégories d'objections
1. **Envoyez-moi un email** (brush-off)
2. **On a déjà un fournisseur** (status quo)
3. **C'est trop cher** (prix)
4. **Rappelle-moi plus tard** (timing)
5. **Pas intéressé** (rejet)
6. **Je dois en discuter** (décision collective)`,
  },
  {
    title: "Les 10 objections les plus courantes",
    type: "ARTICLE" as const,
    position: 1,
    duration: 15,
    content: `# Les 10 objections les plus courantes et comment y répondre

## 1. "Envoyez-moi un email"
**Réponse :** "Bien sûr. Quel est le meilleur email ? Avant ça, serais-tu opposé à ce que je t'explique en 30 secondes de quoi il s'agit pour m'assurer qu'il soit pertinent ?"

## 2. "Nous avons déjà un fournisseur"
**Réponse :** "Je pensais que vous en auriez. Qu'est-ce qui vous rend le plus satisfait chez eux ?"
*L'objectif n'est pas de critiquer le concurrent mais de trouver les gaps.*

## 3. "Nous n'avons pas de budget"
**Réponse :** "Cela doit être frustrant. Je suppose qu'on a ce dont on a besoin, donc ça ne serait pas une priorité de toute façon, n'est-ce pas ?"
*La question inversée pousse le prospect à justifier pourquoi c'est quand même important.*

## 4. "Rappelle-moi dans 6 mois"
**Réponse :** "Y aura-t-il quelque chose de spécifique qui se passera dans 6 mois ?"
*Si la réponse est non, c'est une fausse objection.*

## 5. "Je suis occupé"
**Réponse :** "Mon timing est terrible. Serait-ce une idée stupide de vous expliquer en 30 secondes pourquoi je vous appelle ?"

## 6. "Pas intéressé"
**Réponse :** "Mon approche était-elle si bizarre ? Je suis un parfait inconnu interrompant votre journée."

## 7. "C'est trop cher"
**Réponse :** "Ah bon ? On ne me le dit pas assez souvent. Qu'est-ce que vous comparez exactement ?"

## 8. "Ce n'est pas moi qui décide"
**Réponse :** "Que pensez-vous qu'ils diront quand vous en parlerez ? Et qui est la bonne personne ?"

## 9. "On a essayé, ça n'a pas marché"
**Réponse :** "Qu'entendiez-vous exactement par 'ça n'a pas marché' ?"

## 10. "Je te rappellerai"
**Réponse (avec humour) :** "Ahh, les célèbres dernières paroles. Que signifie-t-il 95 fois sur 100 quand quelqu'un dit ça ?"`,
  },
  {
    title: "Quiz : Gestion des objections",
    type: "QUIZ" as const,
    position: 2,
    duration: 5,
    content: null,
    questions: [
      {
        question: "Quelle est la PREMIÈRE étape du framework PRDQ face à une objection ?",
        options: ["Poser une question", "Faire une pause", "Reformuler l'objection", "Proposer une alternative"],
        correctIndex: 1,
        explanation: "La première étape est la PAUSE (2-3 secondes). Ne réagissez pas impulsivement. Le silence montre que vous réfléchissez.",
        position: 0,
      },
      {
        question: "Un prospect dit 'Envoyez-moi un email'. Quelle est la meilleure réponse ?",
        options: ["D'accord, je vous envoie tout de suite", "Non, je préfère vous expliquer par téléphone", "Bien sûr, mais avant ça puis-je vous expliquer en 30s de quoi il s'agit ?", "Je ne fais pas d'emails, on se voit quand ?"],
        correctIndex: 2,
        explanation: "Acceptez la demande (respect) puis demandez la permission d'expliquer brièvement. Cela transforme le brush-off en conversation.",
        position: 1,
      },
      {
        question: "Pourquoi ne faut-il JAMAIS critiquer un concurrent mentionné par le prospect ?",
        options: ["C'est illégal", "Ça active le biais de confirmation et renforce leur position", "Le prospect pourrait le répéter au concurrent", "Ce n'est pas professionnel"],
        correctIndex: 1,
        explanation: "Le biais de confirmation pousse les gens à défendre ce qu'ils ont déjà choisi. En critiquant, vous renforcez leur attachement au concurrent.",
        position: 2,
      },
      {
        question: "Un prospect dit 'Rappelle-moi dans 6 mois'. Que cherchez-vous à savoir ?",
        options: ["S'il est vraiment occupé", "Si c'est une vraie objection ou un brush-off", "Combien il paie actuellement", "S'il a le bon budget"],
        correctIndex: 1,
        explanation: "Demandez 'Y aura-t-il quelque chose de spécifique dans 6 mois ?' — si la réponse est non, c'est un brush-off et vous pouvez relancer maintenant.",
        position: 3,
      },
    ],
  },
];

/**
 * Create lessons with content and quiz questions for existing modules
 */
async function seedLessons() {
  console.log("Seeding lesson content and quizzes...");

  // Find modules by title
  const fundamentals = await prisma.module.findFirst({ where: { title: "Les fondamentaux du SDR" } });
  const coldCall = await prisma.module.findFirst({ where: { title: "L'art du cold call" } });
  const objections = await prisma.module.findFirst({ where: { title: "Maîtriser les objections" } });

  const moduleLessons = [
    { module: fundamentals, lessons: fundamentalsLessons },
    { module: coldCall, lessons: coldCallLessons },
    { module: objections, lessons: objectionLessons },
  ];

  for (const { module, lessons } of moduleLessons) {
    if (!module) continue;

    // Check if lessons already exist
    const existingCount = await prisma.lesson.count({ where: { moduleId: module.id } });
    if (existingCount > 0) {
      console.log(`  Module "${module.title}" already has lessons, skipping`);
      continue;
    }

    for (const lessonData of lessons) {
      const { questions, ...lessonFields } = lessonData as typeof lessonData & { questions?: Array<{ question: string; options: string[]; correctIndex: number; explanation: string; position: number }> };

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

    console.log(`  Created lessons for "${module.title}"`);
  }
}

export { seedLessons };
