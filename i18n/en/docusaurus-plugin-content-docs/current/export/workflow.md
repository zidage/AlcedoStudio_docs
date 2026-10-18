# Export: queue, presets, size and metadata

In v0.3.3, export lives in Library's right-hand Export inspector. Saving a project preserves editing state; export creates an independent image.

## Queue and destination

Select photos and Add to Queue, or use the queue's plus button. Check filenames and counts. Clearing the queue does not delete Library photos.

SDR and HDR entries use their respective settings. Check [Display Transform](../editing/display-and-effects.md) first.

Choose Destination and optionally Put in Subfolder. Presets do not select a destination. Reopening the panel restores previous options, but verify the output location.

## Full export presets

![Full export preset menu, including local user presets at the bottom](/img/tutorial-v0.3.3/export-presets.webp)

*Windows Release v0.3.3, Chinese UI: Full export preset menu, including local user presets at the bottom.*

v0.3.3 replaces filename-only presets with full export presets:

| Preset | Main settings |
| --- | --- |
| Standard | Defaults |
| Web | JPEG quality 80, 2048 px long edge, GPS off |
| Social Media | JPEG quality 90, 1080 × 1350 bounds, GPS off |
| Email | JPEG quality 75, 1280 px long edge, GPS off |
| Maximum Quality JPEG | Full size, quality 100 |
| 16-bit TIFF | Full size, 16-bit, ZIP |
| EXR Archive | Full size, 16-bit half-float OpenEXR |

HDR options are included too: Web uses 2048 px / quality 85; Social Media uses 1350 px / quality 90. All options except destination are set.

Unmatched edits show Custom. Enter Preset name and save your own; deletion applies to user presets. Old filename presets do not migrate into this menu.

## File Naming

Use Pattern and Insert field; review Example or Pattern error.

```text
{date:yyyy-MM-dd}_{source}_{sequence:0000}
```

Fields include source, date, padded sequence, camera make/model, lens, ISO, aperture, shutter, focal length and rating. The extension follows the format. Include source or sequence for batches and correct invalid patterns before export.

## SDR format and size

![SDR format, depth and long-edge size](/img/tutorial-v0.3.3/export-sizing.webp)

*Windows Release v0.3.3, Chinese UI: SDR format, depth and long-edge size.*

| Format | Bit depth | Options |
| --- | --- | --- |
| JPEG | 8 | Quality |
| PNG | 8 / 16 | PNG Level |
| TIFF | 8 / 16 / 32 | None / LZW / ZIP |
| OpenEXR | 16 / 32 | Floating point |

Choose Original, Long Edge, Bounds or Print. Bounds preserves aspect within the specified width/height; it does not stretch the image. Print includes mm/cm/in and DPI.

WebP is unavailable. EXR Archive is an image preset, not a project/RAW backup; retain the .alcd and originals for future editing.

## HDR Export

![HDR settings and pending queue; export has not run](/img/tutorial-v0.3.3/export-hdr-queue.webp)

*Windows Release v0.3.3, Chinese UI: HDR settings and pending queue; export has not run.*

HDR photos export as Ultra HDR JPEG, with HDR Quality, Dithering and Max edge. In v0.3.3 the edge range is **256–8192 px**. HDR edge size is independent of SDR sizing; early shared-size instructions are outdated.

Check a representative export on a compatible HDR device/viewer before processing a batch.

## EXIF, ICC and GPS

![Web preset with EXIF, ICC and GPS disabled](/img/tutorial-v0.3.3/export-metadata.webp)

*Windows Release v0.3.3, Chinese UI: Web preset with EXIF, ICC and GPS disabled.*

EXIF metadata controls photo metadata; ICC profile embeds the output color profile. GPS location in EXIF controls source position data and requires metadata output.

v0.3.3 retains GPS by default and handles photo metadata for JPEG, Ultra HDR, TIFF, PNG and OpenEXR. Camera and lens serial numbers are excluded. Web / Social Media / Email turn GPS off; inspect custom presets before sharing.

v0.3.3 fixes macOS Rec.709 gamma 2.2 / BT.1886 preview/export curve and ICC consistency. External viewers still determine their own display behavior.

## Completion

Start Export … Files when settings, folder and queue are valid. Entries move from Queued to Exporting to Done, or Failed. Inspect task results, counts and actual files. A task starting is not completion.

Exports use saved edits. Save a revised treatment before exporting it again. The queue can be retained or cleared afterward.
