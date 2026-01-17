'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Settings, Share2, Plug, DollarSign, Zap, Shield, ArrowRight, Github } from 'lucide-react';

const features = [
  {
    icon: Settings,
    title: 'Config-First',
    description: 'Define your entire crew in JSON. No code to get started.',
    href: '/docs/core-concepts/crew-configuration/',
  },
  {
    icon: Share2,
    title: 'Shared State',
    description: 'Agents share key/value state for coordination.',
    href: '/docs/core-concepts/state-management/',
  },
  {
    icon: Plug,
    title: 'MCP Support',
    description: 'STDIO, HTTP SSE, and Streamable HTTP transports.',
    href: '/docs/advanced-features/mcp-integration/',
  },
  {
    icon: DollarSign,
    title: 'Cost Tracking',
    description: 'Per-agent and crew-level usage metrics.',
    href: '/docs/advanced-features/cost-tracking/',
  },
  {
    icon: Zap,
    title: 'Streaming',
    description: 'Real-time token streaming for responsive UX.',
    href: '/docs/advanced-features/streaming-responses/',
  },
  {
    icon: Shield,
    title: 'TypeScript',
    description: 'Full type safety with comprehensive definitions.',
    href: '/docs/reference/types/',
  },
];

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 md:text-h1 font-bold text-text-primary mb-4">
            Why AxCrew
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Everything you need to build multi-agent systems, nothing you don&apos;t.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={feature.href}
                className="group block p-6 bg-surface border border-border rounded-xl transition-all hover:shadow-card hover:border-accent-200"
              >
                <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent-100 transition-colors">
                  <feature.icon className="w-5 h-5 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 border-t border-border"
        >
          <p className="text-text-secondary mb-6">
            Ready to build your agent crew?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-background rounded-lg font-medium transition-all hover:bg-text-primary/90 hover:shadow-card"
            >
              Read the Docs
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="https://github.com/amitdeshmukh/ax-crew"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-text-primary transition-all hover:border-text-secondary"
            >
              <Github className="w-4 h-4" />
              View Source
            </a>
          </div>
          
          {/* Copyright */}
          <p className="mt-12 text-sm text-text-secondary/60">
            © {new Date().getFullYear()} Amit Deshmukh · Powered by{' '}
            <a 
              href="https://axllm.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-600 transition-colors"
            >
              AxLLM
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
