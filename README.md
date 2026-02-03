# ModelRouter — 统一多模型 API 适配器

> 让所有大模型说 OpenAI 的语言。

一个轻量、插件化、可本地部署的统一模型网关，支持将 Qwen、DeepSeek、Claude、通义千问、Kimi、Ollama 等模型 API 自动转为标准 OpenAI 格式，无缝接入 Codex / Cursor / VSCode 插件 / LangChain 等生态工具。

## ✅ 核心特性
- ✨ 完全兼容 OpenAI `/v1/chat/completions` 协议
- 🧩 插件化 Adapter 架构，轻松扩展新模型
- 🔄 支持模型别名 & 自动 fallback
- 📊 请求日志 + token 统计 + 限速控制
- 🧪 内置测试套件 + Playground 调试界面
- 🐳 支持 Docker 一键部署

## 🚀 快速开始
```bash
git clone https://github.com/yaodwwy/modelrouter
cd modelrouter
npm install
npm start
```

配置 `config/adapters.yaml` 后，即可在 Codex 中设置：
```yaml
modelProvider: openai
openAIBaseURL: http://localhost:8080/v1
openAIKey: any-string
model: qwen-turbo
```

---

📌 下一步：架构设计 → 部署方案 → 测试验证 → GitHub 初始化