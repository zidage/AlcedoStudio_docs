# 教程的源码与实机依据

本次更新以主仓库 **v0.3.3** 为教程基线，对应提交 `6024386cb64e9c5bd832cf6475df32e2db80a7c7`。核对时主分支为 `23ed8b652304748412b40ede683db4b5e5050ee7`，已包含 v0.3.3 之后的搜索和运行时改动。

## 从生产入口向下核对

`main.cpp` 通过 `engine.loadFromModule("Alcedo.Main", "Main")` 加载界面。生产模块的 CMake QML 清单是收录依据；随后沿 Main 的组件声明追踪工作区与面板，而不是把目录里所有试验文件都当成产品功能。

| 层级 | v0.3.3 QML 文件 | 对应教程 |
| --- | --- | --- |
| 窗口与项目 | Main、AppDialogs、ProjectLaunchController、WelcomeDialog、WelcomeNewProjectForm、WelcomeProjectOverview、TopToolbar | [界面总览](../getting-started/interface-overview.md) |
| 工作区 | WorkspaceHost、LibraryWorkspace、EditorWorkspace、EditorWorkspaceNavigation | [第一次编辑](../getting-started/first-edit.md) |
| 集合与导入 | CollectionsPanel、FolderImportConfirmDialog、ImportProgressOverlay | [图库](../library/import-and-organize.md) |
| 图库检查器 | InspectorPanel、AlbumInspectorPanel、ImageInspectorPanel、InspectorFieldActions、AlbumSectionView | [图库](../library/import-and-organize.md) |
| 输入与几何 | EditorRawDecodePanel、LensCatalogPicker、EditorGeometryPanel | [输入与几何](../editing/raw-and-geometry.md) |
| 编辑路由 | EditorWorkspaceRail、EditorAdjustmentStack、EditorAdjustmentHeader | [界面总览](../getting-started/interface-overview.md) |
| 节点与蒙版 | EditorNodesPanel、EditorMaskGroupsPanel、EditorNodeMaskDrawer、EditorMasksContextPanel | [节点与蒙版](../editing/nodes-and-masks.md) |
| 影调与色彩 | EditorTonePanel、EditorLookPanel、EditorWhiteBalanceSection | [影调与色彩](../editing/tone-and-color.md) |
| LUT | EditorLutBrowserPanel、EditorLutControlPanel、LutSettingsPanel | [LUT](../editing/lut-library.md) |
| 显示与后期 | EditorDisplayTransformPanel、EditorPostProcessPanel、EditorScopePanel | [显示与效果](../editing/display-and-effects.md) |
| 历史与传递 | EditorHistoryTransactionsPanel、EditorVersionsPanel、AdjustmentTransferDialog、EditorAdjustmentTransferActions | [历史与版本](../getting-started/edit-history-and-versions.md) |
| 对比 | EditorComparisonPanel、EditorComparisonView、EditorComparisonCanvas | [对比](../editing/comparison.md) |
| 导出 | ExportInspectorPanel、ExportPresetPicker、ExportNamingEditor | [导出](../export/workflow.md) |
| AI 与搜索 | GlobalSearchDialog、SemanticGenerationSettingsPanel、AiProviderSettingsPanel、AdvancedContentAnalysisDialog | [AI](../ai/overview.md)、[搜索](../ai/search.md) |
| 设置与任务 | SettingDialog、CacheSettingsPanel、KeyboardSettingsPanel、UpdatesSettingsPanel、BackgroundTaskBar、BackgroundTasksDialog、AgentSessionCard | [设置](../settings/preferences.md)、[CLI](../automation/cli.md) |

上述文件位于 [v0.3.3 QML 目录](https://github.com/zidage/AlcedoStudio/tree/v0.3.3/alcedo_studio/src/ui/alcedo_main/qml)。[生产 CMake 清单](https://github.com/zidage/AlcedoStudio/blob/v0.3.3/alcedo_studio/src/ui/alcedo_main/CMakeLists.txt)包含 134 个 QML 文件；完整路径与组件引用见[机器可读清单](/reference/v0.3.3-qml-inventory.json)。声明引用扫描不等于运行时覆盖率；条件 Loader 和实验选项仍需检查启用条件。

## 用 C++ 核实的规则

- 导出格式、位深、范围、预设和 GPS：`album_backend/export_recipe_builder.cpp`。
- CLI 参数与会话选择：`alcedo_cli/cli_commands.cpp`。
- 智能体控制与后台等待：`automation/commands/control_commands.cpp`、`task_commands.cpp`。
- 项目兼容性与用户可见版本变化：`docs/changelog/0.3.0.*.txt` 至 `0.3.3.*.txt`。
- 画笔蒙版未作为常规可用功能列入：发布构建预设关闭 `ALCEDO_ENABLE_BRUSH_MASK`。

## 当前 Release 的实机截图

2026-10-18 使用本机已安装的 Windows Release，CLI 的 `session.describe` 报告 application_version 为 **0.3.3**。在独立 Alcedo Tutorial 项目中引用 8 张 RAW，导入结果为 8 成功、0 失败、0 不支持；使用 CLI 演示曝光、Version 分支与 LUT，使用原生界面切换面板、绘制径向蒙版并打开对比。

截图为实际窗口截图，只裁切和无损转码，没有重绘控件。中英文教程共用中文界面图片。[截图清单](/reference/tutorial-screenshots.json)记录裁切范围、尺寸、时间和文件哈希。

这一轮验证了显示出的界面和上述操作，没有完成导出或调用远程 AI，也没有测试 macOS、所有 GPU 或旧项目迁移。安装程序报告 0.3.3 不足以证明二进制等于标签提交，因此源码依据与实机依据分别记录。

## 更新记录来源与再生成

- v0.2.0–v0.2.8：v0.2.8 标签下的双语 `CHANGELOG.md`。
- v0.2.9–v0.3.3：v0.3.3 标签下的 `docs/changelog/`。
- v0.2.9 另保留构建 2014 / 2015 的说明。

```powershell
node scripts/sync-release-notes.cjs D:/Projects/pu-erh_lab
python scripts/crop-tutorial-screenshots.py
```

第一个脚本读取标签，不依赖当前工作区改动；第二个脚本需要已捕获的原图，原图与演示项目保存在忽略的 `.work` 下。早期主仓库附图仍可能是旧界面，不能仅凭图片存放于某标签就认定它反映该版本布局。
