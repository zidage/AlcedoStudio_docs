# Your first edit

Complete one v0.3.3 workflow: create a project, import a photo, edit, preserve an alternative and export.

## 1. Create a project

![Project name and storage form](/img/tutorial-v0.3.3/new-project.webp)

*Windows Release v0.3.3, Chinese UI: Project name and storage form.*

Choose New Project… on the welcome screen, enter Project Name and Storage Location, then Create Project. Open existing projects through Open Project… or File → Load Project. Keep the source photos in place.

## 2. Import

Click Import Images and choose a RAW. Since v0.3.2, JPEG, PNG, TIFF and OpenEXR are also supported, with different input controls.

Wait for import completion and confirm the thumbnail appears. You may generate AI labels, skip them or configure a model later. See [Library](../library/import-and-organize.md) for folder scans and file-type selection.

## 3. Check input and composition

Double-click the photo. In RAW Decode, inspect camera white balance, demosaicing and lens detection. Try highlight reconstruction when needed, checking enlarged edges and highlight color.

In Geometry, choose an aspect ratio, move the crop and adjust rotation. Confirmed changes enter History. See [input and geometry](../editing/raw-and-geometry.md).

## 4. Adjust tone and color

![Tone adjustments](/img/tutorial-v0.3.3/tone.webp)

*Windows Release v0.3.3, Chinese UI: Tone adjustments.*

Select the default Color Grade. In Tone, start with Exposure, then adjust Highlights / Shadows, Whites / Blacks and Contrast as needed. Release a slider to commit the adjustment; double-click it to restore its default.

Use Look for saturation and creative white balance. This differs from camera white balance in RAW Decode. See [tone and color](../editing/tone-and-color.md).

For a film look, download an official package in Settings → LUTs, choose a LUT in the left browser and set Strength on the right. Custom LUTs need appropriate input and output encodings; see [LUTs](../editing/lut-library.md).

## 5. Preserve and compare

In Versions, Branch from current commit and name the alternative. Try a different look on that branch.

Open Compare in the viewport for before/after, or from Versions to select A and B. Editing, undo/redo and checkout pause during comparison. Close it to resume editing. HDR comparison is unavailable. See [Versions](./edit-history-and-versions.md) and [comparison](../editing/comparison.md).

## 6. Export

1. Return to Library, select the photo and Add to Queue.
2. Open Export and select a destination.
3. For an ordinary SDR photo, start with Web or Maximum Quality JPEG. Check format, size and the filename example.
4. Review EXIF, ICC and GPS. v0.3.3 retains GPS by default; disable GPS location in EXIF or choose Web / Social Media / Email when location is unnecessary.
5. Start export, wait for Done and inspect the actual file. Review errors for Failed items before retrying.

HDR photos use separate HDR settings. See [export](../export/workflow.md).
