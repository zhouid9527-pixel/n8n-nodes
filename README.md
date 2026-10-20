# n8n-nodes-modelflare

This is an n8n community node that lets you use [ModelFlare](https://modelflare.dev) in your n8n workflows.

ModelFlare is a unified API gateway for AI models (text, image, video) with OpenAI-compatible endpoints.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Node

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-modelflare` in **Enter npm package name**
4. Agree to the risks of using community nodes
5. Select **Install**

### Manual Installation

To install locally for development:

```bash
npm install
npm run build
npm link
```

Then in your n8n installation:

```bash
cd ~/.n8n
npm link n8n-nodes-modelflare
```

## Operations

### Chat

- **Create Completion**: Send messages to a chat model and get responses
  - Supports 79+ models including GPT-5/6, Claude Opus 5.5, Gemini 3.8, DeepSeek v4, and more
  - OpenAI-compatible message format
  - Configurable temperature, max_tokens, and streaming

### Model

- **List**: Get all available models with their supported endpoint types

## Credentials

You'll need a ModelFlare API key. Get one from the [ModelFlare console](https://modelflare.dev).

## Compatibility

Tested with n8n v1.0.0+

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [ModelFlare documentation](https://docs.modelflare.dev/)
- [ModelFlare integrations](https://modelflare.dev/zh/integrations)

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch for changes
npm run dev

# Lint
npm run lint

# Format code
npm run format
```

## License

[MIT](LICENSE.md)
