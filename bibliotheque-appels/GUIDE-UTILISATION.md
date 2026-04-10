# Guide d'utilisation — Bibliothèque d'appels ScaleAcademy

## Objectif

Cette bibliothèque regroupe des appels réels issus de ScaleFast et ScaleCall, anonymisés conformément au RGPD, et classifiés pour une utilisation pédagogique dans les modules de formation ScaleAcademy et par l'AI Tutor Bot.

## Structure des dossiers

```
bibliotheque-appels/
├── exemplaires/           # Appels modèles — bonne pratique démontrée
├── erreurs-instructives/  # Appels avec erreurs clairement identifiables
├── objections/            # Appels centrés sur la gestion d'objections
├── sectoriels/            # Appels par secteur (SaaS, Finance, Industrie...)
├── index.json             # Catalogue searchable avec métadonnées complètes
├── GUIDE-UTILISATION.md   # Ce fichier
└── PIPELINE-INTEGRATION.md # Specs techniques d'extraction et anonymisation
```

## Formats des fichiers d'appels

Chaque appel est représenté par un dossier `CALL-XXX/` contenant :

```
CALL-XXX/
├── metadata.json          # Métadonnées et classification
├── transcript.md          # Transcription annotée (si disponible)
├── audio.mp3              # Fichier audio anonymisé (si disponible)
└── analyse-pedagogique.md # Notes du formateur, points clés, questions de réflexion
```

## Critères de classification

### Appels exemplaires (dossier `exemplaires/`)
- Taux de conversion : RDV pris ou deal closé
- Bonne structure (ouverture, découverte, traitement objections, CTA)
- Score qualité formateur ≥ 4/5
- Illustre au moins 2 compétences cibles

### Appels avec erreurs instructives (dossier `erreurs-instructives/`)
- Moment de blocage clairement identifiable
- Erreur typique et récurrente (sur-pitch, mauvaise qualification, mauvaise gestion objection)
- Valeur pédagogique : ce qui aurait dû être fait autrement
- Score qualité formateur ≤ 2/5 sur au moins une dimension

### Appels objections (dossier `objections/`)
- Contient une ou plusieurs des top 10 objections SDR
- Illustre une technique de réponse (bonne ou mauvaise)
- Idéal pour le module de gestion des objections et les simulations Tutor Bot

### Appels sectoriels (dossier `sectoriels/`)
- Représente un secteur cible spécifique (SaaS, Finance, Industrie, Santé, etc.)
- Inclut les objections et dynamiques spécifiques au secteur
- Utilisé pour les modules de scripts par secteur

## Protocole d'anonymisation

Avant toute intégration, chaque appel doit être anonymisé :

| Élément | Traitement |
|---------|-----------|
| Nom du prospect | Remplacé par [PROSPECT] |
| Nom de l'entreprise prospect | Remplacé par [ENTREPRISE-SECTEUR] (ex: [ENTREPRISE-SAAS]) |
| Numéro de téléphone | Remplacé par [TELEPHONE] |
| Adresse email | Remplacé par [EMAIL] |
| Prix spécifiques | Remplacé par [MONTANT] ou fourchette générique |
| Nom du SDR | Option : garder les initiales ou remplacer par [SDR] |

**Validation requise :** Chaque appel anonymisé doit être validé par le DPO avant intégration.

## Utilisation dans les modules de formation

### Pour les formateurs
1. Rechercher dans `index.json` les appels correspondant aux compétences du module
2. Charger le dossier `CALL-XXX/` correspondant
3. Utiliser `analyse-pedagogique.md` comme guide de débrief
4. Questions de réflexion suggérées dans le fichier d'analyse

### Pour l'AI Tutor Bot
- Les transcriptions alimentent la base de connaissances du bot
- Les objections extraites définissent les scénarios de simulation
- Les appels exemplaires définissent le "gold standard" de scoring
- Voir `PIPELINE-INTEGRATION.md` pour les specs techniques d'intégration bot

## Maintenance

- **Enrichissement mensuel** : objectif 10 nouveaux appels/mois une fois le pipeline opérationnel
- **Révision qualité** : review formateur sur chaque nouveau batch
- **Mise à jour index.json** : obligatoire après chaque ajout
- **Archivage** : les appels de plus de 2 ans sont archivés (hors cycle de formation)
