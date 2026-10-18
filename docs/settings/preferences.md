# 设置、后台任务与软件更新

顶部 `设置（Settings）` 打开设置。v0.3.3 的分类可滚动，包含语言/主题（Language / Theme）、默认行为（Default Behavior）、缓存（Cache）、本地内容识别（Local Content Recognition）、高级内容分析（Advanced Content Analysis）、加速（Acceleration）、更新（Updates）、键盘（Keyboard）、LUT（LUTs）和关于（About）。

## 语言、主题与默认行为

![语言、主题与设置分类](/img/tutorial-v0.3.3/settings.webp)

*Windows Release v0.3.3 实机：语言、主题与设置分类。*

语言/主题（Language / Theme）选择界面语言与主题。本文同时列出中文名称和英文原文，便于对照不同语言的界面。

默认行为（Default Behavior）设置在锁定调色节点上添加蒙版的处理：每次询问（Ask every time）、新建图层后绘制（Create a new layer, then draw）、在当前节点上绘制（Draw on the current node）。第一层含默认调整，蒙版也会限制这些调整，详见[节点与蒙版](../editing/nodes-and-masks.md)。

## 缓存（Cache）：缩略图缓存

可查看条目数（Entries）、大小（Size）、命中 / 未命中（Hits / misses），选择缓存目录，开关磁盘缓存（Disk cache），设置每项目最大条数与 JPEG 质量（JPEG quality）。维护操作包含清除当前项目缓存（Clear current project）、清除全部缓存（Clear all cache）和刷新（Refresh）。

清缓存后缩略图需要重新生成；它不是删除原片或清除编辑记录。v0.3.1 起，每项目保留自己的磁盘缩略图缓存。按页面提供的确认 / 应用方式保存修改。

## 加速（Acceleration）：图像处理后端

检查所选 CUDA / OpenCL / Metal 与当前平台是否匹配。后端在启动时确定，改变设置后需自行重启应用。不要把 AI 运行时选择与图像处理后端混为一项设置。平台与安装说明见[安装教程](../getting-started/installation.md)。

## 键盘（Keyboard）：自定义快捷键

![当前快捷键绑定](/img/tutorial-v0.3.3/keyboard.webp)

*Windows Release v0.3.3 实机：当前快捷键绑定。*

v0.3.0 加入快捷键设置。找到命令，在捕获控件中输入组合键，检查冲突提示；可逐项恢复默认，修改立即生效。

本教程涉及的快捷键以本机键盘（Keyboard）页面和按钮提示为准，尤其是 macOS 的修饰键与用户改过的绑定。文本输入框中的快捷键可能执行文本编辑，先把焦点放到相应工作区。

## 更新（Updates）：检查、下载与安装

自 v0.2.9 起支持签名自动更新：

1. 打开更新（Updates），查看当前版本 / 构建、可用版本和发行说明。
2. 下载更新，查看进度；需要时取消，失败后根据提示重试。
3. 下载与校验成功后按页面操作安装 / 重启。先完成正在执行的项目操作。
4. 重启后确认版本。页面中发行说明按应用语言显示。

下载成功不等于已经安装。稳定与测试更新源分开，版本可用性以当前更新源为准。

## 后台任务与停止智能体

v0.3.2 将底部任务栏改为顶部状态灯，任务运行或出错时可展开。也可从左侧后台任务（Background Tasks） / 编辑器后台任务（Tasks）打开任务列表。

导入、导出、AI 分析、模型下载、评分、粘贴和删除可能在后台运行。查看进度、结果与错误；只有任务支持时才可取消。取消后检查已经完成的项目数量。

v0.3.3 的智能体会话固定在任务区顶部，列出执行的操作。控制期间编辑控件被锁定，仍可平移、缩放、查看示波器。点击停止（Stop）立即收回控制权；需要继续时，再明确告知智能体。见[智能体教程](../automation/cli.md)。

## 资源与关于

- [本地内容识别（Local Content Recognition）](../ai/model-management.md)：本地模型、下载与导入标签偏好。
- [高级内容分析（Advanced Content Analysis）](../ai/provider-configuration.md)：API 供应商、凭据、模型与分析选项。
- [LUT（LUTs）](../editing/lut-library.md)：官方包和用户库。
- 关于（About）：版本、文档与 GitHub 入口。
