# ModelFlare API Verification Report

## ✅ API Configuration Verified

**Date**: January 20, 2025  
**Status**: All endpoints tested and working

### Base Configuration

```
Base URL: https://modelflare.dev
API Key Format: sk-xxxxxxxxxxxxxxxxxxxxx (Bearer token)
```

### Endpoints

#### 1. List Models
- **URL**: `GET /api/v1/models`
- **Status**: ✅ Working
- **Response**: 79 models available

#### 2. Chat Completions
- **URL**: `POST /v1/chat/completions`
- **Status**: ✅ Working
- **Format**: OpenAI-compatible

### Available Models (Sample)

**Text Models:**
- `gpt-5.4`, `gpt-5.5`, `gpt-5.6-sol`, `gpt-5.6-terra`
- `gpt-6-astra`, `gpt-6-luna`, `gpt-6-sol`, `gpt-6.1-sol`
- `claude-fable-5`, `claude-fable-5-1`
- `claude-haiku-4-5`, `claude-haiku-5-5`
- `claude-opus-4-8`, `claude-opus-5`, `claude-opus-5-5`
- `claude-sonnet-5`, `claude-sonnet-5-5`
- `gemini-3.1-flash-lite`, `gemini-3.1-pro-preview`
- `gemini-3.5-flash`, `gemini-3.5-flash-lite`
- `gemini-3.6-flash`, `gemini-3.8-flash`, `gemini-3.8-flash-high`
- `deepseek-v4-flash`, `deepseek-v4-pro`, `deepseek-v4.1-flash`
- `glm-5.3`, `glm-5.3-flash`
- `grok-4.5`, `grok-4.6`, `grok-4.7`
- `kimi-k3`, `qwen3.8-max`
- `muse-spark-1.3`
- `codex-auto-review`
- `jev-1.13` (decisions endpoint)

**Image Models:**
- `gpt-image-2`, `gpt-image-2.5-flare`, `gpt-image-2.5-sunburst`
- `gemini-2.5-flash-image`, `gemini-3-pro-image`, `gemini-3.1-flash-image`, `gemini-3.1-flash-lite-image`
- `seedream-5-0-lite-260128`, `seedream-5-0-lite-nsfw`, `seedream-5-0-pro-nsfw`
- `wan2.7-image`, `wan2.7-image-nsfw`, `wan2.7-image-pro`, `wan2.7-image-pro-nsfw`

**Video Models:**
- `MiniMax-H3`, `MiniMax-H3-nsfw`
- `happyhorse-1.1-i2v`, `happyhorse-1.1-r2v`, `happyhorse-1.1-t2v`
- `kling-2.5-turbo`, `kling-2.6`, `kling-3.0`, `kling-3.0-omni`, `kling-3.0-turbo`, `kling-o1`
- `seedance-2.0`, `seedance-2.0-fast`, `seedance-2.0-mini`, `seedance-2.0-nsfw`, `seedance-2.5`, `seedance-2.5-nsfw`
- `wan2.7-i2v`, `wan2.7-i2v-nsfw`, `wan2.7-r2v`, `wan2.7-r2v-nsfw`, `wan2.7-t2v`, `wan2.7-t2v-nsfw`
- `wan3.0-video`, `wan3.0-video-nsfw`, `wan3.0-video-prime`, `wan3.0-video-prime-nsfw`, `wan3.0-video-prime-spicy`

### Endpoint Types

Models support different endpoint formats:
- `openai` - OpenAI-compatible chat completions
- `openai-response` - OpenAI format with extended response
- `openai-response-compact` - Compact OpenAI response
- `anthropic` - Anthropic Claude format
- `gemini` - Google Gemini format
- `image-generation` - Image generation APIs
- `openai-video` - Video generation APIs
- `doubaovideo` - Doubao video format
- `decisions` - Decision/reasoning endpoints

### Test Results

#### Chat Completion Test
```json
Request:
{
  "model": "gpt-5.4",
  "messages": [
    {"role": "user", "content": "Say hello in 5 words"}
  ],
  "max_tokens": 50
}

Response:
{
  "id": "resp_09ed7ea1cd47631e016ad784fa9e1487d1af702c11c872a9a8",
  "model": "gpt-5.4",
  "object": "chat.completion",
  "created": 1792509179,
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Hello there, hope you're well!"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 23,
    "completion_tokens": 11,
    "total_tokens": 34
  }
}
```

### SSL Certificate Note

The API uses SSL but with certificate revocation checking issues on Windows. When making requests:
- Browser/n8n: Should work normally
- curl: Use `-k` flag if needed
- Node.js https: Set `rejectUnauthorized: false` if encountering SSL errors

### n8n Node Configuration

The n8n node has been configured with these verified settings:
- **Credentials**: Bearer token authentication
- **Base URL**: `https://modelflare.dev`
- **Chat endpoint**: `/v1/chat/completions`
- **Models endpoint**: `/api/v1/models`
- **Default model**: `gpt-5.4`

### Usage Tracking

The API returns usage information in responses:
```json
"usage": {
  "prompt_tokens": 23,
  "completion_tokens": 11,
  "total_tokens": 34,
  "input_tokens": 23,
  "output_tokens": 11
}
```

### Next Steps

1. ✅ API endpoints verified
2. ⏳ Complete npm installation
3. ⏳ Build TypeScript project
4. ⏳ Test n8n node locally
5. ⏳ Publish to npm
6. ⏳ Submit to n8n community

### Testing Script

A complete test script is available at `test-api-verified.js`:
```bash
node test-api-verified.js
```

This will verify both endpoints and display sample models and responses.
