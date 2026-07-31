---
sidebar_position: 3
---

# Local AI Model Management

This page covers the local vision models in `Settings → Local Content Recognition`. Once downloaded and activated, a model can power import-time content label generation, label filtering, and semantic search; inference runs on your machine.

To configure an API provider for photo descriptions, ratings, and rating reasons, see [API provider configuration](./provider-configuration.md) instead.

## Opening local AI settings

Click `Settings` on the toolbar and choose `Local Content Recognition` on the left; or, when the `Set up an AI model to analyze images` prompt appears during import, click `Set up model` and the app jumps straight to this section.

The page contains three main sections:

- `AI content recognition`: label statistics for the current album, and the generate / regenerate flows.
- `Model`: choose, download, and activate a local model.
- `Import`: whether to auto-generate labels when importing new images.

## Choosing a model

Pick a model from the dropdown at the top of the `Model` section. The models in the list differ in size, accuracy, and language support; after selection, the status card shows the display name and total size. If you are unsure, start with the default item — you can switch and re-download later.

## Setting the download directory

`Download directory` shows where the model files are stored. Click the folder icon on the right and choose a directory in `Select Model Download Folder`. Model files are large, so pick a location with plenty of space that you can keep long-term, and do not delete the files in it casually.

## Choosing a mirror source

The `Source` dropdown offers four options:

- **HF Mirror**: a Hugging Face mirror for networks with poor access to the official site; prefer it when the official site is slow or unstable.
- **Hugging Face**: the official source; use it with a good connection — the most complete and up-to-date files.
- **Sufy CDN**: a CDN-distributed mirror, useful as a backup to the first two.
- **Custom**: a custom download address. Selecting it shows an input field for the full download root address, e.g. `https://example.com`.

Recommendations: use `Hugging Face` when you can reach the official source at a decent speed; use `HF Mirror` when access from China is difficult; if both are slow, try `Sufy CDN` or a custom address. When a download fails or stalls, switching the source and re-running `Download` is usually the most direct fix.

## Downloading and activating

With model, directory, and source set:

1. Click `Check` to refresh the local status of the current model; a not-yet-downloaded model shows `Not downloaded`.
2. Click `Download` to start. The status card shows a percentage, downloaded / total bytes, the current file name, download speed, and estimated time remaining; the button becomes `Cancel` while downloading.
3. When the download finishes, the status card shows `Activate to generate labels` — the files are in place but not loaded into the runtime.
4. Click `Activate`. When done, the status card shows a green `Active`; label generation and semantic search are now available.

### Model status card

The status card is the primary source of truth for model state:

- Red / `Not downloaded`: no complete model files locally.
- Accent color / `Downloading %1%` or `Activating…`: download or activation in progress.
- Gray / `Activate to generate labels`: files downloaded but not activated.
- Green / `Active`: the local model is ready.

When idle, the card also shows controller-reported information such as errors, install paths, or current runtime state.

### Other operations

- `Check`: re-reads the local status of the selected model.
- `Download` / `Cancel`: starts or interrupts the download.
- `Delete`: removes the local files for this model; the status returns to `Not downloaded`.
- `Activate`: loads a downloaded model.

## Import-time label preference

The label generation options in the `Import` section control what happens when importing new images:

- **Always**: generate on every import without asking.
- **Always Ask**: show the `Use AI to analyze image content?` dialog on every import.
- **Always Skip**: never generate labels at import and never show the model setup prompt.

See [AI label generation](./label-generation.md) for the import dialogs and the manual generation flow.

## Troubleshooting

- Download fails or stalls with no progress: switch the `Source` and re-run `Download`; for a custom source, confirm the address is reachable and the directory structure matches the official one.
- Download completes but `Activate` fails: check that the directory is intact and disk space is sufficient; `Delete` and re-download if needed.
- Status shows `Active` but label generation is still unavailable: confirm the current project is open, and click `Check` in the local AI section to refresh the status.
- Semantic search still unavailable: confirm the local model is `Active`; an API provider profile does not replace the local semantic search model.
