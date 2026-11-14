---
sidebar_position: 5
---

# UI 组件与源码映射索引

本索引梳理了 Alcedo Studio 各前端 QML 视图组件与其底层 C++ 业务逻辑服务之间的对应关系，为二次开发、自定义功能扩展与架构代码溯源提供参考导航。

---

## 前端视图组件与教程对应表

应用主入口通过 `main.cpp` 加载 `Alcedo.Main / Main.qml`。前端组件树自顶向下分层如下：

| 功能层级 | 核心 QML 视图组件 | 底层业务与对应教程 |
| --- | --- | --- |
| **窗口与项目宿主** | `Main`、`AppDialogs`、`ProjectLaunchController`、`WelcomeDialog`、`TopToolbar` | 项目加载、欢迎页与 [界面总览](../getting-started/interface-overview.md) |
| **工作区容器** | `WorkspaceHost`、`LibraryWorkspace`、`EditorWorkspace`、`EditorWorkspaceNavigation` | 视图切换与 [第一次编辑](../getting-started/first-edit.md) |
| **集合与照片导入** | `CollectionsPanel`、`FolderImportConfirmDialog`、`ImportProgressOverlay` | 文件扫描与 [图库管理](../library/import-and-organize.md) |
| **图库检查器** | `InspectorPanel`、`AlbumInspectorPanel`、`ImageInspectorPanel`、`AlbumSectionView` | 多维筛选与 [图库管理](../library/import-and-organize.md) |
| **RAW 输入与几何构图** | `EditorRawDecodePanel`、`LensCatalogPicker`、`EditorGeometryPanel` | 解码与 [输入与几何](../editing/raw-and-geometry.md) |
| **工作区工具轨** | `EditorWorkspaceRail`、`EditorAdjustmentStack`、`EditorAdjustmentHeader` | 抽屉路由与 [界面总览](../getting-started/interface-overview.md) |
| **调色节点与局部蒙版** | `EditorNodesPanel`、`EditorMaskGroupsPanel`、`EditorNodeMaskDrawer`、`EditorMasksContextPanel` | 拓扑流与 [节点与蒙版](../editing/nodes-and-masks.md) |
| **基础影调与创意外观** | `EditorTonePanel`、`EditorLookPanel`、`EditorWhiteBalanceSection` | 调色计算与 [影调与色彩](../editing/tone-and-color.md) |
| **3D LUT 胶片库** | `EditorLutBrowserPanel`、`EditorLutControlPanel`、`LutSettingsPanel` | 胶片管理与 [LUT 库](../editing/lut-library.md) |
| **显示变换与后期效果** | `EditorDisplayTransformPanel`、`EditorPostProcessPanel`、`EditorScopePanel` | ACES/OpenDRT 与 [显示与后期](../editing/display-and-effects.md) |
| **胶片印片（v0.3.5）** | `EditorDisplayTransformPanel`、`FilmStockPicker`、`FilmSwatch` | 片种选择与 [胶片模拟](../editing/film-simulation.md) |
| **提交历史与版本分支** | `EditorHistoryTransactionsPanel`、`EditorVersionsPanel`、`AdjustmentTransferDialog` | DAG 提交与 [历史与版本](../getting-started/edit-history-and-versions.md) |
| **A/B 视觉对比** | `EditorComparisonPanel`、`EditorComparisonView`、`EditorComparisonCanvas` | 双缓存对比与 [A/B 对比](../editing/comparison.md) |
| **批处理导出** | `ExportInspectorPanel`、`ExportPresetPicker`、`ExportNamingEditor` | 渲染队列与 [导出工作流](../export/workflow.md) |
| **AI 识别与全局搜索** | `GlobalSearchDialog`、`SemanticGenerationSettingsPanel` | 向量搜索与 [AI 概览](../ai/overview.md) |
| **系统首选项与任务** | `SettingDialog`、`CacheSettingsPanel`、`KeyboardSettingsPanel`、`BackgroundTaskBar` | 偏好设置与 [系统设置](../settings/preferences.md) |

前端 QML 源码位于主仓库的 `alcedo_studio/src/ui/alcedo_main/qml` 目录下。

---

## 核心 C++ 服务与算法实现位置

- **导出预设构建与格式渲染**：`alcedo_studio/src/album_backend/export_recipe_builder.cpp`
- **CLI 命令与 Schema 注册**：`alcedo_studio/src/alcedo_cli/cli_commands.cpp`
- **智能体协同控制与会话管理**：`alcedo_studio/src/automation/commands/control_commands.cpp`
- **节点流水线与场景色彩管理**：`alcedo_studio/src/gpu_pipeline/`
- **DuckDB 资产管理与版本存储**：`alcedo_studio/src/album_backend/`

## 本次校对的实现依据

以下内容已对照主仓库本地提交 `2c3bf87b0`。下列路径相对于主仓库的 alcedo_studio/。

| 内容 | 实现位置 | 核对结果 |
| --- | --- | --- |
| 去马赛克 | `src/include/decoders/processor/raw_demosaic_method.hpp`；`src/edit/runtime/cuda/cuda_sensor_demosaic.cpp`；`src/decoders/processor/operators/gpu/cuda_xtrans_interpolate.cu` | 方法为 Default / Legacy / Neural Engine；X-Trans Legacy 使用邻域插值。 |
| 四路色轮 | `src/ui/alcedo_main/qml/EditorLookPanel.qml` | Lift、Gamma、Gain、Offset，两行两列，每路独立 Master。 |
| 官方 LUT 包 | `src/ui/alcedo_main/qml/LutSettingsPanel.qml`；`src/ui/alcedo_main/qml/PackageCard.qml` | 包卡片包含来源、LUT 数量、版本、下载大小、状态与操作。 |
| LUT 编码 | `src/edit/runtime/lut_bake.cpp` | 组合编码变换与原表采样，烘焙并缓存合成 LUT。 |
| 复制与粘贴 | `src/ui/alcedo_main/qml/AdjustmentTransferDialog.qml`；`src/ui/alcedo_main/album_backend/adjustment_transfer_dialog_model.cpp` | 复制三栏；粘贴两栏只读。蒙版按节点整体选择，排除 AI 蒙版。 |
| 波形图 | `src/edit/scope/cuda_scope_analyzer.cu`；`src/edit/scope/opencl_shader/scope_analyzer.cl`；`src/ui/alcedo_main/album_backend/editor_scope_item.cpp` | RGB 限制到 0–1；参考线在 25%、50%、75%，没有 IRE 换算。 |
| 蒙版组 | `src/ui/alcedo_main/qml/EditorMaskGroupsPanel.qml`；`src/ui/alcedo_main/qml/EditorMaskGroupDelegate.qml`；`src/ui/alcedo_main/qml/EditorMaskGroupMaskRow.qml`；`src/ui/alcedo_main/qml/EditorMasksContextPanel.qml`；`src/include/edit/mask/grade_mask_coverage.hpp` | 空列表为全覆盖；非空且全部关闭为零覆盖；有效蒙版取逐像素最大值。 |
| 筛选排序分组 | `src/ui/alcedo_main/qml/AlbumInspectorPanel.qml`；`src/ui/alcedo_main/qml/InspectorFieldActions.qml`；`src/ui/alcedo_main/qml/StarRatingFilter.qml` | 分区内筛选，标题栏独立控制排序与分组。 |

交互示例位于本文档仓库的 src/components/SourceMocks/，使用示例数据。蒙版组示例只计算曝光与覆盖混合，不渲染照片。

蒙版组计算器还对照 src/edit/runtime/cuda/cuda_primary_grade_pass.cu：Exposure 增加 EV / CE_ACESCC_B，MixGradePixel 在 ACEScc 域按 R8 覆盖权重混合。因此在纯曝光示例中，局部曝光增量为图层 EV × 覆盖权重。
