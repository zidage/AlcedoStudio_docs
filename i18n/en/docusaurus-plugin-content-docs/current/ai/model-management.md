---
sidebar_position: 3
---

# Local AI Model Management & Activation

Alcedo Studio’s offline content recognition and natural language search are powered by **CLIP (Contrastive Language-Image Pre-training)** vision models, executing on an integrated, high-performance **ONNX Runtime** engine. This page guides you through downloading, managing, and activating local models.

---

## How the Local Vision Model Operates

The local vision model encodes ingested images into dense semantic embeddings:
- **Automatic Content Tagging**: Compares image feature embeddings against thousands of pre-calibrated photographic concepts using cosine similarity, inferring relevant subject tags in milliseconds.
- **Natural Language Semantic Search**: When you search for "lighthouse during storm", the text encoder converts your query into a semantic vector and executes rapid nearest-neighbor vector matching across your local database.
- **100% Client Privacy**: All forward inference occurs strictly on your local CPU / GPU hardware, **generating zero outbound network telemetry or image transfers**.

---

## Configuring Storage & Download Mirrors

Click `Settings` in the top toolbar and navigate to `Local Content Recognition`:

![Local AI model settings](/img/tutorial-v0.3.3/local-ai.webp)
*Local Model Management: Model selection, mirrors, and active runtime state*

### 1. Select Vision Model
Use the model dropdown to pick a pre-trained model suited to your hardware:
- **Default Recommended Model**: Offers a balance of compact file size (a few hundred megabytes) and rapid inference latency, ideal for modern laptops and workstations.
- **High-Precision Model (if available)**: Features broader semantic vocabularies and nuanced scene understanding for demanding workstation hardware.

### 2. Download Directory
Click the folder icon to specify where model weights are stored. An SSD partition with ample free space is recommended.

### 3. Choosing a Download Mirror
Select the optimal download endpoint based on your regional network connectivity:
- **HF Mirror**: A dedicated regional mirror for Hugging Face, recommended for users in mainland China.
- **Hugging Face Official**: Primary source for international users.
- **Sufy CDN**: High-speed global content distribution network fallback.
- **Custom**: For corporate intranets or air-gapped private repositories, provide a direct URL.

---

## Download & Activation Steps

1. **Check Status**: Click `Check`. If the model is not found locally, the card displays a red `Not downloaded` badge.
2. **Download Model**: Click `Download`. The card displays download progress, downloaded bytes, and time remaining. If network interruption occurs, click `Cancel`, switch mirrors, and resume.
3. **Activate Model**: Once downloaded, the badge transitions to gray: `Activate to generate labels`. Click `Activate` to load model weights into ONNX Runtime memory.
4. **Active State**: When the card displays a vibrant green `Active` badge, your local AI engine is ready.

---

## Import Preferences

Under the `Import` section, configure automated behavior when new photographs enter your catalog:
- **Always Ask (Default)**: Displays an optional prompt during import, allowing you to choose whether to run analysis.
- **Always**: Automatically queues all imported photos for background AI analysis.
- **Always Skip**: Ingests images immediately without triggering AI models, leaving manual analysis available at your discretion.

---

With your model activated, proceed to [AI Content Tagging](./label-generation.md) and [AI Semantic & Structured Search](./search.md).
