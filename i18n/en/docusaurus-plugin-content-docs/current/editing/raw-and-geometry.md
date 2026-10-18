# Input, RAW decoding and geometry

RAW Decode and Geometry apply to the whole photo, independently of the selected Color Grade.

## Camera white balance and demosaicing

![Camera white balance and lens correction](/img/tutorial-v0.3.3/raw-white-balance.webp)

*Windows Release v0.3.3, Chinese UI: Camera white balance and lens correction.*

![Lens, demosaicing and highlight reconstruction](/img/tutorial-v0.3.3/raw-decode.webp)

*Windows Release v0.3.3, Chinese UI: Lens, demosaicing and highlight reconstruction.*

1. Open RAW Decode and check camera white balance.
2. Choose Method. RCD is the default for Bayer; Neural Engine supports Bayer and X-Trans and is the X-Trans default. Inspect fine edges and false color after changing methods.
3. Try Enable Highlight Reconstruction when needed and check enlarged highlights for color shifts or artifacts.
4. Review Input Profile where available. DNG embedded profiles can contribute HueSatMap and LookTable data; linear DNG is supported.

RAW white balance corrects capture input. Look white balance is a creative grade adjustment. Equal Kelvin values need not produce equal results; see [color](./tone-and-color.md).

## Raster input color

From v0.3.2, JPEG, PNG, TIFF and OpenEXR open with Input Color / Input Profile instead of RAW demosaicing and camera white balance.

Start with Auto (metadata). The app reads available ICC, PNG color information or EXR chromaticities and converts to the ACES workflow. Inspect the reported source; override it when you know the encoding and automatic detection is wrong.

OpenEXR and PQ / HLG images are marked HDR. A rendered JPEG cannot recover RAW highlight information already lost. Use Look white balance for creative warming/cooling.

## Lens calibration

Inspect automatic lens detection, enable calibration as needed, or search brand/model and select a matching profile manually. Check straight lines, image edges and composition. Do not substitute a merely similar lens for an unknown one.

v0.3.0 places this in RAW Decode and fixes packaged Lensfun data and Nikon lens identification.

## Crop and rotation

![Crop overlay, composition grid and Geometry](/img/tutorial-v0.3.3/geometry.webp)

![Crop and rotation controls](/img/tutorial-v0.3.3/geometry-controls.webp)

*Windows Release v0.3.3, Chinese UI: Crop overlay, composition grid and Geometry.*

1. Open Geometry and choose Aspect Ratio or custom width/height.
2. Move and resize the overlay, or adjust Crop X / Y / Width / Height.
3. Set Rotation and inspect the final boundary.
4. Check History; reset crop and rotation or undo to return.

From v0.3.1 the crop is the output image: rotating after crop rotates that cropped image. Crop remains within the photo, avoiding blank corners; edits and aspect choices are saved.

Older rotated crops can look different after upgrading. Check them before batch export. When copying geometry between landscape and portrait photos, verify a representative target first.
