# Display transform, HDR, scopes and post processing

Tone / Look / LUT work in the scene workflow. Display Transform forms the output appearance; Post Processing follows it for the whole photo.

## Display Transform

![OpenDRT and output encoding](/img/tutorial-v0.3.3/display-transform.webp)

*Windows Release v0.3.3, Chinese UI: OpenDRT and output encoding.*

Choose ACES 2.0 or OpenDRT, then Encoding Space and Encoding EOTF for the intended output. Check Peak Luminance for HDR. OpenDRT also provides Look, Tonescale and Creative White options.

Changing the transform changes appearance. v0.3.3 fixes OpenDRT output for Rec.709 / P3-D65 with sRGB encoding.

## SDR and HDR

Use an encoding suited to the receiving device, commonly sRGB for SDR. HDR requires compatible color space, PQ/HLG encoding, target brightness and an HDR-capable viewing path.

macOS supports HDR preview on suitable displays. A Windows window is not sufficient final validation for every HDR output: check exported files with an HDR-capable viewer/device. v0.3.3 A/B comparison does not support HDR.

HDR input classification and chosen display output are separate settings. Export has independent Ultra HDR JPEG quality, dithering and maximum edge controls; see [export](../export/workflow.md).

## Scopes and detail inspection

Switch Histogram / Waveform above the adjustments. A histogram shows channel/brightness distribution; a waveform helps locate brightness across the frame. Use both with the actual image.

FIT fits the viewport; 100% corresponds to pixel scale. Zoom/pan with the configured wheel modifier or trackpad, checking [Keyboard settings](../settings/preferences.md) for actual bindings. Inspect detail near 100%, then return to FIT for composition.

## Post Processing

![Post Processing](/img/tutorial-v0.3.3/post.webp)

*Windows Release v0.3.3, Chinese UI: Post Processing.*

Since v0.3.0 these effects apply once after Display Transform, rather than separately to every grade.

| Section | Controls |
| --- | --- |
| Diffusion | Strength; inspect glow around bright sources and whites |
| Detail | Clarity and Sharpen; inspect halos, detail and noise |
| Texture | Film Grain and Halation; check grain and highlight glow |

Diffusion arrived in v0.3.1 across CUDA, OpenCL and Metal. v0.3.2 changes its highlight curve, potentially softening old white-area halos. Grain and halation originated in v0.2.6.

Finish exposure/color before evaluating effects. Inspect full-size output as well as preview. Exports use saved edits rather than transient slider values.
