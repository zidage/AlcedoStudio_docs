---
sidebar_position: 2
---

# Interface Overview & Workspace Layout

Alcedo Studio features a unified, modern single-window architecture. You can seamlessly transition between organizing large photo catalogs in the **Library** and fine-tuning creative grades in the **Editor**, without managing disjointed popups or separate application windows.

---

## Welcome Screen: Project Launcher & Recent Catalogs

When you start Alcedo Studio, the Welcome screen offers an immediate entry point to your work:

![Welcome screen: new project and recent list](/img/tutorial-v0.3.3/new-project.webp)
*Welcome Screen: Create new projects and preview recent catalogs*

- **Create New Project**: Click `New Project…`, provide a project name, and pick a parent directory. The application initializes an `.alcd` DuckDB database.
- **Open Existing Project**: Click `Open Project…` to select and load an existing `.alcd` catalog.
- **Recent Projects Grid**: Visual cards summarize your recently opened catalogs with cover previews, total photo counts, graded photo counts, and capture date spans. Clicking a card displays its summary; double-clicking or pressing Enter launches the workspace.
- **Language & Preferences**: Quick buttons in the top-right corner allow switching the interface language and tuning the GPU acceleration backend before entering a catalog.

---

## Top Global Toolbar

The persistent top toolbar coordinates overall workspace modes and system states:

```text
[Sidebar Toggle]  [Library / Editor Switcher]  [File ▾]  [Settings ⚙]  ─────────  [Task Status Light ⚪]  [Inspector Toggle]
```

- **Sidebar Toggles**: Left button toggles the left panel (Collections in Library; Tool Rail in Editor). Right button toggles the right panel (Inspector in Library; Adjustment Stack in Editor).
- **Mode Switcher**: Effortlessly switch between `Library` asset management and `Editor` darkroom grading.
- **File Menu**: Quick access to save the project (`Save Project`), create new catalogs, or reopen files.
- **Settings**: Centralized preferences for GPU backends, disk caches, keyboard shortcuts, LUT packages, and AI models.
- **Background Task Indicator**: Real-time progress monitor for RAW imports, thumbnail decoding, AI inferences, batch exports, and CLI agent sessions. Clicking the indicator opens the background task manager.

---

## Library Workspace: Three-Column Asset Management

Entering the `Library` reveals a balanced three-column workspace designed for rapid culling and organization:

![Library and Album Inspector](/img/tutorial-v0.3.3/library.webp)
*Library Workspace: Collections sidebar, center thumbnail grid, and right Album Inspector*

### 1. Left Navigation & Collections
- **Quick Utilities**: Direct links to global `Search`, cloud-powered `Advanced Content Analysis`, and Background Tasks.
- **Import Actions**:
  - `Import From Folder`: Recursively scans directories, breaks down file counts by format (RAW, JPEG, TIFF, PNG, OpenEXR), and lets you filter which types to import.
  - `Import Images`: Launches the native system file dialog for direct file selection.
- **Virtual Collections**: Organize photos into custom albums. Adding photos to collections creates virtual references without moving or duplicating source files on disk.

### 2. Center Thumbnail Grid
- **Fluid GPU Scrolling**: Smooth zoom slider adjusts grid density from dense contact sheets to large previews.
- **Interactive Culling**: Multi-select support (Shift / Ctrl / Cmd), with quick right-click options for 1–5 star ratings and color labels.
- **Open in Darkroom**: Double-click any photo to transition directly into the Editor.

### 3. Right Inspector
A contextual multi-tab panel containing:
- **Album**: Dynamic catalog analytics. Click any capture date, camera model, lens, star rating, or AI tag to instantly **filter** your view. Use dropdowns on each field to change **sort order** (ascending/descending) or **group** items into collapsible sections.
- **Image**: Detailed EXIF exposure parameters, lens metadata, real-time histogram, and AI-generated critiques/captions.
- **Export**: Batch export queue configuration, preset management, and export triggers.

---

## Editor Workspace: Professional Darkroom Grading

Double-clicking any thumbnail opens the `Editor` workspace, optimized for precision color grading:

![Editor workspace and tone panel](/img/tutorial-v0.3.3/editor-tone.webp)
*Editor Workspace: Left tool rail, center canvas viewport, and right adjustment stack*

### 1. Center Canvas Viewport
- **Hardware-Accelerated Display**: Renders the scene-referred color pipeline in real time with responsive pan and zoom (Fit to screen, 1:1 pixel mapping, or custom scale).
- **On-Canvas Interactive Overlays**: Adjust crops, rotation angles, and mask handles (elliptical controls, inner/outer feathering lines) directly on the image canvas.
- **Bottom Filmstrip**: Expandable filmstrip preserves the active Library collection or filter, enabling continuous editing without switching back to the Library.

### 2. Left Tool Rail
Click an icon to expand its drawer; click again to collapse:
- **History**: Chronological transaction history of the active version. Click any past step for non-destructive undo and redo.
- **Versions**: Git-style branching version manager. Fork named versions (e.g. "Warm Golden Hour", "High-Contrast B&W") and selectively transfer adjustments between photos.
- **Nodes**: Visual DAG graph showing the node grading pipeline, allowing you to add and reorder color grading stages.
- **Mask Groups (Layers)**: Layer-style overview of color grading nodes and their attached local masks.
- **LUT Browser**: Visual browser for official and custom 3D LUTs with search and category filtering.

### 3. Right Adjustment Stack
The adjustment panels are structured in alignment with the scientific processing pipeline:

```text
[ Real-Time Waveform / Histogram ]
   │
1. RAW Decode / Input Color    ── Sensor white balance, demosaicing, and lens calibration
2. Geometry                    ── Aspect ratio crop, boundary containment, and rotation
3. Tone                        ── Exposure, contrast, highlights/shadows, and tone curves
4. Look                        ── CAT02 creative white balance, saturation, selective color, and color wheels
5. 3D LUT                      ── Film simulation selection, strength blending, and color space encoding
6. Display Transform           ── ACES 2.0 / OpenDRT scene-to-display tone mapping
7. Post Processing             ── Diffusion glow, clarity, sharpening, and authentic film grain
```

Contextual tabs such as **Mask** (for fine-tuning mask geometry and inversion) and **Compare** (for A/B evaluation) slide out automatically when their respective tools are invoked.

---

Now that you understand the workspace layout, proceed to [Your First Edit](./first-edit.md) for a step-by-step walkthrough of developing a RAW photo.
