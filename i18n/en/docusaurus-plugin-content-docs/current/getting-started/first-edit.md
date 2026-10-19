---
sidebar_position: 3
---

# Your First Edit: A Complete Walkthrough

This tutorial guides you through the end-to-end workflow in Alcedo Studio: from creating a project, importing photos, and grading tones to branching version trees and delivering high-fidelity exports.

---

## Step 1: Create a Working Project

![Create new project](/img/tutorial-v0.3.3/new-project.webp)
*Creating a new `.alcd` project database*

1. Launch Alcedo Studio and click `New Project…` on the Welcome screen.
2. Enter a **Project Name** (e.g. `2026_Landscape_Project`) and pick a local folder as your **Storage Location**.
3. Click `Create Project`. The application initializes an `.alcd` single-file DuckDB database and opens the Library workspace.

:::note Non-Destructive Storage Mechanics
The `.alcd` project file references your original photos by disk path and tracks all commits and versions internally. **Your source files remain completely untouched and read-only.** Keep your original photo folders in place throughout the project lifecycle.
:::

---

## Step 2: Import a Photograph

1. In the left sidebar of the Library, click `Import Images` (or click `Import From Folder` to scan an entire directory).
2. In the system file dialog, select a RAW photo (supporting Sony `.ARW`, Canon `.CR2/.CR3`, Nikon `.NEF`, Fujifilm `.RAF`, DNG, etc., as well as raster formats like JPEG, PNG, TIFF, and OpenEXR).
3. The import task executes asynchronously in the background while the top status indicator monitors progress. In moments, the thumbnail appears in the center grid.
4. *(Optional)* If the local AI prompt appears, choose whether to generate semantic content labels; skipping label generation does not affect image grading.

---

## Step 3: Input Decoding & Composition Geometry

Double-click the imported thumbnail to enter the **Editor** darkroom viewport.

1. **RAW Decoding & Lens Calibration**:
   - In the right adjustments stack, expand `RAW Decode`.
   - Verify the initial camera white balance (`As Shot`), and make subtle adjustments to temperature or tint as needed.
   - The demosaicing method defaults to high-precision RCD; if supported by your GPU, you can also select the Neural Engine for AI-driven reconstruction.
   - Expand `Lens Calibration` and check `Enable Lens Calibration`. The engine automatically matches your camera and lens profile to eliminate distortion and optical vignetting.
2. **Crop & Geometry**:
   - Expand the `Geometry` panel.
   - Choose an aspect ratio (e.g. 16:9, 4:5, 1:1, or maintain original proportions).
   - Drag the crop handles on the canvas and use the rotation slider to level your horizon. Alcedo Studio’s geometry engine automatically constrains the crop within the genuine image boundaries to prevent black borders.

---

## Step 4: Shape Tone and Color

Alcedo Studio’s grading pipeline operates in scene-referred linear color space, making it best to shape exposure before introducing creative color:

![Tone adjustment](/img/tutorial-v0.3.3/tone.webp)
*Sculpting balanced scene contrast in the Tone panel*

1. **Refine Base Tone**:
   - **Exposure**: Establish overall scene brightness.
   - **Highlights & Shadows**: Use bilateral tone mapping to tame blown sky highlights while lifting rich shadow details.
   - **Whites & Blacks**: Fine-tune the clipping endpoints to establish deep black levels and clean highlight headroom.
   - **Tone Curve**: Add points to an S-curve to sculpt midtone contrast. Double-clicking any slider or curve point immediately resets it to default.
2. **Inject Creative Look**:
   - Open the `Look` panel.
   - Adjust **Look White Balance**: Based on CAT02 chromatic adaptation, this allows you to add artistic warmth or cool tint without altering the physical RAW sensor calibration.
   - Adjust **Vibrance** and **Saturation**, preserving natural skin tones.
   - Expand **Color Wheels** to introduce color separation across shadows (Lift), midtones (Gamma), and highlights (Gain).
3. **Apply a 3D LUT (Optional)**:
   - For analog film character, open the `LUT` panel and select a film simulation.
   - Adjust **Strength** between 40% and 70% to blend the aesthetic naturally.

---

## Step 5: Branch a Version & Run A/B Comparison

In Alcedo Studio, you can explore bold creative ideas without risking previous adjustments:

![Version branch management](/img/tutorial-v0.3.3/versions.webp)
*Creating isolated version branches for a single photo*

1. Expand the `Versions` panel from the left tool rail.
2. Click `Branch from current commit` and give your version a name (e.g. "Warm Golden Hour").
3. Now freely experiment with a contrasting style (such as "Moody Monochrome" or "Punchy Daylight").
4. Click `Compare` in the canvas toolbar to initiate an A/B visual comparison:
   - Select **Divider** mode to drag a split line across the image, comparing your current grade against the unadjusted base or another named version branch.
   - When satisfied, click `Close` to return to standard editing.

---

## Step 6: High-Quality Export

Deliver your finished photograph through the unified export queue:

![Export settings](/img/tutorial-v0.3.3/export-presets.webp)
*Selecting export presets and configuring destinations*

1. Click `Library` in the top toolbar to return to the catalog, with your edited photo selected.
2. Click `Add to Queue` in the right inspector, then switch to the `Export` tab.
3. **Select an Export Preset**:
   - Social media and web: Choose `Web` or `Social Media` (automatically configured for 2048px high-quality JPEG with GPS location stripped for privacy).
   - Print and master archiving: Choose `Maximum Quality JPEG` or `16-bit TIFF`.
4. **Choose Destination**: Select your output folder under Destination.
5. **Start Rendering**: Click `Export`. The GPU rendering pipeline processes images in the background. Check progress via the task indicator light, and find your finished image in the destination folder upon completion.

---

Next, continue to [Edit History, Versions & Transferring Adjustments](./edit-history-and-versions.md) to master Git-style creative version control.
