# 从源码构建

为复现本教程，请检出 v0.3.3；主分支可能已包含后续功能。以下命令来自主仓库的构建指南与 CMake 预设，本次文档更新未执行软件编译。

## 获取源码

```bash
git clone --recursive https://github.com/zidage/AlcedoStudio.git
cd AlcedoStudio
git checkout v0.3.3
git submodule update --init --recursive
```

需要 CMake、Ninja、对应平台 C++ 工具链、Qt Quick 及项目依赖。具体 Qt 路径、vcpkg / Homebrew 依赖、DuckDB 扩展和打包资源以[该标签的构建指南](https://github.com/zidage/AlcedoStudio/blob/v0.3.3/docs/build_from_source.md)及 [CMakePresets.json](https://github.com/zidage/AlcedoStudio/blob/v0.3.3/CMakePresets.json)为准。

## Windows 示例

安装 Visual Studio 2022 工具链、对应 Qt 与依赖后，通过包装脚本准备环境；下面的 Qt 路径需要按本机修改。

```powershell
cmd /c scripts\msvc_env.cmd --preset win_debug -DCMAKE_PREFIX_PATH="D:/Qt/6.9.3/msvc2022_64/lib/cmake"
cmd /c scripts\msvc_env.cmd --build --preset win_debug --target alcedo_main alcedo_cli --parallel 8
ctest --test-dir build/debug --output-on-failure
```

发布构建使用 win_release；需要 Release 测试时用 win_release_test。发布预设还涉及签名与发行资源要求，不能把本机 Debug 构建称作正式安装版验证。

## macOS 示例

按标签指南安装依赖后：

```bash
cmake --preset macos_debug
cmake --build --preset macos_debug --target alcedo_main alcedo_cli
```

测试使用 macos_debug_tests；打包使用 macos_release / macos_package。自定义 Qt 安装可按指南覆盖 ALCEDO_QT_PREFIX。

## 核对构建结果

分别确认 alcedo_main 和 alcedo-cli 的实际输出路径，再通过 CLI 的 session.describe 核对应用版本与协议。GUI 实机测试、CLI schema、单元测试和文档站构建是不同验证范围。QML 教程使用的生产入口见[源码对应表](./tutorial-source-map.md)。
