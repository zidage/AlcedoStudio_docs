# 第一次编辑

本页将提供一个简单的示例，展示如何使用 Alcedo Studio 进行基本的图像编辑。我们将从导入一张 RAW 图像开始，进行一些基础调整，并最终导出编辑后的结果。

## 新建/打开项目

进入项目管理界面后，首先点击“创建新项目”按钮，选择一个合适的*文件夹*作为项目文件的存储位置。输入项目名称后，点击“确定”完成项目的初始化。

<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/create_new_proj.png').default} alt="新建项目界面：创建项目入口" width="60%" />
	<img src={require('./tutorial_img/project_name.png').default} alt="新建项目界面：填写项目名称" width="60%" />
</div>

## 图片导入/筛选

### 导入图片

新建完成后，点击”导入图片“，在操作系统的文件选择对话框中选择一张或多张 RAW 图像文件，点击“打开”完成导入。导入的图像将显示在相册页面中。

<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/import_2.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

导入完成后，若项目已激活 AI 模型，软件会弹出“Use AI to analyze image content?”对话框，询问是否为这批图像生成内容标签；若尚未激活模型，则会弹出“Set up an AI model to analyze images”引导你前往设置安装并激活模型。你可以选择“Generate”生成、“Skip”跳过，或勾选“Remember My Choice”记住本次选择。相关设置与完整说明见 [AI 模型管理](../ai/model-management.md) 与 [AI 标签生成](../ai/label-generation.md)。

### 图片选择

等待导入完成后，可以双击打开相册中的图像进入编辑页面，或是拖动选框多选图像后点击上方“添加所选”将图片添加到导出队列中。

<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/select_1.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

### 图片筛选

同时，可以点击右侧统计面板中的某个参数（如拍摄日期）来查看该日期的所有图像，或是点击某个相机型号来查看该型号的所有图像。此时仍可以继续点击
更多的参数来进行多维度的筛选，直到找到想要编辑的图像。

<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/select_2.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

## 基础调整

双击一张图像进入编辑页面后，左侧是编辑历史，右侧是参数调整面板，中间是图像预览区域。我们可以在右侧的参数面板中进行各种调整，如曝光、对比度、白平衡等。调整时，图像预览会实时更新以反映当前的调整效果。
<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/edit_1.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

### 预览缩放
双击图像图像可放大，按住 `Ctrl/Command` 键并滚动鼠标滚轮可以缩放预览, 左上角会显示当前缩放比例，最大支持 800% 的放大。

### 编辑选项

整体操作接近于其他主流的 RAW 编辑软件，建议直接上手尝试，以下仅对本软件的特色功能进行介绍。

用户可通过双击滑动条来重置参数。

### LUT 调整

“色调”面板的第一项即为 LUT 调整，用户可以加载一个 `ACEScc->ACEScc` 的 .cube 文件来进行色调调整。用户可将自己制作或转换的 LUT 文件放在 `bin/LUTs` 目录下，重新打开编辑器后即可在下拉菜单中选择使用。

<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/edit_2.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

### 显示变换

在“显示变换”面板中，用户可以选择不同的显示变换算法来调整图像的显示效果。当前提供了 ACES 2.0 和 OpenDRT 两种算法，用户可以根据自己的需求选择使用。

<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/edit_3.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

对于 OpenDRT 来说，用户还可以调整其中的预设参数来获得不同的显示效果。调整时，图像预览会实时更新以反映当前的调整效果。

<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/edit_4.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

### RAW 解码设置

在“RAW 解码”面板中，用户可以选择是否启用高光恢复以及镜头校正功能。启用高光恢复后，软件会尝试从 RAW 数据中恢复过曝区域的细节；启用镜头校正后，软件会根据镜头的特性对图像进行畸变校正。

**高光重建关：**
<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/edit_5.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

**高光重建开：**
<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/edit_6.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>
注意，高光重建可能会造成伪影以及色调偏离，建议在需要恢复过曝细节的情况下开启，并仔细检查恢复效果。

镜头矫正会根据元数据自动识别镜头型号并进行校正（Auto模式），如果用户觉得校正效果不理想，也可以手动选择镜头型号或是关闭校正。

### HDR 设置

在“显示变换”面板中，用户可以选择 HDR 规范中的编码色域和 EOTF 来开启 HDR 编辑模式（如 P3D65 + ST 2084 PQ）。注意，在 Windows 下，HDR 暂时不会被正确预览，但仍然会被正确导出，建议在需要 HDR 输出的情况下开启并进行编辑，导出后在支持 HDR 的设备上查看效果。而在 macOS 下，HDR 编辑模式可以被正确预览导出。

<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/edit_7.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

## 导出设置

完成编辑后，关闭编辑器面板回到相册页面，所有改动都会被自动保存。选中想要导出的图像后点击“添加所选”将其添加到导出队列中。

<div style={{display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap'}}>
	<img src={require('./tutorial_img/export_1.png').default} alt="新建项目界面：创建项目入口" width="60%" />
</div>

右侧可选择导出的参数，如格式、分辨率等。点击“开始导出”后，软件会将编辑后的图像按照设置进行导出。导出完成后，导出队列不会被清空，用户可以继续添加新的图像进行导出，或是手动清空队列。

### 注意：

- 当前版本的导出功能的一些参数组合并不会起效，比如图中的 JPEG + 16-bit 设置就没有实际意义，建议用户在导出前仔细检查设置以确保符合预期。
- Ultra HDR 格式仅支持 JPEG 8bit 输出，最终图像可能会因为色彩空间和位深的限制而出现色调偏离，建议在需要极致亮度表现的情况下使用，并仔细检查导出效果。