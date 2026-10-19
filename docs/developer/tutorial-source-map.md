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
