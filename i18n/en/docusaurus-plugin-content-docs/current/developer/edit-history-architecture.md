# Edit History and Versions (Mini-Git)

This page describes how Alcedo Studio records edits for a photo, how those records are written into the project file, and how they are restored the next time the photo is opened. The **Versions** and **Edit History** panels are two views of the same model, not two separate history systems.

## Project format

Starting with Mini-Git edit history (**v0.2.8 and later**), the history and pipeline layout stored in a project differs from earlier releases. **Project files created or saved before v0.2.8 are not supported**: the current release does not read or migrate the older history layout. Open those projects with the software version that created them, or create a new project and re-import the photos.

## What this model is for

Photo editing needs a way to return to an earlier step, keep several different looks on the same image (for example black-and-white versus film), and leave the original RAW file unchanged.

An earlier design stored a transaction list inside each Version and used a cursor as the playhead. That was simple, but shared ancestry tended to be duplicated, and paste/merge semantics were easy to confuse with “moving the playhead on a list.”

The current design uses a small Git-like commit graph:

- Each finalized edit becomes an immutable **edit commit**.
- A **Version** is a named branch that points at a commit, or at the image root when there are no commits yet.
- The editor always uses one Version; editing without a bound Version is not supported.
- The on-screen image, the adjustment panels, and the stored Version head should agree on the same active Version.

## Concepts

**Root**  
The immutable baseline pipeline produced after import metadata (lens, dimensions, color matrices, and so on) has been resolved. Each photo has one root. Later edits are applied on top of it. Changing code defaults later must not rewrite an existing photo’s root.

**Edit commit**  
The immutable object written when you release a slider (or reach the defined coalescing boundary). An ordinary edit has one parent. A merge commit has two parents: the current branch is the first parent; the incoming branch is the second.

**Version**  
A named branch. Its identity is a stable `version_id`. Where it currently points is a mutable `head_commit_hash`. An empty head means the image root. Several Versions may point at the same commit; shared ancestry is stored once.

**HEAD**  
The Version currently in use.

**Working head**  
The in-memory head. It may already include edits that are in the recovery journal but not yet written to DuckDB.

**Head-move record**  
A recovery-journal record written by undo/redo. It moves the working head between existing commits. It is not itself a new edit commit (similar to a reflog entry).

**First-parent chain**  
The path from a Version head to the root following first parents only. Pipeline reconstruction replays that path forward. A merge commit’s second parent remains in the graph for history and garbage collection; replay applies the merge commit’s resolved field payload on top of the first parent instead of replaying the whole second-parent branch.

**Transaction-chain hash**  
Commits arrive as a stream. Each new commit (or completed head-move) folds the current `commit_hash` onto the previous chain hash. The result checks that replaying from root to the current head matches what the editor expects. The hash is updated incrementally along first-parent order.

**Recovery journal**  
A per-image write-ahead log (WAL). Finalized edits and head-moves are appended here first, then materialized into DuckDB at the appropriate time.

**Materialize**  
Insert journaled commit objects into DuckDB and, in one transaction, advance the Version ref in use, the serialized pipeline state, and recovery metadata.

**Save checkpoint**  
The short global phase that completes materialization before switching photos, switching to another Version, leaving the editor, or shutting down. Related navigation stays blocked until it finishes.

## How data is stored

A Version no longer owns a transaction array or a cursor. It mainly stores `version_id`, the photo it belongs to, a display name, `head_commit_hash`, and created/updated timestamps.

Edit commits are content-addressed by `commit_hash`. The hash input includes a format version, `root_id`, ordered parent hashes, a strictly increasing timestamp, the commit kind, and a canonical edit payload. Ordinary payloads record before/after field values and enabled state. Merge payloads store the UI-resolved field delta needed to turn the first-parent pipeline into the merged result. Reconstruction does not re-decide conflicts.

Each photo also stores `root_id`, the active `version_id`, the materialized head and transaction-chain hash, and serialized pipeline state. The serialized state speeds reopen; GPU handles and scheduler-selected cache policy are runtime-only and are neither persisted as history nor hashed.

## How an edit enters history

While you drag a slider, the live pipeline updates the preview; no commit exists yet. When you release the slider:

1. Build and hash the edit commit.
2. Append the full commit, plus the expected previous and next chain hashes, to the recovery journal.
3. Advance the in-memory working head and fold the transaction-chain hash once.

Undo appends a head-move, moves the working head to the first parent, and restores that commit’s chain hash. Redo follows the in-memory redo stack to a child. Editing after undo clears the redo stack and creates a new child on the same Version; the Version ref moves to that commit. No automatic new Version is created.

## The recovery journal versus DuckDB’s own WAL

Two different logs are easy to confuse:

1. **Application recovery journal**  
   Holds edits the user has finalized that may not yet be in the project database. This is Alcedo’s WAL: append first, materialize at a save checkpoint. It is not a second user-visible history; the **Edit History** panel shows the commit graph, not a dump of the journal.

2. **DuckDB’s page-level WAL**  
   Handles physical recovery of database pages after a crash. Once an application materialization commits, durability from that point is DuckDB’s responsibility.

The usual order is: finalize edit → append to the recovery journal → (before photo switch / Version switch / leaving the editor / clean shutdown) materialize into DuckDB → truncate the materialized journal prefix → continue navigation. After an abnormal exit, the next open can recover journal-committed records that were not yet materialized. On a clean exit, unreachable commits are collected by walking from every Version head (both parents). Abnormal exit does not run that garbage collection.

## Paste and merge

Library and editor share one adjustment-transfer service. The UI does not construct commits or move Version refs directly.

**Paste** is branch replacement, not cherry-pick. The editor completes a save checkpoint on the current Version, starts an independent branch at the target photo’s root, turns the incoming adjustment package into a forward-replayable commit chain, creates a new Version, and switches to using it. The new branch does not inherit commits from the previously active Version.

**Merge** keeps both lines. Incoming adjustments are represented as a root-relative branch on the target photo without switching to it. Conflicting fields are resolved in the UI. One merge commit is then created whose first parent is the current Version head and whose second parent is the incoming branch head; the resolved field delta is stored in that commit, and the current Version ref advances. Canceling conflict resolution writes no merge commit and moves no ref.

Panel-level usage is described in [Edit History and Versions (UI)](../getting-started/edit-history-and-versions).

## Mapping to the UI

| UI | Behavior |
| --- | --- |
| **Versions** | Lists Version refs; selecting one switches to using that Version (after a save checkpoint). |
| **Branch from current** | Creates a new Version from the current Version’s head. |
| **Fork from root** | Creates a new Version from the image root. |
| **Edit History** | Shows the commit graph for the active Version; undo/redo move the working head. |
| **Paste / Merge** | See the previous section. |

## See also

- [Edit History and Versions (UI)](../getting-started/edit-history-and-versions)
- [Interface overview](../getting-started/interface-overview)
