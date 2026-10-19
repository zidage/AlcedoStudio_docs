---
sidebar_position: 4
---

# Edit History, Version Branches & Selective Transfer

Alcedo Studio introduces a **Git-style Directed Acyclic Graph (DAG) commit and branching architecture** to digital photo editing. You can experiment freely with bold creative grades, step back in time, and navigate distinct style branches without risk of data loss or bloated disk footprints.

---

## History: Atomic Commits & Non-Destructive Undo

![History commit log with agent tags](/img/tutorial-v0.3.3/history.webp)
*Reviewing chronological commits and adjustment records*

### 1. Commit Lifecycle
- **Interactive Viewport Preview**: When dragging sliders, the GPU rendering pipeline maintains smooth, real-time 60fps canvas updates.
- **Commit on Pointer Release**: Releasing the mouse pointer or concluding numeric input bundles the current modification into an atomic transaction commit in the DAG. Crop changes, mask edits, white balance tweaks, and LUT swaps all create discrete commits.
- **Non-Destructive Navigation**: Press `Ctrl+Z` (`Cmd+Z` on macOS) to undo, and `Ctrl+Shift+Z` / `Ctrl+Y` to redo. Clicking any past step in the `History` panel instantly restores the canvas viewport to that precise historical state.

### 2. Autonomous Agent & Automation Badges
Edits generated via `alcedo-cli` or AI companion agents are annotated in the history panel with distinct badges and rationale descriptions, making it easy to review or roll back automated modifications.

---

## Versions: Branching Creative Directions

In traditional photo software, testing both a color and a black-and-white look often requires duplicating massive RAW files. Alcedo Studio’s **Versions** system lets a single image host multiple independent creative branches with virtually zero extra storage overhead:

![Two distinct named versions](/img/tutorial-v0.3.3/versions.webp)
*Managing multiple independent creative branches for a single photograph*

### Core Branching Workflows
- **Branch from current commit**:  
  Forks a new branch head from your current editing milestone. For example, after finishing base tone adjustments, branch off into "Warm Cinematic Film" while keeping another branch for "High-Contrast B&W".
- **Fork new version from root**:  
  Creates a clean branch directly from the unadjusted RAW baseline, ideal for starting over with a completely fresh concept without losing existing work.
- **Instant Checkout**:  
  Clicking any version name instantly checks out that branch and recalculates the GPU color pipeline. Pending changes on the active branch are safely committed before switching.
- **Rename & Prune**:  
  Double-click version titles to rename them (e.g. "Client Preview", "Final Master Print"). The active branch is protected from accidental deletion; switch to another branch first before removing obsolete versions.

---

## Selective Adjustment Transfer (Copy & Paste)

When you craft an exceptional color grade on one photograph, how do you apply it across an entire photo series?

Alcedo Studio provides a precise **Selective Adjustment Transfer** engine. Its core principle: **Transferring color grades should never overwrite unique per-photo crops, focal lengths, or exposures.**

![Selective copy and paste adjustments](/img/tutorial-v0.3.3/versions.webp)
*Selectively choosing parameters for transfer*

### How to Transfer Adjustments
1. **Copy Adjustments**:  
   Right-click the graded source photo in the Library or Filmstrip and choose `Copy Adjustments…`.
2. **Choose Source Version & Modules**:  
   In the configuration dialog, select the source Version and check only the parameters you want to transfer:
   - **Input & Geometry**: RAW camera white balance, demosaicing, lens calibration, crop, and rotation.
   - **Color Grade Nodes**: Tone (exposure, contrast, curves), Look (CAT02 creative WB, vibrance, color wheels), 3D LUT, and color space encoding rules.
   - **Global Transforms**: Display Transform (ACES 2.0 / OpenDRT) and Post Processing (diffusion, film grain, sharpening).
3. **Select Target Photos**:  
   Select one or more destination photos and right-click to choose `Paste Adjustments…`.
4. **Confirm & Execute**:  
   Verify the parameter selection and confirm. The transfer runs as an asynchronous background task.

### Why Selective Transfer is Safer
- **Automated Branch Creation**: Pasting generates a new named version branch on each target photo, preserving all preexisting edits.
- **Non-Selected Parameters Remain Intact**: If you only transfer "3D LUT & Look", each target photo's individual crop boundaries, local exposure compensations, and masks remain **100% unaltered**. This eliminates accidental overrides of horizontal/vertical crops or sensor-level white balances.

---

Now that you have mastered version branches and adjustment transfer, continue to [Library & Asset Management](../library/import-and-organize.md) to explore catalog curation.
