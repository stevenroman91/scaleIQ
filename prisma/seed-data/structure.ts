const STRUCTURE_APPEL_SHEET = `# La structure ultime de l'appel à froid

Un guide étape par étape pour réussir l'appel à froid parfait

## Ouverture

### Exemples

**Exemple 1**

"Salut [Nom], je vous appelle car je pense que vous pourriez m'aider avec [sujet]. Ai-je 30 secondes?"

**Exemple 2**

"Hey, excusez-moi, c'est un appel à froid. L'équipe de [société] pense que je pourrais être pertinent pour [sujet]. 30 secondes?"

**Ouverture (étape clé)**

Si oui → Continuer
Si non →
- "Si ce n'est pas pertinent, vous m'enverrez jamais rappeler?"
- "Mon introduction était-elle si désastreuse?"

**Tonalité :** Commencez neutre, ajustez rapidement. Restez calme et confiant.

## Présentation

### Exemple

Nous travaillons avec [type clients] sur ces problèmes:

- × Problème 1
- × Problème 2
- × Problème 3

L'un d'eux vous affecte-t-il?

**Intro (étape clé)**

Si NON → "Comment avez-vous résolu ces problèmes?"
Si OUI → "Lequel est le plus grave? Peut-on parler plus longtemps?"

**Miroitage :** Répétez 1-3 mots clés pour les inciter à développer.

## Qualification

**Problème (étape clé)**

"Comment savez-vous exactement que c'est un problème?"

**Définir le problème :** Obtenez des données concrètes et résultats mesurables

**Exemple (étape clé)**

"Pouvez-vous me donner un exemple concret?"

"Comment savez-vous que c'était un problème?"

**Étiquetage :** Cela semble/paraît... pour diffuser leurs émotions.

## Approfondissement

**Impact (étape clé)**

"Que signifie cela concrètement pour l'équipe?"

- "Sur une échelle de 1 à 10, quelle est l'importance?"
- "Pourquoi pas un chiffre plus bas/haut?"

**Cause Racine (étape clé)**

- "Depuis combien de temps?"
- "Qu'avez-vous essayé?"
- "D'où vient le problème?"

**Questions :** Posez des questions ouvertes pour creuser en profondeur.

## Conclusion

**Résumé (étape clé)**

"Laissez-moi voir si j'ai bien compris..."

"Cela vous dérange si je pose une question difficile?"

**Décision (étape clé)**

**Produit Adéquat :**
"Je pense pouvoir vous aider avec ces problèmes. Pouvons-nous planifier un temps pour en discuter?"

**Non Adéquat / Mauvais Timing :**
"Ce n'est pas une priorité. Je vous envoie un email de suivi. Puis-je poser une dernière question?"

**Résumé :** Récapitulez tout ce que vous avez compris pour valider.`;

export const structureLessons = [
  {
    title: "The Structure - Partie 1",
    type: "VIDEO" as const,
    position: 0,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1nUsLLq2ovx7qISMkOwABYCobXgo5sIpD/preview",
  },
  {
    title: "The Structure - Partie 2",
    type: "VIDEO" as const,
    position: 1,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1ANJ_8tmDkoIB1YYPkfbYb9bzgR_G2QBV/preview",
  },
  {
    title: "Quiz - Structure claire",
    type: "QUIZ" as const,
    position: 2,
    duration: 5,
    questions: [
      {
        position: 0,
        question: "Pourquoi avez-vous besoin d'une structure claire ?",
        options: [
          "Pour le bénéfice du prospect",
          "Des résultats plus prévisibles",
          "Plus facile d'améliorer les parties individuelles",
          "Pour la simplicité",
        ],
        correctIndex: 1,
        explanation:
          "Une structure claire crée un cadre reproductible qui permet de mesurer l'impact de chaque étape. En découpant l'appel en modules, on peut tester et optimiser chaque segment indépendamment.",
      },
    ],
  },
  {
    title: "The Structure - Partie 3",
    type: "VIDEO" as const,
    position: 3,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1jD7BzwiYrCUOJy6xkgnR1WFZBh1d3-IQ/preview",
  },
  {
    title: "Quiz - Composants de la structure",
    type: "QUIZ" as const,
    position: 4,
    duration: 5,
    questions: [
      {
        position: 0,
        question:
          "Lesquels des éléments suivants sont des composants clés d'une structure d'appel idéale ? (Sélectionnez tous ceux qui s'appliquent)",
        options: [
          "Appropriation du problème",
          "Saluer le client avec une démo produit",
          "Exemple du problème",
          "Impact",
          "Partager ses propres accomplissements pour construire son autorité",
        ],
        correctIndex: 0,
        explanation:
          "Une structure d'appel idéale ne parle pas de vous — elle parle du problème du prospect, de son impact, et de la solution. L'appropriation du problème crée la connexion, l'exemple crée la crédibilité, et l'impact crée l'urgence.",
      },
    ],
  },
  {
    title: "The Structure - Partie 4",
    type: "VIDEO" as const,
    position: 5,
    duration: 8,
    content:
      "https://drive.google.com/file/d/16a8hTUK2rq4cgCqQsFJN9eOtSLvnqNAO/preview",
  },
  {
    title: "Quiz - Psychologie et structure",
    type: "QUIZ" as const,
    position: 6,
    duration: 12,
    questions: [
      {
        position: 0,
        question: "Vous devriez rendre le prospect émotionnel.",
        options: ["Vrai", "Faux"],
        correctIndex: 0,
        explanation:
          "Les décisions sont prises émotionnellement, puis justifiées rationnellement. En connectant avec les véritables enjeux du prospect, on active sa motivation à agir.",
      },
      {
        position: 1,
        question: "Vous n'avez pas besoin d'entrer dans les détails des problèmes.",
        options: ["Vrai", "Faux"],
        correctIndex: 1,
        explanation:
          "La profondeur est essentielle pour créer de la crédibilité et de l'impact. Un problème approfondi crée une urgence concrète et montre que vous comprenez le monde du prospect.",
      },
      {
        position: 2,
        question: "Vous devriez conclure aussi vite que possible.",
        options: ["Vrai", "Faux"],
        correctIndex: 1,
        explanation:
          "La précipitation tue la confiance. Le bon moment pour conclure est lorsque le prospect a reconnu le problème, en a vu l'impact, et est émotionnellement prêt à agir.",
      },
      {
        position: 3,
        question: "Le résumé aide le prospect à se sentir compris.",
        options: ["Vrai", "Faux"],
        correctIndex: 0,
        explanation:
          "En résumant ce que le prospect a dit, vous montrez que vous l'écoutez activement. Cela crée un sentiment de reconnaissance et de sécurité.",
      },
      {
        position: 4,
        question: "Quelle est la partie la plus cruciale de la structure ?",
        options: ["Un exemple du problème", "La cause racine", "La conclusion"],
        correctIndex: 1,
        explanation:
          "Identifier la cause racine permet de proposer une solution vraiment pertinente. C'est là que la vente devient consultative — vous n'êtes plus un vendeur, mais un partenaire stratégique.",
      },
      {
        position: 5,
        question: "Il est toujours préférable de conclure quand :",
        options: [
          "J'ai trouvé un problème",
          "Le prospect est émotionnel",
          "Dès que je le peux",
        ],
        correctIndex: 0,
        explanation:
          "La conclusion doit venir après avoir identifié un problème réel et urgent — pas après une présentation générique. Cela aligne la vente sur la résolution de besoins.",
      },
      {
        position: 6,
        question:
          "Les humains sont motivés de façon égale par la perte ou le gain.",
        options: ["Vrai", "Faux"],
        correctIndex: 1,
        explanation:
          "La perte pèse deux fois plus lourd que le gain (théorie des perspectives de Kahneman & Tversky). Mettre en avant un risque non traité est souvent plus motivant qu'un bénéfice futur.",
      },
      {
        position: 7,
        question: "Les humains apprécient d'être écoutés et compris.",
        options: ["Vrai", "Faux"],
        correctIndex: 0,
        explanation:
          "L'écoute active crée de la confiance et de la connexion. Lorsqu'un prospect sent qu'il est compris, il est plus ouvert à écouter et à envisager une solution.",
      },
    ],
  },
  {
    title: "La Structure Ultime de l'Appel à Froid",
    type: "ARTICLE" as const,
    position: 7,
    duration: 10,
    content: STRUCTURE_APPEL_SHEET,
  },
  {
    title: "The Structure - Partie 6",
    type: "VIDEO" as const,
    position: 8,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1LP9irnt6Y0Hflhuv8zD2M0o1pzOOLOg-/preview",
  },
  {
    title: "Quiz - Effets psychologiques",
    type: "QUIZ" as const,
    position: 9,
    duration: 8,
    questions: [
      {
        position: 0,
        question:
          "Lequel des éléments suivants vous aidera le plus à bien structurer votre appel ?",
        options: [
          "Cela rend le problème réel",
          "Cela fait parler le prospect",
          "Cela déclenche des émotions",
        ],
        correctIndex: 0,
        explanation:
          "La structure d'un appel n'est pas un script rigide, mais un cadre pour rendre le problème concret et urgent. Un problème réel rend la conversation inévitable.",
      },
      {
        position: 1,
        question:
          "Quel effet psychologique l'Appropriation du Problème déclenche-t-elle ?",
        options: ["Engagement", "Empathie", "Rareté"],
        correctIndex: 0,
        explanation:
          "Lorsque vous amenez le prospect à reconnaître que le problème est le sien, il s'engage mentalement. Cet engagement crée une incohérence cognitive qui le pousse à agir.",
      },
      {
        position: 2,
        question:
          "Quel effet psychologique est déclenché en donnant un Exemple du Problème ?",
        options: ["Preuve sociale", "Biais de disponibilité", "Autorité"],
        correctIndex: 1,
        explanation:
          "Le biais de disponibilité fait que les gens jugent la probabilité d'un événement en fonction de la facilité avec laquelle ils se souviennent d'exemples similaires. Un exemple concret rend le problème plus réel et plus urgent.",
      },
      {
        position: 3,
        question:
          "Quel effet psychologique est lié à l'Impact et à la Cause Racine ?",
        options: ["Pic émotionnel", "Curiosité", "Biais de récence"],
        correctIndex: 0,
        explanation:
          "L'Impact et la Cause Racine créent un pic émotionnel — un moment de forte intensité qui marque la mémoire et motive l'action. C'est le meilleur moment pour proposer une solution.",
      },
    ],
  },
  {
    title: "The Structure - Partie 7",
    type: "VIDEO" as const,
    position: 10,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1Y8JC8Y1RKyDtUFJwaD2wIt8igZOAd0rN/preview",
  },
  {
    title: "Quiz - Mise en pratique",
    type: "QUIZ" as const,
    position: 11,
    duration: 3,
    questions: [
      {
        position: 0,
        question:
          "Lequel des éléments suivants vous aidera le plus à bien maîtriser la structure ?",
        options: ["Aller à l'exemple", "Jeux de rôle", "Imprimer l'infographie"],
        correctIndex: 0,
        explanation:
          "La mise en pratique concrète est supérieure à la simulation ou à la mémorisation. Un exemple concret force l'application de la structure dans un contexte réel, ce qui renforce la compréhension.",
      },
    ],
  },
];
