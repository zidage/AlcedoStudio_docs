# 编辑历史与版本（Mini-Git）

本章说明 Alcedo Studio 如何记录一张照片的编辑变化，以及这些记录如何写进项目文件、又如何在下次打开时还原。界面上的 **Versions** 与 **Edit History** 是同一套模型的两个视图，不是两套互不相干的历史。

## 项目格式说明

自 Mini-Git 编辑历史起（**v0.2.8 及以后**），项目里的历史与流水线布局与更早版本不同。**v0.2.8 之前创建或保存的项目文件不受支持**：当前版本不会读取或迁移旧的历史布局。请用当时的软件版本打开旧项目，或新建项目后重新导入照片。

## 这套模型在解决什么问题

照片编辑需要能回到过去的某一步，也需要在同一张照片上保留几套不同的处理方向（例如黑白与胶片），同时还不能改动原始 RAW。

较早的做法是：每个 Version 自己持有一条事务列表，再用一个游标标出「当前播到哪」。那样实现简单，但共享祖先时容易重复存储，粘贴/合并的语义也容易和「在列表上挪游标」搅在一起。

当前实现改成小型的、类似 Git 的提交图：

- 每一次确认过的编辑成为一条不可变的 **edit commit**（编辑提交）。
- 一个 **Version** 是命名分支，指向某个提交，或在还没有任何提交时指向图像根。
- 编辑器始终在使用某一个 Version；不支持在未绑定 Version 的状态下编辑。
- 屏幕上的画面、参数面板，以及项目里保存的 Version head，应对齐到同一个当前 Version。

## 基本概念

**图像根（root）**  
导入并解析镜头、尺寸、色彩矩阵等元数据之后得到的不可变基准流水线。每张照片一个 root。之后的编辑都叠在这个基准之上；以后改默认参数，不会悄悄改写已有照片的 root。

**编辑提交（edit commit）**  
松开滑块（或到达规定的合并边界）时写入的不可变对象。普通编辑只有一个父提交；合并提交有两个父提交——当前分支是第一父，传入分支是第二父。

**Version**  
命名分支。身份由稳定的 `version_id` 标识；它当前指向哪里由可变的 `head_commit_hash` 表示。`head_commit_hash` 为空表示指向 root。多个 Version 可以指向同一提交；共享的祖先只存一份。

**HEAD**  
当前正在使用的 Version。

**工作头（working head）**  
内存里的当前 head。可能已经包含记入恢复日志、但尚未写入 DuckDB 的编辑。

**头移动记录（head-move record）**  
撤销/重做时写入恢复日志的记录：在已有提交之间移动 working head。它本身不是新的 edit commit，类似 reflog 条目。

**第一父链（first-parent chain）**  
从 Version head 沿第一父一直走到 root 的路径。重建流水线只沿这条路径正向回放。合并提交的第二父留在图里（供历史与垃圾回收），回放时使用合并提交里已经解决好的字段载荷，而不是把第二父整条分支再跑一遍。

**事务链哈希（transaction-chain hash）**  
提交是流式追加的。每追加一条（或完成一次 head-move），就在上一次链哈希上再折叠一次当前 `commit_hash`，得到新的链哈希。它用来校验「从 root 回放到当前 head」是否与预期一致：哈希沿 first-parent 顺序增量更新。

**恢复日志（recovery journal）**  
每张照片一份的预写日志（write-ahead log，WAL）。已确认的编辑和 head-move 先追加到这里，再在适当时机物化进 DuckDB。

**物化（materialize）**  
把日志里的提交对象写入 DuckDB，并在同一事务里更新：当前 Version 的 ref、序列化后的流水线状态、以及恢复元数据。

**保存检查点（save checkpoint）**  
在切换照片、改用另一个 Version、离开编辑器或退出应用之前，先完成物化的短暂全局阶段。未完成前，相关导航会被挡住。

## 数据如何存放

Version 不再拥有事务数组或游标。它主要保存：`version_id`、所属照片、显示名、`head_commit_hash`，以及创建/更新时间。

Edit commit 按 `commit_hash` 内容寻址。参与哈希的内容包括：格式版本、`root_id`、有序的父哈希、单调递增的时间戳、提交种类，以及规范化后的编辑载荷。普通编辑载荷记录字段的前后值与启用状态；合并载荷记录「把第一父流水线变成合并结果」所需的、已由界面解决的字段差分。重建时不再重新猜冲突该怎么解。

每张照片还保存：`root_id`、当前活动的 `version_id`、已物化的 head 与 transaction-chain hash，以及序列化流水线状态。后者用于加快再次打开时的重建；GPU 句柄、调度器选中的缓存策略等运行时状态不写入历史，也不参与哈希。

## 一次编辑如何进入历史

拖动滑块时，实时流水线会更新预览，此时还没有提交。松开滑块时：

1. 构造并计算这条 edit commit 的哈希；
2. 把完整提交，以及期望的「上一链哈希 / 新链哈希」，追加到恢复日志；
3. 推进内存中的 working head，并把 transaction-chain hash 向前折叠一次。

撤销追加一条 head-move，把 working head 移到第一父，并恢复该提交对应的链哈希。重做则沿内存中的 redo 栈移回子提交。若在撤销之后继续编辑，redo 栈会被清空，并在当前 Version 上长出新的子提交；Version 的 ref 跟到新提交，不会自动再开一个 Version。

## 预写日志与 DuckDB 自己的 WAL

这里有两层容易混在一起的「日志」，需要分开看：

1. **应用层恢复日志（recovery journal）**  
   面向「用户已经确认、但可能还没写进项目库」的编辑。它是 Alcedo 自己的 WAL：先追加，再在 save checkpoint 时物化。它不是第二套给用户看的历史；**Edit History** 面板展示的是提交图，不是把日志原文摊开。

2. **DuckDB 的页级 WAL**  
   只负责数据库页在崩溃后的物理恢复。应用层物化一旦提交成功，之后的耐用性由 DuckDB 保障。

典型顺序是：确认编辑 → 写入恢复日志 →（在切换照片 / 改用 Version / 离开编辑器 / 正常退出前）物化进 DuckDB → 截断已物化的日志前缀 → 再继续导航。异常退出后再次打开时，可根据已提交到恢复日志、但尚未物化的记录把状态接回来。正常退出时，从所有 Version head 出发（含双亲）做可达性标记，删除不可达提交；异常退出不跑这步垃圾回收。

## 粘贴与合并

库与编辑器共用同一个调整传递服务。界面不直接构造提交，也不直接改 Version ref。

**粘贴（Paste）** 是分支替换，不是 cherry-pick。流程是：先完成当前 Version 的 save checkpoint；在目标照片的 root 上建立一条独立分支；把传入的调整包变成可正向回放的提交链；创建新的 Version 并改为使用它。新分支不继承原先活动 Version 上的提交。

**合并（Merge）** 保留两条线。传入调整先表示成目标照片上、相对 root 的一条分支（不切换过去使用）；有冲突的字段由界面给出最终值；然后创建一条合并提交——第一父是当前 Version head，第二父是传入分支 head——并把已解决的字段差分存进该提交，同时推进当前 Version 的 ref。取消冲突解决则不写合并提交、不移动 ref。

面板操作层面的说明见 [编辑历史与版本（界面）](../getting-started/edit-history-and-versions)。

## 与界面的对应

| 界面 | 对应行为 |
| --- | --- |
| **Versions** | 列出 Version ref；点选即改为使用该 Version（会先走 save checkpoint）。 |
| **Branch from current** | 从当前 Version 的 head 建新 Version。 |
| **Fork from root** | 从图像 root 建新 Version。 |
| **Edit History** | 显示当前 Version 的提交图；撤销/重做移动 working head。 |
| **Paste / Merge** | 见上一节。 |

## 另见

- [编辑历史与版本（界面）](../getting-started/edit-history-and-versions)
- [界面总览](../getting-started/interface-overview)
