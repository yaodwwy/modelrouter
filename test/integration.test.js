// test/integration.test.ts
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { exec } from 'child_process';
import fetch from 'node-fetch';
let serverProcess;
beforeAll((done) => {
    // 启动服务
    serverProcess = exec('node server/index.ts', { cwd: 'c:/dev/modelrouter' });
    if (serverProcess.stdout) {
        serverProcess.stdout.on('data', (data) => {
            const strData = data.toString();
            if (strData.includes('listening on http://localhost:8080/v1')) {
                done();
            }
        });
    }
    else {
        process.nextTick(() => {
            done(new Error('Server stdout not available'));
        });
    }
});
afterAll(() => {
    if (serverProcess && serverProcess.kill) {
        serverProcess.kill();
    }
});
// 使用条件判断 + 类型断言
if (typeof describe === 'function') {
    describe('Integration Test — Server Routing', () => {
        it('routes qwen-turbo request and returns OpenAI format', async () => {
            try {
                const response = await fetch('http://localhost:8080/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'qwen-turbo',
                        messages: [{ role: 'user', content: 'Hello' }]
                    })
                });
                const json = await response.json();
                expect(response.status).toBe(200);
                expect(json.choices[0].message.content).toBeDefined();
                expect(json.usage.total_tokens).toBeDefined();
            }
            catch (err) {
                throw new Error(`Test failed: ${err}`);
            }
        });
        it('returns error for unknown model', async () => {
            try {
                const response = await fetch('http://localhost:8080/v1/chat/completions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'unknown-model',
                        messages: [{ role: 'user', content: 'Hi' }]
                    })
                });
                const json = await response.json();
                expect(response.status).toBe(400);
                expect(json.error).toContain('No adapter found');
            }
            catch (err) {
                throw new Error(`Test failed: ${err}`);
            }
        });
    });
}
