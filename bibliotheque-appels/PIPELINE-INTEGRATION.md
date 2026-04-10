# Pipeline d'intégration — ScaleCall / ScaleFast → ScaleAcademy

## Statut : En attente de credentials et validation RGPD

Ce document décrit les spécifications techniques du pipeline d'extraction et d'intégration des données d'appels réels.

## Prérequis bloquants

| Prérequis | Statut | Propriétaire |
|-----------|--------|-------------|
| Credentials API ScaleCall | **À obtenir** | Équipe technique |
| Credentials API ScaleFast | **À obtenir** | Équipe technique |
| Validation RGPD / DPO | **À obtenir** | Service juridique |
| Accès bucket S3 (stockage intermédiaire) | À configurer | Équipe technique |

## Architecture du pipeline

```
┌─────────────────┐    ┌─────────────────┐
│   ScaleCall     │    │   ScaleFast     │
│   (Telephonie)  │    │   (CRM)         │
└────────┬────────┘    └────────┬────────┘
         │                      │
         ▼                      ▼
┌────────────────────────────────────────┐
│         Extraction API (Phase 2)        │
│  - Filtrage selon critères selection   │
│  - Export audio + transcriptions       │
│  - Export métadonnées CRM associées    │
└────────────────────┬───────────────────┘
                     │
                     ▼
┌────────────────────────────────────────┐
│      Anonymisation RGPD (Phase 2)      │
│  - Remplacement PII (noms, tél, email) │
│  - Validation DPO avant traitement     │
│  - Log d'audit anonymisation           │
└────────────────────┬───────────────────┘
                     │
                     ▼
┌────────────────────────────────────────┐
│     Classification & Tagging (Phase 3) │
│  - Scoring qualité automatique (IA)    │
│  - Tagging objections                  │
│  - Association module-appel            │
│  - Review formateur                    │
└────────────────────┬───────────────────┘
                     │
                     ▼
┌────────────────────────────────────────┐
│   Bibliothèque ScaleAcademy (Phase 4)  │
│  - bibliotheque-appels/ (ce repo)      │
│  - Modules de formation (SCAAAA-2)     │
│  - AI Tutor Bot (SCAAAA-3)             │
└────────────────────────────────────────┘
```

## Spécifications API ScaleCall (à confirmer)

### Endpoints attendus
```
GET /api/calls                     # Liste des appels avec filtres
GET /api/calls/{id}/audio          # Téléchargement audio (MP3/WAV)
GET /api/calls/{id}/transcript     # Transcription texte (si disponible)
GET /api/calls/{id}/metadata       # Métadonnées complètes
```

### Filtres de sélection (Phase 1 — Audit)
```json
{
  "date_from": "2025-01-01",
  "date_to": "2026-01-01",
  "duration_min": 180,
  "duration_max": 900,
  "outcome": ["rdv_pris", "no_rdv"],
  "has_transcript": true,
  "limit": 500
}
```

## Spécifications API ScaleFast (à confirmer)

### Données CRM à récupérer pour chaque appel
- Secteur et taille de l'entreprise prospect
- Fonction du contact appelé
- Étape pipeline au moment de l'appel
- Résultat final (RDV, deal closé, perdu)
- Tags et notes associés à l'appel

## Script d'extraction (template — à activer une fois credentials disponibles)

```typescript
// scripts/extract-calls.ts
// À exécuter depuis : ts-node scripts/extract-calls.ts

interface CallExtractionConfig {
  scaleCallApiUrl: string;
  scaleCallApiKey: string;
  scaleFastApiUrl: string;
  scaleFastApiKey: string;
  outputDir: string;
  batchSize: number;
}

async function extractCalls(config: CallExtractionConfig) {
  // Phase 1 : Audit des appels disponibles
  console.log("Phase 1 : Audit des données disponibles...");
  
  // 1a. Lister les appels ScaleCall avec les filtres
  // const calls = await scaleCallClient.listCalls({ filters });
  
  // 1b. Enrichir avec données CRM ScaleFast
  // const enrichedCalls = await enrichWithCRM(calls, scaleFastClient);
  
  // 1c. Scorer et filtrer selon critères pédagogiques
  // const selectedCalls = scoringEngine.filter(enrichedCalls);
  
  // Phase 2 : Extraction et anonymisation
  console.log("Phase 2 : Extraction et anonymisation...");
  // À implémenter après validation RGPD
  
  // Phase 3 : Classification et tagging
  console.log("Phase 3 : Classification...");
  // À implémenter après Phase 2
}
```

## Critères de scoring automatique (Phase 3)

L'IA analysera chaque transcription pour scorer automatiquement :

| Dimension | Indicateurs IA | Poids |
|-----------|---------------|-------|
| Structure de l'appel | Présence des 5 étapes (ouverture, découverte, objection, closing, next step) | 25% |
| Ratio parole SDR/Prospect | Objectif : 30-40% SDR / 60-70% Prospect | 20% |
| Questions ouvertes | Nombre et qualité des questions de découverte | 20% |
| Traitement des objections | Détection + réponse structurée | 20% |
| Clarté du CTA | Prochaine étape définie et acceptée | 15% |

## Plan de rollout

### Batch 1 (dès réception credentials + validation RGPD)
- Extraction de 100 appels candidats
- Scoring automatique + sélection top 50
- Review formateur sur les 50 sélectionnés
- Intégration des 50 validés dans la bibliothèque

### Batch 2 (J+30)
- Extraction mensuelle de 20 appels supplémentaires
- Focus sur comblage des gaps (secteurs ou catégories sous-représentés)

### Batch ongoing
- Routine mensuelle automatisée
- Alert qualité si un secteur tombe sous 5 appels dans la bibliothèque
