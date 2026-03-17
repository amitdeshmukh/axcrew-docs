import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const skillsDir = path.join(rootDir, '..', 'ax-crew', 'src', 'skills');
const publicDir = path.join(rootDir, 'public');

const GITHUB_BASE = 'https://github.com/amitdeshmukh/ax-crew/blob/main/src/skills';

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
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

function getSkillFiles() {
  if (!fs.existsSync(skillsDir)) {
    console.warn(`Skills directory not found: ${skillsDir}`);
    return [];
  }
  return fs.readdirSync(skillsDir)
    .filter(f => f.endsWith('.md'))
    .sort()
    .map(f => path.join(skillsDir, f));
}

// Generate llms.txt
function generateLlmsTxt(files) {
  let skillsList = '';
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data } = parseFrontmatter(raw);
    const filename = path.basename(file);
    skillsList += `- [${data.name || filename}](${GITHUB_BASE}/${filename}) — ${data.description || ''}\n`;
  }

  return `# AxCrew

> Multi-agent AI with JSON config. Auto-installs Claude & Codex skills.

## Quick Start

\`\`\`bash
npm install @amitdeshmukh/ax-crew @ax-llm/ax
\`\`\`

\`\`\`typescript
import { AxCrew } from '@amitdeshmukh/ax-crew';

const crew = new AxCrew({
  crew: [{
    name: "Agent",
    description: "Does a thing",
    signature: "input:string -> output:string",
    provider: "openai",
    providerKeyName: "OPENAI_API_KEY",
    ai: { model: "gpt-4o" }
  }]
});

await crew.addAllAgents();
const agent = crew.agents.get("Agent");
const { output } = await agent.forward({ input: "Hello" });
\`\`\`

## Skills

${skillsList}
## Links

- [GitHub](https://github.com/amitdeshmukh/ax-crew)
- [npm](https://www.npmjs.com/package/@amitdeshmukh/ax-crew)
- [Full docs](https://axcrew.dev/llms-full.txt)
- [Powered by AxLLM](https://axllm.dev)
`;
}

// Generate llms-full.txt
function generateLlmsFullTxt(files) {
  let output = `# AxCrew - Complete Skill Reference

> Multi-agent AI with JSON config. Auto-installs Claude & Codex skills.

Generated: ${new Date().toISOString()}

---

`;

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf-8');
    const { data, content } = parseFrontmatter(raw);
    const filename = path.basename(file);

    output += `## ${data.name || filename}

**File:** ${filename}
${data.description ? `**Description:** ${data.description}` : ''}

${content.trim()}

---

`;
  }

  return output;
}

const files = getSkillFiles();
console.log(`Found ${files.length} skill files`);

fs.writeFileSync(path.join(publicDir, 'llms.txt'), generateLlmsTxt(files));
console.log('Generated public/llms.txt');

fs.writeFileSync(path.join(publicDir, 'llms-full.txt'), generateLlmsFullTxt(files));
console.log('Generated public/llms-full.txt');

console.log('Done!');
