---
sidebar_position: 1
---

# Version Evolution & Upgrade Guide

This guide describes major Alcedo Studio version changes and upgrade considerations.

---

## Critical Upgrade Notes

Review these architectural and workflow updates before performing major version upgrades:

| Change | Introduced In | Upgrade & Workflow Guidance |
| --- | --- | --- |
| **Catalog Format Redesign (Incompatible with v0.2.x)** | **v0.3.0** | v0.3.0 completely redesigned the node-based pipeline and DuckDB project format. **Projects created in v0.2.9 or earlier cannot be directly opened in v0.3.x.** Keep an earlier build installed to export existing master edits, or initialize new v0.3.x projects by re-importing source files. |
| **Node Pipeline & Layer Stack** | **v0.3.0** | Introduced sequential node grading, layer-based mask groups, and CAT02 creative white balance. Legacy merge operations evolved into safer [Selective Parameter Transfer](../getting-started/edit-history-and-versions.md). |
| **LUT Distribution & Encoding** | **v0.3.1** | Official film simulation packages transitioned to on-demand downloads. Visit `Settings → LUTs` to install packages; configure Input and Output Color Space Encodings for custom LUTs. |
| **Export Presets** | **v0.3.3** | Export presets replaced naming-only presets and provide configurations for web, social media, and print. Web sharing presets disable GPS location export by default. |

---

For exhaustive changelogs, benchmark notes, and bug fixes across all versions, explore the **Release Archive** in the sidebar.
