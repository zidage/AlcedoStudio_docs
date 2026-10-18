# Edit history and Version storage

This describes v0.3.3 commits, recovery journals and checkpoints. User operations are in [History and Versions](../getting-started/edit-history-and-versions.md).

## Format boundary

v0.2.8 introduced a commit graph, but v0.3.0 changed the project/node pipeline format again. **v0.3.x cannot open or automatically migrate v0.2.9 and earlier projects.** Having Mini-Git history alone does not establish compatibility.

## Root, commit and Version

Each photo has an imported root. Confirmed parameter or graph edits form immutable commits. A Version is a named reference to a commit or root; the active Version determines editing state.

Undo/redo moves through history. Editing after undo creates a continuation, not a named branch. Explicit branching creates another Version with shared ancestors. GPU handles and preview caches are not persisted editing content.

## Confirmation and saving

```text
Live input → preview
Confirmed input → recovery journal → working head
Checkpoint → DuckDB records / Version / pipeline → remove saved journal prefix
```

The application journal covers confirmed, not-yet-materialized editing. DuckDB WAL provides database transaction recovery. History is not a raw journal-file view.

Changing photos/Versions, leaving the editor and shutdown coordinate checkpoints. Save failures require explicit recovery/retry. Recovery guarantees need real journal and restoration tests.

## Adjustment transfer

The transfer service builds a selected parameter package from a source Version. Paste creates a new target Version and retains the old one. v0.3.1 includes Develop fields; v0.3.3 fixes preservation of unselected values in partial paste.

Merge was removed from the product in v0.3.0. Historical two-parent/conflict designs do not describe the current UI. Paste is in Versions, with background results for batches.

## Source entry points

src/include/app includes editor_working_document, editor_mini_git_commit_writer, editor_mini_git_journal_recovery, editor_mini_git_materializer, editor_save_checkpoint_service and adjustment_transfer_service. QML consumes projections/commands rather than mutating database references.

See the [source map](./tutorial-source-map.md) and [A/B tutorial](../editing/comparison.md).
