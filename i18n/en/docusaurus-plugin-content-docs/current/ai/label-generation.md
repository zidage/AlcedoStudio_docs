---
sidebar_position: 4
---

# AI Label Generation

With a local model activated, Alcedo Studio can generate content labels for images. Labels are inferred by the on-device vision model, describe the main content of the image, and also back semantic search and the inspector's `By Labels` filter.

This page covers the local labeling flow. Descriptions, ratings, and rating reasons produced by an API provider are a separate flow; see [API provider configuration](./provider-configuration.md).

## The import-time prompt

When importing images, if the project has an activated local model and the import preference is `Always Ask` (the default), a `Use AI to analyze image content?` dialog appears:

- **Generate**: generates labels for this batch. The dialog then switches to `Generating semantic labels`, showing a circular progress, processed count, elapsed time, and estimated time remaining; you can click `Cancel` while processing.
- **Skip**: skips this batch; the images import normally without labels.
- **Remember My Choice**: remembers the current choice and syncs it into the import preference in the local AI settings.

If the import preference is `Always`, generation runs directly after import; with `Always Skip`, nothing is generated and no dialog appears. The preference can be changed in `Settings → Local Content Recognition → Import`.

If the project has no activated local model, importing shows `Set up an AI model to analyze images`; click `Set up model` to go to the local AI settings, or `Not now` to skip this batch only.

## Manual generation and regeneration

In the `AI content recognition` section of `Local Content Recognition`:

- The top shows the current album's `Images`, `With labels`, and `Need labels` counts.
- `Generate` only creates labels for images that do not have them yet.
- `Regenerate` ignores existing labels and regenerates for all images in the album — useful after switching local models to re-label everything consistently.
- While running, the button becomes `Cancel`, with progress and estimated time remaining below.

## Viewing labels

Generated labels can be viewed in these places:

- Below each thumbnail in the grid / list.
- Right-click an image and choose `Details` — in the `Primary`, `Related`, and `Also Matched` sections of the details dialog.
- The `By Labels` area of the right inspector — click a label to filter images.

## Notes

- Label quality depends on the local model; different model variants may produce different label sets.
- After switching local models, use `Regenerate` to update the labels consistently.
- Label generation requires the local model to be `Active`; an API provider's API key does not make the local labeling flow available by itself.
- Generation speed depends on CPU, GPU, memory, image count, and model size.
