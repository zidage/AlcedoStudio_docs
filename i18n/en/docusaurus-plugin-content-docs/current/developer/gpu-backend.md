# GPU backends and verification

v0.3.3 uses CUDA/OpenCL on Windows and Metal on Apple Silicon macOS, with Qt RHI presentation. Source paths include src/cuda, src/opencl, src/metal and src/ui/editor_rhi.

## Selection

Choose Settings → Acceleration and restart manually. AI inference runtime is separate from the image-processing backend. The experimental WebGPU path is no longer current. See [installation](../getting-started/installation.md).

## Compare like for like

Fix the source, Version, demosaicing, highlights, lens, crop, LUT encodings and display transform. Record commit, Release/Debug build, driver, GPU and output size.

Distinguish first-open from cached interaction; FIT, 100% detail and full export; processing completion from visible presentation; image differences from resource use and latency.

Do not reduce quality or substitute another backend to hide a failure and report that the original path passed.

## Diagnose

Check availability and restart, record the exact photo/Version/action, distinguish preview/thumbnail/export failure and preserve its real error. Reproduce with the requested Release binary: source inspection is not runtime verification.

Historical performance and fixes are retained in the [release archive](../releases/upgrade-guide.md). They are not speed guarantees for the current device. This tutorial's Windows screenshots are not a cross-platform or cross-GPU consistency test.
