---
sidebar_position: 4
---

# AI 标签生成

激活本地模型后，Alcedo Studio 可以为图像生成内容标签。标签由本机视觉模型推理得到，用于描述图像的主要内容，也可以作为语义搜索与检查器 `By Labels（按标签）` 筛选的依据。

本页介绍本地标签流程。API 供应商生成的图像描述、评分和评分理由属于另一条流程，请查看 [API 供应商配置](./provider-configuration.md)。

## 导入时的询问

导入图像时，如果项目已经激活本地模型且导入偏好为 `Always Ask（总是询问）`（默认），会弹出 `Use AI to analyze image content?（使用 AI 分析图像内容？）`：

- **Generate（生成）**：为这批图像生成标签。对话框随后切换为 `Generating semantic labels（正在生成语义标签）`，显示环形进度、已处理数量、已用时间与预计剩余时间；处理中可以点击 `Cancel（取消）`。
- **Skip（跳过）**：跳过本次生成，图像正常导入，不产生标签。
- **Remember My Choice（记住我的选择）**：勾选后按本次选择记忆，并同步更新本地 AI 设置中的导入偏好。

如果导入偏好为 `Always（总是生成）`，导入后直接生成；为 `Always Skip（总是跳过）`，则不生成也不询问。偏好可在 `Settings（设置）→ Local Content Recognition（本地内容识别）→ Import（导入）` 修改。

如果项目尚未激活本地模型，导入时会弹出 `Set up an AI model to analyze images（设置用于分析图像的 AI 模型）`，点击 `Set up model（设置模型）` 前往本地 AI 设置；点击 `Not now（暂不）` 则只跳过本次生成。

## 手动生成与重新生成

在 `Local Content Recognition（本地内容识别）` 的 `AI content recognition（AI 内容识别）` 区块中：

- 顶部统计显示当前相册的 `Images`、`With labels` 和 `Need labels`。
- `Generate（生成）` 只为还没有标签的图像生成。
- `Regenerate（重新生成）` 忽略已有标签，为相册内所有图像重新生成，适合更换本地模型后统一重打标签。
- 生成期间按钮变为 `Cancel（取消）`，下方显示进度和剩余时间估计。

## 查看标签

生成完成后，标签可以在以下位置查看：

- 缩略图列表 / 网格的每张图像下方。
- 右键图像选择 `Details`，在详情对话框的 `Primary`、`Related`、`Also Matched` 区块中查看。
- 右侧检查器的 `By Labels` 区域，点击标签筛选图像。

## 注意

- 标签质量取决于本地模型；不同模型变体可能给出不同的标签集合。
- 更换本地模型后建议使用 `Regenerate` 统一更新。
- 标签生成需要本地模型处于 `Active` 状态，API 供应商的 API key 不会让本地标签流程自动可用。
- 生成速度受 CPU、GPU、内存、图像数量和模型大小影响。
