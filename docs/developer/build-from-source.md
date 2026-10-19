---
sidebar_position: 2
---

# 从源码编译与构建指南

本文档介绍如何在 Windows 与 macOS 上从源码编译构建 Alcedo Studio 及其配套工具 `alcedo-cli`。

---

## 获取源码与第三方依赖

Alcedo Studio 使用 Git Submodule 管理部分第三方库（如 LibRaw 等），克隆时需添加 `--recursive` 标志：

```bash
git clone --recursive https://github.com/zidage/AlcedoStudio.git
cd AlcedoStudio
git submodule update --init --recursive
```

### 必备基础环境
- **C++20 兼容编译器**：
  - Windows: Visual Studio 2022 (MSVC v143 或更高，推荐 17.8+)
  - macOS: Xcode 15.0+ (Clang 15+)
- **CMake** 3.28 或更高版本
- **Ninja** 构建工具
- **Qt 6.8+ / 6.9+**（必须包含 `qtdeclarative`、`qtquick`、`qtshadertools` 模块）
- **GPU 开发套件**：
  - Windows: NVIDIA CUDA Toolkit 12.0+（如启用 CUDA 模块）或 OpenCL 1.2 兼容 SDK
  - macOS: macOS 13.3+ SDK (包含 Metal 支持)

---

## Windows 构建步骤 (MSVC + CUDA / OpenCL)

在 Windows 上推荐使用仓库存放的 `msvc_env.cmd` 脚本初始化 Visual Studio 环境与 CMake 预设：

```powershell
# 1. 配置 Debug 构建预设 (根据本机实际路径替换 CMAKE_PREFIX_PATH)
cmd /c scripts\msvc_env.cmd --preset win_debug -DCMAKE_PREFIX_PATH="D:/Qt/6.9.3/msvc2022_64/lib/cmake"

# 2. 编译主程序与 CLI 工具
cmd /c scripts\msvc_env.cmd --build --preset win_debug --target alcedo_main alcedo_cli --parallel 8

# 3. 运行目标模块单元测试 (例如曝光算子测试)
ctest --test-dir build/debug -R test_exposure_op --output-on-failure
```

### Release 与安装打包
```powershell
# 配置并编译 Release
cmd /c scripts\msvc_env.cmd --preset win_release -DCMAKE_PREFIX_PATH="D:/Qt/6.9.3/msvc2022_64/lib/cmake"
cmd /c scripts\msvc_env.cmd --build --preset win_release --parallel 8

# 打包安装程序 (WiX / NSIS)
powershell -ExecutionPolicy Bypass -File scripts/package_windows.ps1 -BuildDir build/release -Preset win_release
```

---

## macOS 构建步骤 (Apple Silicon Metal)

```bash
# 1. 配置与构建 Debug
cmake --preset macos_debug
cmake --build --preset macos_debug --target alcedo_main alcedo_cli

# 2. 运行测试套件
ctest --test-dir build/macos-debug --output-on-failure

# 3. Release 打包为 DMG 镜像
cmake --preset macos_release
cmake --build --preset macos_release
cd build/macos-release && cpack -G DragNDrop
```

---

## 验证与输出路径

编译完成后，二进制目标产物位于对应的构建目录中：
- 主应用：`build/<preset>/bin/alcedo_main`
- 命令行工具：`build/<preset>/bin/alcedo-cli`

运行 `alcedo-cli --help` 或 `alcedo-cli schema` 即可验证底层 RPC 自动化服务接口是否正常就绪。
