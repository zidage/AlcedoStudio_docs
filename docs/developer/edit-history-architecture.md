# 编辑历史与版本的存储

本页描述 v0.3.3 的提交图、恢复日志与保存检查点。用户操作见[历史与版本教程](../getting-started/edit-history-and-versions.md)。

## 项目格式边界

v0.2.8 曾引入提交图历史；v0.3.0 又改变了项目与节点流水线格式。**v0.3.x 无法打开或自动迁移 v0.2.9 及更早项目。** 不能仅因旧项目已有 Mini-Git 就认为它与当前格式兼容。

## root、提交与 Version

每张照片有导入基准 root。已确认的编辑形成不可变提交，记录参数或节点图变化。Version 是命名引用，指向一个提交或 root；活动 Version 对应当前编辑状态。

撤销 / 重做移动当前历史位置。撤销后继续编辑会形成新的后续路径，不自动创建命名版本。分支操作显式建立另一个 Version，共享可达祖先。GPU 句柄与预览缓存不属于应持久保存的编辑内容。

## 确认与保存

```text
实时输入 → 预览
确认输入 → 追加应用恢复日志 → 推进工作 head
保存检查点 → 将记录写入 DuckDB → 更新 Version / 流水线 → 清理已保存日志
```

应用恢复日志针对已确认但尚未物化的编辑，DuckDB 自己的 WAL 负责数据库事务的物理恢复。两者用途不同，History 也不是直接显示日志文件。

切换照片、切换 Version、离开编辑器或退出前，需要协调保存检查点。保存失败不能当成成功后继续覆盖状态，界面会给出恢复 / 重试路径。异常恢复的保证应由实际日志与恢复测试确认。

## 当前调整传递

来源照片和 Version 由调整传递服务生成所选参数包。Paste 在目标创建新 Version，原版本继续保留；v0.3.1 起允许复制 Develop / RAW、白平衡、镜头和几何，v0.3.3 修复部分粘贴未选参数保持的问题。

v0.3.0 已移除产品中的 Merge 操作。本页不把历史上双亲提交或冲突处理设计作为当前界面教程。当前入口在 Versions，批量目标通过后台任务完成，应检查最终结果后再声明成功。

## 源码入口

v0.3.3 的 `src/include/app` 包含 editor_working_document、editor_mini_git_commit_writer、editor_mini_git_journal_recovery、editor_mini_git_materializer、editor_save_checkpoint_service 与 adjustment_transfer_service。QML 使用 History / Versions 投影和命令接口，不直接改数据库引用。

相关目录和版本边界见[源码对应表](./tutorial-source-map.md)，对比操作见[A/B 教程](../editing/comparison.md)。
