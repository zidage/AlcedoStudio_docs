---
sidebar_position: 4
---

# GPU 硬件加速管线与 RHI 架构

Alcedo Studio 的图像处理基于 GPU 并行计算与着色器管线实现。通过多平台计算后端抽象与 Qt Quick RHI（Rendering Hardware Interface）桥接，在 GPU 显存内完成高位深（FP16 / FP32）色彩管线计算并直接参与视口合成。

---

## 多平台 GPU 后端架构

核心计算模块位于源码目录的 `alcedo_studio/src/` 下：

```text
┌────────────────────────────────────────────────────────┐
│              GPU Pipeline 抽象接口 (GPU Pipeline)       │
└───────────────────────────┬────────────────────────────┘
                            │ 平台动态调度
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
   [ NVIDIA CUDA ]    [ Apple Metal ]   [ 标准 OpenCL 1.2 ]
    (src/cuda)         (src/metal)       (src/opencl)
```

### 1. NVIDIA CUDA 后端 (Windows)
- **源码位置**：`alcedo_studio/src/cuda/`
- **计算特征**：针对 NVIDIA GPU 开发原生 CUDA 核函数，采用标准单精度浮点（FP32）并行计算（不使用 Tensor Core、cuDNN 或 TensorRT），通过网格与线程块调度优化显存带宽与计算吞吐。
- **重点算子**：神经网络去马赛克（基于手写 CUDA 核函数的前向计算）、双边滤波色调映射、快速傅里叶变换（FFT）及多尺度柔光扩散。

### 2. Apple Metal 后端 (macOS)
- **源码位置**：`alcedo_studio/src/metal/`
- **计算特征**：基于 Apple Metal 计算着色器（Metal Shading Language, MSL）实现，适配 Apple Silicon 统一内存架构（UMA）。CPU 与 GPU 共享物理内存池，避免了独立显卡主机与设备间的 PCI-e 数据传输。

### 3. OpenCL 1.2 通用后端 (Windows / 多平台)
- **源码位置**：`alcedo_studio/src/opencl/`
- **计算特征**：以 OpenCL 1.2 规范作为基准实现，支持各类 AMD Radeon、Intel Arc 以及兼容的独立或集成显卡。着色器程序通过运行时程序注册表（`OpenClBackendProgramRegistry`）进行按需编译与缓存。

---

## 视口合成：Qt Quick RHI 集成

若在 GPU 完成图像处理后将完整像素缓冲区读回 CPU 系统内存再由 UI 重绘，会产生频繁的主机-设备数据回读与内存带宽开销。

Alcedo Studio 在 `src/ui/editor_rhi` 模块中实现了与 Qt Quick RHI 的桥接：
1. **显存内处理**：图像解码后，调色与显示渲染变换（ACES 2.0 / OpenDRT）全程在 GPU 显存内进行，最终输出 16 位浮点或 10 位纹理。
2. **视口纹理桥接**：RHI 渲染器将后处理完成的 GPU 纹理封装为 Qt Quick 场景图（Scene Graph）中的纹理节点，由操作系统的显示合成器直接刷新上屏，避免了多余的主机内存往返。

---

## 性能分析与基准建议

开发者在实现或优化调色算子时，可参考以下工具与测量方式：
- **Windows / CUDA**：使用 NVIDIA Nsight Systems 与 Nsight Compute 分析核函数执行时间、Occupancy、共享内存冲突与寄存器使用量。
- **macOS / Metal**：使用 Xcode 的 Metal Frame Capture 与 Instruments (Metal System Trace) 分析着色器执行流水线与显存带宽。
- **基准测试规范**：性能评估应在相同源文件、固定缩放比例与相同目标分辨率下对比，并区分首次解码加载与后续交互重绘的耗时。
