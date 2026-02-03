import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as adapters from '../adapters/index.js';
// 临时加载 YAML 配置（生产环境建议转为 JSON 或使用 dotenv）
const configPath = path.join(__dirname, '..', 'config', 'adapters.yaml');
const config = JSON.parse(fs.readFileSync(configPath.replace('.yaml', '.json'), 'utf-8'));
const app = express();
app.use(express.json());
app.post('/v1/chat/completions', async (req, res) => {
    const request = req.body;
    const adapterName = config.modelMap[request.model] || request.model;
    const adapter = adapters[adapterName];
    if (!adapter) {
        return res.status(400).json({ error: `No adapter found for model: ${request.model}` });
    }
    try {
        const transformedReq = adapter.transformRequest(request);
        const rawResponse = await fetch(adapter.endpoint, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${adapter.apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(transformedReq)
        });
        const result = await rawResponse.json();
        const standardized = adapter.transformResponse(result);
        res.json(standardized);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`ModelRouter listening on http://localhost:${PORT}/v1`));
