// Claude Adapter — converts OpenAI format → Anthropic format
export const claude = {
  name: 'claude',
  transformRequest(req) {
    return {
      model: 'claude-3-haiku-20240307',
      messages: req.messages,
      max_tokens: req.max_tokens || 1024,
      temperature: req.temperature
    };
  },
  transformResponse(raw) {
    return {
      id: 'chatcmpl-' + Date.now(),
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: 'claude-3-haiku',
      choices: [{
        index: 0,
        message: { role: 'assistant', content: raw.content[0].text },
        finish_reason: raw.stop_reason || 'stop'
      }],
      usage: { prompt_tokens: raw.usage.input_tokens, completion_tokens: raw.usage.output_tokens, total_tokens: raw.usage.input_tokens + raw.usage.output_tokens }
    };
  }
};