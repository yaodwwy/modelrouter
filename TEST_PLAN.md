## 🧪 测试计划：ModelRouter v0.2 — 支持 Gemini CLI / Claude Code / Codex 一键适配

目标：确保任意工具通过 `http://localhost:8080/v1` 调用时，能正确路由到目标模型并返回标准 OpenAI 格式。

### 阶段 1：单元测试（已完成 ✅）
- [x] Adapter 输入/输出转换逻辑验证（Qwen, Claude）
- [x] Vitest 自动化运行

### 阶段 2：集成测试
- [ ] 模拟 HTTP 请求 → 验证服务端路由 + 响应格式
- [ ] 使用真实密钥（或 mock）测试端到端流程

### 阶段 3：工具兼容性测试
- [ ] Codex 接入测试（配置 → 实际生成代码）
- [ ] Gemini CLI 环境变量注入测试
- [ ] Claude Code 工具调用测试

### 阶段 4：流式响应支持（可选 v0.3）
- [ ] 实现 SSE / stream 协议兼容
- [ ] 测试 Cursor / VSCode 插件流式输出

### 阶段 5：部署 & 压力测试
- [ ] Docker 镜像构建 + 运行
- [ ] autocannon / wrk 压测 QPS & 延迟

---

✅ 当前进度：阶段 1 完成。下一步：实现阶段 2 —— 集成测试框架。