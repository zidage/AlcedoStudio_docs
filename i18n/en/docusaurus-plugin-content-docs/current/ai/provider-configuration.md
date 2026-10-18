---
sidebar_position: 2
---

# API Provider Configuration

Version scope: the v0.3.3 configuration UI. Template model names are configuration starting points; actual availability depends on the provider and Test & Refresh. This documentation update did not send photos to a remote provider or test billable requests.

Advanced content analysis uses an API provider you configure to generate descriptions, ratings, and rating reasons for selected photos. It is a separate capability chain from the local vision model in `Local Content Recognition`: the local model serves label generation and semantic search; the API provider serves fuller image descriptions and evaluations.

<ol className="ai-config-flow" aria-label="API provider configuration flow">
  <li>
    <span className="ai-config-flow-number">01</span>
    <strong>Open settings</strong>
    <small>Settings → Advanced Content Analysis</small>
  </li>
  <li>
    <span className="ai-config-flow-number">02</span>
    <strong>Create a profile</strong>
    <small>Provider settings → +</small>
  </li>
  <li>
    <span className="ai-config-flow-number">03</span>
    <strong>Save credentials</strong>
    <small>API key or Codex Login</small>
  </li>
  <li>
    <span className="ai-config-flow-number">04</span>
    <strong>Refresh and test</strong>
    <small>Test &amp; Refresh</small>
  </li>
</ol>

:::warning Cost and privacy

Advanced content analysis sends the selected photos to the API provider you configured, and the provider may bill per request or per token. Check the provider's data retention, training use, and compliance policies before you start; Alcedo Studio does not store this content on the provider's behalf.

:::

## Two kinds of AI features

| Capability | Setup entry point | Processing location | Main results |
| --- | --- | --- | --- |
| Local AI | `Local Content Recognition` | Images are processed locally by the activated model | Content labels, label filtering, semantic search |
| API provider | `Advanced Content Analysis` | Selected images are sent to the chosen API provider | Image descriptions, 1–5 star ratings, rating reasons |

This page covers only the second row. To download a local model, see [Local AI model management](./model-management.md); for local label generation and search, see [AI label generation](./label-generation.md) and [AI search and fuzzy search](./search.md).

## Opening settings

Click `Settings` on the toolbar and choose `Advanced Content Analysis` on the left. The strings in this section already support switching between Chinese and English; this page writes labels in English, adding the Chinese equivalent in parentheses where the Chinese UI differs, so you can cross-reference under either interface language.

The `Output language` option at the top of the page controls the language of API results:

- `Follow app language`: follows the Alcedo Studio interface language.
- `English`: asks the provider to return English descriptions and reasons.
- `中文` (Chinese): asks the provider to return Chinese descriptions and reasons.

This option controls the AI output language; it does not change the interface language.

## Creating an API provider profile

### 1. Adding a profile

Click `+` next to the `Provider settings` title (labeled `Add provider` in the Chinese UI). In the picker that opens, the prompt text `Choose a template to create a profile from.` appears.

Selecting a template immediately creates a profile and opens its edit page; the new profile becomes the current active one. The template's default address, request style, model, and response format are pre-filled, so you usually only need to add credentials and refresh the models.

The current templates:

| Template name | Notes | Default auth / model |
| --- | --- | --- |
| `CC Switch Routing - Anthropic-compatible` | CC Switch routing via the Anthropic-compatible interface | No auth; `ccswitch-routed` |
| `CC Switch Routing - OpenAI-compatible` | CC Switch routing via the OpenAI-compatible interface | No auth; `ccswitch-routed` |
| `OpenCode - Anthropic-compatible messages` | OpenCode via the Anthropic-compatible messages API | API key header; `Qwen3.7 Plus` |
| `OpenCode - OpenAI-compatible chat` | OpenCode via the OpenAI-compatible chat API | Bearer; `Kimi K2.7 Code` |
| `Volcengine Ark / 火山方舟` | Volcengine Ark | Bearer; `Doubao Seed 2.0 Lite (260428)` |
| `Volcengine Ark Coding Plan - Anthropic-compatible` | Volcengine Ark Coding Plan via the Anthropic-compatible API | Bearer; `Doubao Seed 2.0 Lite` |
| `OpenAI Codex OAuth` | OpenAI Codex OAuth | Codex OAuth; `GPT-5.3 Codex` |
| `Custom` | Custom profile | No auth; `Unconfigured` |

If you use CC Switch or OpenCode, first confirm the router or service address is reachable. A template is only a starting point for the profile; it does not create third-party accounts or start external services for you.

### 2. Configuring an API key

Except for `OpenAI Codex OAuth`, templates that need a key show an `API key` section:

1. Paste the key into the `Paste API key` input.
2. Click `Save Key`.
3. The page only shows the masked tail; the full key is never displayed again.

To replace the key, save a new one; to remove it, click `Delete Key`. Keys are managed by the app's credential store — never put real keys in tutorials, screenshots, or commits.

### 3. Configuring OpenAI Codex OAuth

After selecting `OpenAI Codex OAuth`, the edit page shows an `OpenAI OAuth` section (the Chinese UI also shows `OpenAI OAuth`); no API key is requested. The recommended flow is:

1. Click `Open Login` and complete the Codex login in your browser.
2. Return to Alcedo Studio and wait for the status to become connected; the model loads automatically.
3. If this build cannot open the login flow automatically, run `codex login` in a terminal, then return to the page and click `Use Codex Login`.
4. To disconnect the account, click `Disconnect`.

`Use Codex Login` reads the access credentials in the local Codex login file; it never displays the full token in the settings UI. If no login file is found, confirm that `codex login` completed successfully and that Alcedo Studio runs under the same system account as the current user.

### 4. Choosing a model and testing connectivity

In the `Model` section, type keywords to search models; the input placeholder is `Search models`. Each template ships a default model; after clicking `Test & Refresh`, Alcedo Studio connects with the current profile and tries to refresh the model list.

After a successful refresh, pick a specific model from the list; the selection is saved automatically. If nothing matches, the UI shows `No matching models`. If the API provider does not expose a model list, the template's default model may still work directly; in that case, do not change the model ID arbitrarily — check the provider's API docs for the exact spelling first.

Connectivity results appear below the button. Check in this order:

1. Whether the API key is saved, or OAuth shows connected.
2. Whether `Base URL` and `Endpoint` belong to the same API request style.
3. Whether the API provider allows image input and structured output for the current model.
4. Whether a custom model list endpoint needs `Models endpoint` and `Models response data pointer`.

Advanced content analysis needs vision input and structured results. If the model list exposes capability markers, prefer a model that supports both vision and structured output.

## Advanced fields

The section is named `高级` in the Chinese UI and `Advanced` in the English UI. This page calls it "advanced fields" to avoid implying it is a separate settings page.

Templates already contain the common values. Only modify these fields when using a self-hosted gateway, proxy, or non-standard compatible interface. Text fields autosave when you finish editing; there is no extra Save button. While an advanced content analysis task is running, the fields are locked.

| Field | Purpose and when to change |
| --- | --- |
| `Display name` | The name shown in the UI; distinguishes profiles when you configure several models at once |
| `Provider id` | Internal ID of the profile; lowercase letters, digits, and underscores only |
| `Driver` | Parser for the request style, e.g. Anthropic Messages, OpenAI Chat, or OpenAI Responses |
| `Base URL` | Service root address; change when using a self-hosted gateway, intranet proxy, or regional address |
| `Endpoint` | Image analysis request path; change when the gateway path differs |
| `Models endpoint` | Path that fetches the model list; fill in when the provider has a separate list endpoint |
| `Models response data pointer` | Path to the model array in the response JSON, e.g. `/models` |
| `Auth type` | Authentication method: `bearer`, `api_key_header`, or `none` |
| `Credential slot` | Slot name in the local credential store; usually no need to change |
| `Structured output` | How the response structure is enforced: `tool`, `response_format_json_schema`, `responses_json_schema`, or `none` |
| `Timeout ms` | Wait time per request, 1000–300000 ms |
| `Max image bytes` | Size cap for each sent image, 1–16777216 |
| `Recommended rendition` | Which image rendition is sent: `thumbnail`, `preview`, or `image` |

### Duplicating and deleting profiles

- `Duplicate` copies the current profile's request style and model fields and generates a new internal ID; the copy does not carry the original profile's key, so save it again.
- `Delete` opens a `Delete provider` confirmation dialog with the prompt `Delete this provider profile?`. The dialog defaults to ticking `Delete saved key`; if you want to keep the credential slot, untick it before confirming.

## Running advanced content analysis

After configuring the API provider, credentials, and model, return to the album main screen:

1. Open a project and select one or more photos in the browser.
2. Click `Advanced Content Analysis` in the left tool area.
3. The top of the dialog shows `Provider`, `Model`, and `Output language`; confirm all three are what you expect.
4. Choose what to generate in `Tasks`.
5. Set the `Overwrite` rules and rating strictness.
6. Click `Analyze Selected` to start.

The entry is disabled when no project is open or no photo is selected; the dialog never treats "all photos in the browser" as the default target — the analysis scope is always the explicitly selected photos.

### Tasks

Tasks can be combined:

- `Description`: generates or updates an image description.
- `Rating`: generates a 1–5 star photo rating.
- `Rating reason`: generates a short reason along with the rating. Only available when `Rating` is selected.

Selecting both `Description` and `Rating` runs them in a single `Analysis` phase; selecting only one shows the corresponding `Description` or `Rating` phase.

### Overwrite

All three overwrite options are ticked by default:

- `Overwrite photo rating`
- `Overwrite rating reason`
- `Overwrite image description`

Unticking an option skips photos that already have the corresponding content, so they are not overwritten by new results. When the task finishes, the result summary shows how many photos were skipped.

### Rating strictness

With `Rating` selected, you can choose a rating style in `Rating strictness`. The choice is saved locally and persists the next time the dialog opens:

| English option | Chinese UI | Rating tendency |
| --- | --- | --- |
| `Lite` | `水` | Lenient; ordinary photos usually land at 3–4 stars, gentle reasons |
| `Normal` | `普通` | Balanced 1–5 star ratings with short reasons |
| `High` | `大师` | Stricter, but values meaning, composition, narrative, expression, and completeness first |
| `xHigh` | `老法师` | Focuses more on gear, parameters, contrast, saturation, and bokeh details |
| `Max` | `懂哥` | The strictest; direct feedback, lowest tolerance |

Strictness only affects the rating task; it does not change the description output language or the selected model.

### Progress, background, and results

While running, the dialog shows the current phase, completed count, failed count, canceled count, and the token usage reported by the service:

- `Cancel` stops further calls; results already saved are kept.
- If the app reports that the current task is protected by an interaction lock, click `Move task to background` to close the dialog and let the task continue in the background.
- When finished, click `Done` to close the dialog. The results refresh the `Image` inspector of the currently focused photo, where you can view and edit the description, rating, and rating reason.
- If some photos fail, `Failure details` lists the file, provider status, error code, model, and request ID — suitable for copying to the provider or for troubleshooting.

## Quick start

To validate the full flow once:

1. Open `Settings → Advanced Content Analysis`.
2. Click `+ → OpenCode - OpenAI-compatible chat`, and save an `API key`.
3. Click `Test & Refresh` and choose a model that supports image input.
4. Return to the album, select a photo, and open `Advanced Content Analysis`.
5. Keep the default selections for `Description`, `Rating`, and `Rating reason`, and click `Analyze Selected`.

If you use a local CC Switch router, pick the matching CC Switch template; with another gateway, start from `Custom` and fill in the advanced fields per the provider's docs.

## FAQ

### Provider or Model shows "No provider selected" / "No model selected"

Return to `Provider settings`, make sure a profile exists in the list, and click its use button; after editing a profile, choose a model and refresh with `Test & Refresh`. A newly added template usually becomes the active profile automatically.

### API key saved, but Test & Refresh still fails

Check whether `Auth type` matches the provider's requirement: Bearer auth uses `bearer`, a custom API key header uses `api_key_header`, and a local keyless router uses `none`. Also check that the base URL does not repeat the endpoint path.

### Empty model list

First confirm the provider exposes a model discovery endpoint; if it does not, you can keep using the template default model. For custom endpoints, check `Models endpoint` and `Models response data pointer`, then click `Test & Refresh` again.

### Analysis fails, but the UI shows a request ID

Keep the provider status, error code, model, and request ID from `Failure details`; first verify the model supports image input and structured output, then ask the provider about that request ID. Never send a full API key or OAuth token along.

### Settings are grayed out

Usually another advanced content analysis task is running. Wait for it to finish or cancel it before returning to edit the API provider; a running task is pinned to the profile it started with.
