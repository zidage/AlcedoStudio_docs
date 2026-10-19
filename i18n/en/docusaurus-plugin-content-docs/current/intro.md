---
sidebar_position: 1
---

# Welcome to Alcedo Studio

Alcedo Studio is a non-destructive RAW photo editor and digital asset management (DAM) system engineered for photography and digital darkroom workflows. Built with C++20 and Qt 6 QML, it provides GPU hardware acceleration (CUDA and OpenCL 1.2 on Windows; Metal on macOS), uniting scene-referred color management with responsive interactive editing.

---

## Core Architectural Concepts

Understanding the core architecture of Alcedo Studio helps you navigate and master its creative workflow:

```text
[ Source Files (Read-Only) ] 
       │ File Reference
       ▼
[ DuckDB Catalog & Version Tree (.alcd) ] ── (Non-destructive history & named branches)
       │
[ GPU Scene-Referred Color Pipeline ]
  ├─ 1. RAW Decode & Lens Correction (LibRaw / RCD / Neural Engine / Lensfun)
  ├─ 2. Geometry & Crop (Aspect ratio preservation & rotation containment)
  ├─ 3. Node-Based Color Grading (Develop base + multiple masked Color Grade nodes)
  ├─ 4. Display Transform (ACES 2.0 / OpenDRT tone mapping & color space mapping)
  └─ 5. Post Processing (Diffusion / Clarity / Film Grain / Halation)
       │
[ Real-Time Viewport (RHI) / Batch Export Queue (SDR / Ultra HDR) ]
```

1. **Strictly Non-Destructive Editing**  
   Original RAW and raster files on disk are treated as immutable, read-only sources. File references, star ratings, virtual collections, adjustment parameters, and edit histories are unified within a single DuckDB-powered `.alcd` project database.
2. **Scene-Referred Color Science**  
   Unlike traditional software that stretches pixels destructively in narrow display spaces (such as sRGB), Alcedo Studio conducts optical calculations in a physical, scene-referred wide-gamut space (ACES 2.0 workflow). Highlight roll-off, shadow recovery, and tone curves maintain smooth gradations and true-to-life color fidelity.
3. **Node-Based Grading & Mask Groups**  
   Breaking past single-layer limits, Alcedo Studio allows you to build linear color grading chains. Each Color Grade node maintains independent parametric tone controls, 3D LUTs, and interactive masks (radial ellipses and linear gradients with custom feathering and inversion).
4. **Git-Like Versioning (DAG Commits & Branches)**  
   Every settled slider adjustment records an atomic commit in a directed acyclic graph (DAG). You can fork named "Versions" at any point (e.g., "Warm Sunset", "Moody Monokrome") to explore alternate treatments without file duplication or data loss.
5. **On-Device AI & Agent Automation**  
   An embedded on-device vision model (CLIP embeddings via ONNX Runtime) delivers offline, privacy-first automatic image tagging and natural language semantic search without uploading image data. Coupled with the companion `alcedo-cli` interface, external scripts and AI agents can automate grading and batch pipelines via local RPC.

---

## Documentation Roadmap

Follow the documentation in the order of a complete photographic workflow:

### Getting Started
- [Installation & Hardware Acceleration](./getting-started/installation.md): Installation packages, GPU backend setup, and `.alcd` project structure.
- [Interface Overview](./getting-started/interface-overview.md): Single-window layout, toolbar navigation, library browser, and adjustment inspector.
- [Your First Edit](./getting-started/first-edit.md): End-to-end tutorial: creating a project, importing RAW files, tone grading, and exporting.
- [Edit History, Versions & Transferring Adjustments](./getting-started/edit-history-and-versions.md): Non-linear undo/redo, named version branches, and selective parameter copy/paste.

### Library & Asset Management
- [Import, Collections, Ratings & Filtering](./library/import-and-organize.md): Format support, virtual albums, star ratings, dynamic grouping, and timeline filtering.

### Creative Editing & Color Science
- [Input Decoding & Geometry](./editing/raw-and-geometry.md): RAW demosaicing (RCD / Neural Engine), raster color profiles, lens correction, and crop/rotation.
- [Grading Nodes, Layers & Masks](./editing/nodes-and-masks.md): Node pipeline logic, layer stacks, radial and gradient mask drawing and feathering.
- [Tone, Curves & Color Grading](./editing/tone-and-color.md): Exposure, local contrast, Camera WB vs. CAT02 creative white balance, selective color, and Lift/Gamma/Gain wheels.
- [3D LUT Library & Color Space Encoding](./editing/lut-library.md): Official film packages, custom `.cube` imports, input/output color encoding transforms, and strength blending.
- [Display Transform, HDR & Post-Processing](./editing/display-and-effects.md): ACES 2.0 / OpenDRT color management, Ultra HDR preview, real-time GPU scopes, and film diffusion/grain/halation.
- [A/B Comparison](./editing/comparison.md): Side-by-side and split slider modes to evaluate before/after or compare distinct version branches.

### Delivery & Export
- [Export Workflow: Batch Queue & Presets](./export/workflow.md): Batch export queue, dynamic token naming, dimension resampling, SDR and Ultra HDR formats, and GPS privacy settings.

### AI & Automation
- [AI Capabilities Overview](./ai/overview.md): On-device vision models and semantic search architecture.
- [Local AI Model Management](./ai/model-management.md): Mirrors, downloading, and activating local vision models.
- [AI Content Tagging](./ai/label-generation.md): Automated tagging on import and batch catalog analysis.
- [AI Semantic & Structured Search](./ai/search.md): Natural language search queries and metadata filtering.
- [Automation with alcedo-cli](./automation/cli.md): Headless batch processing and interactive companion scripting.

### System & Architecture
- [Preferences & System Settings](./settings/preferences.md): Disk cache, custom keyboard shortcuts, and signed software updates.
- [Upgrade Guide & Format Evolution](./releases/upgrade-guide.md): Project compatibility and pipeline updates.
- [Architecture & Source Mapping](./developer/architecture-overview.md): Core C++ / QML engine architecture and developer guidelines.
