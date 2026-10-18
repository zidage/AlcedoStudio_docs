# Interface overview

Since v0.2.8, Library and Editor share one window. In v0.3.3 the workflow runs from the welcome screen to Library, Editor and the Library's Export inspector.

## Welcome screen

![Project name and storage form](/img/tutorial-v0.3.3/new-project.webp)

*Windows Release v0.3.3, Chinese UI: Project name and storage form.*

Use New Project… to enter a project name and parent folder, or Open Project… to open a `.alcd` file. Recent projects show a cover, photo count, edited count and capture range. Selecting a recent project previews it; entering it is a separate step. Previewing alone does not save it.

Choose the interface language here. The processing backend is managed in Settings → Acceleration and changes after a restart.

## Top toolbar

The main controls are the collections sidebar toggle, Library / Editor navigation, File and Settings. File offers Load Project, Create Project and Save Project. The right sidebar toggle controls the inspector in Library and adjustment panels in Editor.

Background tasks use the top status indicator. Click it to inspect progress or errors. Agent sessions stay pinned in the task area; see [settings and tasks](../settings/preferences.md).

## Library

![Library and Album inspector](/img/tutorial-v0.3.3/library.webp)

*Windows Release v0.3.3, Chinese UI: Library and Album inspector.*

- **Left:** Search, Advanced Content Analysis, Background Tasks, collections, Import From Folder and Import Images.
- **Center:** photo thumbnails, zoom, selection and context actions. Double-click a photo to edit.
- **Right:** Album for statistics, filtering, sorting and grouping; Image for photo details and existing AI results; Export for output settings and queue.

Clicking a statistic filters photos; its field actions sort or group them. See [Library management](../library/import-and-organize.md).

## Editor

![Single-window Editor and Tone panel](/img/tutorial-v0.3.3/editor-tone.webp)

*Windows Release v0.3.3, Chinese UI: Single-window Editor and Tone panel.*

The left rail contains History, Versions, Nodes, Mask Groups, LUTs and Tasks. Click to open or collapse a panel. The central viewport shows the photo; the bottom filmstrip follows the Library's collection and filters.

On the right, scopes and photo information appear above the adjustments:

1. RAW Decode, or Input Color for raster files.
2. Geometry for the whole photo.
3. Tone for the selected Color Grade.
4. Look for the selected grade's white balance, selective color and wheels.
5. LUT for its look, strength and encodings.
6. Display Transform for the whole photo.
7. Post Processing for whole-image diffusion, detail and texture.

Mask and Compare are contextual pages. Check the grade name above the adjustments before editing: each Color Grade has its own Tone, Look, LUT and masks.

## Return and export

Use Library in the toolbar. Select photos, Add to Queue, then configure the Export inspector. Saving edits and producing an output image are separate operations. Continue with [your first edit](./first-edit.md).
