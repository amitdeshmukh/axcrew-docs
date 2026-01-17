import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface DocFile {
  title: string;
  description: string;
  content: string;
  path: string;
}

const docsDir = path.join(process.cwd(), 'content/docs');

function getAllMdxFiles(dir: string, files: string[] = []): string[] {
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

function parseDocFile(filePath: string): DocFile {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  const relativePath = path.relative(docsDir, filePath);
  
  return {
    title: data.title || 'Untitled',
    description: data.description || '',
    content: body.trim(),
    path: relativePath,
  };
}

export function generateLlmsFullTxt(): string {
  const files = getAllMdxFiles(docsDir);
  const docs = files.map(parseDocFile);
  
  // Sort docs by path for consistent ordering
  docs.sort((a, b) => a.path.localeCompare(b.path));
  
  let output = `# AxCrew Documentation

> Complete documentation for AxCrew - A no-code framework for building and managing crews of AI agents.

Generated: ${new Date().toISOString()}

---

`;

  for (const doc of docs) {
    output += `## ${doc.title}

**Path:** ${doc.path}
${doc.description ? `**Description:** ${doc.description}` : ''}

${doc.content}

---

`;
  }

  return output;
}

// For CLI usage
if (require.main === module) {
  const output = generateLlmsFullTxt();
  console.log(output);
}
