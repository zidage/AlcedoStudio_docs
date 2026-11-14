---
sidebar_position: 1
---

import InterfaceMock from '@site/src/components/InterfaceMock';

# 输入解码、色彩配置与几何构图

本页介绍 **RAW 解码、位图输入色彩**以及**裁剪与旋转**。

---

## RAW 照片：相机白平衡与去马赛克

使用彩色滤镜阵列（Color Filter Array, CFA）的相机记录的 RAW 数据需要经过解码和去马赛克，才能生成彩色图像。

<InterfaceMock kind="raw-white-balance" />

### 1. 相机白平衡（Camera White Balance）
- **拍摄时白平衡（As Shot）**：软件读取相机记录的白平衡信息，在 RAW 处理完成后，对相机 RGB 图像应用白平衡增益。
- **与外观白平衡的区别**：相机白平衡作用于 RAW 处理完成后的相机 RGB 图像；[外观（Look）面板](../editing/tone-and-color.md)中的 CAT02 白平衡在调色节点中应用。

### 2. 去马赛克算法（Demosaicing Method）
方法选择器提供 Default、Legacy 和 Neural Engine。X-Trans 是传感器的滤色阵列类型，不是独立的算法选项。

- **Default（默认）**：根据传感器选择方法。全分辨率下，Bayer 使用 Legacy，X-Trans 使用 Neural Engine。
- **Legacy（传统插值）**：Bayer 使用 RCD；X-Trans 使用传统邻域插值，先从邻近采样估算绿色，再按加权色差重建红、蓝通道。这是与双线性插值思路相近的简单插值实现。
- **Neural Engine（神经网络）**：使用神经网络重建 Bayer 或 X-Trans 数据。

缩小分辨率解码使用 Legacy。比较算法时，请使用同一张照片的全分辨率结果。

### 3. 高光重建（Highlight Reconstruction）
部分颜色通道发生高光截断时，勾选 `启用高光重建` 可使用未截断通道的信息估计缺失数据。结果取决于源文件和截断情况。

### 4. 镜头光学校正（Lens Calibration）
Alcedo Studio 深度集成了 Lensfun 镜头数据库：
- **全自动识别**：根据照片 EXIF 自动匹配相机卡口与具体镜头型号。
- **镜头校正**：使用镜头配置文件校正畸变、暗角和横向色差。
- **手动覆盖**：老镜头或转接镜头如果未写入完整元数据，可点击选择器按品牌手动挑选镜头型号。

---

## 位图输入色彩空间（Raster Color Management）

Alcedo Studio 支持导入 JPEG、TIFF、PNG 以及 OpenEXR。打开非 RAW 照片时，右侧会自动呈现 `输入色彩（Input Color） / 输入配置文件（Input Profile）`：

<InterfaceMock kind="raw-decode" />

- **自动元数据检测（Auto metadata）**：默认选项。引擎自动解析位图内嵌的 ICC 配置文件、PNG 色度块或 OpenEXR 线性原色。
- **转换至场景线性空间**：根据输入色彩配置将位图转换到 ACES 场景线性空间，以便使用调色节点和显示变换。
- **HDR 位图支持**：针对包含 PQ / HLG 曲线的 10 位以上 HEIF/TIFF 或 16/32 位半浮点 OpenEXR，系统会自动标记为 HDR 输入并保留高动态范围数据。

---

## 几何构图：裁剪与旋转

裁剪和旋转设置画面的构图，可以在编辑历史中撤销或重新调整。

<InterfaceMock kind="geometry" />

1. **构图宽高比（Aspect Ratio）**：
   - 包含标准画幅比例：`原始（Original）`、`1:1`、`4:5`（社交平台竖图）、`16:9`、`3:2` 等。
   - 勾选锁定比例后，拖动裁剪框角点将严格维持几何长宽比；点击自定义比例可按需设定特殊的画幅。
2. **交互裁剪手柄**：
   - 画布上提供三等分参考辅助线（Rule of Thirds）。
   - 直接在画面中拖拽四角或边框改变构图，也可以在右侧面板通过精确像素数值调整。
3. **水平校准与旋转（Rotation）**：
   - 拖动旋转滑块校准倾斜的地平线。
   - **边界限制**：旋转时，裁剪矩形会自动调整以保持在图像边界内。
4. **重置与历史**：
   - 点击 `重置裁剪和旋转（Reset crop and rotation）` 即可恢复满幅画面。

---

有关节点和蒙版，请参阅 [调色节点、图层与局部蒙版](./nodes-and-masks.md)。
