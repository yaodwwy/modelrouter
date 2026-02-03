# Contributing to ModelRouter

Thanks for your interest in contributing! Here’s how to get started.

## 🛠️ Development Setup

```bash
git clone https://github.com/yaodwwy/modelrouter
cd modelrouter
npm install
npm run dev  # starts server with hot-reload
```

## 🧩 Adding a New Adapter

1. Create `adapters/<modelname>.ts`
2. Implement `transformRequest` and `transformResponse`
3. Export it in `adapters/index.ts`
4. Add config entry in `config/adapters.yaml`

## 🧪 Testing

- Unit tests: `npm test` (TODO: implement)
- Manual test: use curl or Codex to call `http://localhost:8080/v1/chat/completions`

## 📬 Pull Requests

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Open a PR

We’ll review it within 3-5 days.

---

By contributing, you agree that your code will be licensed under MIT.