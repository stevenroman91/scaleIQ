export const understandingPerformanceLessons = [
  {
    title: "Understanding Performance - Partie 1",
    type: "VIDEO" as const,
    position: 0,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1Lcy6MTnmJc4t-SC3u5xtg5WZlyF_kw9M/preview",
  },
  {
    title: "Understanding Performance - Partie 2",
    type: "VIDEO" as const,
    position: 1,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1i0OvlLZzi51J-x7fABfQlFp4EXPVp76J/preview",
  },
  {
    title: "Quiz - Closing, métriques et qualité",
    type: "QUIZ" as const,
    position: 2,
    duration: 8,
    questions: [
      {
        position: 0,
        question: "Qu'est-ce qui est crucial à considérer lors du closing ?",
        options: [
          "Les émotions doivent être élevées",
          "Garder le prospect dans un état proche de la thérapie (réceptif, introspectif)",
          "Insister répétitivement pour obtenir le rendez-vous",
          "Le closing doit être très direct",
        ],
        correctIndex: 0,
        explanation:
          "Le closing repose sur l'émotion, pas sur la logique. Un prospect réceptif et introspectif est prêt à écouter une solution. Insister ou être trop direct crée de la résistance.",
      },
      {
        position: 1,
        question:
          "Lesquelles de ces métriques sont des indicateurs clés d'activité pour les appels outbound ? (Sélectionnez toutes les réponses applicables)",
        options: [
          "Appels passés (Dials)",
          "Connexions (conversations réelles avec un prospect)",
          "% de pitch présenté",
          "Taux d'ouverture des e-mails",
          "Impressions LinkedIn",
        ],
        correctIndex: 0,
        explanation:
          "Les appels passés, les connexions et le % de pitch sont des métriques d'activité outbound que vous contrôlez directement. Le taux d'ouverture des e-mails et les impressions LinkedIn sont des métriques d'autres canaux.",
      },
      {
        position: 2,
        question:
          "Lesquels de ces éléments sont de forts indicateurs de la qualité de la conversation et des résultats ? (Sélectionnez toutes les réponses applicables)",
        options: [
          "% de conversations durant plus de 3 minutes",
          "% de rendez-vous obtenus",
          "% de satisfaction après le rendez-vous",
          "Nombre de messages vocaux laissés",
          "Heure à laquelle l'appel a été passé",
        ],
        correctIndex: 0,
        explanation:
          "La durée des conversations, le taux de rendez-vous et la satisfaction mesurent la qualité et les résultats. Le nombre de messages vocaux et l'heure de l'appel ne sont pas des indicateurs de qualité.",
      },
    ],
  },
  {
    title: "Practice Call 1",
    type: "VIDEO" as const,
    position: 3,
    duration: 8,
    content:
      "https://drive.google.com/file/d/1xffFu8WCTiTzd0ms0lVdMmthFapBgIT6/preview",
  },
];
