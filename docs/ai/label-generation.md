---
sidebar_position: 3
---

# AI 标签生成

激活模型后，Alcedo Studio 可以为图像自动生成内容标签。标签由本地的 CLIP 模型对图像推理得到，用来描述图像的主要内容，并作为语义搜索与检查器“By Labels”筛选的依据。

## 导入时的询问

导入图像时，如果项目已激活模型且导入偏好为 Always Ask（默认），会弹出“Use AI to analyze image content?”对话框：

- **Generate**：为这批图像生成标签。对话框随后切换为“Generating semantic labels”，显示环形进度、已处理 / 总数，以及已用时间与预计剩余时间。处理中可点击“Cancel”中断。
- **Skip**：跳过本次生成，图像正常导入，不产生标签。
- **Remember My Choice**：勾选后按本次选择记忆，后续导入不再询问，并同步更新设置中的“是否生成标签”偏好。

如果导入偏好为 Always，导入后直接生成、不再询问；为 Always Skip，则不生成也不询问。偏好可在设置中修改，详见 [AI 模型管理](./model-management.md)。

如果项目尚未激活模型，导入时不会出现上述询问，而是弹出“Set up an AI model to analyze images”提示，点击“Set up model”跳转到设置的 AI 分类，点击“Not now”则跳过、本次不生成标签。

## 手动生成与重新生成

在设置的 AI 分类中，“AI content recognition”区块用于手动管理标签：

- 顶部三张卡片显示当前相册的图像统计：Images（图像总数）、With labels（已有标签）、Need labels（仍需生成）。
- **Generate**：只为还没有标签的图像生成标签（即 Need labels 那部分）。
- **Regenerate**：忽略已有标签，为相册内所有图像重新生成。适合更换模型或希望统一重打标签时使用。
- 生成过程中按钮变为“Cancel”，下方显示进度条、已处理 / 总数与剩余时间估计。

## 查看标签

生成完成后，标签会出现在以下位置：

- 缩略图列表 / 网格的每张图像下方，作为标签行显示。
- 右键图像选择“Details”打开详情对话框，其中以 Primary、Related、Also Matched 三类卡片展示该图像的语义标签，分别对应主标签、相关标签与次要匹配标签。
- 右侧检查器面板的“By Labels”区域，点击某个标签即可筛选出带有该标签的图像。

## 注意

- 标签质量取决于所选模型；不同模型变体可能给出不同的标签集合，更换模型后建议用 Regenerate 统一重打。
- 标签生成需要模型处于“Active”状态，未激活或未下载模型时无法生成。
- 生成是本地推理，速度受 CPU / GPU 与图像数量影响；大批量生成时可参考对话框中的剩余时间估计。