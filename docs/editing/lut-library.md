---
sidebar_position: 4
---

import InterfaceMock from '@site/src/components/InterfaceMock';
import {LutBakeFlow} from '@site/src/components/SourceMocks';

# 3D LUT 库、胶片模拟与色彩空间编码

3D LUT（三维颜色查找表）用于在调色节点中应用颜色变换。Alcedo Studio 支持官方 LUT 包和用户导入的 `.cube` 文件，并可设置 LUT 的输入编码、输出编码和强度

v0.3.5 还提供 **显示变换 → 胶片印片**，可选择胶片、印片材料与扫描设置。详见 [胶片模拟](./film-simulation.md)

---

## 官方胶片包与自定义 LUT 库管理

官方胶片模拟 LUT 包可在设置中下载，安装时会校验数字签名：

<InterfaceMock kind="lut-packages" />

### 1. 下载与安装官方 LUT 包
1. 打开设置 → LUT，找到官方 LUT 包区域。
2. 每张卡片对应一个完整包，例如 Spectral Film LUT 或 Spektrafilm LUT。Portra 等片种是包内的 LUT 条目。
3. 卡片显示原始项目、LUT 数量、包版本、下载大小和安装状态。根据卡片当前状态，点击下载、更新或修复。
4. 下载内容校验后安装到 LUT 库。已安装的卡片还提供移除包；移除后，使用其中 LUT 的照片将无法加载该外观。

示意展示两种包状态；应用中的数量、版本与大小来自包清单。

### 2. 导入第三方与自定义 `.cube` 文件
如果你拥有调色师定制或商业购买的 `.cube` 查找表：
1. 在 `设置 → LUT` 中查看当前的 `LUT 库路径（LUT library path）`。
2. 点击 `在文件资源管理器中打开`（macOS 为 `在访达中打开`），将你的 `.cube` 文件或文件夹放入用户目录中。
3. 点击 `刷新（Refresh）`，自定义 LUT 将自动整理并呈现在浏览器的 `用户（User）` 分类下。

---

## LUT 输入与输出色彩空间编码

输入与输出表示原始 LUT 所需的输入编码及其产生的输出编码。这两个设置用于变换和重采样 LUT 本身。

<LutBakeFlow />

需要准备时，软件把 ACEScc/AP1 网格点转换到所选输入编码，采样原始 LUT，再将采样结果从所选输出编码转换回 ACEScc/AP1。这些操作被烘焙为合成 LUT 并缓存。原表已经使用工作编码且定义域为单位范围时，可以直接使用原表。

渲染照片时，调色管线查询准备好的 LUT，再按强度混合结果。

<InterfaceMock kind="lut-controls" />

### 常见编码配置指南
- **官方包**：以包内具体 LUT 的说明或已记录编码为准。要求 ACEScc 输入与输出的 LUT，才将两项设为 ACEScc。
- **电影机 Log LUT（如 ARRI LogC3、Sony S-Log3、Canon Log 2）**：
  - **输入编码（Input）**：选择对应的相机 Log 曲线（如 `ARRI LogC3`）。
  - **输出编码（Output）**：按照 LUT 附带的说明选择。
- **其他 LUT**：按照 LUT 附带的说明选择输入和输出编码；输入和输出编码可能不同。
- **为此 LUT 记住该设置（Remember for this LUT）**：
  勾选此项后，系统会在本地数据库中牢牢记住该 LUT 专用的输入/输出色彩配对。下次再次调用该 LUT 时，自动装载正确的色彩空间，彻底免除重复配置的烦恼。

:::caution 强度不能掩盖编码错误
如果加载 LUT 后画面反差异常，请先核对 LUT 要求的输入与输出编码，再调整强度
:::

---

## 浏览、应用与强度混合

进入编辑器，在左侧工具轨打开 `LUT（LUTs）` 抽屉：

<InterfaceMock kind="lut-browser" />

1. **精准检索**：
   - 可按类别（Category：黑白、彩色负片、反转片、电影卷）、来源（Source）或品牌（Brand）进行筛选。
   - 在搜索框输入关键词（如“Portra 400”、“5207”）快速定位。
   - 点击星标按钮将常用 LUT 加入收藏。
2. **挂载与应用**：
   - 确保当前激活了正确的调色节点，在网格或列表中单击某个 LUT，视口画面将即刻呈现色彩质感；再次点击已选中项可安全卸载。
3. **混合强度（Strength）**：
   - 在右侧 LUT 面板中拖动 `强度` 滑块（0%–100%），调整 LUT 应用前后结果的线性混合比例。

---

有关显示输出和后期处理，请参阅 [显示变换、HDR 与后期质感](./display-and-effects.md)。
