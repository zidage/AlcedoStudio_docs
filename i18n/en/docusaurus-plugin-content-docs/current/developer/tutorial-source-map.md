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
| **Film Print (v0.3.5)** | `EditorDisplayTransformPanel`, `FilmStockPicker`, `FilmSwatch` | Stock selection in [Film Simulation](../editing/film-simulation.md) |
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

## Implementation references for this revision

Checked against local application commit `2c3bf87b0`. Paths below are relative to the application repository’s alcedo_studio/.

| Topic | Source | Verified behavior |
| --- | --- | --- |
| Demosaicing | `src/include/decoders/processor/raw_demosaic_method.hpp`；`src/edit/runtime/cuda/cuda_sensor_demosaic.cpp`；`src/decoders/processor/operators/gpu/cuda_xtrans_interpolate.cu` | Default / Legacy / Neural Engine; X-Trans Legacy: neighborhood interpolation. |
| Four color wheels | `src/ui/alcedo_main/qml/EditorLookPanel.qml` | Lift, Gamma, Gain, Offset; 2 × 2; independent Master. |
| Official LUT packages | `src/ui/alcedo_main/qml/LutSettingsPanel.qml`；`src/ui/alcedo_main/qml/PackageCard.qml` | Package cards: origin, LUT count, revision, archive size, status, actions. |
| LUT encodings | `src/edit/runtime/lut_bake.cpp` | LmtEncodingConversion::Compose → BakeLmtCompositeTable → ResolveLmtSampledTable. |
| Copy and Paste | `src/ui/alcedo_main/qml/AdjustmentTransferDialog.qml`；`src/ui/alcedo_main/album_backend/adjustment_transfer_dialog_model.cpp` | Copy: 3 panes; Paste: 2 read-only panes; masks selected per node; AI masks excluded. |
| Waveform | `src/edit/scope/cuda_scope_analyzer.cu`；`src/edit/scope/opencl_shader/scope_analyzer.cl`；`src/ui/alcedo_main/album_backend/editor_scope_item.cpp` | RGB clamped to 0–1; 25% / 50% / 75% guides; no IRE conversion. |
| Mask Groups | `src/ui/alcedo_main/qml/EditorMaskGroupsPanel.qml`；`src/ui/alcedo_main/qml/EditorMaskGroupDelegate.qml`；`src/ui/alcedo_main/qml/EditorMaskGroupMaskRow.qml`；`src/ui/alcedo_main/qml/EditorMasksContextPanel.qml`；`src/include/edit/mask/grade_mask_coverage.hpp` | Empty list: full coverage. Nonempty all-disabled list: zero coverage. Enabled masks: per-pixel maximum. |
| Filter, Sort, Group | `src/ui/alcedo_main/qml/AlbumInspectorPanel.qml`；`src/ui/alcedo_main/qml/InspectorFieldActions.qml`；`src/ui/alcedo_main/qml/StarRatingFilter.qml` | Filter within sections; separate sort/group actions in the section header. |

The interactive examples in this documentation repository’s src/components/SourceMocks/ use example values. Mask Groups calculates exposure and coverage mixing only; it does not render a photograph.

The Mask Groups calculator also follows src/edit/runtime/cuda/cuda_primary_grade_pass.cu: Exposure adds EV / CE_ACESCC_B; MixGradePixel mixes the adjusted and original ACEScc values using R8 coverage. For the exposure-only example, this gives local EV = layer EV × coverage.
