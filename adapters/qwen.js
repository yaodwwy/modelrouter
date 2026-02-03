// Qwen Adapter — converts OpenAI format → DashScope format
export const qwen = {
    name: 'qwen',
    transformRequest(req) {
        return {
            model: 'qwen-turbo',
            input: { messages: req.messages },
            parameters: { temperature: req.temperature, max_tokens: req.max_tokens }
        };
    },
    transformResponse(raw) {
        return {
            id: 'chatcmpl-' + Date.now(),
            object: 'chat.completion',
            created: Math.floor(Date.now() / 1000),
            model: 'qwen-turbo',
            choices: [{
                    index: 0,
                    message: { role: 'assistant', content: raw.output.text },
                    finish_reason: 'stop'
                }],
            usage: { prompt_tokens: raw.usage.input_tokens, completion_tokens: raw.usage.output_tokens, total_tokens: raw.usage.total_tokens }
        };
    }
};
