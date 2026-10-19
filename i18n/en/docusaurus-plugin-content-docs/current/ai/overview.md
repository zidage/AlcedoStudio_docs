---
sidebar_position: 1
---

# On-Device AI & Intelligence Overview

Alcedo Studio embraces an **On-Device First** and **CLI Automation** intelligence architecture tailored for professional digital darkrooms. It delivers lightning-fast semantic organization and automated grading while preserving absolute client privacy.

---

## Core Philosophy: Privacy, Speed & Zero Manual API Setup

Forcing photographers to copy and paste API keys, configure proxy endpoints, and manage cloud billing inside a creative darkroom GUI is a clunky and outdated pattern. With the evolution of autonomous agents and the `alcedo-cli` interface, Alcedo Studio decouples intelligence into two modern pathways:

```text
                                  ┌──▶ [ 1. Local On-Device AI (CLIP / ONNX) ]
                                  │      - 100% offline compute; zero image leakage; zero API fees
[ Alcedo Studio Intelligence ] ──┤      - Millisecond automated tagging & natural language search
                                  │
                                  └──▶ [ 2. Automation Hub (alcedo-cli) ]
                                         - Eliminates clumsy manual API key setup in the GUI
                                         - External agents connect via local RPC for co-grading and pipelines
```

### 1. Absolute Privacy by Design
Raw photographs often capture private portraits, unreleased commercial products, or sensitive locations. Alcedo Studio’s visual models execute strictly on your local CPU / GPU hardware. Neither image pixels nor extracted embeddings ever leave your computer.

### 2. Instant Local Response
Optimized lightweight models infer image features in milliseconds, indexing hundreds of newly imported photographs without network latency or upload queues.

### 3. Freedom from Clumsy API Key Juggling
Rather than requiring users to manually configure third-party endpoints and API keys within darkroom panels, `alcedo-cli` enables external autonomous agents to orchestrate edits, batch runs, and catalog workflows directly.

---

## Feature Roadmap

1. **[Local Model Management & Deployment](./model-management.md)**  
   Download, verify, and activate on-device vision models using official or regional mirrors.
2. **[AI Automated Content Tagging](./label-generation.md)**  
   Enable automatic classification upon import or trigger bulk tagging across existing photo catalogs.
3. **[Semantic & Structured Search](./search.md)**  
   Search your photo library using natural language phrases (e.g. "red vintage car at dusk", "snowy cabin") without manual tagging.
4. **[Automation with alcedo-cli](../automation/cli.md)**  
   Leverage the command-line interface to empower AI companion agents to adjust exposures, branch versions, and execute headless batch pipelines.
