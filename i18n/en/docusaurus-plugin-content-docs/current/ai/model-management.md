---
sidebar_position: 3
---

import InterfaceMock from '@site/src/components/InterfaceMock';

# Local AI Model Management & Activation

Alcedo Studio uses **CLIP (Contrastive Language-Image Pre-training)** vision models and **ONNX Runtime** for local content recognition and natural language search. This page describes how to download, manage, and activate models.

---

## How the Local Vision Model Operates

The local vision model encodes ingested images into dense semantic embeddings:
- **Automatic Content Tagging**: Compares image embeddings with predefined tags using cosine similarity to generate content labels.
- **Natural Language Semantic Search**: The text encoder converts a query such as "lighthouse during storm" into a vector and matches it against local image embeddings.
- **Local Inference**: The model runs on your computer; downloading a model requires a network connection.

---

## Configuring Storage & Download Mirrors

Click `Settings` in the top toolbar and navigate to `Local Content Recognition`:

<InterfaceMock kind="local-ai" />

### 1. Select Vision Model
Use the model dropdown to select a pre-trained model. Model size and hardware requirements vary, so consider your available storage and hardware.

### 2. Download Directory
Click the folder icon to specify where model weights are stored. An SSD partition with ample free space is recommended.

### 3. Choosing a Download Mirror
Select a download source based on your network connection:
- **HF Mirror**: A Hugging Face mirror.
- **Hugging Face Official**: Downloads from Hugging Face.
- **Sufy CDN**: An alternative download source.
- **Custom**: Enter a direct URL for the model file.

---

## Download & Activation Steps

1. **Check Status**: Click `Check`. If the model is not found locally, the card displays a red `Not downloaded` badge.
2. **Download Model**: Click `Download`. The card displays download progress, downloaded bytes, and time remaining. If network interruption occurs, click `Cancel`, switch mirrors, and resume.
3. **Activate Model**: Once downloaded, the badge transitions to gray: `Activate to generate labels`. Click `Activate` to load model weights into ONNX Runtime memory.
4. **Active State**: The model is active when the card displays a green `Active` badge.

---

## Import Preferences

Under the `Import` section, configure automated behavior when new photographs enter your catalog:
- **Always Ask (Default)**: Displays an optional prompt during import, allowing you to choose whether to run analysis.
- **Always**: Automatically queues all imported photos for background AI analysis.
- **Always Skip**: Ingests images immediately without triggering AI models, leaving manual analysis available at your discretion.

---

With your model activated, proceed to [AI Content Tagging](./label-generation.md) and [AI Semantic & Structured Search](./search.md).
