# TODO

## Immediate (Before First Release)

- [ ] Wait for `npm install` to complete
- [ ] Run `npm run build` to compile TypeScript
- [ ] Test locally with n8n
- [ ] Verify API calls work with real ModelFlare key
- [ ] Update package.json with correct:
  - [ ] Author name and email
  - [ ] GitHub repository URL
  - [ ] Homepage URL
- [ ] Get actual API documentation from https://docs.modelflare.dev/
- [ ] Verify endpoint URLs are correct
- [ ] Test error handling

## Core Features to Add

- [ ] **Image Generation**
  - [ ] Add image resource type
  - [ ] Implement generation operation
  - [ ] Support different image models
  - [ ] Handle binary response

- [ ] **Video Models**
  - [ ] Add video resource type
  - [ ] Implement video generation
  - [ ] Handle long-running operations
  - [ ] Polling for completion

- [ ] **Streaming Support**
  - [ ] Implement streaming for chat completions
  - [ ] Handle SSE (Server-Sent Events)
  - [ ] Proper error handling for streams

- [ ] **Function Calling**
  - [ ] Add function definitions parameter
  - [ ] Handle function call responses
  - [ ] Support tool use

## Improvements

- [ ] **Better Error Messages**
  - [ ] Parse ModelFlare error responses
  - [ ] Provide actionable guidance
  - [ ] Handle rate limits gracefully

- [ ] **Advanced Parameters**
  - [ ] Top-p sampling
  - [ ] Frequency penalty
  - [ ] Presence penalty
  - [ ] Stop sequences
  - [ ] Response format (JSON mode)

- [ ] **Batch Operations**
  - [ ] Process multiple items efficiently
  - [ ] Respect rate limits

- [ ] **Model Selection**
  - [ ] Dropdown with available models (dynamic)
  - [ ] Model categories (chat, image, video)
  - [ ] Cost information

## Documentation

- [ ] Add code examples for each operation
- [ ] Create video tutorial
- [ ] Write blog post about the node
- [ ] Add to n8n community nodes list

## Testing

- [ ] Unit tests for node logic
- [ ] Integration tests with mock API
- [ ] Manual testing checklist
- [ ] CI/CD pipeline

## Publishing

- [ ] Verify npm package name is available
- [ ] Create GitHub repository
- [ ] Add CI/CD (GitHub Actions)
- [ ] Publish to npm
- [ ] Submit to n8n community nodes

## Nice to Have

- [ ] Embeddings support
- [ ] Audio transcription (if ModelFlare supports)
- [ ] Fine-tuning management
- [ ] Usage tracking/analytics
- [ ] Webhook triggers (if ModelFlare provides webhooks)

## Current Blockers

- Waiting for npm install to complete
- Need actual ModelFlare API documentation for accurate endpoints
- Need API key for testing

## Questions to Answer

1. What is the exact base URL for ModelFlare API?
2. Does ModelFlare support streaming?
3. What authentication header format does it use? (Bearer token confirmed)
4. Are there rate limits? What are they?
5. Does ModelFlare have webhooks or async operations?
6. What models are currently supported?
