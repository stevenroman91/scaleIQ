const OBJECTIONS_SHEET = `# Surmonter les 17 objections les plus difficiles

Guide pratique pour les appels à froid

## Le Cadre méthodologique

### 1. Pause

Faites une pause de 2 à 3 secondes. Mettez-vous en sourdine si nécessaire.

Cela vous donne le temps de réfléchir et de ralentir le rythme.

### 2. Reconnaître

"Je pensais que tu dirais ça."

"Ne pas avoir de budget doit être frustrant."

Répéter l'objection réduit la tension.

### 3. Demandez la permission

"Puis-je vous poser une question ?"

"Je suis curieux, une dernière question ?"

Cela donne le contrôle à l'acheteur et établit la confiance.

### 4. Posez une question

"Cela signifie-t-il que l'appel était parfait ?"

Pour les objections directes, posez la question immédiatement pour relancer la conversation.

## Les 17 objections et comment y répondir

*Pour plus de concision, les questions de permission ne sont pas incluses dans les réponses ci-dessous. Adaptez ces réponses à votre style et à votre contexte.*

### 1. Envoie-moi un e-mail

**"Veuillez m'envoyer un courriel."**

Bien sûr. Quel est le meilleur courriel pour vous joindre ? Avant que je le fasse, serais-tu opposé à ce que je t'explique de quoi il s'agit pour m'assurer qu'il soit pertinent ?

**Après la présentation**

Absolument. Lequel des problèmes que j'ai mentionnés te semble le plus pertinent ?

### 2. Status quo

**"Nous avons déjà un fournisseur."**

Je pensais que vous en auriez. C'est la première fois que j'entends ça. Qu'est-ce qui vous rend satisfait avec eux ?

**"Ça ressemble à ce qu'on a déjà."**

C'est la première fois que j'entends ça. Quand tu dis que ça ressemble, que veux-tu dire exactement ?

### 3. Tarification

**"Nous n'avons pas de budget."**

Cela doit être frustrant. Je suppose qu'on a ce dont on a besoin, donc ça ne serait pas une priorité de toute façon, n'est-ce pas ?

**"C'est vraiment cher."**

Ah bon ? On ne me le dit pas assez souvent. Est-ce que ça dérange si je pose une question ?

### 4. Timing

**"Rappelle-moi dans six mois."**

Y aura-t-il quelque chose de spécifique qui se passera dans six mois ?

**"Je te rappellerai."**

Ahh, les célèbres dernières paroles. (Pause) Que signifie-t-il 95 fois sur 100 quand quelqu'un dit cela lors d'un appel de vente ?

**"Je suis occupé."**

Mon timing est terrible. Serait-ce une idée stupide de t'expliquer brièvement pourquoi je t'appelle maintenant ?

### 5. Pas intéressé

**Immédiatement**

Mon approche était-elle si bizarre ? Je ne suis pas surpris, je suis un parfait inconnu interrompant ta journée.

**Après le pitch**

Je comprends. Est-ce que vous résolvez actuellement aucun de ces problèmes ? Ça me dérange si je vous demande comment vous faites ?

### 6. Décision collective

**"Je dois en discuter avec quelqu'un."**

Ça a du sens, je pensais que ça serait le cas. Que penses-tu qu'ils diront quand tu en parleras avec eux ?

**"Nous avons essayé mais ça n'a pas marché."**

Je n'entends pas ça souvent. Quand vous dites que ça n'a pas fonctionné, qu'entendiez-vous exactement par là ?

## Principes essentiels

### Conversation

Ayez des conversations naturelles, pas des interrogatoires mécaniques.

### Personnalité

Ajoutez votre propre touche et authenticité à chaque interaction.

### Pratique

Pratiquez régulièrement pour maîtriser ces techniques et les rendre naturelles.

## Tonalité recommandée

À éviter:
- Sarcasme
- Aigu
- Agacé

À utiliser:
- Calme
- Curieux
- Posé

---

Chaque technique vise à vous remettre dans la conversation. C'est à vous de les adapter et de les faire fonctionner selon votre contexte. La clé du succès réside dans la pratique constante et l'authenticité.`;

export const objectionLessons = [
  {
    title: "Objection - Partie 1",
    type: "VIDEO" as const,
    position: 0,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1_zaDL0sKp7rfqvf7BMBxQTMWsiSDUeFB/preview",
  },
  {
    title: "Objection - Partie 2",
    type: "VIDEO" as const,
    position: 1,
    duration: 8,
    content:
      "https://drive.google.com/file/d/17Pf5lIO3_vYGtoSwbUuud3uCllPuSo43/preview",
  },
  {
    title: "Quiz - Psychologie de la persuasion",
    type: "QUIZ" as const,
    position: 2,
    duration: 8,
    questions: [
      {
        position: 0,
        question: "En cas de doute, sur quoi devriez-vous vous concentrer ?",
        options: ["Ma solution", "Vendre plus", "Poser des questions", "Problèmes"],
        correctIndex: 3,
        explanation:
          "Quand vous êtes en doute, retournez au problème du prospect. Le problème est le seul point d'ancrage solide — c'est ce qui crée de la pertinence, de l'urgence et de la crédibilité.",
      },
      {
        position: 1,
        question: "Les gens prennent leurs décisions de manière rationnelle.",
        options: ["Vrai", "Faux"],
        correctIndex: 1,
        explanation:
          "Les décisions sont prises émotionnellement, puis justifiées rationnellement. Le cerveau utilise des raccourcis cognitifs basés sur la peur, le désir ou la reconnaissance sociale.",
      },
      {
        position: 2,
        question: "Les humains prennent leurs décisions de manière émotionnelle.",
        options: ["Vrai", "Faux"],
        correctIndex: 0,
        explanation:
          "La prise de décision est d'abord émotionnelle, puis rationalisée. Un appel qui touche les émotions a bien plus de chances de réussir qu'un appel purement factuel.",
      },
      {
        position: 3,
        question: "Les gens ne peuvent se persuader que eux-mêmes.",
        options: ["Vrai", "Faux"],
        correctIndex: 0,
        explanation:
          "Personne ne peut forcer quelqu'un à croire ou à agir — la conviction vient de l'intérieur. Le rôle du vendeur est de créer un environnement où le prospect arrive à sa propre conclusion.",
      },
      {
        position: 4,
        question: "Nous devrions essayer de persuader les prospects.",
        options: ["Vrai", "Faux"],
        correctIndex: 1,
        explanation:
          "Persuader implique une force externe. En réalité, le vendeur doit faciliter la prise de décision du prospect par l'écoute active et les questions ouvertes — pas par la pression.",
      },
    ],
  },
  {
    title: "Objection - Partie 3",
    type: "VIDEO" as const,
    position: 3,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1rjiGG0w2hjkSDV5FeFL6ulm3QKg6lzn9/preview",
  },
  {
    title: "Quiz - Objections et brush-offs",
    type: "QUIZ" as const,
    position: 4,
    duration: 8,
    questions: [
      {
        position: 0,
        question: "Si les prospects ne sont pas intéressés du tout, ils vont :",
        options: ["S'énerver", "Raccrocher", "Vous donner une objection"],
        correctIndex: 1,
        explanation:
          "Un prospect vraiment non intéressé n'a aucune raison de rester en ligne — il raccroche immédiatement. S'il vous donne une objection, c'est qu'il est encore en train d'écouter.",
      },
      {
        position: 1,
        question: "« Je ne suis pas intéressé » est une objection réelle.",
        options: ["Vrai", "Faux"],
        correctIndex: 1,
        explanation:
          "C'est presque toujours un brush-off — une formule de politesse pour mettre fin à l'appel. Elle ne reflète pas nécessairement un manque d'intérêt réel.",
      },
      {
        position: 2,
        question: "Les brush-offs sont comme des réflexes automatiques.",
        options: ["Vrai", "Faux"],
        correctIndex: 0,
        explanation:
          "Les brush-offs (« Je n'ai pas le temps », « Appelez plus tard ») sont des réponses automatiques, instinctives — elles ne reflètent pas une décision réfléchie. Le rôle du vendeur est de déclencher une réaction consciente.",
      },
      {
        position: 3,
        question: "« J'ai déjà un fournisseur » est une objection réelle.",
        options: ["Vrai", "Faux"],
        correctIndex: 0,
        explanation:
          "Contrairement à « je ne suis pas intéressé », cette phrase indique que le prospect a déjà une solution en place. C'est une objection réelle qui nécessite d'identifier les limites de la solution actuelle.",
      },
      {
        position: 4,
        question: "Les grands vendeurs ne rencontrent jamais d'objections.",
        options: ["Vrai", "Faux"],
        correctIndex: 1,
        explanation:
          "Les meilleurs vendeurs rencontrent autant, voire plus d'objections — parce qu'ils appellent plus et osent aborder des sujets sensibles. La différence : ils savent les transformer en opportunités.",
      },
    ],
  },
  {
    title: "Objection - Partie 4",
    type: "VIDEO" as const,
    position: 5,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1306N2u20Q7BYNQjX1txIP1Rtc2jd5k4l/preview",
  },
  {
    title: "Quiz - Réagir aux objections",
    type: "QUIZ" as const,
    position: 6,
    duration: 5,
    questions: [
      {
        position: 0,
        question:
          "Quelle est la première chose que vous devriez faire en entendant une objection ?",
        options: ["Discuter", "L'accepter", "Vendre"],
        correctIndex: 1,
        explanation:
          "En acceptant l'objection (« Je comprends votre point de vue »), vous montrez du respect et créez un espace de confiance. Contester crée de la défense, vendre ignore le problème.",
      },
      {
        position: 1,
        question:
          "Quel est l'ordre correct d'une structure de conversation commerciale puissante ?",
        options: [
          "Demander la permission → Accepter → Mettre au défi",
          "Accepter → Demander la permission → Mettre au défi",
          "Mettre au défi → Accepter → Demander la permission",
        ],
        correctIndex: 1,
        explanation:
          "D'abord accepter l'objection (créer la confiance), puis demander la permission de continuer (respecter l'autonomie), puis mettre au défi le statu quo (inviter à réfléchir).",
      },
    ],
  },
  {
    title: "Surmonter les 17 objections les plus difficiles",
    type: "ARTICLE" as const,
    position: 7,
    duration: 10,
    content: OBJECTIONS_SHEET,
  },
  {
    title: "Quiz - Répondre aux objections courantes",
    type: "QUIZ" as const,
    position: 8,
    duration: 5,
    questions: [
      {
        position: 0,
        question:
          "Comment devriez-vous répondre à « Je ne prends pas d'appels non sollicités » ?",
        options: [
          "D'accord, je vous enverrai un email à la place.",
          "Vous ne prenez aucun appel non sollicité, ou seulement les mauvais ?",
          "C'est pourquoi j'appelle — je ne suis pas un vendeur typique.",
        ],
        correctIndex: 1,
        explanation:
          "Au lieu de contester ou de fuir, on invite le prospect à préciser sa position — ce qui crée un moment de dialogue et ouvre la porte à une discussion.",
      },
      {
        position: 1,
        question:
          "Comment devriez-vous répondre à « J'ai déjà un fournisseur » ?",
        options: [
          "Super, alors vous n'en aurez pas besoin du tout.",
          "Est-ce que cela signifie que vous n'engagez jamais de nouveaux fournisseurs ?",
          "J'adorerais quand même vous parler de nos fonctionnalités.",
        ],
        correctIndex: 1,
        explanation:
          "Cette question met doucement au défi le statu quo. Elle reconnaît la situation mais invite à réfléchir sur la rigidité de la décision — même les clients fidèles peuvent changer.",
      },
      {
        position: 2,
        question:
          "Comment devriez-vous répondre à « Je suis bien installé » ?",
        options: [
          "Parfait, je reviendrai dans six mois.",
          "Est-ce que cela signifie que vous ne pensez pas que cela pourrait être fait mieux ?",
          "Laissez-moi juste vous expliquer ce que nous proposons.",
        ],
        correctIndex: 1,
        explanation:
          "Même si le prospect dit qu'il est « bien installé », la question invite à réfléchir sur la possibilité d'optimisation — il y a toujours de la place pour une amélioration.",
      },
    ],
  },
  {
    title: "Objection - Partie 5",
    type: "VIDEO" as const,
    position: 9,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1h6eZ_sTEYyxMQ1ehyiQqzN2zx5ytR90_/preview",
  },
  {
    title: "Practice Call 1",
    type: "VIDEO" as const,
    position: 10,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1z94VMGiasE5I7z3Rw-_U7Z_4MkrS0gCM/preview",
  },
  {
    title: "Practice Call 2",
    type: "VIDEO" as const,
    position: 11,
    duration: 8,
    content:
      "https://drive.google.com/file/d/11khX8qK67ddzX_0jii-1JEbXrazD8idc/preview",
  },
];
