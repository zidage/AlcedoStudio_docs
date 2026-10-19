---
sidebar_position: 4
---

# Automated AI Content Tagging

During commercial shoots or travel expeditions, photographers easily capture thousands of frames. Manually tagging every image with subject keywords is exhausting. Alcedo Studio’s local on-device AI vision model identifies subjects, environments, and mood in milliseconds, generating structured content labels for instant catalog culling.

---

## Intelligent Import Prompts

When your local vision model is `Active`, importing photographs triggers automated tagging options:

1. **Import Dialog**: Once directory scanning completes, a prompt asks `Use AI to analyze image content?`:
   - **Generate**: Concurrently extracts visual embeddings and generates semantic tags for the batch. A circular progress indicator displays completed counts, inference speed, and time remaining.
   - **Skip**: Ingests images into the catalog immediately without running AI models. Tagging can be performed at any later time.
   - **Remember My Choice**: Persists your decision to application preferences, automating future imports without repetitive popups.
2. **Asynchronous Non-Blocking Execution**: Tagging executes silently on background worker threads, allowing you to browse, rate, or grade photographs in the foreground without UI lag.

---

## Centralized Catalog Tag Management

Navigate to `Settings → Local Content Recognition` for centralized batch tagging controls:

- **Catalog Statistics Dashboard**:
  Displays clear metrics for the active catalog: `Total Images`, `With labels`, and `Need labels`.
- **Generate (Incremental)**:
  Scans the library and runs inference only on untagged photographs, saving compute time.
- **Regenerate (Full Catalog Refresh)**:
  When you download a more advanced model, click Regenerate to re-index all catalog images with updated, higher-accuracy semantic tags.

---

## Where AI Tags Surface in the Workspace

Once generated, semantic labels integrate across your culling workflow:

1. **Thumbnail Badges**: In the center grid, the most prominent keywords (e.g. `Portrait`, `Sunset`, `Architecture`, `Forest`) appear beneath each card.
2. **Image Inspector**: Selecting any image displays its complete semantic tag stream in the right inspector banner.
3. **Album Inspector Filter**:
   Switch to the `By Labels` section of the Album inspector. Tags are sorted by frequency. Clicking any tag (such as `Nightscape`) instantly filters the entire catalog down to matching frames!

---

With tags in place, proceed to [AI Semantic & Structured Search](./search.md) to search your photo catalog using natural language!
