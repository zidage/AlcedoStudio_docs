# Settings, background tasks and updates

Open Settings in the toolbar. The scrollable v0.3.3 categories include Language / Theme, Default Behavior, Cache, Local Content Recognition, Advanced Content Analysis, Acceleration, Updates, Keyboard, LUTs and About.

## Appearance and default behavior

![Language, theme and settings categories](/img/tutorial-v0.3.3/settings.webp)

*Windows Release v0.3.3, Chinese UI: Language, theme and settings categories.*

Choose language/theme under Language / Theme. Default Behavior controls masks on locked nodes: ask, create a new layer, or draw on the current node. Masking the first grade also limits its default adjustments; see [nodes and masks](../editing/nodes-and-masks.md).

## Thumbnail cache

Cache shows Entries, Size, Hits / misses, storage folder, disk-cache switch, per-project maximum and JPEG quality. Maintenance offers Clear current project, Clear all cache and Refresh.

Clearing cache requires thumbnails to regenerate; it does not clear originals or editing history. Since v0.3.1 each project has its own disk thumbnails. Apply changes as directed by the page.

## Acceleration

Select a supported CUDA / OpenCL / Metal backend and restart the application yourself. It is determined at startup and differs from AI model runtime configuration. See [installation](../getting-started/installation.md).

## Keyboard

![Current keyboard bindings](/img/tutorial-v0.3.3/keyboard.webp)

*Windows Release v0.3.3, Chinese UI: Current keyboard bindings.*

Since v0.3.0 you can capture a new key combination per command, inspect conflicts and restore defaults individually. Changes take effect immediately.

Follow this page and actual button tooltips for your bindings, especially on macOS or after customization. Focused text fields can handle shortcuts as text-editing commands.

## Software updates

Since v0.2.9, updates use signed release metadata and verified packages.

1. Check installed/available version and build in Updates.
2. Read localized notes and download.
3. Monitor, cancel or retry as needed.
4. After verification, follow install/restart actions and check the new version.

Finish current project work first. Downloading does not mean installation is complete. Stable and testing channels are separate.

## Background tasks and agents

v0.3.2 moves the task indicator to the top toolbar. Click it or Background Tasks / Editor Tasks to inspect progress and errors.

Import, export, analysis, model work, ratings, paste and deletion can run in the background. Cancellation depends on task support; check completed counts afterward.

v0.3.3 pins agents at the top with their actions. Editing controls lock while an agent holds control, while pan, zoom and scopes remain available. Stop returns control immediately. Explicitly tell the agent when to continue. See [CLI](../automation/cli.md).

## Other categories

Use [Local Content Recognition](../ai/model-management.md) for local models, [Advanced Content Analysis](../ai/provider-configuration.md) for API configuration, and [LUTs](../editing/lut-library.md) for packages. About includes version, documentation and GitHub links.
