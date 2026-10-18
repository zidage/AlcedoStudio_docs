# LUT 库、官方包与编码

v0.3.1 起，安装包不再包含 LUT。先管理库，再在编辑器选定节点应用效果。旧教程中的“复制到 bin/LUTs 并重启”已不是当前入口。

## 下载与维护官方包

![LUT 库目录与分类](/img/tutorial-v0.3.3/lut-settings.webp)

*Windows Release v0.3.3 实机：LUT 库目录与分类。*

![已安装的官方 LUT 包](/img/tutorial-v0.3.3/lut-packages.webp)

*Windows Release v0.3.3 实机：已安装的官方 LUT 包。*

1. 打开 `设置（Settings） → LUT（LUTs）`，检查 `LUT 库（LUT library）` 目录。
2. 在 `官方 LUT 包（Official LUT Packages）` 选择包并下载（Download），等待下载、签名校验与安装完成。
3. 看到已安装（Installed）后进入编辑器。包需要更新、修复时使用更新（Update） / 修复（Repair）；失败时查看错误再重试（Retry）。
4. v0.3.2 起可确认移除包。引用其中 LUT 的照片会暂时失去该效果，重新安装后恢复。

更换库目录时读清确认内容：选择空目录会先复制并验证库，再移除旧位置的已复制文件；选择已有文件的目录会使用其内容，旧库文件不会自动搬过去。Windows 使用“在文件资源管理器中打开（Open in File Explorer）”，macOS 使用“在访达中打开（Open in Finder）”查看实际目录；刷新（Refresh）重建清单。

## 加入自己的 LUT

将支持的 `.cube` 放进浏览器提示的用户目录，或使用库提供的导入操作，再刷新。嵌套文件夹也会被识别；用户 LUT 在用户（User）类别中出现。不要把未知编码的 LUT 直接当 ACEScc 使用。

项目保存 LUT 关联。文件缺失时会显示提示，照片暂时不应用该 LUT；恢复文件后自动重新生效。迁移机器时还需准备相应的 LUT 资源。

## 浏览、应用与强度

![LUT 筛选与浏览器](/img/tutorial-v0.3.3/lut-browser.webp)

*Windows Release v0.3.3 实机：LUT 筛选与浏览器。*

1. 在节点（Nodes） / 图层（Mask Groups）选择目标调色节点。
2. 打开左侧 `LUT（LUTs）`，按类别（Category）、来源（Source）、品牌（Brand）、印片（Print）筛选，或输入名称搜索。收藏按钮只显示收藏；印片（Print）可选无印放胶片。
3. 在网格 / 列表点击 LUT 应用，再点已应用项可移除。
4. 打开右侧 LUT 页，将强度（Strength）设为 0–100%；用移除（Remove）移除关联。

浏览器底栏显示当前 LUT，并会定位到已应用项。打开 RAW 解码（RAW Decode）、显示变换（Display Transform）或后期处理（Post Processing）时，浏览器仍面向上次选中的调色节点；先核对显示的目标节点名称。

## 输入（Input） / 输出（Output）：让 LUT 接收正确的颜色

![LUT 强度、输入与输出编码](/img/tutorial-v0.3.3/lut-controls.webp)

*Windows Release v0.3.3 实机：LUT 强度、输入与输出编码。*

v0.3.2 加入输入与输出编码，复制调整时也会带上它们。

- **场景编码**：例如 ACES、相机 Log。应选择 LUT 制作者规定的输入和输出。
- **显示编码**：例如 sRGB、BT.1886、PQ、HLG。显示输入先经 ACES 2.0 输出变换送入 LUT；显示输出再经 ACES 2.0 逆向输出变换返回场景工作流程。
- 官方 LUT 包默认使用 ACEScc。自定义 LUT 的编码以其说明为准。

选择 LUT 后，在右侧输入（Input）与输出（Output）分别设定编码，观察亮度、饱和度和高光。编码选择错误常会造成明显的对比度或颜色偏差，强度（Strength）降低不能修正编码错误。

勾选 `为此 LUT 记住该设置（Remember for this LUT）`，库会记住该 LUT 的编码组合，在下次选择时应用。每次编码修改会进入当前照片的历史；它和全局显示变换（Display Transform）的输出设置用途不同。

## 一次完整练习

为同一照片建两个版本（Version）。一个使用官方胶片 LUT，另一个使用已知输入 / 输出编码的自定义 LUT；分别调强度，用[对比](./comparison.md)检查肤色与高光，再[导出](../export/workflow.md)。
