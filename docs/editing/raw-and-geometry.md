# 输入、RAW 解码与几何

先确认输入，再修正构图。RAW 解码（RAW Decode）和几何（Geometry）作用于整张照片，不随当前调色节点切换。

## RAW：相机白平衡与去马赛克

![相机白平衡与镜头校正](/img/tutorial-v0.3.3/raw-white-balance.webp)

*Windows Release v0.3.3 实机：相机白平衡与镜头校正。*

![镜头、去马赛克与高光重建](/img/tutorial-v0.3.3/raw-decode.webp)

*Windows Release v0.3.3 实机：镜头、去马赛克与高光重建。*

1. 打开照片，进入 `RAW 解码（RAW Decode）`。
2. 检查相机白平衡起点，再按需要修改色温与色调。
3. 在 `方法（Method）` 选择去马赛克方式。RCD 是 Bayer 的默认方式；神经引擎（Neural Engine）支持 Bayer 和 Fujifilm X-Trans，X-Trans 默认使用神经网络路径。算法变化后放大检查细纹、边缘与伪色。
4. 需要恢复过曝区域时尝试 `启用高光重建（Enable Highlight Reconstruction）`，对比高光颜色与边缘，发现伪影时重新评估是否启用。

RAW 白平衡根据相机数据处理输入；`外观（Look） → 白平衡（White Balance）` 是节点中的创意颜色调整。相同开尔文（Kelvin）数字在两页不保证相同效果，见[色彩教程](./tone-and-color.md)。

带嵌入色彩配置的 DNG 可应用 HueSatMap、LookTable 等信息；线性 DNG 也是支持的输入。具体相机兼容改进见[逐版记录](../releases/upgrade-guide.md)。

## 位图：输入色彩（Input Color）与输入配置文件（Input Profile）

v0.3.2 起，JPEG、PNG、TIFF、OpenEXR 可导入编辑。打开这些文件时，输入区显示 `输入色彩（Input Color） / 输入配置文件（Input Profile）`，取代 RAW 解码和相机白平衡控件。

默认先用“自动（元数据）”，英文界面显示为 `Auto (metadata)`：软件读取可用的内嵌 ICC、PNG 色彩信息、EXR 色度等信息，并转换到 ACES 工作流程。页面会显示输入色彩依据。没有配置时不要只凭扩展名猜色域；已知文件编码与自动识别不符时，再选择正确的输入配置。

OpenEXR 以及 PQ / HLG 图像会标记为 HDR。JPEG 已经包含相机或其他软件的成像处理，重新进入工作流程不会恢复丢失的 RAW 高光信息。位图需要创意冷暖调整时使用外观（Look）白平衡。

## 镜头校正

在 `镜头校正（Lens Calibration）` 检查自动识别结果，必要时启用 `启用镜头校正（Enable Lens Calibration）`，按品牌、型号搜索并手动选镜头。不要选择“看起来相近”的配置代替未知型号；先看直线、边缘与构图是否正确。

自动识别使用照片元数据，校正能力取决于所匹配的镜头资料。可用重置操作撤回手动选择。v0.3.0 将镜头校正集中到 RAW 解码（RAW Decode），并修复安装版的 Lensfun 数据与 Nikon 镜头识别问题。

## 裁剪与旋转

![裁剪框、构图网格与几何参数](/img/tutorial-v0.3.3/geometry.webp)

![裁剪与旋转参数](/img/tutorial-v0.3.3/geometry-controls.webp)

*Windows Release v0.3.3 实机：裁剪框、构图网格与几何参数。*

1. 打开 `几何（Geometry）`，选择 `宽高比（Aspect Ratio）`，或使用自定义宽高比例。
2. 在画面上移动、缩放裁剪框；也可调整裁剪 X（Crop X） / 裁剪 Y（Crop Y） / 裁剪宽度（Crop Width） / 裁剪高度（Crop Height）。
3. 调整旋转（Rotation），观察最终边界。
4. 确认后在历史（History）检查步骤；需要恢复时使用 `重置裁剪和旋转（Reset crop and rotation）` 或撤销。

v0.3.1 起，裁剪框就是输出图像：先裁剪再旋转，会旋转已裁出的画面。裁剪保持在照片范围内，旋转裁剪避免空白角。每次裁剪修改记为历史步骤，比例随照片保存。

这会改变部分旧旋转裁剪的外观。升级后先检查有裁剪的成片，再批量导出。复制几何会传递构图设置，跨横竖构图时应先验证一张目标照片。
