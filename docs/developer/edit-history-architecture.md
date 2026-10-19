---
sidebar_position: 3
---

# 编辑历史与版本存储架构

Alcedo Studio 的编辑历史采用 **有向无环图（DAG）提交与分支存储模型（内部实现为 Mini-Git 结构）**，支持非线性分支与非破坏性版本管理。

---

## 核心数据结构与抽象模型

在底层 C++ 服务中，每张照片的编辑上下文由以下核心对象组成：

```text
       [ Root 导入基准 ] (不可变基础)
              │
       [ Commit 1: 基础曝光 ]
              │
       [ Commit 2: 镜头校正与构图 ]
             / \
            /   \
           ▼     ▼
  [ Commit 3A ]  [ Commit 3B ]
  (暖调电影胶片)   (高反差黑白)
       ▲               ▲
       │               │
  Version: "Warm"  Version: "B&W" (活动分支指针)
```

1. **Root（导入基准）**：每张照片被导入时生成的不可变根节点，记录源文件物理路径、原始传感器色彩矩阵与默认元数据。
2. **Commit（提交节点）**：不可变的调整事务。记录单次滑块修改、色调曲线变动、节点增删或蒙版几何形变的精确参数差量。每个 Commit 均持有对其父提交（Parent Commit）的哈希指针。
3. **Version（版本分支指针）**：轻量级命名引用（类似于 Git 中的分支名 `refs/heads/*`），指向 DAG 图中的某个具体 Commit 节点。活动 Version（Active Version）决定了当前视口加载哪一套调色状态。

---

## 双写机制与保存检查点（Checkpoint Pipeline）

为兼顾滑块交互的低延迟响应与意外退出下的数据持久性，系统采用了分层事务管线：

```text
[ 用户滑块松开 / 确定输入 ]
            │
            ▼
[ 1. 追加恢复日志 (Journal Recovery Log) ] ──▶ 追加记录至本地内存事务日志，推进 Head 指针
            │
            ▼ (切图 / 切版本 / 保存项目 / 正常退出)
[ 2. 检查点物化服务 (Save Checkpoint) ]    ──▶ 将待提交记录物化至 DuckDB 表中，更新 Version 索引
            │
            ▼
[ 3. 日志轮转与清理 ]                      ──▶ 清理已成功写入数据库的暂存日志条目
```

### 为什么不直接实时写数据库？
如果用户连续快速调整滑块，若每次操作都同步执行 DuckDB 磁盘写事务，会增加磁盘 I/O 负担并影响交互流畅度。
通过引入 **恢复日志（Journal Log）**，滑块操作先写入轻量级日志并更新内存状态；当发生工作区切换、分支检出或触发保存时，物化服务（`editor_mini_git_materializer`）将待处理的提交批量写入 DuckDB。若遇到异常退出，重启时恢复引擎会重放未物化的日志，恢复未落盘的编辑提交。

---

## 选择性参数传递实现（Adjustment Transfer）

`adjustment_transfer_service` 负责跨照片调色复用：
1. **参数提取**：从来源照片的指定 Version 节点提取序列化参数树，并按模块（Tone、Look、LUT、Geometry 等）进行特征过滤。
2. **分支注入**：针对每张目标照片，以其当前的 Active Commit 为基底，创建一个**全新的分支 Commit 与专属 Version**，将选中的参数合并注入，而目标照片原本未被选中的参数（如独特的镜头校正或裁剪构图）完整保持不变。
3. **后台并发**：大批量传递通过后台任务队列执行，避免占用 UI 线程。

---

## 核心源码文件索引

相关核心实现位于 `alcedo_studio/src/` 源码树下：
- `include/app/editor_working_document.hpp`：活动编辑工作文档抽象
- `include/app/editor_mini_git_commit_writer.hpp`：DAG 提交生成器
- `include/app/editor_mini_git_journal_recovery.hpp`：故障恢复日志管理
- `include/app/editor_mini_git_materializer.hpp`：DuckDB 数据库物化写入服务
- `include/app/adjustment_transfer_service.hpp`：选择性参数复制与批量注入
