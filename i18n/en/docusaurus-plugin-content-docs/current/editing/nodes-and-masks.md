# Nodes, Mask Groups and local adjustments

From v0.3.0 a photo can contain multiple serial Color Grade nodes. Select the intended grade before changing its controls.

## Processing order

```text
Develop → Color Grade 1 → Color Grade 2 → … → Display Transform → Post Processing
```

Each Color Grade owns Tone, Look, LUT and masks. Input, Geometry, Display Transform and Post Processing apply to the whole photo.

## Build the chain in Nodes

![Two Color Grades and a radial mask](/img/tutorial-v0.3.3/nodes.webp)

*Windows Release v0.3.3, Chinese UI: Two Color Grades and a radial mask.*

Open Nodes, add a Color Grade and rename it by purpose. Connect its ports in the processing order and finish any incomplete connection before continuing. Select the grade and confirm its name above the adjustments.

Fit shows the graph. Delete only a grade that is allowed to be removed; locked nodes are protected. Graph edits are retained in History and Versions.

## Mask Groups

Each grade appears as a layer with mask thumbnails. Add a group for a separate local correction; drag layers to change processing order and inspect the result.

The first grade is locked by default and contains the default adjustments. Masking it also limits those defaults. Adding a separate layer is often easier for a first local edit.

Settings → Default Behavior controls adding a mask on a locked node: ask, create a new layer first, or draw on the current node. This does not affect user-created unlocked layers.

## Radial mask: lift a subject

![Radial mask, layer list and handles](/img/tutorial-v0.3.3/masks.webp)

![Mask enable, invert, opacity and radii](/img/tutorial-v0.3.3/mask-controls.webp)

*Windows Release v0.3.3, Chinese UI: Radial mask, layer list and handles.*

1. Add and select a subject layer.
2. Choose the radial mask tool and drag an ellipse on the photo.
3. Set Name, Enabled, Invert and Opacity on the contextual Mask page.
4. Adjust position, horizontal/vertical radius, Rotation and inner/outer feather with the handles or controls.
5. Return to Tone and adjust exposure, checking the transition.

The position control accepts arrow keys; Shift increases the step.

## Gradient mask: darken a sky

Add a sky layer, choose gradient and drag across the transition. Rotate to match the horizon, adjust Transition width, and use Invert if necessary. Lower exposure or highlights on that grade and check for a visible boundary.

Masks distribute a grade's effect; they do not crop the photo. Standard v0.3.3 release presets disable brush masks, so these tutorials cover radial and gradient masks. Preserve experiments using [Versions](../getting-started/edit-history-and-versions.md).
