# v0.2.x → v0.3.3：版本变化与升级指南

操作教程以 v0.3.3 为准。下面逐版说明功能归属，并链接完整更新记录；性能和修复保留在各版记录中，不把历史测量当成本机保证。

## 升级前先处理这几项

| 变化 | 你需要做什么 |
| --- | --- |
| v0.3.0 项目格式不兼容 v0.2.9 及以前 | 保留旧程序与项目；用旧版导出成片，或新建项目重新导入。没有自动迁移 |
| v0.3.0 移除合并（Merge） | 使用选择参数的复制 / 粘贴；粘贴生成新版本（Version） |
| v0.3.1 LUT 不再打包 | 到设置（Settings） → LUT（LUTs）安装官方包；自定义库另行准备 |
| v0.3.1 裁剪和色轮变化 | 检查旋转裁剪、Gamma 和 Gain 的旧编辑外观 |
| v0.3.2 柔光曲线变化 | 检查接近白色区域的光晕 |
| v0.3.3 导出预设替换命名预设 | 重新保存需要的完整导出方案，核对目标目录 |
| v0.3.3 默认导出 GPS | 分享时明确取消 GPS，或选网页（Web） / 社交媒体（Social Media） / 电子邮件（Email） |
| v0.3.3 RAW 时间修复仅用于新导入 | 已有图库时间不会自动改正 |

## v0.2.x：从跨平台编辑到单窗口工作流

| 版本 | 主要变化与当前教程 |
| --- | --- |
| [v0.2.0](./v0.2.0.md) | Metal / macOS、基础 HDR、语言、示波器、比例与重置；见[安装](../getting-started/installation.md)、[显示与效果](../editing/display-and-effects.md) |
| [v0.2.1](./v0.2.1.md) | CUDA X-Trans；见 [RAW](../editing/raw-and-geometry.md) |
| [v0.2.2](./v0.2.2.md) | Nikon HE 恢复、线性 DNG、高光重建、LUT / 外观（Look）、ICC / EXIF、本地 AI 初步能力；见 [RAW](../editing/raw-and-geometry.md)、[AI](../ai/overview.md) |
| [v0.2.3](./v0.2.3.md) | 改名 Alcedo Studio、界面与 LUT 搜索、实验 WebGPU、ONNX、色彩矩阵与预览优化；见[界面](../getting-started/interface-overview.md) |
| [v0.2.4](./v0.2.4.md) | OpenCL、集合、评分、全局搜索、缓存、项目包与历史；实验 WebGPU 退出；见[图库](../library/import-and-organize.md) |
| [v0.2.5](./v0.2.5.md) | 局部明暗处理、选择性色彩、批量调整传递、HDR 导出；见[影调](../editing/tone-and-color.md)、[导出](../export/workflow.md) |
| [v0.2.6](./v0.2.6.md) | 颗粒与光晕、标签与语义搜索、多模型下载激活、Nikon HE / HE* 原生解码；见[模型](../ai/model-management.md)、[后期](../editing/display-and-effects.md) |
| [v0.2.7](./v0.2.7.md) | API 描述 / 评分、供应商配置与凭据、OAuth、后台任务、字段搜索；见 [API](../ai/provider-configuration.md)、[任务](../settings/preferences.md) |
| [v0.2.8](./v0.2.8.md) | 全 QML 单窗口、GPU 神经网络去马赛克、提交图历史与恢复日志、文件夹递归导入；见[界面](../getting-started/interface-overview.md)、[历史](../getting-started/edit-history-and-versions.md) |
| [v0.2.9](./v0.2.9.md) | 签名更新、检查器导出、命名 / 尺寸 / 元数据、图库编辑器切换与胶片带；见[导出](../export/workflow.md)、[设置](../settings/preferences.md) |

## v0.3.x：节点、LUT 库、位图与智能体

| 版本 | 主要变化与教程 |
| --- | --- |
| [v0.3.0](./v0.3.0.md) | 新项目格式、节点与径向 / 渐变蒙版、蒙版组、调色白平衡、新对比度、快捷键、结构化搜索、统一 GPU 引擎；见[节点](../editing/nodes-and-masks.md)、[色彩](../editing/tone-and-color.md)、[搜索](../ai/search.md) |
| [v0.3.1](./v0.3.1.md) | LUT 下载包与浏览器、强度、柔光、A/B 对比、图库排序分组、欢迎页概览、批量评分、RAW / 几何复制、新裁剪；见 [LUT](../editing/lut-library.md)、[对比](../editing/comparison.md)、[图库](../library/import-and-organize.md) |
| [v0.3.2](./v0.3.2.md) | 位图输入色彩、导入类型选择、LUT 编码与记忆、编辑时间排序 / 分组、顶部任务灯、LUT 包移除；见[输入](../editing/raw-and-geometry.md)、[LUT](../editing/lut-library.md) |
| [v0.3.3](./v0.3.3.md) | CLI / GUI 智能体、完整导出预设、GPS / EXIF / ICC、HDR 最长边、全选与后台删除、部分粘贴和时间修复；见[智能体](../automation/cli.md)、[导出](../export/workflow.md)、[历史](../getting-started/edit-history-and-versions.md) |

## 补丁标签与构建说明

主仓库还保留 v0.2.0-hotfix、v0.2.3b、v0.2.4-Release、v0.2.8-Preview 等标签。这些不是另一套当前操作界面；需要复现某个补丁时，应检出其确切标签并查看提交差异，不将主版本说明当成每个安装包的逐项测试结果。

v0.2.9 的构建 2014 / 2015 还记录了导出检查器、签名更新、内嵌发行说明，以及 Windows 改为仅发行安装程序，见 [v0.2.9 完整记录](./v0.2.9.md)。

## 文档核对范围

本次按 v0.3.3 标签的生产 QML 加载链与 C++ 参数校验整理教程，完整发行说明取自主仓库。未运行所有平台的 Release GUI，也未重新测量性能。[源码对应表](../developer/tutorial-source-map.md)记录确切提交、已加载面板和后续主分支差异，便于复查。
