# v0.2.x to v0.3.3: changes and upgrading

Current tutorials describe v0.3.3. Complete release notes below retain performance results and fixes as historical reports, not promises for your hardware.

## Before upgrading

| Change | Action |
| --- | --- |
| v0.3.0 cannot read v0.2.9 or earlier projects | Keep the old app/project; export there or reimport originals into a new project. No automatic migration |
| v0.3.0 removes Merge | Use selective copy/paste, which creates a target Version |
| v0.3.1 stops bundling LUTs | Download official packages in Settings → LUTs and transfer custom resources |
| v0.3.1 changes crop and wheels | Check rotated crops, Gamma and Gain in existing edits |
| v0.3.2 changes diffusion curve | Check halos near whites |
| v0.3.3 replaces filename presets | Save complete export presets again and check destination |
| v0.3.3 retains GPS by default | Disable GPS for sharing, or choose Web / Social Media / Email |
| v0.3.3 RAW time fix affects new imports | Existing Library records are not automatically corrected |

## v0.2.x

| Version | Changes and current instructions |
| --- | --- |
| [v0.2.0](./v0.2.0.md) | macOS/Metal, basic HDR, language, scopes, aspect and reset: [installation](../getting-started/installation.md), [display](../editing/display-and-effects.md) |
| [v0.2.1](./v0.2.1.md) | CUDA X-Trans: [RAW](../editing/raw-and-geometry.md) |
| [v0.2.2](./v0.2.2.md) | Nikon HE recovery, linear DNG, highlights, LUT/Look, ICC/EXIF, early AI: [input](../editing/raw-and-geometry.md), [AI](../ai/overview.md) |
| [v0.2.3](./v0.2.3.md) | Alcedo rebranding, UI, LUT search, experimental WebGPU, ONNX, matrix and preview changes: [interface](../getting-started/interface-overview.md) |
| [v0.2.4](./v0.2.4.md) | OpenCL, collections, ratings, search, cache, project/history changes; experimental WebGPU retired: [Library](../library/import-and-organize.md) |
| [v0.2.5](./v0.2.5.md) | Local tone, selective color, batch adjustment transfer, HDR export: [tone](../editing/tone-and-color.md), [export](../export/workflow.md) |
| [v0.2.6](./v0.2.6.md) | Grain, halation, semantic labels/search, model download, native Nikon HE/HE*: [models](../ai/model-management.md), [effects](../editing/display-and-effects.md) |
| [v0.2.7](./v0.2.7.md) | API descriptions/ratings, providers/credentials/OAuth, background tasks, field search: [API](../ai/provider-configuration.md), [tasks](../settings/preferences.md) |
| [v0.2.8](./v0.2.8.md) | QML single-window editor, neural demosaicing, commit graph/recovery, recursive folder import: [interface](../getting-started/interface-overview.md), [history](../getting-started/edit-history-and-versions.md) |
| [v0.2.9](./v0.2.9.md) | Signed updates, inspector export, naming/size/metadata, workspace switching/filmstrip: [export](../export/workflow.md), [settings](../settings/preferences.md) |

## v0.3.x

| Version | Changes and instructions |
| --- | --- |
| [v0.3.0](./v0.3.0.md) | New project format, nodes, radial/gradient masks and groups, grade white balance, contrast, shortcuts, structured search and unified GPU engine: [nodes](../editing/nodes-and-masks.md), [color](../editing/tone-and-color.md), [search](../ai/search.md) |
| [v0.3.1](./v0.3.1.md) | LUT packages/browser/strength, diffusion, A/B, sorting/grouping, welcome overview, batch ratings, RAW/geometry copy and new crop: [LUTs](../editing/lut-library.md), [comparison](../editing/comparison.md), [Library](../library/import-and-organize.md) |
| [v0.3.2](./v0.3.2.md) | Raster color input, import file types, remembered LUT encodings, edit-time sort/group, top task indicator, package removal: [input](../editing/raw-and-geometry.md), [LUTs](../editing/lut-library.md) |
| [v0.3.3](./v0.3.3.md) | CLI/GUI agents, full export presets, GPS/EXIF/ICC, HDR edge, select-all/background deletion, partial paste and time fixes: [CLI](../automation/cli.md), [export](../export/workflow.md), [history](../getting-started/edit-history-and-versions.md) |

## Patch tags and builds

The repository also retains v0.2.0-hotfix, v0.2.3b, v0.2.4-Release and v0.2.8-Preview. Reproduce those using their exact tags and commit differences; the main version notes are not an individual test report for every installer.

v0.2.9 builds 2014/2015 additionally record inspector export, signing, embedded localized notes and the Windows installer-only change. They are included in [v0.2.9](./v0.2.9.md).

## Verification

The tutorials follow tagged production QML and relevant C++ validation. Windows Release screenshots and a limited CLI/GUI demonstration were checked; exports, remote AI, macOS and all GPU paths were not fully tested. See the [source and screenshot map](../developer/tutorial-source-map.md).
