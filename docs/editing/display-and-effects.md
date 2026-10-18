# 显示变换、HDR、示波器与后期处理

色调（Tone） / 外观（Look） / LUT 在场景工作流程中完成调色，显示变换（Display Transform）决定画面如何显示，后期处理（Post Processing）在其后作用于整张图片。

## 显示变换（Display Transform）

![OpenDRT 与输出编码](/img/tutorial-v0.3.3/display-transform.webp)

*Windows Release v0.3.3 实机：OpenDRT 与输出编码。*

进入 `显示变换（Display Transform）`：

1. 在方法（Method）选择 ACES 2.0 或 OpenDRT。
2. 设置编码色域（Encoding Space）与编码 EOTF（Encoding EOTF），匹配目标输出色域与传递函数。
3. HDR 输出再核对峰值亮度（Peak Luminance）。
4. 使用所选算法提供的参数调整外观；OpenDRT 可选择外观（Look）、色调映射（Tonescale）、创意白点（Creative White）等。

切换显示变换会改变画面，不能把不同方法下的同一组参数看作相同结果。v0.3.3 修复 OpenDRT 对 Rec.709 / P3-D65 + sRGB 输出组合的支持。

## SDR 与 HDR

普通 SDR 交付可使用适合接收端的 sRGB 编码。HDR 需要匹配色域、PQ / HLG 等编码与目标亮度，最后在实际 HDR 显示设备上核对。

macOS 在支持的 HDR 显示设备上可预览 HDR。Windows 的窗口显示不应作为所有 HDR 输出的最终视觉验证；请导出后在支持该文件格式与 HDR 的查看器 / 设备检查。v0.3.3 的 A/B 对比暂不支持 HDR。

输入文件被标记为 HDR 与你选定的显示输出需要分别检查。导出面板为 HDR 队列提供单独的 Ultra HDR JPEG 质量、抖动和最长边设置，见[导出教程](../export/workflow.md)。

## 直方图与波形

右侧顶部可切换直方图（Histogram） / 波形图（Waveform）。直方图帮助观察亮度 / 通道分布；波形帮助定位画面横向位置上的明暗分布。边调曝光、高光或显示变换，边检查亮端和暗端，再回看画面，避免仅凭数值判断成片。

预览支持缩放和平移，适合（FIT）为适应画面，100% 对应像素比例；滚轮配合快捷键或触控板缩放，以设置中的实际绑定为准。检查细节时看接近 100% 的区域，再回适合（FIT）判断整体。快捷键可自定义，见[设置](../settings/preferences.md)。

## 后期处理（Post Processing）

![后期处理](/img/tutorial-v0.3.3/post.webp)

*Windows Release v0.3.3 实机：后期处理。*

v0.3.0 起，这些效果在显示变换之后对整张照片应用一次，不属于各个调色节点。

| 区块 | 控件与检查点 |
| --- | --- |
| 柔光（Diffusion） | 强度（Strength）：控制明亮光源周围的柔和扩散，检查白色边缘 |
| 细节（Detail） | 清晰度（Clarity）、锐化（Sharpen）：检查边缘光圈、细节与噪点 |
| 纹理（Texture） | 胶片颗粒（Film Grain）、光晕（Halation）：检查颗粒观感和高光周围的光晕 |

柔光在 v0.3.1 新增，支持 CUDA、OpenCL、Metal；v0.3.2 更换高光曲线，旧照片的白色附近光晕可能更柔和。胶片颗粒（Film Grain）与光晕（Halation）从 v0.2.6 延续到当前页面。

建议先完成主体曝光与颜色，再加入效果；用完整预览与导出检查强度。导出期间滑块的暂态预览值不会代替已经保存的编辑结果。
