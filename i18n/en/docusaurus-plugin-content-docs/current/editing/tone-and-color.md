---
sidebar_position: 3
---

import InterfaceMock from '@site/src/components/InterfaceMock';
import {ColorWheelsMock} from '@site/src/components/SourceMocks';

# Tone, Curves & Color Grading

Alcedo Studio’s grading pipeline uses a **scene-referred, wide-gamut linear color space (ACEScg)**. This page covers tone, white balance, saturation, selective color, and color wheels.

---

## Base Tone: Linear Exposure & Dynamic Range

Under the active grading node, open the `Tone` panel. The controls follow a photographic progression from global illumination to localized contrast:

<InterfaceMock kind="tone" />

| Control | Physics & Algorithm Mechanics | Practical Tuning Guidelines |
| --- | --- | --- |
| **Exposure** | Scaled in real photographic exposure values (EV / stops), applying a linear `2^(ΔEV)` multiplier to scene radiance. | Establish global scene brightness first while monitoring highlight headroom on the histogram. |
| **Contrast** | Adjusts contrast around 18% middle gray ($0.18$), using a Hue Constancy algorithm. | Adjust overall contrast as needed. |
| **Highlights** | Compresses bright dynamic range via edge-preserving bilateral filtering. | Adjust bright areas such as skies and reflections, and check edge transitions. |
| **Shadows** | Localized gradient lifting across low-key regions. | Reveals backlit facial details and architectural shadows while preserving a clean black floor on the waveform. |
| **Whites / Blacks** | Adjusts white and black levels in the image. | Adjust highlights and shadows while watching the histogram. |
| **Tone Curve** | Interactive multi-point cubic spline curve. | Left-click to add and drag points; right-click to delete; double-click the curve area to reset. Ideal for fine-tuning S-curve contrast. |

:::tip Slider Reset
Double-clicking any slider handle in the interface immediately resets the parameter to its default value.
:::

---

## Core Color Science: Two Distinct White Balances

`RAW Decode` and `Look` have separate white balance controls that operate at different stages:

<InterfaceMock kind="look" />

```text
[ Camera White Balance ] ──▶ Adjusts channel gains on the camera RGB image after RAW processing is complete
[ CAT02 Look White Balance ] ──▶ Adjusts white balance in the grading node
```

1. **Camera White Balance (Camera WB)**:
   - **Pipeline Stage**: Operates on the camera RGB image after RAW processing is complete.
   - **Method**: Applies white balance gains to the color channels of the camera RGB image.
   - **Use**: Adjusts the white balance of the RAW image.
2. **Creative Look White Balance (Look WB)**:
   - **Pipeline Stage**: Operates inside the scene-referred linear grading node.
   - **Method**: Uses the **CAT02 (CIECAM02 Chromatic Adaptation Transform)** matrix to adjust color.
   - **Use**: Adjusts temperature and tint within the node, including masked adjustments to a subject or background. It is available for RAW and raster images (JPEG/TIFF).

---

## Saturation & Selective Color

In the `Look` panel, you can independently refine overall vibrance and isolate individual color ranges:

- **Vibrance**: Adjusts color saturation with a stronger effect on less saturated colors.
- **Saturation**: Linear chroma scaling across all color channels.

### 8-Hue Selective Color Isolation
Expand `Selective Color` to perform 3D geometric shifts across 8 primary hue families (Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta):

1. **Target Hue**: Select the color family to manipulate (e.g. Green for foliage, Orange for portraits).
2. **Hue Shift**: Rotates the color direction (e.g. shifting dry yellow-green grass toward deep emerald, or golden sunsets toward rose peach).
3. **Lightness**: Modulates reflectance brightness of the isolated color (e.g. darkening blue skies for richer cloud separation).
4. **Chroma**: Independently boosts or desaturates purity for the selected color band.
5. **Hue Smoothness**: Adjusts the transition width into neighboring hues.

---

## Four-Way Color Wheels (Lift / Gamma / Gain / Offset)

The Look panel arranges four wheels in a two-by-two grid:

<ColorWheelsMock />

- **Shadows (Lift)**: Primarily changes color and brightness near black, with less effect on highlights.
- **Midtones (Gamma)**: Primarily changes midtones, with less effect at the darkest and brightest ends.
- **Highlights (Gain)**: Primarily changes color and brightness near white, with less effect on shadows.
- **Offset**: Changes all tonal ranges, like an exposure adjustment per color channel.
- **Master**: Each wheel has its own brightness control in EV below the disc. Offset is a fourth wheel; Master is the control beneath each wheel.

Double-click a disc to reset that wheel, or choose Reset wheels to reset all four.


---

For LUT instructions, see [3D LUT Library & Color Space Encoding](./lut-library.md).
