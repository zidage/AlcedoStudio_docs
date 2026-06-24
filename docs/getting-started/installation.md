# 安装与环境准备

本页用于说明 Alcedo Studio 的安装，重点覆盖 Windows/CUDA 与 macOS/Metal 两条主路径。

## Windows 安装

- 确保系统满足以下最低要求：
  - Windows 10 64-bit
  - CUDA处理后端：
    - NVIDIA GPU（支持 CUDA 12.8 及以上），支持 Pascal 架构或更高
    - NVIDIA 驱动版本 570.68 及以上
  - OpenCL处理后端：
    - 现代 GPU，最好 8GB 显存及以上，支持 OpenCL 1.2 及以上 
- 前往 [Github Releases](https://github.com/zidage/AlcedoStudio/releases) 页面下载最新的 Windows 安装包并解压。
- 运行解压后的 `bin/alcedo_main.exe` 启动程序或桌面快捷方式。

## macOS 安装

- 确保系统满足以下最低要求：
  - 具备 Apple Silicon SoC 以及最好 16GB 内存。
  - macOS 13.3 及以上版本。
- 前往 [Github Releases](https://github.com/zidage/AlcedoStudio/releases) 页面下载最新的 macOS 安装包并安装到 Applications。
- 当前版本的 macOS 安装包尚未签名，首次运行时会被系统阻止，请自行寻找解决方案。如有安全性顾虑，建议自行本地构建或等待后续版本的正式签名发布。
- 运行安装后的 `Alcedo Studio` 启动程序。