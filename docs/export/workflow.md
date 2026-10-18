# 导出：队列、预设、尺寸与元数据

v0.3.3 的导出位于图库右侧 `导出（Export）` 检查器。保存项目保留编辑记录，导出才会生成 JPEG 等独立图像文件。

## 1. 把照片加入队列

在图库（Library）选择照片，点击 `加入队列（Add to Queue）`；也可用导出队列（Export Queue）的加号加入当前选择。切到导出（Export）检查数量和文件名。清空队列只清队列，不会删除图库照片。

队列同时支持 SDR 和 HDR 照片，两类分别采用 SDR 导出（SDR Export） / HDR 导出（HDR Export）配置。先检查[显示变换](../editing/display-and-effects.md)，再决定交付方式。

## 2. 选择预设与目标目录

![完整导出预设菜单，底部含本机用户预设](/img/tutorial-v0.3.3/export-presets.webp)

*Windows Release v0.3.3 实机：完整导出预设菜单，底部含本机用户预设。*

v0.3.3 的完整导出预设取代旧的“文件名预设”：

| 预设 | 主要设置 |
| --- | --- |
| 标准（Standard） | 标准默认设置 |
| 网页（Web） | JPEG 质量 80、最长边 2048；关闭 GPS |
| 社交媒体（Social Media） | JPEG 质量 90、边界 1080 × 1350；关闭 GPS |
| 电子邮件（Email） | JPEG 质量 75、最长边 1280；关闭 GPS |
| 最高质量 JPEG（Maximum Quality JPEG） | 原尺寸 JPEG，质量 100 |
| 16 位 TIFF（16-bit TIFF） | 原尺寸 16 位 TIFF，ZIP 压缩 |
| EXR 存档（EXR Archive） | 原尺寸 16 位半浮点 OpenEXR |

这些预设也设置对应的 HDR 参数。例如网页（Web）的 HDR 最长边是 2048、质量 85；社交媒体（Social Media）的 HDR 最长边是 1350、质量 90。

预设设置**除目标位置以外**的导出选项，选完仍需在目标位置（Destination）选目录。可启用放入子文件夹（Put in Subfolder）并填写子目录。打开面板会沿用上次导出选项，但不要假定目标目录已设置。

修改参数后，不再匹配任何预设时显示自定义（Custom）。输入预设名称（Preset name）并保存可建立自定义预设，删除按钮用于删除用户预设。旧版文件名预设不会自动出现在新菜单中。

## 3. 设置文件名

文件命名（File Naming）的命名模式（Pattern）支持插入字段，界面会显示示例（Example）或命名模式错误（Pattern error）。

```text
{date:yyyy-MM-dd}_{source}_{sequence:0000}
```

可插入源文件名、日期、补零序号、相机品牌 / 型号、镜头、ISO、光圈、快门、焦距与评分。扩展名随输出格式决定。先看示例，批量输出时使用序号或源名区分文件；无效模式需修正后才能导出。

## 4. SDR 格式、位深与尺寸

![SDR 格式、位深与最长边](/img/tutorial-v0.3.3/export-sizing.webp)

*Windows Release v0.3.3 实机：SDR 格式、位深与最长边。*

| 格式 | 可选位深 | 其他选项 |
| --- | --- | --- |
| JPEG | 8 位 | 质量（Quality） |
| PNG | 8 / 16 位 | PNG 压缩级别（PNG Level） |
| TIFF | 8 / 16 / 32 位 | 无（None） / LZW / ZIP 压缩 |
| OpenEXR | 16 / 32 位 | 浮点输出 |

尺寸模式包括原始尺寸（Original）、最长边（Long Edge）、像素边界（Bounds，宽高边界内保持比例）、打印尺寸（Print，物理尺寸与 DPI，mm / cm / in）。像素边界（Bounds）不是强行拉伸到给定宽高。设置打印尺寸时同时核对单位与 DPI。

WebP 不在当前导出格式中。EXR 预设名称也不表示保存项目历史或全部 RAW 数据；保留可继续编辑的项目仍需 `.alcd` 与原片。

## 5. HDR 导出

![HDR 参数与待处理队列，尚未执行导出](/img/tutorial-v0.3.3/export-hdr-queue.webp)

*Windows Release v0.3.3 实机：HDR 参数与待处理队列，尚未执行导出。*

HDR 导出（HDR Export）使用 Ultra HDR JPEG，可设 HDR 质量（HDR Quality）、抖动（Dithering）和最长边（Max edge）。v0.3.3 最长边范围为 **256–8192 像素**。HDR 的最长边与 SDR 尺寸分别配置，不要沿用早期“全部共用一个尺寸”的说明。

先用一张代表照片导出，在支持 Ultra HDR 的设备 / 查看器核对，确认后再扩大队列。

## 6. EXIF、ICC 与 GPS

![网页预设的 EXIF、ICC 与关闭 GPS 状态](/img/tutorial-v0.3.3/export-metadata.webp)

*Windows Release v0.3.3 实机：网页预设的 EXIF、ICC 与关闭 GPS 状态。*

- **EXIF 元数据（EXIF metadata）**：控制照片元数据的写入。
- **ICC 配置文件（ICC profile）**：控制输出色彩配置文件的嵌入，便于支持色彩管理的应用识别输出颜色。
- **EXIF 中的 GPS 位置（GPS location in EXIF）**：控制原片中的位置数据；需要 EXIF 元数据开启才有意义。

v0.3.3 默认保留 GPS，JPEG、Ultra HDR、TIFF、PNG、OpenEXR 均支持照片元数据处理。相机与镜头序列号不会写入。网页（Web）、社交媒体（Social Media）、电子邮件（Email）预设关闭 GPS；其余预设应逐项核对，尤其是分享用的自定义预设。

v0.3.3 修复 macOS Rec.709 的 gamma 2.2 / BT.1886 预览与导出曲线及 ICC 一致性；这是该版本的修复记录，不能保证每个外部查看器都以同样方式显示。

## 7. 开始并检查结果

配置有效、目标目录和队列就绪后，点击 `导出 … 个文件（Export … Files）`。队列显示已排队（Queued） → 正在导出（Exporting） → 完成（Done），失败项显示失败（Failed）。检查任务结果、文件数量和实际输出；开始了后台任务不等于导出完成。

导出期间使用已保存的编辑值。若想改变本次结果，先确认新的编辑已保存，再重新导出。完成后队列可继续使用，也可手动清空。
