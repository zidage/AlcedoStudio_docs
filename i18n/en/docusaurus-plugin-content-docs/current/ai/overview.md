---
sidebar_position: 1
---

# Local AI & Automation Overview

Alcedo Studio uses local vision models to generate photo tags and support natural language search. External scripts or AI agents can use `alcedo-cli` to work with projects and edit photos.

---

## Local Models & Command-Line Automation

The local model and command-line tool provide content recognition and automation:

```text
                                  ┌──▶ [ 1. Local On-Device AI (CLIP / ONNX) ]
                                  │      - Local content tagging and natural language search
[ Alcedo Studio ] ───────────────┤
                                  │
                                  └──▶ [ 2. Command-Line Tool (alcedo-cli) ]
                                         - Scripts or agents edit and run batches through local RPC
```

### 1. Local Content Recognition
After a model is downloaded and activated, tagging and natural language search use it for local inference.

### 2. Command-Line Automation
External scripts and AI agents can use `alcedo-cli` to connect to an application window or start a headless session for batch processing. Configuration of an external agent depends on the tool it uses.

---

## Guides

1. **[Local Model Management & Deployment](./model-management.md)**  
   Download, verify, and activate on-device vision models using official or regional mirrors.
2. **[AI Automated Content Tagging](./label-generation.md)**  
   Enable automatic classification upon import or trigger bulk tagging across existing photo catalogs.
3. **[Semantic & Structured Search](./search.md)**  
   Search your photo library using natural language phrases (e.g. "red vintage car at dusk", "snowy cabin") without manual tagging.
4. **[Automation with alcedo-cli](../automation/cli.md)**  
   Use the command-line interface to adjust exposure, branch versions, and run headless batch jobs.
