# Installation

This page covers installing Alcedo Studio, focusing on the two main paths: Windows/CUDA and macOS/Metal.

## Windows installation

- Make sure your system meets the minimum requirements:
  - Windows 10 64-bit
  - CUDA processing backend:
    - NVIDIA GPU (CUDA 12.8 or later), Pascal architecture or newer
    - NVIDIA driver 570.68 or later
  - OpenCL processing backend:
    - A modern GPU, ideally 8 GB VRAM or more, supporting OpenCL 1.2 or later
- Download the latest Windows installer from [GitHub Releases](https://github.com/zidage/AlcedoStudio/releases) and extract it.
- Run `bin/alcedo_main.exe` from the extracted folder, or use the desktop shortcut.

## macOS installation

- Make sure your system meets the minimum requirements:
  - Apple Silicon SoC, ideally 16 GB of RAM.
  - macOS 13.3 or later.
- Download the latest macOS installer from [GitHub Releases](https://github.com/zidage/AlcedoStudio/releases) and install it into Applications.
- The current macOS builds are not signed, so the system blocks the first launch; work around this at your own discretion. If you have security concerns, build locally or wait for a future release with proper signing.
- Run the installed `Alcedo Studio` app.
