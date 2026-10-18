# Build from source

Check out v0.3.3 to reproduce these tutorials. Main may include later work. These commands come from source guidance/presets; the application was not compiled during this documentation update.

## Checkout

```bash
git clone --recursive https://github.com/zidage/AlcedoStudio.git
cd AlcedoStudio
git checkout v0.3.3
git submodule update --init --recursive
```

Install CMake, Ninja, the platform C++ toolchain, Qt Quick and required dependencies. Follow the [tagged build guide](https://github.com/zidage/AlcedoStudio/blob/v0.3.3/docs/build_from_source.md) and [presets](https://github.com/zidage/AlcedoStudio/blob/v0.3.3/CMakePresets.json) for vcpkg/Homebrew, DuckDB extensions, Qt paths and packaging resources.

## Windows

After preparing Visual Studio 2022, Qt and dependencies, use the environment wrapper. Adjust the Qt path:

```powershell
cmd /c scripts\msvc_env.cmd --preset win_debug -DCMAKE_PREFIX_PATH="D:/Qt/6.9.3/msvc2022_64/lib/cmake"
cmd /c scripts\msvc_env.cmd --build --preset win_debug --target alcedo_main alcedo_cli --parallel 8
ctest --test-dir build/debug --output-on-failure
```

Use win_release for release and win_release_test for Release tests. Packaging has signing/resource requirements; a Debug build is not installed-Release verification.

## macOS

After installing documented dependencies:

```bash
cmake --preset macos_debug
cmake --build --preset macos_debug --target alcedo_main alcedo_cli
```

Use macos_debug_tests for tests and macos_release / macos_package for packaging. Override ALCEDO_QT_PREFIX for a custom Qt location.

## Check the result

Find the actual alcedo_main and alcedo-cli outputs and inspect session.describe for application/protocol version. GUI runtime checks, CLI schema, unit tests and documentation-site builds verify different things. See the [production source map](./tutorial-source-map.md).
