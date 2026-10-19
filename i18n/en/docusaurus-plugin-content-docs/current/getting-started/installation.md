---
sidebar_position: 1
---

# Installation & Environment Setup

This guide covers system requirements, installation procedures, and GPU acceleration setup for Alcedo Studio.

---

## System & Hardware Requirements

To ensure processing efficiency during 4K/8K image preview and export, verify that your computer meets the following specifications:

| Platform | Operating System | Recommended Hardware & Acceleration Backend |
| --- | --- | --- |
| **Windows** | Windows 10 / 11 64-bit (x64) | **NVIDIA GPU** (Compute Capability 6.0+, GTX 10 series or newer / RTX series) with **CUDA** backend;<br/>Other discrete or integrated GPUs can use the **OpenCL 1.2** backend. |
| **macOS** | macOS 13.3 (Ventura) or newer | **Apple Silicon** (M1 / M2 / M3 / M4 family chips) with native **Metal** unified memory acceleration. |

:::tip Memory and Storage Recommendations
A minimum of 16 GB RAM is recommended (32 GB or more is advised when editing high-resolution RAW files exceeding 45 MP). Storing your image libraries and cache on an NVMe SSD reduces I/O latency for thumbnail generation and image decoding.
:::

---

## Download & Installation

Download the official release installer from [GitHub Releases](https://github.com/zidage/AlcedoStudio/releases):

### Windows Installation
1. Download the Windows installer package (e.g. `AlcedoStudio-Setup-x64.exe`).
2. Run the installer and complete the setup wizard.
3. Launch **Alcedo Studio** from the Start Menu or desktop shortcut.

### macOS Installation
1. Download the `.dmg` disk image for Apple Silicon.
2. Double-click to mount the image and drag **Alcedo Studio** into your system `/Applications` folder.
3. Open the application from Launchpad or Finder.

---

## Verifying GPU Hardware Acceleration

Alcedo Studio’s image processing pipeline executes directly on native GPU shaders and parallel compute kernels. On first launch, check your hardware acceleration settings:

1. Open `Settings` from the top toolbar, or click the gear icon on the Welcome dialog.
2. Select `Acceleration` from the left sidebar categories.
3. Review the active image processing backend:
   - **CUDA (Windows)**: Optimized for NVIDIA GPUs using native CUDA kernels for FP32 compute, supporting Neural Engine demosaicing and multi-scale diffusion filtering. Diagnostic logs are presented if driver mismatches or unsupported environments are detected.
   - **Metal (macOS)**: Uses Apple Silicon unified memory and Metal compute shaders to minimize host-to-device data copies.
   - **OpenCL (Windows / Generic)**: Implemented against the OpenCL 1.2 standard, supporting AMD Radeon, Intel Arc, and compatible discrete or integrated GPUs for baseline hardware portability.
4. **Applying Changes**: If you switch the GPU backend, save and **restart the application** so the compute contexts and shader libraries can reinitialize.

---

## Understanding the `.alcd` Project File

Alcedo Studio organizes your workspace around `.alcd` single-file project catalogs:

- **Reference-Based Architecture**: Project files store disk path references, cached EXIF metadata, grading nodes, masks, and Git-style commit histories. **Source files are never copied or bundled into the project.**
- **Preserve Source Directories**: Always keep original RAW and raster files in their original storage paths. Moving or renaming source folders on disk will trigger missing file alerts.
- **Backup & Collaboration**: Backing up your work only requires preserving the `.alcd` catalog file along with your original photo folders.

---

## Optional Packages & Utilities

After installing the application, configure additional optional modules based on your workflow needs:

1. **Official 3D LUT Film Packages**  
   To maintain a compact installer, official film simulation LUTs are distributed on demand. Navigate to `Settings → LUTs` to download and verify official packages. See [LUT Library & Film Simulation](../editing/lut-library.md).
2. **Local AI Vision Models**  
   To enable offline image tagging and natural language semantic search, download lightweight vision models under `Settings → Local Content Recognition`. See [Local Model Management](../ai/model-management.md).
3. **Command-Line Interface (`alcedo-cli`)**  
   Installed alongside the main executable on Windows (or inside the macOS app bundle). Use it for headless batch scripts or companion automation. See [Agents & CLI Guide](../automation/cli.md).

---

With your environment ready, proceed to the [Interface Overview](./interface-overview.md) to explore the workspace layout.
