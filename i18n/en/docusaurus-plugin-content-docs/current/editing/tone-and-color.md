# Tone, curves and color

Select the intended Color Grade in Nodes or Mask Groups. Tone, Look and LUT follow that grade; confirm its name above the controls.

## Tone

![Tone adjustments](/img/tutorial-v0.3.3/tone.webp)

*Windows Release v0.3.3, Chinese UI: Tone adjustments.*

Start with overall brightness, then contrast, shadows/highlights, endpoints and curves.

| Control | Purpose |
| --- | --- |
| Exposure | Establish overall brightness while watching highlight room |
| Contrast | Adjust lightness around middle gray; v0.3.0 defaults new photos to +15 while retaining hue and middle gray |
| Highlights / Shadows | Local tone adjustments; inspect strong changes around edges |
| Whites / Blacks | Refine bright and dark endpoints |
| Tone Curve | Shape tonal relationships precisely |

Left-click/drag curve points, right-click a point to remove it and double-click to reset. Sliders also reset on double-click. Confirmed changes enter History.

## Two white balances

![Grade white balance and color controls](/img/tutorial-v0.3.3/look.webp)

*Windows Release v0.3.3, Chinese UI: Grade white balance and color controls.*

RAW Decode white balance corrects capture input using camera information and affects the whole RAW photo.

Look white balance performs CAT02 chromatic adaptation in the grading space. Its default is no change; it does not read camera white balance. Use it for creative warmth/coolness on a grade or its masked region, including raster inputs. The same Kelvin number can look different between these controls.

## Saturation and selective color

Use Saturation / Vibrance in Look. For a particular color, choose Target Hue, adjust Hue Shift, Lightness or Chroma and check neighboring transitions with Hue Smoothness. Inspect skin, sky gradients and saturated edges. v0.2.5 revised color/chroma handling, so old numeric recipes do not guarantee identical appearance.

## Lift, Gamma and Gain

Use the color wheels for shadow, midtone and highlight color, checking Master controls for brightness effects. Reset wheels restores the group.

v0.3.1 corrects Gamma wheel/master direction and enables the Gain master. Existing photos using them may change; inspect before exporting.

As an exercise, create a tone-only Version and a color alternative, then [compare](./comparison.md) before adding a [LUT](./lut-library.md) or [post effects](./display-and-effects.md).
