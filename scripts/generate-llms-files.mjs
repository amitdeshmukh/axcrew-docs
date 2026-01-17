import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const docsDir = path.join(rootDir, 'content/docs');
const publicDir = path.join(rootDir, 'public');

// Ensure public dir exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate llms.txt (concise manifest)
const llmsTxt = `# AxCrew

> A no-code framework for building and managing crews of AI agents with JSON configuration. Powered by AxLLM.

## Quick Start

\`\`\`bash
npm install @amitdeshmukh/ax-crew @ax-llm/ax
\`\`\`

## Core Concepts

- **Agent**: An LLM program with signature, provider, ai config, optional examples, and optional mcpServers
- **Crew**: A team of agents that share state and can collaborate
- **Sub-agents**: List other agent names in \`agents\` to compose behaviors
- **Functions (tools)**: Register callable functions and reference by name in agent \`functions\`
- **State**: \`crew.state.set/get/getAll()\` shared across all agents
- **Streaming**: Use \`streamingForward()\` for token streams
- **Metrics**: Per-agent \`getMetrics()\` + crew-level \`getCrewMetrics()\` snapshots

## Documentation

- [Getting Started](https://axcrew.dev/docs/getting-started/)
- [Agent Configuration](https://axcrew.dev/docs/core-concepts/agent-configuration/)
- [Crew Configuration](https://axcrew.dev/docs/core-concepts/crew-configuration/)
- [Creating Functions](https://axcrew.dev/docs/core-concepts/creating-functions/)
- [State Management](https://axcrew.dev/docs/core-concepts/state-management/)
- [Working with Examples](https://axcrew.dev/docs/core-concepts/working-with-examples/)
- [Streaming Responses](https://axcrew.dev/docs/advanced-features/streaming-responses/)
- [Cost Tracking](https://axcrew.dev/docs/advanced-features/cost-tracking/)
- [MCP Integration](https://axcrew.dev/docs/advanced-features/mcp-integration/)
- [ACE (Agentic Context Engineering)](https://axcrew.dev/docs/advanced-features/ace/)
- [Telemetry](https://axcrew.dev/docs/advanced-features/telemetry/)

## API Reference

- [AxCrew Class](https://axcrew.dev/docs/reference/axcrew-class/)
- [StatefulAxAgent Class](https://axcrew.dev/docs/reference/stateful-agent/)
- [TypeScript Types](https://axcrew.dev/docs/reference/types/)

## Basic Example

\`\`\`typescript
import { AxCrew } from '@amitdeshmukh/ax-crew';

const config = {
  crew: [{
    name: "Planner",
    description: "Creates a plan to complete a task",
    signature: "task:string -> plan:string",
    provider: "openai",
    providerKeyName: "OPENAI_API_KEY",
    ai: { model: "gpt-4", temperature: 0 }
  }]
};

const crew = new AxCrew(config);
await crew.addAllAgents();

const planner = crew.agents.get("Planner");
const { plan } = await planner.forward({ task: "Build a website" });
\`\`\`

## Supported Providers

openai, anthropic, google-gemini, cohere, groq, together, mistral, azure-openai, huggingface, ollama

## Source Code

- [GitHub Repository](https://github.com/amitdeshmukh/ax-crew)
- [npm Package](https://www.npmjs.com/package/@amitdeshmukh/ax-crew)

## Full Documentation

For complete documentation content, see [llms-full.txt](https://axcrew.dev/llms-full.txt)

## Contact

- [Twitter/X](https://twitter.com/amitdeshmukh)
- [LinkedIn](https://www.linkedin.com/in/amitdeshmukh/)
`;

// Generate llms-full.txt (complete docs)
function getAllMdxFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      getAllMdxFiles(fullPath, files);
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };
  
  const frontmatter = match[1];
  const body = match[2];
  
  const data = {};
  for (const line of frontmatter.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      data[key] = value;
    }
  }
  
  return { data, content: body };
}

function generateLlmsFullTxt() {
  const files = getAllMdxFiles(docsDir);
  files.sort();
  
  let output = `# AxCrew - Complete Documentation

> A no-code framework for building and managing crews of AI agents with JSON configuration.

Generated: ${new Date().toISOString()}

---

`;

  for (const file of files) {
    const rawContent = fs.readFileSync(file, 'utf-8');
    const { data, content } = parseFrontmatter(rawContent);
    const relativePath = path.relative(docsDir, file);
    
    const title = data.title || relativePath;
    const description = data.description || '';
    
    output += `## ${title}

**Path:** ${relativePath}
${description ? `**Description:** ${description}` : ''}

${content.trim()}

---

`;
  }

  return output;
}

// Write files
fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsTxt);
console.log('Generated public/llms.txt');

const llmsFullTxt = generateLlmsFullTxt();
fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), llmsFullTxt);
console.log('Generated public/llms-full.txt');

console.log('Done!');
