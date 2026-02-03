import express from 'express';
import { ChatCompletionRequest, ChatCompletionResponse } from './types.js';
import config from '../config/adapters.yaml';
import * as adapters from '../adapters/index.js';

const app = express();
app.use(express.json());

app.post('/v1/chat/completions', async (req, res) => {
  const request: ChatCompletionRequest = req.body;
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8080, () => console.log('ModelRouter listening on http://localhost:8080/v1'));
