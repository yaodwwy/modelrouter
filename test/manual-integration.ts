// test/manual-integration.ts
import { runIntegrationTests } from './integration.test.js';

async function main() {
  try {
    await runIntegrationTests();
    console.log('✅ All integration tests completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Integration tests failed:', err);
    process.exit(1);
  }
}

main();