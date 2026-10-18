# Installation and preparation

This guide targets v0.3.3. Download its installer from [GitHub Releases](https://github.com/zidage/AlcedoStudio/releases/tag/v0.3.3); the source main branch may include later changes.

## Windows

1. Use Windows 10 / 11 x64 and run the Windows installer. Since v0.2.9 build 2015, Windows releases provide an installer rather than a portable ZIP.
2. Launch from the Start menu or desktop shortcut.
3. Check Settings → Acceleration. CUDA is available for compatible NVIDIA GPUs with compute capability 6.0 or later and suitable drivers; OpenCL serves other supported GPUs. Startup detection reports an unavailable CUDA backend.
4. Restart the application yourself after changing the backend.

## macOS

Use Apple Silicon, M1 or newer, with macOS 13.3 or later. Download the disk image, install the app in Applications and launch it. Image processing uses Metal.

## Projects and additional resources

A `.alcd` project contains photo references, edit history and Versions. Keep the original files at their referenced locations; moving a project does not move all its photos.

- Official LUTs are downloaded separately in Settings → LUTs. See the [LUT guide](../editing/lut-library.md).
- Local AI models require a separate download and activation. AI is optional for ordinary editing; see [model management](../ai/model-management.md).
- alcedo-cli is installed beside the Windows program or inside the macOS app bundle. See [CLI](../automation/cli.md).

## Compatibility

v0.3.0 changed the project and node pipeline format. It cannot read or automatically convert v0.2.9 and earlier projects. Keep the older application to export finished photos, or create a v0.3.3 project and import the originals again. Read the [upgrade guide](../releases/upgrade-guide.md).

Continue with the [interface](./interface-overview.md) and [first edit](./first-edit.md).
