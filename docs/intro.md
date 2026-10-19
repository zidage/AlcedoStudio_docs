---
sidebar_position: 1
---

# 欢迎使用 Alcedo Studio

Alcedo Studio 是一款面向摄影与数字暗房工作流的非破坏性 RAW 照片处理与资产管理系统。软件采用 C++20 与 Qt 6 QML 构建，支持 GPU 硬件加速（Windows 平台支持 CUDA 与 OpenCL 1.2，macOS 平台支持 Metal），结合场景线性色彩管理与交互式编辑流水线。

---

## 核心设计理念

理解 Alcedo Studio 的底层设计逻辑，有助于你更高效地掌握其工作流程：

```text
[ 原始文件 (只读) ] 
       │ 引用路径
       ▼
[ DuckDB 元数据与版本树 (.alcd) ] ── (非破坏性编辑历史 / 命名版本分支)
       │
[ GPU 场景线性色彩流水线 ]
  ├─ 1. RAW 解码与镜头校正 (LibRaw / RCD / 神经引擎 / Lensfun)
  ├─ 2. 几何裁剪与旋转 (保持画面边界)
  ├─ 3. 节点式色彩分级 (Develop 基础显影 + 多个局部蒙版 Color Grade 节点)
  ├─ 4. 显示变换 (ACES 2.0 / OpenDRT 色调映射与色彩空间转换)
  └─ 5. 屏幕后期处理 (柔光 Diffusion / 细节 Clarity / 胶片颗粒 Grain / 光晕 Halation)
       │
[ 实时预览视口 (RHI) / 后台批量导出队列 (SDR / Ultra HDR) ]
```

1. **绝对的非破坏性编辑（Non-Destructive Editing）**  
   原始 RAW 或位图文件在磁盘上仅作为只读资源被引用，软件绝不修改源文件。所有的导入记录、星级评分、虚拟集合、参数调整与历史版本，均统一物化在基于 DuckDB 驱动的 `.alcd` 单文件项目数据库中。
2. **场景线性色彩科学（Scene-Referred Color Science）**  
   不同于传统软件直接在显示空间（如 sRGB）做破坏性像素拉伸，Alcedo Studio 全程在场景线性宽色域空间（ACES 2.0 工作流）中进行物理光学与色彩运算。无论高光压缩、阴影提亮还是曲线调整，都能保持自然的色彩过渡与真实的高光滚降。
3. **节点式分级与蒙版组（Node-Based Grading & Mask Groups）**  
   打破单层滑块的局限，你可以构建灵活的调色节点链条。每个调色节点都可以独立挂载参数、3D LUT 以及包含羽化与反相的局部蒙版（径向椭圆、线性渐变），实现精细的图层化局部调整。
4. **Git 式提交图版本控制（DAG Commit & Branching Versions）**  
   每次释放滑块都会生成一次原子提交；你可以随时“从当前提交创建分支”保存不同色调方向（如“温暖日落”、“高反差黑白”），并在多个版本间无缝切换或进行像素级 A/B 对比。
5. **端侧隐私 AI 与智能体自动化（On-Device AI & Agent Automation）**  
   内置本地离线视觉模型（基于 ONNX Runtime 的 CLIP 嵌入模型），在本地完成图像内容标签识别与自然语言语义检索，不向外部网络上传图像数据；同时提供配套的 `alcedo-cli` 命令行工具，支持外部脚本或智能体通过本地 RPC 协同调色与执行批处理流水线。

---

## 教程导航

你可以按照实际摄影工作流依次阅读以下章节：

### 快速上手
- [安装与硬件加速配置](./getting-started/installation.md)：安装程序、GPU 加速检测与 `.alcd` 项目结构。
- [界面总览与交互布局](./getting-started/interface-overview.md)：单窗口工作区、工具栏、图库浏览与编辑面板分布。
- [完成你的第一次编辑](./getting-started/first-edit.md)：从新建项目、导入 RAW、调色到导出成片的完整全流程。
- [编辑历史、版本管理与调整复用](./getting-started/edit-history-and-versions.md)：掌握非线性撤销重做、分支版本管理与参数选择性粘贴。

### 资产管理与选片
- [图库管理：导入、集合、评分与多维筛选](./library/import-and-organize.md)：文件格式支持、虚拟相册、星级打分、动态分组与时间线筛选。

### 深入色彩与画质编辑
- [输入解码与几何构图](./editing/raw-and-geometry.md)：RAW 解码引擎（RCD / 神经引擎）、位图输入色彩、镜头畸变校正与智能裁剪旋转。
- [调色节点、图层与局部蒙版](./editing/nodes-and-masks.md)：节点流水线逻辑、图层堆栈、径向蒙版与渐变蒙版的绘制与微调。
- [影调、曲线与色彩控制](./editing/tone-and-color.md)：曝光与局部影调、相机白平衡与 CAT02 创意白平衡、选择性色彩与 Lift/Gamma/Gain 色轮。
- [3D LUT 库与色彩空间匹配](./editing/lut-library.md)：官方胶片模拟包、自定义 `.cube` 导入、输入/输出色彩空间编码转换与强度融合。
- [显示变换、HDR 与后期质感](./editing/display-and-effects.md)：ACES 2.0 与 OpenDRT 色彩管理、Ultra HDR 预览、GPU 示波器与胶片柔光/颗粒/光晕。
- [A/B 效果对比](./editing/comparison.md)：分屏对比、画中画与多版本视觉效果校验。

### 输出交付
- [导出工作流：批处理队列、预设与元数据](./export/workflow.md)：导出参数配置、智能命名模式、尺寸重置、SDR 与 Ultra HDR 输出及 GPS 隐私控制。

### 智能化与自动化
- [AI 功能总览](./ai/overview.md)：端侧轻量化模型与智能检索架构。
- [本地 AI 模型管理](./ai/model-management.md)：下载源选择、本地模型激活与推理设置。
- [AI 标签生成](./ai/label-generation.md)：导入自动识别与相册批量重打标签。
- [AI 自然语言与多维搜索](./ai/search.md)：基于文本的自然语义检索与 EXIF 结构化过滤。
- [智能体交互与 CLI 命令行](./automation/cli.md)：使用 `alcedo-cli` 进行无头批量批处理与协同自动化修图。

### 设置与底层架构
- [首选项与系统设置](./settings/preferences.md)：缓存清理、快捷键定制与签名在线更新。
- [版本变更与升级指南](./releases/upgrade-guide.md)：历史版本演进与项目升级须知。
- [开发者架构文档](./developer/architecture-overview.md)：核心 C++ / QML 架构、流水线实现与源码映射。
