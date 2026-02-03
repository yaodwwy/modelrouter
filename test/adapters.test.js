import { describe, it, expect, vi, beforeEach } from 'vitest';
import { qwen, claude } from '../adapters/index.js';
// Mock fetch globally
vi.stubGlobal('fetch', vi.fn());
beforeEach(() => {
    vi.clearAllMocks();
});
describe('Qwen Adapter', () => {
    it('transforms OpenAI request to Qwen format', () => {
        const openaiReq = {
            model: 'qwen-turbo',
            messages: [{ role: 'user', content: 'Hello' }],
            temperature: 0.7,
            max_tokens: 100
        };
        const transformed = qwen.transformRequest(openaiReq);
        expect(transformed).toEqual({
            model: 'qwen-turbo',
            input: { messages: [{ role: 'user', content: 'Hello' }] },
            parameters: { temperature: 0.7, max_tokens: 100 }
        });
    });
    it('transforms Qwen response to OpenAI format', () => {
        const qwenRes = {
            output: { text: 'Hi there!' },
            usage: { input_tokens: 5, output_tokens: 3, total_tokens: 8 }
        };
        const standardized = qwen.transformResponse(qwenRes);
        expect(standardized.choices[0].message.content).toBe('Hi there!');
        expect(standardized.usage.total_tokens).toBe(8);
    });
});
describe('Claude Adapter', () => {
    it('transforms OpenAI request to Claude format', () => {
        const openaiReq = {
            model: 'claude-3-haiku',
            messages: [{ role: 'user', content: 'Hello' }],
            temperature: 0.7,
            max_tokens: 100
        };
        const transformed = claude.transformRequest(openaiReq);
        expect(transformed).toEqual({
            model: 'claude-3-haiku-20240307',
            messages: [{ role: 'user', content: 'Hello' }],
            max_tokens: 100,
            temperature: 0.7
        });
    });
    it('transforms Claude response to OpenAI format', () => {
        const claudeRes = {
            content: [{ text: 'Hey!' }],
            usage: { input_tokens: 4, output_tokens: 2 }
        };
        const standardized = claude.transformResponse(claudeRes);
        expect(standardized.choices[0].message.content).toBe('Hey!');
        expect(standardized.usage.total_tokens).toBe(6);
    });
});
