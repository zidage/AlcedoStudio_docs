# LUT library, packages and encodings

Since v0.3.1, LUTs are downloaded separately. The old instruction to copy into bin/LUTs and restart is no longer the current workflow.

## Official packages

![LUT folder and categories](/img/tutorial-v0.3.3/lut-settings.webp)

*Windows Release v0.3.3, Chinese UI: LUT folder and categories.*

![Installed official LUT packages](/img/tutorial-v0.3.3/lut-packages.webp)

*Windows Release v0.3.3, Chinese UI: Installed official LUT packages.*

1. Open Settings → LUTs and check the library folder.
2. Download a package under Official LUT Packages.
3. Wait for download, signature verification and installation.
4. Use Update / Repair when needed; inspect errors before Retry.
5. v0.3.2 allows package removal after confirmation. Referencing photos lose that look until reinstalled.

Changing to an empty folder copies and verifies the library before removing copied files from the old location. Choosing a folder that already contains files uses that folder without moving the old library. Read the confirmation carefully. Open in File Explorer / Finder and Refresh expose the actual folder and inventory.

## Custom LUTs and missing files

Import supported .cube files or place them in the browser's indicated user folder, then refresh. Nested folders are recognized; user LUTs appear under User.

Projects retain associations. Missing LUTs are reported and temporarily omitted from rendering; restoring the file restores the effect. Transfer LUT resources when moving machines.

## Apply and set strength

![LUT filters and browser](/img/tutorial-v0.3.3/lut-browser.webp)

*Windows Release v0.3.3, Chinese UI: LUT filters and browser.*

Select the destination grade first. Open LUTs on the left, filter Category / Source / Brand / Print, search by name, use favorites, or switch grid/list. Print includes a no-print option.

Click a LUT to apply it; click the applied entry again to remove it. Set Strength from 0–100% on the right, or Remove the association. The browser locates the applied entry and names it in the footer.

When RAW Decode, Display Transform or Post Processing is active, the browser targets the last selected grade. Check its displayed name.

## Input and Output encodings

![LUT strength and input/output encodings](/img/tutorial-v0.3.3/lut-controls.webp)

*Windows Release v0.3.3, Chinese UI: LUT strength and input/output encodings.*

v0.3.2 adds encoding selection and includes it in copied adjustments.

- Scene encodings include ACES and camera Log curves. Match the LUT author's specified input and output.
- Display inputs are formed through an ACES 2.0 output transform before the LUT. Display outputs return to the scene workflow through the ACES 2.0 inverse output transform.
- Official packages default to ACEScc. Do not assume an unknown custom LUT does.

Choose Input and Output, inspect brightness/highlights/color, then set strength. Lowering strength does not fix an incorrect encoding.

Remember for this LUT stores the pair in the library for future selections. Encoding changes also enter the current photo's history. This differs from the final Display Transform.

Try official and custom looks on separate Versions, [compare](./comparison.md), then [export](../export/workflow.md).
