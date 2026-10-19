---
sidebar_position: 3
---

# Edit History & Version Storage Architecture

Alcedo Studio implements a transactional **Directed Acyclic Graph (DAG) commit and branching model (internally designated Mini-Git)** in its C++ core, supporting non-linear branches and non-destructive versioning.

---

## Core Data Structures & Models

Within the C++ service layer, each photograph's editing context is represented by:

```text
       [ Root Baseline ] (Immutable initial import state)
              │
       [ Commit 1: Base Exposure ]
              │
       [ Commit 2: Lens Calibration & Crop ]
             / \
            /   \
           ▼     ▼
  [ Commit 3A ]  [ Commit 3B ]
  (Warm Film)    (High-Contrast B&W)
       ▲               ▲
       │               │
  Version: "Warm"  Version: "B&W" (Active branch pointer)
```

1. **Root**: The immutable base node initialized upon import, recording source file paths, raw sensor color matrices, and default metadata.
2. **Commit**: Immutable adjustment transaction nodes recording parameter deltas for slider modifications, tone curve adjustments, node graph insertions, or mask geometry. Each Commit stores a hash reference to its parent commit.
3. **Version**: Lightweight named pointers (analogous to Git branch heads `refs/heads/*`) pointing to specific Commit nodes in the DAG. The Active Version dictates which branch state is rendered in the viewport.

---

## Dual-Write Pipeline & Save Checkpoints

To balance interactive slider responsiveness with crash resilience, the engine employs a staged transaction pipeline:

```text
[ User Pointer Release / Parameter Settle ]
                  │
                  ▼
[ 1. Append to Journal Recovery Log ] ──▶ Append to local in-memory transaction log; advances Head pointer
                  │
                  ▼ (Workspace navigation / Version checkout / Project save / Graceful exit)
[ 2. Materializer Service Checkpoint ]  ──▶ Materializes pending commits into DuckDB tables; updates Version pointers
                  │
                  ▼
[ 3. Log Rotation & Truncation ]       ──▶ Prunes journal entries committed safely to the database
```

### Why Decouple Real-Time Edits from Database Writes?
If a user rapidly adjusts a slider, issuing direct synchronous database transactions for every motion would saturate disk I/O and reduce interface responsiveness.
By recording settled inputs into a lightweight **Journal Recovery Log**, adjustments are tracked in memory first. The materializer service (`editor_mini_git_materializer`) then batches pending transactions into DuckDB upon workspace transitions, version checkouts, or saves. In the event of an abnormal shutdown or crash, the recovery engine replays unmaterialized journal entries upon launch, restoring unpersisted edit commits.

---

## Selective Adjustment Transfer

The `adjustment_transfer_service` coordinates cross-photo grading transfer:
1. **Parameter Extraction**: Extracts the serialized adjustment tree from a source Version node, filtered by user-selected modules (Tone, Look, LUT, Geometry, etc.).
2. **Branch Injection**: For each destination photo, forks a **new branch Commit and Version** based on its current Active Commit, injecting the transferred parameters while preserving all unselected destination attributes (such as unique lens calibrations or crop framing).
3. **Asynchronous Execution**: Batch transfers run via background task workers, avoiding UI thread stalls.

---

## Key Source Files

Core implementations reside under `alcedo_studio/src/`:
- `include/app/editor_working_document.hpp`: Active document abstraction
- `include/app/editor_mini_git_commit_writer.hpp`: DAG commit generator
- `include/app/editor_mini_git_journal_recovery.hpp`: Crash recovery journal manager
- `include/app/editor_mini_git_materializer.hpp`: DuckDB materialization engine
- `include/app/adjustment_transfer_service.hpp`: Selective parameter extraction and batch injection
