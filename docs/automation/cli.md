---
sidebar_position: 1
---

# 智能体交互与 alcedo-cli 命令行

Alcedo Studio 原生内置了专为数字暗房设计的自动化工具链 **`alcedo-cli`**。无论是将重复的批处理渲染交给自动化脚本，还是让 AI 智能体连接 GUI 窗口与你协同调色，`alcedo-cli` 都能提供结构化、类型安全的调用接口。

---

## 核心运行模式

`alcedo-cli` 支持两种截然不同但同样强大的运行模式：

```text
[ alcedo-cli 命令行中枢 ]
         │
         ├─▶ 模式 1：GUI 协同伴随模式 (Companion Mode)
         │     通过本地 RPC 连接已打开的桌面窗口，实时协同修图并在屏幕上同步反馈
         │
         └─▶ 模式 2：无头后台流水线 (Headless Pipeline Mode)
               无需渲染 GUI 界面，独立在后台或服务器环境加载项目并执行批量导出
```

---

## 快速定位与基础指令

- **Windows**：随安装包释放于主程序同级目录（`alcedo-cli.exe`）。
- **macOS**：位于应用包内部（`AlcedoStudio.app/Contents/MacOS/alcedo-cli`）。

在终端中运行以下指令核验环境：

```powershell
# 打印帮助信息
alcedo-cli --help

# 列出当前活动的会话 (GUI 窗口或已启动的无头会话)
alcedo-cli --json session list

# 查看完整的 API 规范与参数 Schema
alcedo-cli schema
```

---

## 模式 1：连接 GUI 窗口与智能体协同

![历史中的智能体标记与备注](/img/tutorial-v0.3.3/history.webp)
*AI 智能体在协同过程中生成的参数提交与操作备注*

当你正在 Alcedo Studio 桌面端精修照片时，AI 智能体可以通过 `alcedo-cli` 接入当前窗口协助工作：

### 1. 安全控制权锁协议（Control Lock Protocol）
为防止人工鼠标拖拽与机器人指令发生写入冲突，系统设计了严格的锁控制协议：
1. **获取控制权**：智能体在发起任何修改前，必须先调用 `control.acquire`：
   ```powershell
   alcedo-cli --session <SESSION_NAME> call control.acquire '{"holder_name":"photo-assistant"}'
   ```
2. **界面状态变化**：控制权生效期间，桌面端界面的参数滑块将暂时锁定，顶部任务栏亮起智能体会话卡片。**此时你依然可以自由平移、缩放画布或观察示波器**。
3. **执行调色指令**：智能体执行参数微调、切换分支版本或挂载 LUT，并在提交中附带修改理由（如“提升暗部细节，营造冷调电影感”）。
4. **释放控制权**：操作结束或异常中断时，智能体调用 `control.release` 立即归还桌面控制：
   ```powershell
   alcedo-cli --session <SESSION_NAME> call control.release '{}'
   ```
5. **用户紧急熔断机制**：任何时候若想打断智能体的操作，直接在桌面端点击状态栏的 `停止（Stop）` 按钮，即可无条件强制收回控制权！

---

## 模式 2：无头后台流水线（Headless Batch）

在没有显示器或需要编写自动化工作流的服务器环境中，可启动无头独立会话：

```powershell
# 1. 启动无头会话并指定项目
alcedo-cli session start --headless --project 'D:\Photos\2026_Studio.alcd'

# 2. 调用 tasks.wait 等待后台批处理导出完成
alcedo-cli --session <HEADLESS_SESSION> call tasks.wait '{"task_id":"<task-id>"}'

# 3. 处理完毕后安全关闭会话并保存
alcedo-cli --session <HEADLESS_SESSION> session stop
```

---

## 常用 API 能力速查

通过 `alcedo-cli call <method> '<json_payload>'`，你可以编排几乎所有核心功能：

| 模块类别 | 核心功能与能力说明 |
| --- | --- |
| **项目与图库** | `project.open` / `save`、`library.import`、星级评分、元数据读取与全局搜索。 |
| **暗房编辑** | 检索参数目录（`editor.catalog`）、读取或批量写入曝光/白平衡/曲线参数、挂载 3D LUT。 |
| **分支版本** | 创建命名分支（`versions.branch`）、切换版本分支、执行选择性参数粘贴。 |
| **批处理任务** | 触发导出队列、监控长耗时任务进度并等待返回（`tasks.wait`）。 |

如需配合大模型智能体自主修图，推荐安装官方的 [alcedo skill](https://github.com/zidage/alcedo-skills)，实现全自动闭环的“意图分析 → 调整参数 → 校验直方图”智能暗房助手！
