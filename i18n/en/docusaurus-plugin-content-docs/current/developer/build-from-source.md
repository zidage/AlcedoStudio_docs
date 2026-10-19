---
sidebar_position: 2
---

# Building from Source

This guide explains how to compile and build Alcedo Studio and `alcedo-cli` from source on Windows and macOS.

---

## Source Acquisition & Dependencies

Alcedo Studio manages specific third-party components (such as LibRaw) via Git submodules. Always clone with `--recursive`:

```bash
git clone --recursive https://github.com/zidage/AlcedoStudio.git
cd AlcedoStudio
git submodule update --init --recursive
```

### Toolchain Prerequisites
- **C++20 Compiler**:
  - Windows: Visual Studio 2022 (MSVC v143 or newer, 17.8+ recommended)
  - macOS: Xcode 15.0+ (Clang 15+)
- **CMake** 3.28 or newer
- **Ninja** build system
- **Qt 6.8+ / 6.9+** (including `qtdeclarative`, `qtquick`, `qtshadertools`)
- **GPU Toolkits**:
  - Windows: NVIDIA CUDA Toolkit 12.0+ (for CUDA backend) or OpenCL 1.2 compatible SDK
  - macOS: macOS 13.3+ SDK (with Metal support)

---

## Windows Build Steps (MSVC + CUDA / OpenCL)

Use the repository environment wrapper `scripts/msvc_env.cmd` to initialize Visual Studio tooling with CMake presets:

```powershell
# 1. Configure win_debug preset (replace CMAKE_PREFIX_PATH with your local Qt directory)
cmd /c scripts\msvc_env.cmd --preset win_debug -DCMAKE_PREFIX_PATH="D:/Qt/6.9.3/msvc2022_64/lib/cmake"

# 2. Compile main executable and CLI tool
cmd /c scripts\msvc_env.cmd --build --preset win_debug --target alcedo_main alcedo_cli --parallel 8

# 3. Execute targeted unit tests (e.g., exposure operator test)
ctest --test-dir build/debug -R test_exposure_op --output-on-failure
```

### Release & Packaging
```powershell
# Configure and build Release
cmd /c scripts\msvc_env.cmd --preset win_release -DCMAKE_PREFIX_PATH="D:/Qt/6.9.3/msvc2022_64/lib/cmake"
cmd /c scripts\msvc_env.cmd --build --preset win_release --parallel 8

# Package installer (WiX / NSIS)
powershell -ExecutionPolicy Bypass -File scripts/package_windows.ps1 -BuildDir build/release -Preset win_release
```

---

## macOS Build Steps (Apple Silicon Metal)

```bash
# 1. Configure and compile Debug
cmake --preset macos_debug
cmake --build --preset macos_debug --target alcedo_main alcedo_cli

# 2. Run test suites
ctest --test-dir build/macos-debug --output-on-failure

# 3. Package DMG installer
cmake --preset macos_release
cmake --build --preset macos_release
cd build/macos-release && cpack -G DragNDrop
```

---

## Verification & Output Artifacts

Compiled binaries are output to the active build directory:
- Main executable: `build/<preset>/bin/alcedo_main`
- CLI tool: `build/<preset>/bin/alcedo-cli`

Run `alcedo-cli --help` or `alcedo-cli schema` to verify that automation services and RPC schemas are functional.
