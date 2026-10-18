# 安装与环境准备

本教程适用于 v0.3.3。安装包入口为 [GitHub Releases](https://github.com/zidage/AlcedoStudio/releases/tag/v0.3.3)。需要重现本教程时，请选择该版本；源码主分支可能已经包含后续改动。

## Windows

1. 使用 Windows 10 / 11 x64，下载 Windows 安装程序并完成安装。自 v0.2.9 构建 2015 起，Windows 发行版提供安装程序，不再提供便携 ZIP。
2. 通过开始菜单或桌面快捷方式启动 Alcedo Studio。不要继续按旧教程寻找解压后的 `bin/alcedo_main.exe`。
3. 在 `设置（Settings） → 加速（Acceleration）` 检查图像处理后端。NVIDIA 显卡可使用 CUDA；其他支持的显卡使用 OpenCL。CUDA 需要支持计算能力 6.0 及以上的显卡和兼容驱动；启动检测会报告 CUDA 不可用的原因。
4. 修改后端后，按页面提示自行重启应用，后端才会改变。

## macOS

使用 M1 或更新（Apple Silicon）和 macOS 13.3 或更新版本。下载对应的安装镜像，将应用安装到 Applications，再启动 Alcedo Studio；图像处理使用 Metal。

## 准备项目与资源

项目是一个 `.alcd` 文件，保存照片引用、编辑历史与版本。照片仍位于原路径，请同时保留项目和原始文件；移动项目文件不等于迁移全部照片。

- 官方 LUT **不随安装包分发**。需要胶片模拟时，到 `设置（Settings） → LUT（LUTs）` 下载包，见 [LUT 教程](../editing/lut-library.md)。
- 本地 AI 模型需要另外下载与激活，见[本地模型管理](../ai/model-management.md)。不使用 AI 也可以导入、编辑和导出。
- `alcedo-cli` 随应用安装，Windows 位于程序旁，macOS 位于应用包内，见 [CLI 教程](../automation/cli.md)。

## 项目兼容性

v0.3.0 改变了项目与节点流水线格式，无法读取 v0.2.9 及以前的项目，也不提供自动迁移。保留旧版打开旧项目并导出成片，或在 v0.3.3 新建项目、重新导入原片。完整升级注意事项见[升级指南](../releases/upgrade-guide.md)。

安装后继续[界面总览](./interface-overview.md)和[第一次编辑](./first-edit.md)。
