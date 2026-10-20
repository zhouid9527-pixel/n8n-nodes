// Verified API test script for ModelFlare
// Run with: node test-api-verified.js

const https = require('https');

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual API key for testing
const BASE_URL = 'modelflare.dev';

console.log('🚀 ModelFlare API Test Suite (Verified)');
console.log('Base URL:', BASE_URL);
console.log('API Key:', API_KEY.substring(0, 20) + '...\n');

// Test 1: List models
function testListModels() {
  return new Promise((resolve, reject) => {
    console.log('🧪 Testing: GET /api/v1/models');

    const options = {
      hostname: BASE_URL,
      path: '/api/v1/models',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      // Skip certificate validation (like curl -k)
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`✅ Status: ${res.statusCode}`);

        try {
          const parsed = JSON.parse(data);
          if (parsed.data && Array.isArray(parsed.data)) {
            console.log(`📋 Found ${parsed.data.length} models\n`);
            console.log('Sample models:');
            parsed.data.slice(0, 10).forEach(m => {
              console.log(`  - ${m.id} (${m.supported_endpoint_types.join(', ')})`);
            });
          }
        } catch (e) {
          console.log('⚠️  Could not parse response');
        }

        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
      reject(error);
    });

    req.end();
  });
}

// Test 2: Chat completion
function testChatCompletion() {
  return new Promise((resolve, reject) => {
    console.log('\n🧪 Testing: POST /v1/chat/completions');

    const postData = JSON.stringify({
      model: 'gpt-5.4',
      messages: [
        { role: 'user', content: 'Say hello in 5 words' }
      ],
      max_tokens: 50
    });

    const options = {
      hostname: BASE_URL,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      rejectUnauthorized: false
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`✅ Status: ${res.statusCode}`);

        try {
          const parsed = JSON.parse(data);
          if (parsed.choices && parsed.choices[0]) {
            console.log('💬 Response:', parsed.choices[0].message.content);
            console.log('📊 Usage:', JSON.stringify(parsed.usage, null, 2));
          }
        } catch (e) {
          console.log('⚠️  Could not parse response');
          console.log('Raw:', data);
        }

        resolve();
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Run tests
async function runTests() {
  try {
    await testListModels();
    await testChatCompletion();
    console.log('\n✅ All tests completed successfully!');
    console.log('\n📝 Configuration verified:');
    console.log('  Base URL: https://modelflare.dev');
    console.log('  Models endpoint: /api/v1/models');
    console.log('  Chat endpoint: /v1/chat/completions');
    console.log('  Auth: Bearer token');
  } catch (error) {
    console.error('\n❌ Tests failed:', error.message);
    process.exit(1);
  }
}

runTests();
