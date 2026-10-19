---
sidebar_position: 4
---

# GPU Hardware Acceleration & RHI Integration

Alcedo Studio’s image processing pipeline is built on GPU parallel compute and shader stages. Through multi-platform backend abstractions and Qt Quick RHI (Rendering Hardware Interface) integration, high-bit-depth (FP16 / FP32) color processing executes directly within GPU memory and feeds into viewport composition.

---

## Multi-Platform GPU Backend Architecture

Core compute modules reside under `alcedo_studio/src/`:

```text
┌────────────────────────────────────────────────────────┐
│              GPU Pipeline Abstract Interface           │
└───────────────────────────┬────────────────────────────┘
                            │ Platform Dispatch
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
   [ NVIDIA CUDA ]    [ Apple Metal ]   [ Standard OpenCL 1.2 ]
    (src/cuda)         (src/metal)       (src/opencl)
```

### 1. NVIDIA CUDA Backend (Windows)
- **Source Location**: `alcedo_studio/src/cuda/`
- **Compute Characteristics**: Employs native CUDA kernels utilizing standard single-precision floating-point (FP32) parallel execution (without reliance on Tensor Cores, cuDNN, or TensorRT), optimizing memory bandwidth and compute throughput through grid and thread-block scheduling.
- **Key Kernels**: Neural Engine demosaicing (forward inference implemented in handwritten CUDA kernels), bilateral tone mapping filters, Fast Fourier Transforms (FFT), and multi-scale optical diffusion.

### 2. Apple Metal Backend (macOS)
- **Source Location**: `alcedo_studio/src/metal/`
- **Compute Characteristics**: Built with Apple Metal compute shaders (Metal Shading Language, MSL), leveraging Apple Silicon's Unified Memory Architecture (UMA). Shared physical memory between CPU and GPU eliminates host-to-device PCI-e transfer overhead.

### 3. OpenCL 1.2 Generic Backend (Windows / Cross-Platform)
- **Source Location**: `alcedo_studio/src/opencl/`
- **Compute Characteristics**: Standardized on the OpenCL 1.2 specification to ensure baseline portability across AMD Radeon, Intel Arc, and compatible discrete or integrated GPUs. Shader programs are compiled and cached on demand via `OpenClBackendProgramRegistry`.

---

## Viewport Compositing: Qt Quick RHI Integration

In conventional image processing architectures, reading processed pixel buffers back from GPU memory into CPU system RAM before UI redraw introduces substantial host-device memory bandwidth overhead and latency.

Alcedo Studio implements a GPU-resident presentation pipeline in `src/ui/editor_rhi`:
1. **GPU-Resident Processing**: Image decoding, grading, and display rendering transforms (ACES 2.0 / OpenDRT) execute entirely within GPU memory, producing 16-bit floating-point or 10-bit output textures.
2. **Scene Graph Texture Bridge**: The RHI bridge wraps the final processed GPU texture into a Qt Quick Scene Graph texture node. The display compositor renders the texture directly, avoiding redundant host memory round-trips.

---

## Profiling & Benchmarking Guidelines

When developing or profiling custom grading operators, observe the following practices:
- **Windows / CUDA**: Profile with NVIDIA Nsight Systems and Nsight Compute to monitor kernel execution time, occupancy, register pressure, and shared memory bank conflicts.
- **macOS / Metal**: Profile using Xcode Metal Frame Capture and Instruments (Metal System Trace) to evaluate shader pipeline execution and memory bandwidth.
- **Benchmarking Protocol**: Benchmark performance with identical source images, versions, and viewport dimensions, separating initial cold-start decoding latency from cached interactive frame redraws.
