# 使用方法：一键适配 Gemini CLI / Claude Code / Codex

ModelRouter 让你用任意模型（Qwen、Claude、DeepSeek…）无缝替代 OpenAI，只需三步配置。

## 🧩 1. 启动服务

```bash
git clone https://github.com/yaodwwy/modelrouter
cd modelrouter
npm install
npm start  # 默认监听 http://localhost:8080/v1
```

## ⚙️ 2. 配置模型密钥

编辑 `config/adapters.yaml`：

```yaml
adapters:
  qwen:
    endpoint: "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation"
    apiKey: "你的通义千问 API Key"
  claude:
    endpoint: "https://api.anthropic.com/v1/messages"
    apiKey: "你的 Claude API Key"
  gemini:
    endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    apiKey: "你的 Gemini API Key"

modelMap:
  gpt-4: qwen          # 将 gpt-4 映射到 qwen
  gpt-3.5-turbo: claude # 将 gpt-3.5 映射到 claude
  gemini-pro: gemini   # 原生 gemini 模型
```

## 🎯 3. 在工具中配置 baseURL

### ▶️ Codex / Cursor
在设置中填入：
```yaml
modelProvider: openai
openAIBaseURL: http://localhost:8080/v1
openAIKey: any_string_here  # 任意值，不校验
model: gpt-4  # 实际会路由到 Qwen
```

### ▶️ Gemini CLI
如果你的 CLI 支持自定义 baseURL（如通过环境变量）：
```bash
export OPENAI_BASE_URL=http://localhost:8080/v1
export OPENAI_API_KEY=ignored
# 然后正常使用 gemini-cli，它会走本地代理 → 路由到你配置的真实模型
```

### ▶️ Claude Code / 其他支持 OpenAI 协议的工具
同理，设置：
- `baseURL = http://localhost:8080/v1`
- `apiKey = 任意字符串`
- `model = 你在 modelMap 中定义的别名`

## 🔄 自动适配原理

无论你调用的是 `gpt-4`、`claude-3-haiku` 还是 `gemini-pro`，ModelRouter 会：
1. 根据 `modelMap` 查找真实 adapter
2. 转换请求格式 → 发往真实厂商 API
3. 收到响应 → 转回标准 OpenAI 格式
4. 返回给你的工具 —— 完全无感知！

---

✅ 现在你可以：
- 用 Codex 写代码，背后跑的是 Claude
- 用 Gemini CLI，实际调用的是 Qwen
- 一套配置，所有工具通用

开源协议：MIT © Adam Yao