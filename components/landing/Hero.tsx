'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Github } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-50/30 via-background to-background" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-50 border border-accent-200 text-accent-700 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
            </span>
            Powered by AxLLM
          </div>

          {/* Headline */}
          <h1 className="text-hero font-bold text-text-primary mb-6 leading-tight">
            Build AI Agent Teams
            <br />
            <span className="text-accent">with JSON</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
            A no-code framework for building and managing crews of AI agents.
            Define agents in config, share state, connect to MCP servers, and track costs.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-text-primary text-background rounded-xl font-medium text-lg transition-all hover:bg-text-primary/90 hover:shadow-elevated hover:scale-[1.02]"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com/amitdeshmukh/ax-crew"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-surface border border-border rounded-xl font-medium text-lg text-text-primary transition-all hover:border-text-secondary hover:shadow-card"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </motion.div>

        {/* Install command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-surface border border-border rounded-xl shadow-soft">
            <code className="font-mono text-sm text-text-secondary">
              npm install <span className="text-text-primary font-medium">@amitdeshmukh/ax-crew</span>
            </code>
            <button
              onClick={() => navigator.clipboard.writeText('npm install @amitdeshmukh/ax-crew')}
              className="p-1.5 rounded-md hover:bg-code-bg transition-colors"
              aria-label="Copy to clipboard"
            >
              <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
