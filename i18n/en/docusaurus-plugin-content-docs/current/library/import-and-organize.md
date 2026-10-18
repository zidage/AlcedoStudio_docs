# Library: import, collections, ratings and grouping

This page follows the v0.3.3 Library. Disk folders store files; project collections organize photo references.

## Import files or scan a folder

Import Images selects explicit files. Import From Folder scans recursively and asks you to confirm.

The folder dialog has File types: RAW, JPEG, TIFF, PNG and OpenEXR, with counts and remembered selections. Other files are counted and excluded. To import only RAW, deselect other types.

1. Select the folder and wait for scanning.
2. Check categories, counts and relative paths.
3. Click Import … File(s).
4. Wait for completion and inspect imported / failed counts.

Identification uses file contents; renaming an extension does not make an unsupported format valid. v0.3.0 accepted RAW only; v0.3.2 added raster formats. v0.3.3 improves large RAW imports and cancellation, adds a close X and shows imported count in the progress ring. After cancellation, inspect actual completed counts.

The project's LibRaw supports Nikon HE / HE*. If a recovery dialog appears, follow its converter and reimport instructions. Older DNG conversion guidance is not a required step for every Nikon photo.

## Collections and selection

Create a collection under LOCAL FOLDERS and enter its name. Select it to browse its contents; the context menu can add photos to another collection.

Ctrl+A selects every photo in the current view, including more than 1,000 in v0.3.3. The collection, search and filters determine that view.

Deletion distinguishes removal from a collection and deletion from the project. Check the scope. v0.3.3 performs deletion in the background; verify completion in Tasks. Removing project references and managing source files are separate operations.

## Ratings and Image details

Rating in the context menu sets 1–5 stars; Unrated clears it. Since v0.3.1 it applies to all selected photos and saves in the background. Wait, then verify with the rating filter.

The Image inspector shows file, camera, lens, exposure metadata and existing AI analysis. Manual ratings and [API analysis](../ai/provider-configuration.md) are separate entry points; review analysis options before replacing existing ratings.

## Filter, sort and group

![Library and Album inspector](/img/tutorial-v0.3.3/library.webp)

*Windows Release v0.3.3, Chinese UI: Library and Album inspector.*

| Action | Result |
| --- | --- |
| Click a statistic | Filter which photos appear |
| Ascending / descending field action | Order the photos |
| Group field action | Organize collapsible sections |

For example, filter by camera, group by capture date and sort within groups by rating.

v0.3.0 adds capture-date activity view. v0.3.1 adds field sorting/grouping and import-date filters. v0.3.2 adds last-edit sorting and edit-date groups, with unedited photos in a separate group. Sorting on the grouping field also orders groups.

Collapsing groups and returning from Editor preserve the browse position. Reopening a project locates the last edited photo.

SEARCH FILTER shows the active query. Clearing it removes search, but other filters and the collection may still restrict results. See [search](../ai/search.md).

## Capture time

v0.3.3 fixes RAW times being shifted by the computer's timezone. Library and export use the camera-clock time. This applies to newly imported photos only; existing records are not automatically corrected. It does not infer the camera timezone from GPS.

Double-click a selected photo to edit, or [add it to the export queue](../export/workflow.md).
