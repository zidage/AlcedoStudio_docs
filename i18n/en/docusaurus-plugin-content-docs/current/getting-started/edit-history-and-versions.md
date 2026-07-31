# Edit History and Versions (UI)

The editor’s left rail has two panels: **Versions** and **Edit History**. Both refer to the same edit records for the current photo. One lists named branches; the other shows the commits on the branch you are using.

**Note:** Project files from before v0.2.8 are not supported by the current release. Open them with the software version that created them, or create a new project and re-import.

## Versions

**Versions** lists the named branches for this photo. Each row shows a display name and the commit it currently points at (or the image root).

- Select a Version to start using it (pending edits are saved first when needed).
- **Branch from current** creates another branch from the current Version’s latest commit.
- **Fork from root** creates a branch from the import baseline (before any user edits).
- You can rename a Version. A Version that is not in use can be removed while at least one Version remains.

The Version in use is marked with an outline. Editing is always bound to a Version.

## Edit History

**Edit History** shows the commit graph for the Version currently in use, with undo and redo.

When you release a slider, that adjustment is recorded as one commit. Undo and redo move along this graph; they do not modify the original RAW file.

The toolbar can also bring adjustments from another photo. See the next section.

## Bringing adjustments from another photo: Paste and Merge

Copy adjustments on one photo, then open the target photo. The clipboard holds that set of parameters, not the image itself. You then choose **Paste** or **Merge**; they serve different jobs.

### Paste

Use Paste when you want a **full look from another photo as a separate starting point** on the target, kept apart from what you already had there.

Example: you finished exposure, white balance, and a film LUT on photo A, and you want photo B to start from that recipe while still keeping another Version you already made on B. Paste **creates a new Version** on B and switches to using it. B’s previous Version remains; it is simply no longer the one in use.

Paste does not patch the old Version. It opens a new branch that carries the incoming adjustments.

### Merge

Use Merge when the target photo **already has edits you want to keep**, and you also want to take useful parts from another photo’s adjustments.

Example: you already cropped and set exposure on B, and you want A’s color grade and LUT as well; where both sides changed the same control, you want to choose which value to keep. Merge stays on the **Version you are already using**. It does not create a new Version for this operation.

If both sides changed the same field, a preview dialog asks you to keep the current value, take the incoming one, or set a final value. Confirming writes one merge commit; canceling leaves the current Version unchanged.

### Which to use

| What you want | Use |
| --- | --- |
| Bring another photo’s full adjustments in as a new starting point, kept next to the old Version | **Paste** |
| Keep working on the current Version and fold in useful parts from another photo | **Merge** |

Storage and recovery details are in [Edit History and Versions (Mini-Git)](../developer/edit-history-architecture).
