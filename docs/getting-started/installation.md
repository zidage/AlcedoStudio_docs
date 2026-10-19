---
sidebar_position: 1
---

# 安装与环境准备

本文介绍 Alcedo Studio 的系统需求、安装步骤以及首次启动时的 GPU 硬件加速配置。

---

## 系统与硬件需求

为保证 4K/8K 图像预览与导出的处理效率，请确保你的设备满足以下要求：

| 平台 | 操作系统 | 推荐硬件与加速后端 |
| --- | --- | --- |
| **Windows** | Windows 10 / 11 64-bit (x64) | **NVIDIA GPU**（计算能力 6.0+，GTX 10 系列及以上 / RTX 系列），启用 **CUDA** 后端；<br/>其他独显或核显可使用 **OpenCL 1.2** 后端。 |
| **macOS** | macOS 13.3 (Ventura) 或更高版本 | **Apple Silicon**（M1 / M2 / M3 / M4 系列芯片），原生搭载 **Metal** 统一内存加速。 |

:::tip 关于内存与存储建议
建议配备至少 16 GB 内存（处理 4500 万像素以上高解析度 RAW 建议 32 GB 以上）。图像库与缓存推荐存放在 NVMe 固态硬盘上，以降低缩略图加载与大图解码的 I/O 延迟。
:::

---

## 下载与安装

请前往官方发布渠道 [GitHub Releases](https://github.com/zidage/AlcedoStudio/releases) 下载最新安装包：

### Windows 安装
1. 下载最新版 Windows 安装包（例如 `AlcedoStudio-Setup-x64.exe`）。
2. 运行安装程序，按向导选择安装路径完成安装。
3. 从开始菜单或桌面快捷方式启动 **Alcedo Studio**。

### macOS 安装
1. 下载适合 Apple Silicon 的 `.dmg` 镜像文件。
2. 双击打开镜像，将 **Alcedo Studio** 拖入系统的 `Applications`（应用程序）文件夹。
3. 在启动台或访达中打开软件。

---

## 检查并配置 GPU 硬件加速

Alcedo Studio 的核心图像渲染引擎依托 GPU 着色器与并行计算核。首次启动时，建议检查加速状态：

1. 打开顶部菜单栏的 `设置（Settings）`，或在欢迎页点击右上角齿轮图标。
2. 在左侧分类中选择 `加速（Acceleration）`。
3. 查看当前激活的图像处理后端：
   - **CUDA (Windows)**：针对 NVIDIA 显卡优化，基于原生 CUDA 核函数执行 FP32 浮点运算，支持神经网络去马赛克（Neural Engine）与多尺度滤波渲染。若系统检测到驱动不匹配或环境缺失，页面会给出明确的诊断日志。
   - **Metal (macOS)**：利用 Apple Silicon 的统一内存架构与 Metal 计算着色器，减少主机与设备间的数据拷贝。
   - **OpenCL (Windows / 通用)**：基于 OpenCL 1.2 标准实现，支持 AMD Radeon、Intel Arc 以及各类兼容显卡，提供基础硬件兼容性。
4. **生效规则**：若切换了加速后端，请点击应用并**重启软件**，底层计算上下文与编译管线将在下次启动时重新加载。

---

## 认识 `.alcd` 项目文件

Alcedo Studio 使用 `.alcd` 单文件项目管理你的工作空间：

- **引用型目录结构**：项目文件仅保存照片在磁盘上的物理路径、EXIF 缓存、调色参数、蒙版和 Git 式提交历史，**不会复制或打包原始图像文件**。
- **请勿移动源照片**：请始终妥善保管原始 RAW / 位图文件的存储位置。若移动或重命名了源文件所在的硬盘文件夹，项目将提示资源未找到。
- **备份与共享**：备份工程时，只需备份 `.alcd` 文件以及对应的原始照片文件夹。

---

## 可选资源与配套工具

安装完成后，你还可以根据实际工作需求配置以下资源：

1. **官方 3D LUT 胶片模拟包**  
   为减小安装包体积，官方调色 LUT 库采用按需分发。进入 `设置（Settings） → LUT（LUTs）`，点击下载并校验官方推荐的电影色彩与经典胶片模拟包。详见 [LUT 库与胶片模拟](../editing/lut-library.md)。
2. **本地 AI 离线视觉模型**  
   如果你希望使用离线图像内容自动识别与自然语言语义搜索，可在 `设置（Settings） → 本地内容识别（Local Content Recognition）` 下载轻量化视觉模型。详见 [本地模型管理](../ai/model-management.md)。
3. **命令行工具 `alcedo-cli`**  
   Windows 下随安装程序释放于软件主程序同级目录，macOS 位于应用包内。可用于编写无头批处理脚本或连接 GUI 协同自动化工作。详见 [智能体与 CLI 教程](../automation/cli.md)。

---

环境准备就绪后，请继续阅读 [界面总览](./interface-overview.md)，熟悉软件的现代化操作界面。
