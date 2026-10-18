# 第一次编辑

用一张照片完成 v0.3.3 的完整流程：创建项目、导入、调整、保留版本并导出。

## 1. 创建项目

![新建项目的名称和存储位置](/img/tutorial-v0.3.3/new-project.webp)

*Windows Release v0.3.3 实机：新建项目的名称和存储位置。*

启动后点击 `新建项目…（New Project…）`，输入 `项目名称（Project Name）`，选择 `存储位置（Storage Location）`，点击 `创建项目（Create Project）`。已有项目可通过 `打开项目…（Open Project…）` 或 `文件（File） → 加载项目（Load Project）` 打开。项目引用原片，请保留原片所在目录。

## 2. 导入一张照片

在左侧点击 `导入图像（Import Images）`，选择 RAW 文件。v0.3.2 起也支持 JPEG、PNG、TIFF、OpenEXR；位图导入后的输入设置与 RAW 不同。

等待导入任务完成，确认缩略图出现。若弹出 AI 标签提示，可以生成、跳过或先配置模型；标签不是编辑的前置条件。批量导入和文件类型选择见[图库教程](../library/import-and-organize.md)。

## 3. 检查输入与构图

双击缩略图进入编辑器。打开 `RAW 解码（RAW Decode）`，先检查相机白平衡、去马赛克与镜头识别。只有过曝区域确实需要恢复时才尝试高光重建，并放大检查伪影。

打开 `几何（Geometry）`，选择裁剪比例，在照片上调整裁剪框和旋转。几何作用于整张图，每次确认修改都会成为历史步骤。见[输入与几何](../editing/raw-and-geometry.md)。

## 4. 调整影调与颜色

![影调调整](/img/tutorial-v0.3.3/tone.webp)

*Windows Release v0.3.3 实机：影调调整。*

保持默认调色节点选中，进入 `色调（Tone）`：先调曝光，再按需要调高光（Highlights） / 阴影（Shadows）、白色色阶（Whites） / 黑色色阶（Blacks）与对比度。松开滑块后查看 `历史（History）` 是否增加记录；双击滑块可恢复该项默认值。

在 `外观（Look）` 调整饱和度与创意白平衡。这里的白平衡针对调色节点，与 RAW 解码（RAW Decode）中的相机白平衡用途不同。详细说明见[影调与色彩](../editing/tone-and-color.md)。

需要胶片外观时，先在 `设置（Settings） → LUT（LUTs）` 下载官方包，再打开左侧 `LUT（LUTs）` 浏览器选择 LUT，在右侧 LUT 页调整强度。自定义 LUT 还需匹配输入与输出编码，见 [LUT 教程](../editing/lut-library.md)。

## 5. 保存另一种处理并对比

打开 `版本（Versions）`，使用 `从当前提交创建分支（Branch from current commit）` 创建分支并命名，再尝试另一种颜色或曝光。两个版本会分别保留。

点击画面上的 `对比（Compare）` 看未调整 / 当前效果，或在版本（Versions）点击 `对比（Compare）` 选择两个版本。对比时编辑、撤销 / 重做与版本切换暂时不可用，结束后点击 `关闭（Close）`。HDR 输出暂不支持该对比模式。见[版本管理](./edit-history-and-versions.md)和[对比教程](../editing/comparison.md)。

## 6. 导出

1. 点击顶部 `图库（Library）`，选中刚才编辑的照片，点击 `加入队列（Add to Queue）`。
2. 打开右侧 `导出（Export）`，选择目标文件夹。
3. 普通 SDR 照片可以从 `网页（Web）` 或 `最高质量 JPEG（Maximum Quality JPEG）` 预设开始；检查格式、尺寸和文件名示例。
4. 核对 EXIF、ICC 和 GPS。v0.3.3 默认保留 GPS；不需要位置时取消 `EXIF 中的 GPS 位置（GPS location in EXIF）`，或使用网页（Web） / 社交媒体（Social Media） / 电子邮件（Email）预设。
5. 点击导出按钮，等待队列显示 `完成（Done）`，到目标目录检查文件。出现 `失败（Failed）` 时查看错误后重试。

HDR 照片使用独立的 HDR 导出设置。完整格式、位深、命名和预设说明见[导出教程](../export/workflow.md)。
