---
sidebar_position: 1
---

# Architecture Overview & Core Design

Alcedo Studio is a digital darkroom application engineered with **C++20** and **Qt 6 QML / Qt Quick**, designed for non-destructive RAW processing and asset management.

---

## Tiered System Architecture

The software architecture is decoupled into four distinct tiers:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        Qt 6 QML / Qt Quick Presentation Tier           │
│   (TopToolbar, WorkspaceHost, LibraryWorkspace, EditorWorkspace, RHI) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Q_PROPERTY & Signal/Slot Bindings
┌───────────────────────────────────▼────────────────────────────────────┐
│                       C++ Core Services & Ownership Tier (Services)    │
│  ├─ AlbumService: DuckDB-backed Sleeve asset management & queries      │
│  ├─ EditorSessionService: Working document, DAG commit graph & log     │
│  ├─ ExportService: Asynchronous batch render queue scheduler           │
│  └─ AutomationServer: Local RPC daemon serving alcedo-cli & AI agents  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Native Compute & Shader Invocations
┌───────────────────────────────────▼────────────────────────────────────┐
│                    Cross-Platform GPU Acceleration (GPU Pipeline)      │
│  ├─ Windows: Native NVIDIA CUDA Kernels (FP32 parallel compute)        │
│  ├─ macOS: Apple Silicon Metal Unified Memory Compute Shaders          │
│  └─ Generic: OpenCL 1.2 standard compute pipeline                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Low-Level Engines & Infrastructure
┌───────────────────────────────────▼────────────────────────────────────┐
│                       Third-Party Engines & Infrastructure             │
│  ├─ LibRaw (CFA extraction and raw sensor decoding)                    │
│  ├─ DuckDB (Embedded relational metadata storage)                      │
│  ├─ Lensfun (Optical database for lens and camera distortion profiles) │
│  └─ ONNX Runtime (On-device vision model inference engine)             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Core Subsystem Responsibilities

### 1. UI Shell & Workspace Routing
- `main.cpp` initializes hardware acceleration contexts, registers QML types and singletons, and loads the main window via `engine.loadFromModule("Alcedo.Main", "Main")`.
- `WorkspaceHost` coordinates state transitions between `LibraryWorkspace` and `EditorWorkspace`, guaranteeing that pending transaction commits are serialized before leaving the darkroom.

### 2. Sleeve Asset Management System (DuckDB Backend)
- Located in `album_backend`. Replaces scattered per-image sidecar files (`.xmp`) with a centralized database, storing image records, cached EXIF properties, star ratings, and virtual collections in an `.alcd` project file.
- Leverages DuckDB’s columnar vectorized query execution to support multi-dimensional filtering across dates, camera models, lens profiles, and ratings.

### 3. Editor Session & DAG Commit Tree (EditorSessionService)
- Located in `editor_session`. Each edited photograph maps to a Directed Acyclic Graph (DAG) of commits.
- Settling a slider writes an atomic commit; named Versions act as pointers to specific commit nodes in the DAG.
- Employs a transactional dual-write mechanism: slider adjustments append to an in-memory recovery log to maintain responsive interaction, before being asynchronously materialized into DuckDB at defined checkpoints, protecting against data loss during abnormal terminations.

### 4. GPU Scene-Referred Pipeline & RHI
- After decoding, image data is elevated into 16-bit float / 32-bit float high dynamic range scene-referred linear space (ACEScg).
- Using Qt Quick RHI (Rendering Hardware Interface), compute pipelines submit rendered floating-point textures directly to the scene graph viewport compositor, avoiding redundant host memory readbacks and maintaining responsive interaction.
- The display rendering transform (ACES 2.0 / OpenDRT) operates at the tail of the pipeline to map colors into the target display space.

---

To build Alcedo Studio from source, proceed to [Building from Source](./build-from-source.md).
