// test/integration.test.ts
import { exec } from 'child_process';
import fetch from 'node-fetch';

let serverProcess: any;

// 启动服务函数
async function startServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    serverProcess = exec('node dist/server/index.js', { cwd: 'c:/dev/modelrouter' });
    
    if (serverProcess.stdout) {
      serverProcess.stdout.on('data', (data: Buffer) => {
        const strData = data.toString();
        if (strData.includes('listening on http://localhost:8080/v1')) {
          resolve();
        }
      });
    } else {
      process.nextTick(() => {
        reject(new Error('Server stdout not available'));
      });
    }
  });
}

// 停止服务函数
function stopServer(): void {
  if (serverProcess && serverProcess.kill) {
    serverProcess.kill();
  }
}

// 完全移除 describe 和 it，改用自定义测试函数
async function runIntegrationTests() {
  console.log('Running integration tests...');
  
  try {
    // 启动服务
    await startServer();
    console.log('✓ Server started');
    
    // 测试1: 正常路由
    try {
      const response1 = await fetch('http://localhost:8080/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen-turbo',
          messages: [{ role: 'user', content: 'Hello' }]
        })
      });
      
      if (response1.status !== 200) {
        throw new Error(`Expected 200, got ${response1.status}`);
      }
      
      const json1: any = await response1.json();
      if (!json1.choices[0].message.content) {
        throw new Error('No content in response');
      }
      
      console.log('✓ Test 1 passed: routes qwen-turbo request');
    } catch (err) {
      console.error('✗ Test 1 failed:', err);
      throw err;
    }

    // 测试2: 未知模型错误
    try {
      const response2 = await fetch('http://localhost:8080/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'unknown-model',
          messages: [{ role: 'user', content: 'Hi' }]
        })
      });
      
      if (response2.status !== 400) {
        throw new Error(`Expected 400, got ${response2.status}`);
      }
      
      const json2: any = await response2.json();
      if (!json2.error || !json2.error.includes('No adapter found')) {
        throw new Error('Expected adapter not found error');
      }
      
      console.log('✓ Test 2 passed: returns error for unknown model');
    } catch (err) {
      console.error('✗ Test 2 failed:', err);
      throw err;
    }
    
    console.log('🎉 All integration tests passed!');
  } finally {
    // 停止服务
    stopServer();
  }
}

// 导出测试函数
export { runIntegrationTests };