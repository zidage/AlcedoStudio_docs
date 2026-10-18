# 智能体与 alcedo-cli

v0.3.3 随应用安装 `alcedo-cli`。它可以操作无窗口的独立会话，或连接你正在使用的 Alcedo Studio 窗口。此页介绍使用流程；参数以与应用同版的 CLI schema 为准。

本次实测 Release 的面板切换和径向蒙版绘制通过原生界面完成；QML 中存在一个功能，不代表 CLI 一定有独立命令。

## 找到 CLI 并检查命令

Windows 的 CLI 位于应用程序旁；macOS 位于应用包内。先在对应目录运行，或把该目录加入 PATH。

```powershell
alcedo-cli --help
alcedo-cli --json session list
alcedo-cli schema
```

会话列表用来确认连接目标；多个会话并存时，使用 `--session SESSION_NAME`，不要让脚本猜目标。CLI 和应用应使用相同版本。

## 在当前窗口协作

![历史中的智能体标记与备注](/img/tutorial-v0.3.3/history.webp)

*Windows Release v0.3.3 实机：历史中的智能体标记与备注。*

1. 在 GUI 中打开项目；CLI 的 session list 应显示该窗口会话可用。
2. 选定会话，读取项目 / 图库信息。
3. 智能体先 `control.acquire` 获取控制，才执行改变项目状态的命令。
4. 按“预览 → 检查 → 调整”循环工作，记录编辑理由。
5. 操作结束后调用 `control.release` 归还控制，即使处理中出错也应释放。

例如获取 / 释放指定会话的控制：

```powershell
alcedo-cli --session SESSION_NAME call control.acquire '{"holder_name":"photo-assistant"}'
alcedo-cli --session SESSION_NAME call control.get '{}'
alcedo-cli --session SESSION_NAME call control.release '{}'
```

请用实际会话名替换占位符。示例用于说明调用形式；本次实机演示在独立项目中操作，现有项目的编辑未被调整。

控制期间，你仍能平移、缩放与看示波器，改变状态的编辑控件暂时不可用。任务区显示智能体操作，历史（History）标记智能体编辑与备注。按停止（Stop）后智能体应停止，只有你明确要求继续后才能重新取得控制。

## 无窗口会话

```powershell
alcedo-cli session start --headless --project 'D:\Photos\Trip.alcd'
alcedo-cli --json session list
alcedo-cli schema
```

独立会话适合批量工作。完成并确认保存后，仅停止自己启动的会话：

```powershell
alcedo-cli --session HEADLESS_NAME session stop
```

不要用 session stop 关闭用户正在使用的 GUI 会话。

## 能做什么

| 范围 | 操作 |
| --- | --- |
| 项目与图库 | 打开 / 创建 / 保存、导入、选择、评分、元数据、搜索与删除 |
| 编辑 | 打开照片、读写参数、LUT、撤销 / 重做、历史 |
| 版本 | 创建、分支、切换、改名、删除、复制 / 粘贴调整 |
| 输出 | 生成预览、导出、查询并等待后台任务 |

执行前查看 schema 中的字段名、范围与要求，读取 `editor.catalog` 等目录确定支持的参数；不要直接套用其他版本的参数对象。

## 等待批量操作

导入、批量粘贴或导出返回 task_id 时，继续调用：

```powershell
alcedo-cli --session SESSION_NAME call tasks.wait '{"task_id":"<returned-task-id>"}'
```

检查最终状态、成功 / 失败数量和结果，再检查图库或输出文件。只拿到 task_id 不能证明批次成功。

用户想让智能体直接修图时，可配合项目的 [alcedo skill](https://github.com/zidage/alcedo-skills) 建立预览检查循环。手工编辑流程仍见[第一次编辑](../getting-started/first-edit.md)。
