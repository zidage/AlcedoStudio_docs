# History, Versions and copying adjustments

History records the current Version's steps; Versions stores alternative treatments of the same photo. This page describes v0.3.3. Older v0.2.x projects require the [upgrade guidance](../releases/upgrade-guide.md).

## History

![Agent badges and notes in History](/img/tutorial-v0.3.3/history.webp)

*Windows Release v0.3.3, Chinese UI: Agent badges and notes in History.*

Dragging updates the preview; releasing confirms the edit. Crop, nodes, masks and LUT encodings also produce history steps. Undo/redo moves through the active history without changing the original.

Editing after undo creates a new continuation, not a named Version. Branch first to retain alternatives. Agent edits carry badges and notes.

## Versions

![Two named Versions](/img/tutorial-v0.3.3/versions.webp)

*Windows Release v0.3.3, Chinese UI: Two named Versions.*

- **Branch from current commit:** create a branch from the current commit; unavailable before there is a commit.
- **Fork new version from root:** start from the imported baseline.
- **Select:** save as needed and switch to that Version.
- **Rename:** give alternatives meaningful names.
- **Remove Version:** remove a permitted inactive Version; switch away first.

Navigation and shutdown coordinate saving. Resolve save or recovery errors before continuing. File → Save Project saves the project; export creates independent image files.

## Selective copying and paste

1. Open Copy Adjustments on the source photo.
2. Choose the source Version.
3. Select nodes and parameters. RAW, camera white balance, lens and geometry are included from v0.3.1 onward.
4. Select one or more target photos and open Paste Adjustments.
5. Review Parameters to Paste, confirm and wait for background completion.

The editor paste entry is in Versions, not History. Paste creates and activates a new target Version while retaining the old one. v0.3.3 fixes partial paste resetting unselected values: copying only a LUT should preserve other unselected target adjustments.

Camera white balance, lenses and crop depend on the photo. Check one target before propagating a recipe across cameras or different compositions.

## Older instructions

v0.2.8 offered Merge and conflict resolution. **The product Merge action was removed in v0.3.0.** Use selective copy/paste and [A/B comparison](../editing/comparison.md). Storage details are in the [history architecture](../developer/edit-history-architecture.md).
