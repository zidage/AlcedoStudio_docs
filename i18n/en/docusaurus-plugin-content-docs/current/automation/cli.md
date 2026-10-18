# Agents and alcedo-cli

v0.3.3 installs alcedo-cli with the application. It can connect to a GUI window or start an independent headless session. Use the schema from the same application version for exact parameters.

## Inspect the installation

Windows places the CLI beside the program; macOS places it inside the app bundle. Run from that directory or add it to PATH.

```powershell
alcedo-cli --help
alcedo-cli --json session list
alcedo-cli schema
```

Select a named session when several exist. Keep CLI and application versions aligned.

## Work in a GUI session

![Agent badges and notes in History](/img/tutorial-v0.3.3/history.webp)

*Windows Release v0.3.3, Chinese UI: Agent badges and notes in History.*

Read the project and selection first, acquire control before changing state, inspect previews between edits and release control even after errors.

```powershell
alcedo-cli --session SESSION_NAME call control.acquire '{"holder_name":"photo-assistant"}'
alcedo-cli --session SESSION_NAME call control.get '{}'
alcedo-cli --session SESSION_NAME call control.release '{}'
```

Replace SESSION_NAME with the actual name. Editing controls lock during control; pan, zoom and scopes remain available. Tasks list agent actions, while History shows badges and notes. After Stop, the agent must wait for your explicit instruction before reacquiring.

## Headless work

```powershell
alcedo-cli session start --headless --project 'D:\Photos\Trip.alcd'
alcedo-cli --json session list
alcedo-cli schema
alcedo-cli --session HEADLESS_NAME session stop
```

Stop only the headless session you started, after saving and waiting for work to finish. Never stop the user's GUI session.

## Supported operations

Projects/library include create/open/save, import, selection, ratings, metadata, search and deletion. Editing includes cataloged fields, LUTs, undo/redo and history. Versions include creation, branching, checkout, rename, removal and adjustment copy/paste. Output includes preview rendering, export and task monitoring.

Inspect editor.catalog rather than guessing fields or borrowing another version's objects. In the tested Release, panel navigation and drawing a radial mask used the native UI; the presence of a feature in QML does not establish a dedicated CLI command.

## Wait for background work

```powershell
alcedo-cli --session SESSION_NAME call tasks.wait '{"task_id":"RETURNED_TASK_ID"}'
```

Check final state, successful/failed counts and output. A task_id alone is not proof of completion.

The [alcedo skill](https://github.com/zidage/alcedo-skills) supports an agent's preview → inspect → refine loop. For the screenshot demonstration, the Release CLI imported eight RAWs, changed exposure, branched a Version and applied a LUT in an independent project; see [verification scope](../developer/tutorial-source-map.md).
