---
sidebar_position: 1
---

# AI 功能概览

本页以 v0.3.3 的设置与图库入口为准。本地标签与语义能力从 v0.2.6 延续，高级 API 描述和评分在 v0.2.7 完善；v0.3.3 的智能体 / CLI 用于操作应用，见[智能体教程](../automation/cli.md)，不代替这两条 AI 配置流程。

Alcedo Studio 目前提供两条 AI 能力链：一条在本机运行视觉模型，用于内容标签和语义搜索；另一条通过你配置的 API 供应商，完成更完整的图像描述、评分和评分理由。两者的设置入口、数据路径和使用场景都不同。

## 文档入口

- [API 供应商配置](./provider-configuration.md)：创建 API 供应商配置、保存 API key 或 Codex OAuth、选择模型并运行高级内容分析。
- [本地 AI 模型管理](./model-management.md)：下载、选择镜像源、激活本地视觉模型。
- [AI 标签生成](./label-generation.md)：为图像自动生成内容标签，可在导入时触发，也可手动生成或重新生成。
- [AI 搜索与模糊搜索](./search.md)：在全局搜索中按自然语言语义检索图像，或使用模糊 / 精确匹配。

## 两条能力链的区别

| 能力链 | 设置入口 | 数据路径 | 主要结果 |
| --- | --- | --- | --- |
| 本地 AI | `本地内容识别（Local Content Recognition）` | 图像在本机由已激活模型处理 | 内容标签、标签筛选、语义搜索 |
| API 供应商 | `高级内容分析（Advanced Content Analysis）` | 选中的图像发送到所选 API 供应商 | 描述、评分、评分理由 |

本地模型不会随安装包分发，需要联网下载。下载来源和存储位置在 `本地内容识别（Local Content Recognition）` 中设置；激活后，标签生成与语义搜索都在本机完成，图像不会因为这两项功能上传到 API 供应商。

API 分析不依赖本地 CLIP 模型，但需要先配置一个可用的 API 供应商、凭据和模型。高级内容分析只处理当前选中的照片，并可能产生 API 供应商费用。详细流程见 [API 供应商配置](./provider-configuration.md)。

## 前置条件

使用本地 AI 时，需要在 `本地内容识别（Local Content Recognition）` 中下载并激活模型。未激活时，语义搜索不可用，导入时的标签生成也会提示先设置本地模型。

使用 API 供应商时，需要在 `高级内容分析（Advanced Content Analysis）` 中：

1. 创建一个 API 供应商配置。
2. 按 API 供应商要求保存 API key，或完成 `OpenAI Codex OAuth` 登录。
3. 选择模型并点击 `测试并刷新（Test & Refresh）` 确认连接。
4. 打开项目，选中至少一张照片，再从左侧工具区进入 `高级内容分析（Advanced Content Analysis）`。

## 界面语言说明

AI 设置与操作支持中英文切换，例如 `测试并刷新（Test & Refresh）`、`分析所选图像（Analyze Selected）`、`描述（Description）` 和 `评分（Rating）`。教程同时列出中文名称与英文原文；模型名、供应商模板名和 API 字段值保留原名。
