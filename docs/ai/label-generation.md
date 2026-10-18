---
sidebar_position: 4
---

# AI 标签生成

版本范围：v0.3.3。文件夹导入可包含 RAW 与 JPEG / TIFF / PNG / OpenEXR，先在[导入确认框](../library/import-and-organize.md)核对文件类型与数量，再决定是否生成标签。

激活本地模型后，Alcedo Studio 可以为图像生成内容标签。标签由本机视觉模型推理得到，用于描述图像的主要内容，也可以作为语义搜索与检查器 `按标签（By Labels）` 筛选的依据。

本页介绍本地标签流程。API 供应商生成的图像描述、评分和评分理由属于另一条流程，请查看 [API 供应商配置](./provider-configuration.md)。

## 导入时的询问

导入图像时，如果项目已经激活本地模型且导入偏好为 `总是询问（Always Ask）`（默认），会弹出 `使用 AI 分析图像内容？（Use AI to analyze image content?）`：

- **生成（Generate）**：为这批图像生成标签。对话框随后切换为 `正在生成语义标签（Generating semantic labels）`，显示环形进度、已处理数量、已用时间与预计剩余时间；处理中可以点击 `取消（Cancel）`。
- **跳过（Skip）**：跳过本次生成，图像正常导入，不产生标签。
- **记住我的选择（Remember My Choice）**：勾选后按本次选择记忆，并同步更新本地 AI 设置中的导入偏好。

如果导入偏好为 `总是生成（Always）`，导入后直接生成；为 `总是跳过（Always Skip）`，则不生成也不询问。偏好可在 `设置（Settings）→ 本地内容识别（Local Content Recognition）→ 导入（Import）` 修改。

如果项目尚未激活本地模型，导入时会弹出 `设置用于分析图像的 AI 模型（Set up an AI model to analyze images）`，点击 `设置模型（Set up model）` 前往本地 AI 设置；点击 `暂不（Not now）` 则只跳过本次生成。

## 手动生成与重新生成

在 `本地内容识别（Local Content Recognition）` 的 `AI 内容识别（AI content recognition）` 区块中：

- 顶部统计显示当前相册的 `图像（Images）`、`已含标签（With labels）` 和 `需生成标签（Need labels）`。
- `生成（Generate）` 只为还没有标签的图像生成。
- `重新生成（Regenerate）` 忽略已有标签，为相册内所有图像重新生成，适合更换本地模型后统一重打标签。
- 生成期间按钮变为 `取消（Cancel）`，下方显示进度和剩余时间估计。

## 查看标签

生成完成后，标签可以在以下位置查看：

- 缩略图列表 / 网格的每张图像下方。
- 右侧 `图像（Image）` 检查器顶部的信息条；有可显示标签时，会列出相应内容。
- 右侧 `相册（Album）` 检查器的 `按标签（By Labels）` 区域，点击标签筛选图像。

## 注意

- 标签质量取决于本地模型；不同模型变体可能给出不同的标签集合。
- 更换本地模型后建议使用 `重新生成（Regenerate）` 统一更新。
- 标签生成需要本地模型处于 `已激活（Active）` 状态，API 供应商的 API key 不会让本地标签流程自动可用。
- 生成速度受 CPU、GPU、内存、图像数量和模型大小影响。
