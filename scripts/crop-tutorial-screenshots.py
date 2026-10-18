"""Crop real Release window captures for the tutorials; never redraw UI content.

Run with the bundled Python (Pillow):
  python scripts/crop-tutorial-screenshots.py
Raw screenshots stay in the ignored .work directory.
"""
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / ".work/tutorial-capture/screens"
OUT = ROOT / "static/img/tutorial-v0.3.3"
# Pixel coordinates are from inspected 1707 x 919 window captures.
CROPS = {
    "new-project": (334, 155, 1374, 758),
    "library": (0, 0, 1707, 905),
    "editor-tone": (0, 0, 1707, 905),
    "tone": (1385, 300, 1700, 905),
    "post": (1385, 300, 1700, 905),
    "raw-white-balance": (1385, 300, 1700, 905),
    "raw-decode": (1385, 500, 1700, 905),
    "geometry": (480, 55, 1700, 905),
    "geometry-controls": (1385, 300, 1700, 905),
    "look": (1385, 300, 1700, 905),
    "display-transform": (1385, 300, 1700, 905),
    "lut-browser": (80, 60, 650, 900),
    "lut-controls": (1385, 300, 1700, 710),
    "nodes": (80, 60, 400, 650),
    "masks": (80, 60, 1700, 905),
    "mask-controls": (1385, 300, 1700, 905),
    "versions": (80, 60, 400, 390),
    "history": (80, 60, 400, 545),
    "comparison": (410, 60, 1700, 770),
    "comparison-controls": (1385, 300, 1700, 730),
    "export-presets": (1405, 118, 1690, 432),
    "export-metadata": (1405, 365, 1690, 770),
    "export-sizing": (1405, 210, 1690, 770),
    "export-hdr-queue": (1405, 405, 1690, 780),
    "settings": (364, 146, 1345, 767),
    "keyboard": (364, 146, 1345, 767),
    "local-ai": (364, 146, 1345, 767),
    "lut-settings": (364, 146, 1345, 767),
    "lut-packages": (640, 365, 1320, 655),
    "search-conditions": (945, 190, 1240, 575),
    "search-results": (294, 110, 1414, 820),
}
OUT.mkdir(parents=True, exist_ok=True)
records = []
for name, box in CROPS.items():
    original = {"tone": "editor-tone", "geometry-controls": "geometry",
                "mask-controls": "masks", "comparison-controls": "comparison"}.get(name, name)
    source = RAW / f"{original}.png"
    image = Image.open(source)
    if image.size != (1707, 919):
        raise ValueError(f"Reinspect crop coordinates for {source.name}: {image.size}")
    cropped = image.crop(box)
    output = OUT / f"{name}.webp"
    cropped.save(output, format="WEBP", lossless=True, method=6)
    records.append({
        "file": f"img/tutorial-v0.3.3/{output.name}",
        "source": source.name,
        "source_sha256": hashlib.sha256(source.read_bytes()).hexdigest(),
        "output_sha256": hashlib.sha256(output.read_bytes()).hexdigest(),
        "capture_time_utc": datetime.fromtimestamp(source.stat().st_mtime, timezone.utc).isoformat(),
        "crop_ltrb": box,
        "width": cropped.width,
        "height": cropped.height,
    })
manifest = {
    "application_version": "0.3.3",
    "application_binary_sha256": "82e5b0d1f804b52acbec039c9da28b991c2c4465d950faaa1472e5fee3f8b28a",
    "version_evidence": "Live GUI session.describe application_version",
    "platform": "Windows",
    "ui_language": "zh-CN",
    "project": "Independent Alcedo Tutorial project, eight RAW references",
    "operations": "CLI project/import/editor/versions/LUT; native UI panel navigation, radial mask and comparison",
    "processing": "Crop and lossless WebP encoding only; no generated UI or image retouching",
    "limits": "Screenshots verify the displayed controls. No export completion or remote AI analysis was tested.",
    "screenshots": records,
}
(ROOT / "static/reference/tutorial-screenshots.json").write_text(
    json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n"
)
print(f"Wrote {len(records)} crops ({sum(p.stat().st_size for p in OUT.glob('*.webp')):,} bytes)")
