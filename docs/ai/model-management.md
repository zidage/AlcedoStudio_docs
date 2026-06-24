---
sidebar_position: 2
---

# AI 模型管理

AI 功能依赖一个本地的 CLIP 模型，模型不会随安装包分发，需要联网下载。下载、激活以及镜像源的选择都在设置中完成。

## 打开 AI 设置

点击工具栏的“Settings”按钮，在左侧分类中选择“AI”；或在导入图像时弹出的“Set up an AI model to analyze images”提示中点击“Set up model”，软件会直接跳转到 AI 分类。

AI 分类包含三个区块：AI content recognition（相册标签统计与生成入口）、Model（模型选择、下载与激活）、Import（导入时的标签生成偏好）。

## 选择模型

在“Model”区块顶部的下拉框中选择模型。下拉框列出可下载的模型变体（不同体积与精度），选中后状态卡会显示其显示名与总大小。如果不确定选哪个，先用默认项即可，后续可以随时切换并重新下载。

## 设置下载目录

“Download directory”显示模型文件的存放路径。点击右侧的文件夹图标可打开“Select Model Download Folder”选择一个目录。模型文件较大，建议选一个空间充足、便于长期保留的位置，不要随意删除该目录下的文件。

## 选择镜像源

“Source”下拉框用于选择下载源，共四个选项：

- **HF Mirror**：面向国内网络环境的 Hugging Face 镜像源，访问 huggingface.co 较慢或不稳定时优先使用。
- **Hugging Face**：官方源，网络条件良好、能顺畅访问 huggingface.co 时使用，文件最全、最及时。
- **Sufy CDN**：CDN 分发的镜像源，可作为前两者的备选，在某些地区或网络下速度更好。
- **Custom**：自定义下载地址。选择后会出现一个输入框，填入完整的下载根地址（形如 `https://example.com`）即可，适合指向自建或内网镜像。

选择建议：先按所处网络选最顺手的源——能直连 Hugging Face 且速度尚可就用 Hugging Face；国内访问困难就用 HF Mirror；如果两者都慢，再试 Sufy CDN 或填入自定义地址。下载失败或卡住时，最直接的排查方式就是换一个源重试。

## 下载与激活

设置好模型、目录与源之后：

1. 点击“Check”刷新所选模型的当前状态，状态卡会显示“Not downloaded”等待下载。
2. 点击“Download”开始下载。状态卡会实时显示进度：百分比、已下载 / 总字节数、当前正在下载的文件名、下载速度与预计剩余时间。下载过程中按钮变为“Cancel”，可随时中断。
3. 下载完成后，状态卡显示“Activate to generate labels”，表示模型已就位但尚未激活。
4. 点击“Activate”激活模型。激活时会显示“Activating…”，软件在本地准备模型运行时；完成后状态卡显示绿色的“Active”，此时即可生成标签与使用语义搜索。

### 模型状态卡

状态卡是模型状态的唯一来源，左上的圆点颜色对应不同状态：

- 红色 / “Not downloaded”：未下载。
- 强调色 / “Downloading X%” 或 “Activating…”：下载或激活进行中（圆点会脉动），并附带进度条与实时数据。
- 灰色 / “Activate to generate labels”：已下载但未激活。
- 绿色 / “Active”：已激活，可正常使用 AI 功能。

右侧会显示模型的总大小（下载 / 激活进行中时隐藏，因为进度条已显示已下载量）。空闲时，状态卡还会以一行小字显示控制器返回的状态信息（如错误、安装路径等）。

### 其他操作

- **Check**：重新检查所选模型的本地状态。
- **Download / Cancel**：开始或取消下载。
- **Delete**：删除已下载的模型文件（按钮为红色，删除后状态回到“Not downloaded”）。
- **Activate**：激活已下载的模型。

## 导入时的标签生成偏好

“Import”区块的“是否生成标签”下拉框控制导入图像时是否自动生成标签：

- **Always**：每次导入都直接生成，不再询问。
- **Always Ask**：每次导入都弹出“Use AI to analyze image content?”询问。
- **Always Skip**：导入时不生成标签，同时也不会弹出“Set up an AI model to analyze images”的模型引导提示。

该偏好与导入流程的关系详见 [AI 标签生成](./label-generation.md)。

## 排查

- 下载失败或长时间无进度：换一个镜像源后重新 Download；自定义源请确认地址可达且目录结构与官方一致。
- 下载完成但 Activate 失败：检查下载目录是否完整、磁盘空间是否充足，必要时 Delete 后重新下载。
- 已激活但标签生成仍不可用：确认状态卡为“Active”；若仍有问题，可在 AI 分类中点击“Check”刷新状态。