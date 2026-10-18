# Architecture overview

This describes v0.3.3 source structure. Start with the [interface tutorial](../getting-started/interface-overview.md) for operation.

## Shell and workspaces

ui/alcedo_main/main.cpp initializes services, QML types and context, then loads Alcedo.Main / Main. Main composes the toolbar, project dialogs, collections and WorkspaceHost. The host retains LibraryWorkspace and EditorWorkspace; routing switches between them.

QML handles presentation/input. C++ owns projects, Library queries, editing sessions and tasks. Library rows and inspector statistics use the unified browse/query service.

## Image path

```text
File → RAW/raster input → Develop → Color Grades → Display Transform → Post → Preview/export
```

Each grade owns adjustments and masks. Input, geometry, display transform and post processing apply to the whole photo. editor_rhi integrates with Qt Quick; CUDA, OpenCL or Metal performs processing.

## Editing and saving

editor_session_service coordinates commands, the working document, graph projections, rendering and checkpoints. Confirmed edits enter a recovery journal and later materialize into DuckDB. Versions reference commit heads. Navigation and shutdown coordinate saving.

Batch paste uses the adjustment transfer service and creates target Versions. Merge is no longer a product action. See [history architecture](./edit-history-architecture.md).

## Background and external work

Import, ratings, paste, export and AI expose task status/progress/results. Thumbnail, editing and export have distinct scheduling/resource paths; sharing a GPU does not mean sharing one execution context.

The sidecar supports local AI and remote providers. CLI calls the local automation server; GUI state changes require control. Headless and GUI are different hosts.

See the [source map](./tutorial-source-map.md). Threading, performance and lifetime guarantees require tests, traces or runtime evidence, not inference from module names.
