---
sidebar_position: 1
---

# AI Features Overview

This page follows v0.3.3. Local labels/semantic search developed through v0.2.6; API descriptions and ratings expanded in v0.2.7. The v0.3.3 [agent/CLI workflow](../automation/cli.md) operates the app and does not replace either AI configuration path.

Alcedo Studio currently offers two AI capability chains: one runs a vision model on your machine for content labels and semantic search; the other goes through an API provider you configure to produce fuller image descriptions, ratings, and rating reasons. The two have different setup entry points, data paths, and use cases.

## Documentation index

- [API provider configuration](./provider-configuration.md): create API provider profiles, save API keys or Codex OAuth, choose models, and run advanced content analysis.
- [Local AI model management](./model-management.md): download, pick a mirror source, and activate a local vision model.
- [AI label generation](./label-generation.md): automatically generate content labels for images, triggered at import or manually.
- [AI search and fuzzy search](./search.md): retrieve images by natural-language semantics in global search, or use fuzzy / exact matching.

## Differences between the two chains

| Capability chain | Setup entry point | Data path | Main results |
| --- | --- | --- | --- |
| Local AI | `Local Content Recognition` | Images are processed locally by the activated model | Content labels, label filtering, semantic search |
| API provider | `Advanced Content Analysis` | Selected images are sent to the chosen API provider | Descriptions, ratings, rating reasons |

Local models are not shipped with the installer; they need to be downloaded. The download source and storage location are set in `Local Content Recognition`; once activated, label generation and semantic search both complete on your machine, and images are not uploaded to an API provider for these two features.

API analysis does not depend on the local CLIP model, but requires a working API provider, credentials, and model. Advanced content analysis only processes the currently selected photos and may incur API provider charges. See [API provider configuration](./provider-configuration.md) for the detailed flow.

## Prerequisites

For local AI, download and activate a model in `Local Content Recognition`. Without an activated model, semantic search is unavailable, and import-time label generation prompts you to set up a local model first.

For API providers, in `Advanced Content Analysis`:

1. Create an API provider profile.
2. Save an API key as required by the provider, or complete the `OpenAI Codex OAuth` login.
3. Choose a model and click `Test & Refresh` to confirm connectivity.
4. Open a project, select at least one photo, and enter `Advanced Content Analysis` from the left tool area.

## Interface language note

Some AI-related controls still appear in English (e.g. `Test & Refresh`, `Analyze Selected`, `Description`, `Rating`). This documentation keeps these English labels so you can find them in the interface; rating strictness names follow the interface language and display in Chinese or English accordingly.
