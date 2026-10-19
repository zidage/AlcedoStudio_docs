---
sidebar_position: 5
---

# UI Components & C++ Source Map Reference

This reference index links Alcedo Studio’s QML presentation components to their underlying C++ business logic services, providing a clear map for customization, extensions, and code navigation.

---

## Front-End QML Views to Architecture Mapping

The application entry point `main.cpp` loads `Alcedo.Main / Main.qml`. The component tree branches as follows:

| Functional Tier | Primary QML Components | Underlying Subsystem & Documentation |
| --- | --- | --- |
| **Window & Project Shell** | `Main`, `AppDialogs`, `ProjectLaunchController`, `WelcomeDialog`, `TopToolbar` | Catalog load, welcome launcher & [Interface Overview](../getting-started/interface-overview.md) |
| **Workspace Routing** | `WorkspaceHost`, `LibraryWorkspace`, `EditorWorkspace`, `EditorWorkspaceNavigation` | View transitions & [Your First Edit](../getting-started/first-edit.md) |
| **Collections & Ingestion** | `CollectionsPanel`, `FolderImportConfirmDialog`, `ImportProgressOverlay` | Folder scanning & [Library Management](../library/import-and-organize.md) |
| **Library Inspector** | `InspectorPanel`, `AlbumInspectorPanel`, `ImageInspectorPanel`, `AlbumSectionView` | Multi-dimensional culling & [Library Management](../library/import-and-organize.md) |
| **RAW Input & Geometry** | `EditorRawDecodePanel`, `LensCatalogPicker`, `EditorGeometryPanel` | Sensor decode & [Input & Geometry](../editing/raw-and-geometry.md) |
| **Tool Rails & Drawers** | `EditorWorkspaceRail`, `EditorAdjustmentStack`, `EditorAdjustmentHeader` | Tool drawer routing & [Interface Overview](../getting-started/interface-overview.md) |
| **Grading Nodes & Masks** | `EditorNodesPanel`, `EditorMaskGroupsPanel`, `EditorNodeMaskDrawer`, `EditorMasksContextPanel` | DAG pipeline & [Grading Nodes & Masks](../editing/nodes-and-masks.md) |
| **Tone & Creative Look** | `EditorTonePanel`, `EditorLookPanel`, `EditorWhiteBalanceSection` | Color math & [Tone, Curves & Color Grading](../editing/tone-and-color.md) |
| **3D LUT Film Library** | `EditorLutBrowserPanel`, `EditorLutControlPanel`, `LutSettingsPanel` | Film packages & [3D LUT Library](../editing/lut-library.md) |
| **Display & Post Processing** | `EditorDisplayTransformPanel`, `EditorPostProcessPanel`, `EditorScopePanel` | ACES/OpenDRT & [Display Transform & Effects](../editing/display-and-effects.md) |
| **History & Version Branches** | `EditorHistoryTransactionsPanel`, `EditorVersionsPanel`, `AdjustmentTransferDialog` | Commit DAG & [Edit History & Versions](../getting-started/edit-history-and-versions.md) |
| **A/B Comparison** | `EditorComparisonPanel`, `EditorComparisonView`, `EditorComparisonCanvas` | Dual-buffer viewport & [A/B Comparison](../editing/comparison.md) |
| **Batch Export** | `ExportInspectorPanel`, `ExportPresetPicker`, `ExportNamingEditor` | Render queue & [Export Workflow](../export/workflow.md) |
| **AI Vision & Global Search** | `GlobalSearchDialog`, `SemanticGenerationSettingsPanel` | Vector search & [AI Overview](../ai/overview.md) |
| **Preferences & Monitoring** | `SettingDialog`, `CacheSettingsPanel`, `KeyboardSettingsPanel`, `BackgroundTaskBar` | System preferences & [Settings & Preferences](../settings/preferences.md) |

Front-end QML sources are located in `alcedo_studio/src/ui/alcedo_main/qml`.

---

## Core C++ Services & Engine Source Locations

- **Export Recipe Builder & Pipeline Delivery**: `alcedo_studio/src/album_backend/export_recipe_builder.cpp`
- **CLI Commands & Schema Registration**: `alcedo_studio/src/alcedo_cli/cli_commands.cpp`
- **Agent Session Control & Command Dispatch**: `alcedo_studio/src/automation/commands/control_commands.cpp`
- **Node-Based Color Pipeline & ACES Encodings**: `alcedo_studio/src/gpu_pipeline/`
- **DuckDB Sleeve Catalog & Version Branches**: `alcedo_studio/src/album_backend/`
