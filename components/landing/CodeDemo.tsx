'use client';

import { motion } from 'framer-motion';

const codeExample = `import { AxCrew } from '@amitdeshmukh/ax-crew';

const config = {
  crew: [{
    name: "Planner",
    description: "Creates execution plans",
    signature: "task:string -> plan:string",
    provider: "openai",
    providerKeyName: "OPENAI_API_KEY",
    ai: { model: "gpt-4", temperature: 0 }
  }, {
    name: "Executor",
    description: "Executes plans with tools",
    signature: "task:string, plan:string -> result:string",
    provider: "anthropic",
    providerKeyName: "ANTHROPIC_API_KEY",
    ai: { model: "claude-3-sonnet" },
    agents: ["Planner"],      // Sub-agent
    functions: ["WebSearch"]  // Tools
  }]
};

const crew = new AxCrew(config, myFunctions);
await crew.addAllAgents();

// Execute with shared state and streaming
const executor = crew.agents.get("Executor");
const { result } = await executor.forward(
  { task: "Research AI trends" },
  { onStream: (chunk) => process.stdout.write(chunk) }
);

// Track costs across the crew
console.log(crew.getCrewMetrics());`;

export function CodeDemo() {
  return (
    <section className="py-16 md:py-24 bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto px-6">
        {/* Problem / Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="p-6 md:p-8 rounded-2xl bg-background border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-3">The Problem</h3>
            <p className="text-text-secondary leading-relaxed">
              Building multi-agent systems is complex. You need to manage providers, handle state, 
              coordinate agents, track costs, and wire up tools. That&apos;s a lot of boilerplate before 
              you can focus on your actual logic.
            </p>
          </div>
          <div className="p-6 md:p-8 rounded-2xl bg-accent-50 border border-accent-200">
            <h3 className="text-lg font-semibold text-accent-700 mb-3">The Solution</h3>
            <p className="text-text-secondary leading-relaxed">
              Define your crew in JSON config. AxCrew handles provider setup, shared state, 
              agent composition, streaming, MCP connections, and cost tracking. 
              <span className="text-accent-600 font-medium"> Just config and go.</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Code window chrome */}
          <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-elevated">
            {/* Window header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#2a2a2a] border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
              </div>
              <span className="ml-4 text-sm text-white/40 font-mono">crew.ts</span>
            </div>

            {/* Code content */}
            <div className="p-4 md:p-6 overflow-x-auto">
              <pre className="text-xs md:text-sm leading-relaxed">
                <code className="language-typescript">
                  {codeExample.split('\n').map((line, i) => (
                    <div key={i} className="table-row">
                      <span className="table-cell pr-4 text-white/20 text-right select-none w-6 md:w-8">
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

          {/* Floating label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-full text-sm text-text-secondary shadow-soft">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              That&apos;s it. Your crew is ready.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Simple syntax highlighting
function SyntaxLine({ line }: { line: string }) {
  const keywords = ['const', 'await', 'new', 'import', 'from'];

  // Check for comments first
  if (line.includes('//')) {
    const [code, comment] = line.split('//');
    return (
      <>
        <SyntaxLine line={code} />
        <span className="text-white/30">//{comment}</span>
      </>
    );
  }

  // Simple tokenization
  const tokens = line.split(/(\s+|[{}[\](),;:.]|"[^"]*"|'[^']*')/);
  
  return (
    <>
      {tokens.map((token, i) => {
        if (keywords.includes(token)) {
          return <span key={i} className="text-purple-400">{token}</span>;
        }
        if (token.startsWith('"') || token.startsWith("'")) {
          return <span key={i} className="text-emerald-400">{token}</span>;
        }
        if (token === 'true' || token === 'false') {
          return <span key={i} className="text-amber-400">{token}</span>;
        }
        if (/^\d+$/.test(token)) {
          return <span key={i} className="text-amber-400">{token}</span>;
        }
        if (token === 'AxCrew') {
          return <span key={i} className="text-blue-400">{token}</span>;
        }
        return <span key={i} className="text-white/80">{token}</span>;
      })}
    </>
  );
}
