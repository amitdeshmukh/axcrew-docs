'use client';

import { motion } from 'framer-motion';

const codeExample = `const config = {
  crew: [{
    name: "Planner",
    description: "Creates a plan to complete a task",
    signature: "task:string -> plan:string",
    provider: "openai",
    providerKeyName: "OPENAI_API_KEY",
    ai: {
      model: "gpt-4",
      temperature: 0
    }
  }, {
    name: "Manager",
    description: "Executes the plan",
    signature: "question:string, plan:string -> answer:string",
    provider: "anthropic",
    providerKeyName: "ANTHROPIC_API_KEY",
    ai: { model: "claude-3-sonnet" },
    agents: ["Planner"]  // Sub-agent dependency
  }]
};

const crew = new AxCrew(config);
await crew.addAllAgents();

const manager = crew.agents.get("Manager");
const { answer } = await manager.forward({
  question: "How do I build a website?"
});`;

export function CodeDemo() {
  return (
    <section className="py-section bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h1 font-bold text-text-primary mb-4">
            Simple yet powerful
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Define agents in config, compose them together, and let them collaborate.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Code window chrome */}
          <div className="bg-text-primary rounded-2xl overflow-hidden shadow-elevated">
            {/* Window header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-text-primary/90 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-4 text-sm text-white/50 font-mono">index.ts</span>
            </div>

            {/* Code content */}
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm leading-relaxed">
                <code className="language-typescript">
                  {codeExample.split('\n').map((line, i) => (
                    <div key={i} className="table-row">
                      <span className="table-cell pr-4 text-white/30 text-right select-none w-8">
                        {i + 1}
                      </span>
                      <span className="table-cell">
                        <SyntaxLine line={line} />
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Simple syntax highlighting
function SyntaxLine({ line }: { line: string }) {
  // Keywords
  const keywords = ['const', 'await', 'new'];
  // Strings
  const stringPattern = /"[^"]*"|'[^']*'/g;
  // Comments
  const commentPattern = /\/\/.*/g;
  // Properties
  const propertyPattern = /(\w+):/g;

  let result = line;

  // Check for comments first
  if (line.includes('//')) {
    const [code, comment] = line.split('//');
    return (
      <>
        <SyntaxLine line={code} />
        <span className="text-white/40">//{comment}</span>
      </>
    );
  }

  // Apply highlighting
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // Simple tokenization
  const tokens = result.split(/(\s+|[{}[\](),;:.]|"[^"]*"|'[^']*')/);
  
  return (
    <>
      {tokens.map((token, i) => {
        if (keywords.includes(token)) {
          return <span key={i} className="text-purple-400">{token}</span>;
        }
        if (token.startsWith('"') || token.startsWith("'")) {
          return <span key={i} className="text-green-400">{token}</span>;
        }
        if (token === 'true' || token === 'false') {
          return <span key={i} className="text-orange-400">{token}</span>;
        }
        if (/^\d+$/.test(token)) {
          return <span key={i} className="text-orange-400">{token}</span>;
        }
        if (token === 'AxCrew') {
          return <span key={i} className="text-blue-400">{token}</span>;
        }
        return <span key={i} className="text-white/90">{token}</span>;
      })}
    </>
  );
}
