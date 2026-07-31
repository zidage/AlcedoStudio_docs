---
sidebar_position: 2
---

# API 供应商配置

高级内容分析会通过你配置的 API 供应商，为选中的照片生成描述、评分和评分理由。它与 `Local Content Recognition（本地内容识别）` 中的本地视觉模型是两条独立的能力链：本地模型服务于标签生成和语义搜索；API 供应商服务于更完整的图像描述与评价。

<ol className="ai-config-flow" aria-label="API 供应商配置流程">
  <li>
    <span className="ai-config-flow-number">01</span>
    <strong>打开设置</strong>
    <small>Settings（设置）→ Advanced Content Analysis（高级内容分析）</small>
  </li>
  <li>
    <span className="ai-config-flow-number">02</span>
    <strong>创建配置</strong>
    <small>Provider settings（提供商设置）→ +</small>
  </li>
  <li>
    <span className="ai-config-flow-number">03</span>
    <strong>保存凭据</strong>
    <small>API key（API 密钥）或 Codex Login（Codex 登录）</small>
  </li>
  <li>
    <span className="ai-config-flow-number">04</span>
    <strong>刷新并测试</strong>
    <small>Test &amp; Refresh（测试并刷新）</small>
  </li>
</ol>

:::warning 费用与隐私

高级内容分析会把选中的照片发送给你配置的 API 供应商，API 供应商可能按请求或 token 计费。请在开始前确认 API 供应商的数据保留、训练使用和合规政策；Alcedo Studio 不会替 API 供应商保存这些内容。

:::

## 先分清两种 AI 功能

| 能力 | 设置入口 | 处理位置 | 主要结果 |
| --- | --- | --- | --- |
| 本地 AI | `Local Content Recognition`（本地内容识别） | 图像在本机由已激活模型处理 | 内容标签、标签筛选、语义搜索 |
| API 供应商 | `Advanced Content Analysis`（高级内容分析） | 选中的图像发送到所选 API 供应商 | 图像描述、1–5 星评分、评分理由 |

本页只介绍第二行。需要下载本地模型时，请查看[本地 AI 模型管理](./model-management.md)；需要了解本地标签生成和搜索，请查看 [AI 标签生成](./label-generation.md) 与 [AI 搜索与模糊搜索](./search.md)。

## 打开设置

点击工具栏中的 `Settings（设置）`，在左侧选择 `Advanced Content Analysis（高级内容分析）`。这个分类中的文案已经支持中英文切换；本文统一使用“中文翻译（英文原文）”的写法，方便在不同界面语言下对照。

页面顶部的 `Output language（输出语言）` 控制 API 结果使用的语言：

- `Follow app language（跟随应用语言）`：跟随 Alcedo Studio 的界面语言。
- `English（English）`：要求供应商返回英文描述和理由。
- `中文（中文）`：要求供应商返回中文描述和理由。

这个选项是 AI 输出语言，不会改变软件界面的语言。

## 创建 API 供应商配置

### 1. 添加配置

在 `Provider settings（提供商设置）` 标题右侧点击 `+`，按钮的中文翻译是 `Add provider（添加提供商）`。在弹出的选择窗口中，提示文字 `Choose a template to create a profile from.` 的中文含义是“选择一个模板创建配置”。

选择模板后，软件会立即创建一个配置并打开编辑页；新建配置会成为当前活动配置。模板的默认地址、请求方式、模型和返回格式已经填好，通常只需要补充凭据并刷新模型。

当前模板及其中文说明如下：

| 英文模板名称 | 中文说明 | 默认认证 / 模型 |
| --- | --- | --- |
| `CC Switch Routing - Anthropic-compatible` | CC Switch 路由 - Anthropic 兼容 | 无认证；`ccswitch-routed` |
| `CC Switch Routing - OpenAI-compatible` | CC Switch 路由 - OpenAI 兼容 | 无认证；`ccswitch-routed` |
| `OpenCode - Anthropic-compatible messages` | OpenCode - Anthropic 兼容消息接口 | API 密钥请求头；`Qwen3.7 Plus` |
| `OpenCode - OpenAI-compatible chat` | OpenCode - OpenAI 兼容聊天接口 | Bearer；`Kimi K2.7 Code` |
| `Volcengine Ark / 火山方舟` | 火山方舟 | Bearer；`Doubao Seed 2.0 Lite (260428)` |
| `Volcengine Ark Coding Plan - Anthropic-compatible` | 火山方舟 Coding Plan - Anthropic 兼容 | Bearer；`Doubao Seed 2.0 Lite` |
| `OpenAI Codex OAuth` | OpenAI Codex OAuth | Codex OAuth；`GPT-5.3 Codex` |
| `Custom` | 自定义 | 无认证；`Unconfigured` |

如果使用 CC Switch 或 OpenCode，请先确认对应的路由器或服务地址已经可访问。模板只是配置起点，不会替你创建第三方账户或启动外部服务。

### 2. 配置 API 密钥

除 `OpenAI Codex OAuth` 外，需要密钥的模板会显示 `API key（API 密钥）` 区块：

1. 在 `Paste API key（粘贴 API 密钥）` 输入框粘贴密钥。
2. 点击 `Save Key（保存密钥）`。
3. 页面只显示掩码后的尾部，不会再次显示完整密钥。

需要更换密钥时，重新保存即可；需要移除密钥时点击 `Delete Key（删除密钥）`。密钥由应用的凭据存储区管理，不要把真实密钥写进教程、截图或提交到仓库。

### 3. 配置 OpenAI Codex OAuth

选择 `OpenAI Codex OAuth` 后，编辑页显示 `OpenAI OAuth` 区块，中文界面仍显示 `OpenAI OAuth`，不会要求粘贴 API 密钥。推荐流程是：

1. 点击 `Open Login（打开登录）`，在浏览器中完成 Codex 登录。
2. 回到 Alcedo Studio，等待状态变为已连接；模型会自动加载。
3. 如果当前构建不能自动打开登录流程，在终端运行 `codex login`，完成后回到页面点击 `Use Codex Login（使用 Codex 登录）`。
4. 需要断开账号时点击 `Disconnect（断开连接）`。

`Use Codex Login（使用 Codex 登录）` 会读取本机 Codex 登录文件中的访问凭据；它不会把完整 token 显示在设置界面中。若提示找不到登录文件，请先确认 `codex login` 已成功完成，并且当前用户与 Alcedo Studio 使用的是同一个系统账户。

### 4. 选择模型并测试连接

在 `Model（模型）` 区块中输入关键词搜索模型，输入框提示为 `Search models（搜索模型）`。模板自带一个默认模型；点击 `Test & Refresh（测试并刷新）` 后，Alcedo Studio 会用当前配置连接服务并尝试刷新模型列表。

刷新成功后，可从列表中选择具体模型，选择结果会自动保存。如果没有匹配项，界面会显示 `No matching models（未找到匹配的模型）`。如果 API 供应商不提供模型列表，模板中的默认模型仍可能可以直接使用；此时不要随意修改模型 ID，先参考 API 供应商的接口文档确认准确拼写。

连接结果会显示在按钮下方。按这个顺序检查：

1. API 密钥是否已经保存，或 OAuth 是否显示已连接。
2. `Base URL（基础 URL）` 与 `Endpoint（端点）` 是否属于同一套 API 请求方式。
3. API 供应商是否允许当前模型进行图像输入和结构化输出。
4. 自定义模型列表接口是否需要补充 `Models endpoint（模型端点）` 与 `Models response data pointer（模型响应数据指针）`。

高级内容分析需要视觉输入和结构化结果。模型列表里如果有能力标记，优先选择同时支持 vision 与 structured output 的模型。

## 高级字段

中文界面中的区块名称是 `高级`，英文界面名称是 `Advanced`。本文将它称为“高级字段”，避免把它理解成另一个独立设置页面。

模板已经包含常用值。只有在使用自建网关、代理或非标准兼容接口时，才需要修改这些字段。文本框在编辑结束时自动保存，不需要额外的 Save 按钮；如果当前有正在运行的高级内容分析任务，字段会暂时锁定。

| 字段（英文） | 中文界面 | 作用与常见修改场景 |
| --- | --- | --- |
| `Display name` | 显示名称 | 页面中显示的名称；同时配置多个模型时用于区分配置 |
| `Provider id` | 提供商 ID | 配置的内部 ID，只能使用小写字母、数字和下划线 |
| `Driver` | 驱动 | 选择请求方式的解析器，例如 Anthropic Messages、OpenAI Chat 或 OpenAI Responses |
| `Base URL` | 基础 URL | 服务根地址；改用自建网关、内网代理或区域地址时修改 |
| `Endpoint` | 端点 | 图像分析请求路径；网关路径不同步时修改 |
| `Models endpoint` | 模型端点 | 获取模型列表的路径；API 供应商提供独立列表接口时填写 |
| `Models response data pointer` | 模型响应数据指针 | 从返回 JSON 中取出模型数组的路径，例如 `/models` |
| `Auth type` | 认证类型 | 认证方式：`bearer`、`api_key_header` 或 `none` |
| `Credential slot` | 凭证槽位 | 本地凭据存储中的槽位名；一般不需要修改 |
| `Structured output` | 结构化输出 | 规定返回结构的方式：`tool`、`response_format_json_schema`、`responses_json_schema` 或 `none` |
| `Timeout ms` | 超时（毫秒） | 单次请求等待时间，范围为 1000–300000 毫秒 |
| `Max image bytes` | 最大图像字节数 | 单张发送图像的大小上限，范围为 1–16777216 |
| `Recommended rendition` | 推荐渲染版本 | 发送 `thumbnail`、`preview` 或 `image` 哪种图像版本 |

### 复制与删除配置

- `Duplicate（复制）` 会复制当前配置的请求方式和模型字段，并生成新的内部 ID；复制出来的配置不会自动带上原配置的密钥，需要重新保存。
- `Delete（删除）` 会打开 `Delete provider（删除提供商）` 确认窗口，提示 `Delete this provider profile?（删除此提供商配置？）`。确认框默认勾选 `Delete saved key（删除已保存的密钥）`；如果希望保留凭据槽位，请在确认前取消勾选。

## 运行高级内容分析

完成 API 供应商、凭据和模型配置后，回到相册主界面：

1. 打开一个项目，并在浏览区选择一张或多张照片。
2. 点击左侧工具区的 `Advanced Content Analysis（高级内容分析）`。
3. 对话框顶部会显示 `Provider（提供商）`、`Model（模型）` 和 `Output language（输出语言）`，先确认三项都是预期配置。
4. 在 `Tasks（任务）` 中选择需要生成的内容。
5. 设置 `Overwrite（覆盖）` 规则和评价严苛程度。
6. 点击 `Analyze Selected（分析所选图像）` 开始。

未打开项目或没有选中照片时，入口会被禁用；对话框也不会把“当前浏览区全部照片”当作默认目标，分析范围始终是明确选中的照片。

### Tasks（任务）

可以组合以下任务：

- `Description（描述）`：生成或更新图像描述。
- `Rating（评分）`：生成 1–5 星照片评分。
- `Rating reason（评分理由）`：随评分生成简短的评分理由。只有选中 `Rating（评分）` 时可用。

同时选择 `Description（描述）` 与 `Rating（评分）` 时，软件会以一次 `Analysis（分析）` 阶段完成；只选其中一项时，会显示对应的 `Description（描述）` 或 `Rating（评分）` 阶段。

### Overwrite（覆盖）

默认情况下，三个覆盖选项都已勾选：

- `Overwrite photo rating（覆盖照片评分）`
- `Overwrite rating reason（覆盖评分理由）`
- `Overwrite image description（覆盖图像描述）`

取消某项后，已有对应内容的照片会被跳过，不会被新的结果覆盖。任务结束时，如果有被跳过的照片，结果摘要会显示跳过的数量。

### 评价严苛程度

选择 `Rating（评分）` 后，可以在 `Rating strictness（评价严苛程度）` 中选择评分风格。该选择会保存在本机，下次打开对话框仍会保留：

| 英文选项 | 中文选项 | 评分倾向 |
| --- | --- | --- |
| `Lite` | `水` | 较宽容，普通照片通常落在 3–4 星，理由较温和 |
| `Normal` | `普通` | 平衡的 1–5 星评分，并给出简短理由 |
| `High` | `大师` | 更严格，但优先看寓意、构图、叙事、表达和完整性 |
| `xHigh` | `老法师` | 更关注器材、参数、对比度、饱和度和虚化等细节 |
| `Max` | `懂哥` | 最严格，评价直接，容错最低 |

严苛程度只影响评分任务，不会改变描述任务的输出语言或已选模型。

### 进度、后台与结果

运行时对话框会显示当前阶段、已完成数量、失败数量、取消数量和服务返回的 token 使用量：

- `Cancel（取消）` 会停止后续调用；已经成功保存的结果会保留。
- 如果软件提示当前任务受到交互锁保护，可以点击 `Move task to background（将任务移至后台）` 关闭对话框，让任务继续在后台运行。
- 完成后点击 `Done（完成）` 关闭对话框。结果会刷新当前焦点照片的 `Image` 检查器，可在那里查看和编辑描述、评分与评分理由。
- 部分照片失败时，`Failure details（失败详情）` 会列出文件、API 供应商状态、错误码、模型和 request ID，适合复制给 API 供应商或用于排查。

## Quick Start

先验证一次完整流程时，可以这样做：

1. 打开 `Settings（设置）→ Advanced Content Analysis（高级内容分析）`。
2. 点击 `+ → OpenCode - OpenAI-compatible chat`，保存 `API key（API 密钥）`。
3. 点击 `Test & Refresh（测试并刷新）`，选择一个支持图像输入的模型。
4. 回到相册选择一张照片，打开 `Advanced Content Analysis（高级内容分析）`。
5. 保留 `Description（描述）`、`Rating（评分）`、`Rating reason（评分理由）` 的默认勾选，点击 `Analyze Selected（分析所选图像）`。

如果使用本地 CC Switch 路由，则选择对应的 CC Switch 模板；如果使用其他网关，则从 `Custom（自定义）` 开始，再按 API 供应商文档填写高级字段。

## 常见问题

### Provider（提供商）或 Model（模型）显示为 No provider selected（未选择提供商）/ No model selected（未选择模型）

回到 `Provider settings（提供商设置）`，确认列表中有配置，并点击该配置的使用按钮；编辑配置后选择模型，再用 `Test & Refresh（测试并刷新）` 刷新。新增模板通常会自动成为当前活动配置。

### API 密钥已保存，但 Test & Refresh（测试并刷新）仍失败

检查 `Auth type（认证类型）` 是否与 API 供应商要求一致：Bearer 认证使用 `bearer`，自定义 API 密钥请求头使用 `api_key_header`，本地无密钥路由使用 `none`。同时检查基础 URL 是否重复包含端点路径。

### 模型列表为空

先确认 API 供应商提供模型发现接口；不提供时可继续使用模板默认模型。自定义接口则检查 `Models endpoint（模型端点）` 和 `Models response data pointer（模型响应数据指针）`，并再次点击 `Test & Refresh（测试并刷新）`。

### 分析失败，但界面显示了 request ID

保留 `Failure details（失败详情）` 中的 provider status、error code、model 和 request ID，先核对模型是否支持图像输入与结构化输出，再向 API 供应商查询该 request ID。不要把完整 API key 或 OAuth token 一并发送。

### 设置项变灰，无法修改

通常是另一个高级内容分析任务正在运行。等待任务结束或取消任务后，再回到设置修改 API 供应商；运行中的任务会固定使用开始时的配置。
