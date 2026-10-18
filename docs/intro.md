---
sidebar_position: 1
---

# Alcedo Studio 使用教程

教程以 **v0.3.3** 为操作基线，按当前 QML 界面从项目入口讲到导出，覆盖 v0.2.x 至 v0.3.3 的功能变化。Alcedo Studio 使用项目管理照片引用、编辑记录与命名版本，编辑不会修改原始照片。

## 第一次使用

1. [安装与环境准备](./getting-started/installation.md)：安装程序、GPU 后端和项目兼容性。
2. [界面总览](./getting-started/interface-overview.md)：欢迎页、顶部工具栏、图库和编辑器。
3. [第一次编辑](./getting-started/first-edit.md)：从创建项目到导出一张照片。

## 按工作流程继续

| 阶段 | 教程 |
| --- | --- |
| 导入与选片 | [文件类型、集合、评分、筛选、排序与分组](./library/import-and-organize.md) |
| 输入与构图 | [RAW 解码、位图输入色彩、镜头、裁剪与旋转](./editing/raw-and-geometry.md) |
| 局部调整 | [节点、蒙版组、径向与渐变蒙版](./editing/nodes-and-masks.md) |
| 影调与颜色 | [曝光、曲线、两种白平衡、选择性色彩与色轮](./editing/tone-and-color.md) |
| 胶片与自定义外观 | [LUT 包、浏览器、强度、输入与输出编码](./editing/lut-library.md) |
| 输出外观与细节 | [ACES / OpenDRT、HDR、示波器与后期处理](./editing/display-and-effects.md) |
| 保存与复用 | [历史、版本（Versions）、复制与部分粘贴](./getting-started/edit-history-and-versions.md)、[A/B 对比](./editing/comparison.md) |
| 交付图像 | [导出队列、预设、命名、尺寸与元数据](./export/workflow.md) |
| 辅助管理 | [本地 AI 与 API 分析](./ai/overview.md)、[搜索](./ai/search.md)、[智能体与 CLI](./automation/cli.md) |
| 日常设置 | [语言、主题、缓存、快捷键、更新与后台任务](./settings/preferences.md) |

## 从旧版升级

先看[版本变化与升级指南](./releases/upgrade-guide.md)。**v0.3.0 起无法打开 v0.2.9 及更早的项目，也不会自动转换。** v0.3.1 的 LUT 分发、裁剪与色轮，以及 v0.3.2 的柔光曲线也会影响旧工作流或画面。

侧栏“逐版更新记录”保留 v0.2.0–v0.3.3 的完整功能、性能与修复说明，每版都附对应教程。开发者可查阅[源码与教程对应关系](./developer/tutorial-source-map.md)，确认生产 QML 入口和文档依据。
