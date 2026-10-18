# Before/after and Version comparison

v0.3.1 adds A/B comparison. This guide covers v0.3.3 SDR output.

## Open and choose sources

Click Compare in the viewport for before/after, or Compare in Versions to choose A and B. Wait for both frames; Retry is available after a failure.

Unadjusted means the imported baseline with current decoding conditions. Both sides use the current demosaicing, highlight reconstruction and lens settings, retaining their own white balance and adjustments. It is not a comparison of entirely independent RAW decoders.

## Layouts

![Unadjusted/current divider comparison](/img/tutorial-v0.3.3/comparison.webp)

![A/B sources, layout, swap and Close](/img/tutorial-v0.3.3/comparison-controls.webp)

*Windows Release v0.3.3, Chinese UI: Unadjusted/current divider comparison.*

| Option | Behavior |
| --- | --- |
| Complete images | Show two full images |
| Divider | Reveal sides with a draggable divider |
| Left/right | Horizontal arrangement |
| Top/bottom | Vertical arrangement |
| Swap A and B | Exchange sources |

Compare whole-image style first, then align details with Divider. Swap sides to check whether position is influencing your judgment.

## While comparison is open

Editing, undo/redo and Version checkout pause. A/B selection, layout, divider, swap and Close remain available. Close to resume editing.

HDR output displays an unavailable message. Check HDR exports on a compatible viewing device; do not inadvertently change delivery settings merely to enable comparison.
