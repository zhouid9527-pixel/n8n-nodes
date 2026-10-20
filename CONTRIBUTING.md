# Contributing to n8n-nodes-modelflare

Thank you for your interest in contributing!

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/n8n-nodes-modelflare.git
cd n8n-nodes-modelflare
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Link for local development:
```bash
npm link
cd ~/.n8n
npm link n8n-nodes-modelflare
```

5. Restart n8n to load the node

## Project Structure

```
n8n-nodes-modelflare/
├── credentials/           # API credential definitions
│   └── ModelflareApi.credentials.ts
├── nodes/                # Node implementations
│   └── Modelflare/
│       ├── Modelflare.node.ts
│       └── modelflare.svg
├── dist/                 # Compiled output (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Coding Guidelines

- Follow the existing code style
- Use TypeScript strict mode
- Add JSDoc comments for public methods
- Follow n8n node development best practices
- Test manually in n8n before submitting

## Adding New Operations

1. Add the operation to the appropriate resource in `Modelflare.node.ts`
2. Define parameters in the `properties` array
3. Implement the logic in the `execute` method
4. Update README.md with examples
5. Add to CHANGELOG.md

## Testing

Manual testing is currently required:

1. Build the node: `npm run build`
2. Load it in n8n
3. Test all operations with real API calls
4. Verify error handling

## Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

## Code Style

- Use tabs for indentation
- Follow n8n's naming conventions
- Keep functions focused and small
- Handle errors explicitly

## Questions?

Open an issue or reach out to the maintainer.
