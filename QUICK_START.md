# Quick Start Guide

## For End Users

### Installation in n8n

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install**
4. Enter: `n8n-nodes-modelflare`
5. Click **Install**

### Setup Credentials

1. Click **Credentials** → **New**
2. Search "ModelFlare"
3. Enter your API key from [modelflare.dev](https://modelflare.dev)
4. Test connection
5. Save

### Create Your First Workflow

1. **Add nodes:**
   - Manual Trigger
   - ModelFlare (Chat)
   
2. **Configure ModelFlare:**
   - Resource: `Chat`
   - Operation: `Create Completion`
   - Model: `gpt-3.5-turbo`
   - Add Message: Role `user`, Content `Hello!`

3. **Execute!**

---

## For Developers

### Local Development

```bash
# Clone and setup
git clone <your-repo>
cd n8n-nodes-modelflare
npm install
npm run build

# Link to n8n
npm link
cd ~/.n8n
npm link n8n-nodes-modelflare

# Restart n8n
n8n
```

### File Structure

```
credentials/
  ModelflareApi.credentials.ts  # API key config
nodes/Modelflare/
  Modelflare.node.ts             # Node logic
  modelflare.svg                 # Icon
```

### Making Changes

```bash
# Watch mode
npm run dev

# Build once
npm run build

# Test in n8n after each build
```

### Key Files to Edit

- **Add operations:** Edit `Modelflare.node.ts` properties array
- **Add resources:** Add to resources options
- **Change auth:** Edit `ModelflareApi.credentials.ts`

---

## API Endpoints (Assumed)

- Base: `https://api.modelflare.dev`
- Chat: `POST /v1/chat/completions`
- Models: `GET /v1/models`

⚠️ **Verify these with actual API docs!**

---

## Troubleshooting

### Node not showing in n8n
- Restart n8n completely
- Check `npm link` worked
- Verify `dist/` folder exists

### API errors
- Check API key is valid
- Verify base URL is correct
- Check ModelFlare service status

### Build errors
- Delete `node_modules` and `dist`
- Run `npm install` again
- Run `npm run build`

---

## Support

- GitHub Issues: (add your repo URL)
- n8n Community: https://community.n8n.io/
- ModelFlare Docs: https://docs.modelflare.dev/
