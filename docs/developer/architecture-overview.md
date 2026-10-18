# 架构总览

本页按 v0.3.3 的生产入口说明模块关系，属于源码说明。界面教程从[界面总览](../getting-started/interface-overview.md)开始。

## 窗口、工作区与模型

`ui/alcedo_main/main.cpp` 初始化应用服务、QML 类型与上下文，加载 Alcedo.Main / Main。Main 组合工具栏、项目对话框、集合侧栏和 WorkspaceHost。WorkspaceHost 持有 LibraryWorkspace 与 EditorWorkspace，工作区路由负责切换。

QML 主要负责呈现与输入，项目、图库查询、编辑会话和任务状态由 C++ 后端提供。检查器统计与图库列表使用统一的浏览 / 查询服务，避免各自维护一套筛选解释。

## 图像处理顺序

```text
文件 → RAW / 位图输入 → Develop → 多个 Color Grade → Display Transform → 后期 → 预览 / 导出
```

每个调色节点有独立调整与蒙版。输入、几何、显示变换和后期属于整张图。编辑器通过 editor_rhi 与 Qt Quick 集成，处理后端按平台使用 CUDA、OpenCL 或 Metal。

## 编辑、保存与版本

editor_session_service 组织编辑会话，命令、工作文档、节点投影、渲染协调与保存检查点分别有自己的职责。已确认编辑追加到恢复日志，再物化进 DuckDB 项目数据；Version 指向提交图的某个 head。切图、切版本和离开编辑器需要协调保存。

库中的批量粘贴通过调整传递服务执行；当前产品使用 Paste 创建新 Version，不提供旧 Merge 界面。详细说明见[历史架构](./edit-history-architecture.md)。

## 后台工作与外部接口

导入、评分、粘贴、导出与 AI 工作通过后台任务暴露状态、进度和结果。图像处理、缩略图和导出有各自的资源 / 调度路径，不能从“都使用 GPU”推断它们完全共享同一个执行上下文。

本地 AI 和远程 API 由 sidecar 服务支持。CLI 通过本地自动化服务器调用应用命令；GUI 状态变更需取得智能体控制。Headless 会话与 GUI 是不同宿主。

入口路径、已加载面板和验证范围见[源码对应表](./tutorial-source-map.md)。性能与线程行为应由对应测试、trace 或 Release 运行证据确认，不能只由模块名称判断。
