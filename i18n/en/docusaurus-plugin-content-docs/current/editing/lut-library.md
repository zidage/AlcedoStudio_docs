---
sidebar_position: 4
---

import InterfaceMock from '@site/src/components/InterfaceMock';
import {LutBakeFlow} from '@site/src/components/SourceMocks';

# 3D LUT Library, Film Emulation & Color Space Encodings

3D LUTs apply color transforms in a grading node. Alcedo Studio supports official LUT packages and imported `.cube` files, with controls for input encoding, output encoding, and strength

In v0.3.5, **Display Transform → Film Print** also offers film, print material, and scan settings. See [Film Simulation](./film-simulation.md)

---

## Official Film Packages & Custom Library Management

Official film simulation LUT packages can be downloaded in Settings. Their signatures are checked during installation:

<InterfaceMock kind="lut-packages" />

### 1. Downloading Official LUT Packages
1. Open Settings → LUTs and find Official LUT Packages.
2. Each card represents an entire package, such as Spectral Film LUT or Spektrafilm LUT. A film stock such as Portra is an entry inside a package.
3. The card shows its upstream project, LUT count, revision, archive size, and installation status. Click Download, Update, or Repair as offered by that card.
4. Downloads are verified and installed in the library. Installed cards also provide Remove package; removing a package makes its LUTs unavailable to photos that use them.

The schematic shows two example package states. Counts, revisions, and sizes come from the package feed in the application.

### 2. Importing Custom `.cube` LUTs
To use your own commercial or custom grading `.cube` files:
1. Under `Settings → LUTs`, locate the current `LUT library path`.
2. Click `Open in File Explorer` (or `Open in Finder` on macOS) to reveal the custom LUT directory.
3. Drop your `.cube` files or folders into the directory and click `Refresh`. Your custom LUTs will immediately appear under the `User` category in the browser.

---

## LUT Input & Output Color Space Encodings

Input and Output describe the encoding expected by the original LUT and the encoding it produces. These settings transform and resample the LUT itself.

<LutBakeFlow />

When preparation is needed, the application converts ACEScc/AP1 grid points into the selected input encoding, samples the original LUT, and converts the samples from the selected output encoding back to ACEScc/AP1. It bakes these operations into a composite LUT and caches it. A LUT already using the working encoding and a unit domain can use its original table directly.

During rendering, the grading pipeline samples this prepared LUT and mixes the result using Strength.

<InterfaceMock kind="lut-controls" />

### Recommended Encodings Guide
- **Official packages**: Check the individual LUT's documented or remembered encodings. Choose ACEScc for both only when that LUT expects it.
- **Cinema Camera Log LUTs (ARRI LogC3, Sony S-Log3, Canon Log 2)**:
  - **Input Encoding**: Set to the corresponding camera Log curve (e.g. `ARRI LogC3`).
  - **Output Encoding**: Choose the encoding specified by the LUT's documentation.
- **Other LUTs**: Choose the input and output encodings specified by the LUT's documentation. The two encodings may differ.
- **Remember for this LUT**:
  Checking this box saves the input/output color encoding pairing in the local catalog. Whenever this LUT is selected in the future, the correct color transformations are applied automatically.

:::caution Strength Cannot Mask Encoding Mismatches
If applying a LUT produces unexpected contrast, check the required input and output encodings before adjusting Strength.
:::

---

## Browsing, Applying & Blending Strength

In the Editor, open the `LUTs` drawer from the left tool rail:

<InterfaceMock kind="lut-browser" />

1. **Targeted Search**:
   - Filter by Category (Black & White, Color Negative, Color Reversal, Motion Picture), Source, or Brand.
   - Enter keywords (such as "Portra 400" or "5207") in the search bar.
   - Click the star icon to pin frequently used LUTs to your favorites.
2. **Apply to Node**:
   - Verify the desired grading node is selected, then click a LUT in the grid to immediately apply it to the canvas; clicking the active item unbinds it.
3. **Strength Blending**:
   - Adjust the **Strength** slider (0%–100%) in the right panel to linearly blend the results before and after the LUT.

---

For display output and post-processing, see [Display Transform, HDR & Post-Processing](./display-and-effects.md).
