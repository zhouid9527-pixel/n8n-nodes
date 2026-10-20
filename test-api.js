// Quick test script to verify ModelFlare API endpoints
// Run with: node test-api.js

const https = require('https');

const API_KEY = 'sk-38KseIfTEAJJy5wJj9muXHi10gLjYIvO337pjej6GrqyJJtw';
const BASE_URL = 'api.modelflare.dev';

// Test 1: List models
function testListModels() {
  return new Promise((resolve, reject) => {
    console.log('\n🧪 Testing: GET /v1/models');

    const options = {
      hostname: BASE_URL,
      path: '/v1/models',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log('Response:', data.substring(0, 500));

        if (res.statusCode === 200) {
          console.log('✅ List models endpoint works!');
          try {
            const parsed = JSON.parse(data);
            if (parsed.data && Array.isArray(parsed.data)) {
              console.log(`📋 Found ${parsed.data.length} models`);
              console.log('Sample models:', parsed.data.slice(0, 3).map(m => m.id).join(', '));
            }
          } catch (e) {
            console.log('⚠️  Could not parse response as JSON');
          }
        } else {
          console.log('❌ Unexpected status code');
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
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: 'Hello! Just testing the API.' }
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
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log('Response:', data.substring(0, 500));

        if (res.statusCode === 200) {
          console.log('✅ Chat completion endpoint works!');
          try {
            const parsed = JSON.parse(data);
            if (parsed.choices && parsed.choices[0]) {
              console.log('💬 Response:', parsed.choices[0].message.content);
            }
          } catch (e) {
            console.log('⚠️  Could not parse response as JSON');
          }
        } else {
          console.log('❌ Unexpected status code');
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

// Run all tests
async function runTests() {
  console.log('🚀 ModelFlare API Test Suite');
  console.log('Base URL:', BASE_URL);
  console.log('API Key:', API_KEY.substring(0, 20) + '...');

  try {
    await testListModels();
    await testChatCompletion();
    console.log('\n✅ All tests completed!');
  } catch (error) {
    console.error('\n❌ Tests failed:', error.message);
    process.exit(1);
  }
}

runTests();
