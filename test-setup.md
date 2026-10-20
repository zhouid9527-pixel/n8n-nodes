# Testing Setup

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Node
```bash
npm run build
```

### 3. Link to n8n (Development)

**Option A: Global n8n installation**
```bash
npm link
cd ~/.n8n
npm link n8n-nodes-modelflare
```

**Option B: Local n8n instance**
```bash
npm link
cd /path/to/your/n8n/installation
npm link n8n-nodes-modelflare
```

### 4. Restart n8n
```bash
n8n
```

### 5. Configure Credentials

1. Open n8n in your browser
2. Go to **Credentials** > **New**
3. Search for "ModelFlare API"
4. Enter your API key from https://modelflare.dev
5. Test the connection

### 6. Create a Test Workflow

1. Create a new workflow
2. Add a **Manual Trigger** node
3. Add a **ModelFlare** node
4. Configure:
   - **Resource**: Chat
   - **Operation**: Create Completion
   - **Model**: `gpt-3.5-turbo`
   - **Messages**: Add a user message like "Hello, world!"
5. Execute the workflow

## Troubleshooting

### Node Not Appearing
- Restart n8n completely
- Check `npm link` was successful
- Verify `dist/` folder exists and has compiled files

### API Errors
- Verify your API key is valid
- Check the base URL is correct: `https://api.modelflare.dev`
- Review ModelFlare's API status

### Build Errors
- Ensure TypeScript is installed: `npm install -g typescript`
- Clear and rebuild: `rm -rf dist && npm run build`

### Authentication Issues
- Test credentials in n8n settings
- Check if API key has necessary permissions
- Verify network connectivity to ModelFlare

## Development Workflow

1. Make changes to TypeScript files
2. Run `npm run dev` for watch mode
3. Restart n8n when changes are compiled
4. Test in n8n UI
5. Check n8n logs for errors

## Useful Commands

```bash
# Watch for changes
npm run dev

# Full build
npm run build

# Format code
npm run format

# Lint
npm run lint

# Fix linting issues
npm run lintfix
```

## Next Steps

After successful testing:
1. Update package.json with correct author info
2. Update README.md with your GitHub repo
3. Add more operations (image generation, etc.)
4. Publish to npm: `npm publish`
