---
sidebar_label: Film Simulation
---

# Film Simulation: Prints, Scans, and Reversal Film

Film Print uses film data, including spectral response and characteristic curves, to simulate exposure on film and produce a print, negative scan, or reversal film image

This guide follows the Alcedo Studio v0.3.5 interface. Film Print resources are included with the installer. For film LUT packages and custom LUTs, see the [3D LUT library](./lut-library.md)

## Get started

1. Open a photo from the Library in the Editor
2. Open **Display Transform** on the right and set **Method** to **Film Print**
3. Select **Negative** or **Reversal**, then choose a stock under **Film**
4. For a negative, choose a paper, cinema print stock, or **Negative Scan** under **Print**. A reversal film is shown as a slide on a light table
5. Open **Style** and **Print Setting** to adjust the format, grain, halation, and scene light

Click a film or print card to open its list. The negative and print material lists support name search and brand filters. Click the card again to close the list

Available stocks include Kodak Portra, Vision3, Fujifilm Pro, Eterna, Velvia, and Provia. Print choices include papers, cinema print stocks, display materials, and Negative Scan

## Choose an output

| Selection | Image | Output |
| --- | --- | --- |
| **Negative → paper or display material** | Simulates a print from the negative | Rec.709 SDR |
| **Negative → cinema print stock** | Simulates a projected cinema print | Rec.709 SDR |
| **Negative → Negative Scan** | Scans and inverts the negative, then displays it with OpenDRT | SDR or HDR, depending on encoding |
| **Reversal** | Simulates a slide viewed on a light table | Rec.709 SDR |

Negative Scan shows the **Negative Scan**, **Scanner**, **OpenDRT**, and **Color & Encoding** sections. The other choices use their fixed SDR output

## Style

**Style** opens by default and contains these controls:

- **Format**: Select 16 mm, 35 mm, or 70 mm to set the simulated film frame size. A smaller frame makes grain, light spread, and halation appear larger within the same image
- **Film Grain**: Adjust grain from 0% to 200%. At 100%, grain follows the granularity in the selected stock's data
- **Halation**: Adjust the red glow around bright lights. A value of 1 is the standard strength

When switching to Film Print, a grain strength of 0 is set to 100%; an existing nonzero strength is kept. Switching to another display transform method sets grain to 0

## Print Setting

Open **Print Setting** to adjust:

- **Scene Light**: Choose the light that exposes the film, including Reference, Daylight, Tungsten, Fluorescent, LED, Sodium, and street or interior lighting. Changing the light changes the film's color response
- **As Shot**: This Scene Light choice is available when RAW white balance is available. It uses the RAW white balance color temperature. When RAW white balance is unavailable, the interface uses **Reference**, the light the film is balanced for
- **Light Spread**: Adjust light spread within the emulsion. A value of 1 corresponds to the stock's documented sharpness; higher values soften the image
- **Enlarger Flare**: Adjust stray light from the enlarger lens. Higher values make print highlights grayer. This control is hidden for Negative Scan
- **Loupe Flare**: Available for reversal film. Higher values lift the shadows of the slide

## Negative Scan

Choose **Negative → Print → Negative Scan**, then open **Negative Scan** to adjust the inversion:

- **Auto Color**: Choose **Off**, **Neutral**, **Warm**, or **Cool**. Off keeps the cast from the scene light and film. The other modes adjust the cast using a prescan
- **Auto Color Strength**: Set the amount of automatic color correction
- **Auto Density**: Set how strongly the prescan moves average brightness toward the gray reference. Both automatic controls are inactive when Auto Color is Off
- **Scan Contrast** and **Scan Exposure**: Adjust the contrast and brightness of the inversion
- **Cyan**, **Magenta**, and **Yellow**: Fine-tune the positive image's color
- **Black at Film Base**: Adjust how the film base maps to black. A value of 1 sets the film base to black

Open **Scanner** to set the center wavelengths of the red, green, and blue channels, the band width, and the scanner light. The defaults describe an ideal scanner. Changing these values rebuilds the data used for scanning

Open **OpenDRT** to select the look, tonescale, and creative white. Under **Color & Encoding**, select the encoding space, EOTF, and peak luminance for SDR or HDR output

## Saved settings

The application remembers the film, print material, scene light, and other Film Print settings used in the interface. When you select Film Print on another photo, it can reuse those settings

When switching to Film Print, the saturation of the default grading node is set to 0 if it still has the application's default value. Other saturation values are kept. You can also review and reuse photo adjustments through [edit history and versions](../getting-started/edit-history-and-versions.md)
