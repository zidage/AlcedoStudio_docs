---
sidebar_position: 3
---

import InterfaceMock from '@site/src/components/InterfaceMock';

# Your First Edit: A Complete Walkthrough

This tutorial covers creating a project, importing and editing photos, comparing versions, and exporting.

---

## Step 1: Create a Working Project

<InterfaceMock kind="new-project" />

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
   - Use Method to choose Default, Legacy, or Neural Engine. Legacy uses RCD for Bayer and traditional interpolation for X-Trans; at full resolution, Default selects Legacy for Bayer and Neural Engine for X-Trans.
   - Expand `Lens Calibration` and check `Enable Lens Calibration`. The application matches a camera and lens profile to correct distortion and vignetting.
2. **Crop & Geometry**:
   - Expand the `Geometry` panel.
   - Choose an aspect ratio (e.g. 16:9, 4:5, 1:1, or maintain original proportions).
   - Drag the crop handles on the canvas and use the rotation slider to level your horizon. Alcedo Studio’s geometry engine automatically constrains the crop within the genuine image boundaries to prevent black borders.

---

## Step 4: Shape Tone and Color

Alcedo Studio’s grading pipeline operates in a scene-referred linear color space. The following steps adjust tone and color:

<InterfaceMock kind="tone" />

1. **Refine Base Tone**:
   - **Exposure**: Establish overall scene brightness.
   - **Highlights & Shadows**: Use bilateral tone mapping to tame blown sky highlights while lifting rich shadow details.
   - **Whites & Blacks**: Fine-tune the clipping endpoints to establish deep black levels and clean highlight headroom.
   - **Tone Curve**: Add points to an S-curve to sculpt midtone contrast. Double-clicking any slider or curve point immediately resets it to default.
2. **Inject Creative Look**:
   - Open the `Look` panel.
   - Adjust **Look White Balance**: This control uses CAT02 chromatic adaptation to adjust temperature and tint.
   - Adjust **Vibrance** and **Saturation**.
   - Expand **Color Wheels** to introduce color separation across shadows (Lift), midtones (Gamma), and highlights (Gain).
3. **Apply a 3D LUT (Optional)**:
   - For analog film character, open the `LUT` panel and select a film simulation.
   - Adjust **Strength** to suit the photo.
4. **Use Film Print (optional, v0.3.5)**:
   - Under `Display Transform → Method`, select `Film Print` and choose a film. For a negative, also choose a print material
   - See [Film Simulation](../editing/film-simulation.md) for details

---

## Step 5: Branch a Version & Run A/B Comparison

You can create and compare versions of the same photo:

<InterfaceMock kind="versions" />

1. Expand the `Versions` panel from the left tool rail.
2. Click `Branch from current commit` and give your version a name (e.g. "Warm Golden Hour").
3. Now freely experiment with a contrasting style (such as "Moody Monochrome" or "Punchy Daylight").
4. Click `Compare` in the canvas toolbar to initiate an A/B visual comparison:
   - Select **Divider** mode to drag a split line across the image, comparing your current grade against the unadjusted base or another named version branch.
   - When satisfied, click `Close` to return to standard editing.

---

## Step 6: Export

Deliver your finished photograph through the unified export queue:

<InterfaceMock kind="export-presets" />

1. Click `Library` in the top toolbar to return to the catalog, with your edited photo selected.
2. Click `Add to Queue` in the right inspector, then switch to the `Export` tab.
3. **Select an Export Preset**:
   - Social media and web: Choose `Web` or `Social Media`. The presets use different dimensions; see [Export Presets](../export/workflow.md) for details.
   - Printing or archiving: Choose `Maximum Quality JPEG` or `16-bit TIFF`.
4. **Choose Destination**: Select your output folder under Destination.
5. **Start Rendering**: Click `Export`. The GPU rendering pipeline processes images in the background. Check progress via the task indicator light, and find your finished image in the destination folder upon completion.

---

For versions and adjustment transfer, see [Edit History, Versions & Transferring Adjustments](./edit-history-and-versions.md).
