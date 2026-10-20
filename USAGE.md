# Usage Examples

## Basic Chat Completion

1. Add the **ModelFlare** node to your workflow
2. Connect your **ModelFlare API** credentials
3. Select **Chat** as the resource
4. Select **Create Completion** as the operation
5. Configure:
   - **Model**: `gpt-3.5-turbo` (or any ModelFlare-supported model)
   - **Messages**: Add messages with roles (system/user/assistant)
   - **Additional Fields**: Adjust temperature, max tokens, etc.

## Example Workflow

```
Manual Trigger → ModelFlare (Chat) → Set (format response)
```

### Configuration

**ModelFlare Node:**
- Resource: Chat
- Operation: Create Completion
- Model: `gpt-3.5-turbo`
- Messages:
  - Role: `user`
  - Content: `What is n8n?`
- Temperature: `0.7`
- Max Tokens: `500`

### Response Structure

The node returns the full API response:

```json
{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "gpt-3.5-turbo",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "n8n is an open-source workflow automation tool..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 20,
    "total_tokens": 30
  }
}
```

## List Available Models

1. Add the **ModelFlare** node
2. Select **Model** as the resource
3. Select **List** as the operation
4. Execute to see all available models

## Dynamic Message Content

You can use expressions to inject data from previous nodes:

```
{{ $json.userQuestion }}
```

## Multi-turn Conversations

Build conversation history by adding multiple messages:

1. Message 1: Role `system`, Content `You are a helpful assistant`
2. Message 2: Role `user`, Content `Hello`
3. Message 3: Role `assistant`, Content `Hi! How can I help?`
4. Message 4: Role `user`, Content `Tell me about AI`

## Error Handling

Enable **Continue On Fail** in node settings to handle errors gracefully:

- Network errors
- API rate limits
- Invalid model names
- Authentication failures

## Tips

- Use **temperature** 0.0-0.3 for factual tasks
- Use **temperature** 0.7-1.0 for creative tasks
- Set **max_tokens** to control response length and cost
- Check ModelFlare documentation for supported models: https://docs.modelflare.dev/

## Advanced: Function Calling

(To be implemented based on ModelFlare's function calling support)

## Advanced: Image Generation

(To be implemented based on ModelFlare's image model support)
