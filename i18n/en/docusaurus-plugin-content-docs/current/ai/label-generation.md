---
sidebar_position: 4
---

# Automated AI Content Tagging

Alcedo Studio uses a local vision model to generate content tags for photos. The tags can be used to filter the library.

---

## Generating Tags on Import

When your local vision model is `Active`, the import preference controls whether photos are tagged or you are prompted to choose:

1. **Import Dialog**: Once directory scanning completes, a prompt asks `Use AI to analyze image content?`:
   - **Generate**: Concurrently extracts visual embeddings and generates semantic tags for the batch. A circular progress indicator displays completed counts, inference speed, and time remaining.
   - **Skip**: Ingests images into the catalog immediately without running AI models. Tagging can be performed at any later time.
   - **Remember My Choice**: Persists your decision to application preferences, automating future imports without repetitive popups.
2. **Background Processing**: Tagging runs in the background while you browse, rate, or edit photos.

---

## Centralized Catalog Tag Management

Navigate to `Settings → Local Content Recognition` for centralized batch tagging controls:

- **Catalog Statistics Dashboard**:
  Displays clear metrics for the active catalog: `Total Images`, `With labels`, and `Need labels`.
- **Generate (Incremental)**:
  Scans the library and runs inference only on untagged photographs, saving compute time.
- **Regenerate (Full Catalog Refresh)**:
  Click Regenerate to create tags again for the photos in the library, for example after changing models.

---

## Where AI Tags Surface in the Workspace

After tags are generated, you can view and use them in these locations:

1. **Thumbnail Badges**: In the center grid, the most prominent keywords (e.g. `Portrait`, `Sunset`, `Architecture`, `Forest`) appear beneath each card.
2. **Image Inspector**: Selecting any image displays its complete semantic tag stream in the right inspector banner.
3. **Album Inspector Filter**:
   Switch to the `By Labels` section of the Album inspector. Tags are sorted by frequency. Click a tag (such as `Nightscape`) to filter photos.

---

See [AI Semantic & Structured Search](./search.md) for search instructions.
