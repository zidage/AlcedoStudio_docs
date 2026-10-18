# Tutorial sources and live verification

The source baseline is **v0.3.3**, commit `6024386cb64e9c5bd832cf6475df32e2db80a7c7`. At audit time main was `23ed8b652304748412b40ede683db4b5e5050ee7`, including later search/runtime changes.

## Production loading order

main.cpp loads Alcedo.Main / Main with engine.loadFromModule. The production CMake QML list determines packaged files; component declarations then identify workspaces and panels. Merely existing in the source directory does not make a file a product entry point.

| Area | Tagged QML components | Tutorial |
| --- | --- | --- |
| Shell/projects | Main, AppDialogs, ProjectLaunchController, WelcomeDialog, WelcomeNewProjectForm, WelcomeProjectOverview, TopToolbar | [Interface](../getting-started/interface-overview.md) |
| Workspaces | WorkspaceHost, LibraryWorkspace, EditorWorkspace, EditorWorkspaceNavigation | [First edit](../getting-started/first-edit.md) |
| Import | CollectionsPanel, FolderImportConfirmDialog, ImportProgressOverlay | [Library](../library/import-and-organize.md) |
| Inspectors | InspectorPanel, AlbumInspectorPanel, ImageInspectorPanel, InspectorFieldActions, AlbumSectionView | [Library](../library/import-and-organize.md) |
| Input | EditorRawDecodePanel, LensCatalogPicker, EditorGeometryPanel | [RAW/geometry](../editing/raw-and-geometry.md) |
| Adjustment navigation | EditorWorkspaceRail, EditorAdjustmentStack, EditorAdjustmentHeader | [Interface](../getting-started/interface-overview.md) |
| Local edits | EditorNodesPanel, EditorMaskGroupsPanel, EditorNodeMaskDrawer, EditorMasksContextPanel | [Nodes/masks](../editing/nodes-and-masks.md) |
| Grading | EditorTonePanel, EditorLookPanel, EditorWhiteBalanceSection | [Color](../editing/tone-and-color.md) |
| LUTs | EditorLutBrowserPanel, EditorLutControlPanel, LutSettingsPanel | [LUTs](../editing/lut-library.md) |
| Output appearance | EditorDisplayTransformPanel, EditorPostProcessPanel, EditorScopePanel | [Display/effects](../editing/display-and-effects.md) |
| History/transfer | EditorHistoryTransactionsPanel, EditorVersionsPanel, AdjustmentTransferDialog, EditorAdjustmentTransferActions | [Versions](../getting-started/edit-history-and-versions.md) |
| Comparison | EditorComparisonPanel, EditorComparisonView, EditorComparisonCanvas | [A/B](../editing/comparison.md) |
| Export | ExportInspectorPanel, ExportPresetPicker, ExportNamingEditor | [Export](../export/workflow.md) |
| AI/search | GlobalSearchDialog, SemanticGenerationSettingsPanel, AiProviderSettingsPanel, AdvancedContentAnalysisDialog | [AI](../ai/overview.md), [search](../ai/search.md) |
| Settings/tasks | SettingDialog, CacheSettingsPanel, KeyboardSettingsPanel, UpdatesSettingsPanel, BackgroundTaskBar, BackgroundTasksDialog, AgentSessionCard | [Settings](../settings/preferences.md), [CLI](../automation/cli.md) |

The [tagged QML directory](https://github.com/zidage/AlcedoStudio/tree/v0.3.3/alcedo_studio/src/ui/alcedo_main/qml) is registered in the [production CMake file](https://github.com/zidage/AlcedoStudio/blob/v0.3.3/alcedo_studio/src/ui/alcedo_main/CMakeLists.txt). The [machine-readable inventory](/reference/v0.3.3-qml-inventory.json) records 134 packaged QML files and declaration references. Lexical reachability is not runtime coverage; inspect conditional Loaders and build options.

## C++ checks

Export format, depth, range, presets and GPS come from album_backend/export_recipe_builder.cpp. CLI syntax/session selection comes from alcedo_cli/cli_commands.cpp. Control and waiting use automation/commands/control_commands.cpp and task_commands.cpp. Release notes define compatibility; standard presets disable ALCEDO_ENABLE_BRUSH_MASK.

## Live screenshots

On 2026-10-18, the installed Windows Release's session.describe reported application_version **0.3.3**. An independent Alcedo Tutorial project imported eight RAW references: eight completed, zero failed or unsupported. CLI operations demonstrated exposure, a Version branch and LUT application. Native UI navigation demonstrated panels, a radial mask and comparison.

Screenshots are real window captures, cropped and encoded losslessly without redrawing controls. Both locales use Chinese UI captures. The [screenshot manifest](/reference/tutorial-screenshots.json) records crop, dimensions, time and hashes.

This verifies those visible controls and demonstrated operations. Export completion, remote AI, macOS, all GPU backends and old-project migration were not tested. A binary reporting 0.3.3 does not prove it matches the tag, so source and runtime evidence are recorded separately.

## Reproduce the archive

v0.2.0–v0.2.8 notes come from the bilingual CHANGELOG.md at v0.2.8. Later notes and v0.2.9 builds 2014/2015 come from docs/changelog at v0.3.3.

```powershell
node scripts/sync-release-notes.cjs D:/Projects/pu-erh_lab
python scripts/crop-tutorial-screenshots.py
```

The first command reads immutable tags. The second needs original captures in ignored .work, alongside the demonstration project. Historical screenshots stored under a tag can still depict an older interface and are not sufficient evidence of that tag's controls.
