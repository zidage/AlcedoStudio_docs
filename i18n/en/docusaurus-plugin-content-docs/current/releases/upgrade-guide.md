---
sidebar_position: 1
---

# Version Evolution & Upgrade Guide

Alcedo Studio has evolved from an early cross-platform experiment into a mature, professional digital darkroom and digital asset management system. This guide summarizes key architectural milestones and essential upgrade considerations.

---

## Critical Upgrade Notes

Review these architectural and workflow updates before performing major version upgrades:

| Change | Introduced In | Upgrade & Workflow Guidance |
| --- | --- | --- |
| **Catalog Format Redesign (Incompatible with v0.2.x)** | **v0.3.0** | v0.3.0 completely redesigned the node-based pipeline and DuckDB project format. **Projects created in v0.2.9 or earlier cannot be directly opened in v0.3.x.** Keep an earlier build installed to export existing master edits, or initialize new v0.3.x projects by re-importing source files. |
| **Node Pipeline & Layer Stack** | **v0.3.0** | Introduced sequential node grading, layer-based mask groups, and CAT02 creative white balance. Legacy merge operations evolved into safer [Selective Parameter Transfer](../getting-started/edit-history-and-versions.md). |
| **LUT Distribution & Encoding** | **v0.3.1** | Official film simulation packages transitioned to on-demand downloads. Visit `Settings → LUTs` to install packages; configure Input and Output Color Space Encodings for custom LUTs. |
| **Production Export Presets** | **v0.3.3** | Full-fledged export presets replaced legacy naming-only presets, offering turnkey profiles for Web, Social Media, and Print with automated GPS privacy protection for online sharing. |

---

## Architectural Evolution

### v0.3.x Era: Node Pipelines, Color Science & Agent Automation
- **v0.3.3**: Introduced `alcedo-cli` command-line companion and AI agent cooperative control; launched comprehensive export presets with GPS privacy toggles; enhanced Ultra HDR gain map exports and background queue management.
- **v0.3.2**: Added automatic color space detection for raster bitmaps (JPEG, PNG, TIFF, OpenEXR); added persistent memory for 3D LUT input/output color encodings; introduced persistent top status light.
- **v0.3.1**: Added official film simulation package manager; introduced A/B visual comparison system; added optical Diffusion glow; introduced dynamic sorting and collapsible grouping in the Album Inspector.
- **v0.3.0**: Major milestone. Deployed the modern `.alcd` project architecture; launched node-based grading with radial/gradient mask groups; introduced CAT02 matrix creative white balance and middle-gray contrast.

### v0.2.x Era: Single-Window Workspaces & Platform Foundations
- **v0.2.9**: Digitally signed online update system; integrated Export Inspector; seamless Filmstrip navigation.
- **v0.2.8**: Unified single-window Qt Quick QML architecture; GPU-accelerated Neural Engine demosaicing; transactional recovery logging and recursive folder imports.
- **v0.2.7**: Multimodal cloud vision LLM integration; introduced five-tier critique strictness personas; supported OpenAI Codex OAuth browser sign-in.
- **v0.2.6**: Added procedural film grain and optical halation; integrated on-device CLIP vision models for offline semantic tagging and natural language search; native Nikon HE/HE* raw support.
- **v0.2.4–v0.2.5**: Introduced the DuckDB-powered Sleeve asset management catalog; added OpenCL GPU compute backend; implemented bilateral tone mapping and 8-hue selective color.
- **v0.2.0–v0.2.3**: Established the Alcedo Studio brand; implemented Apple Silicon Metal 3 unified memory compute and Windows CUDA pipelines; standardized on the ACES scene-referred linear color workflow.

---

For exhaustive changelogs, benchmark notes, and bug fixes across all versions, explore the **Release Archive** in the sidebar.
