'use client';

import { motion } from 'framer-motion';
import { Settings, Share2, Plug, DollarSign, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Settings,
    title: 'Config-First',
    description: 'Define your entire agent crew in JSON. No code required to get started.',
  },
  {
    icon: Share2,
    title: 'Shared State',
    description: 'Agents share a key/value state for coordinated actions and data passing.',
  },
  {
    icon: Plug,
    title: 'MCP Support',
    description: 'Connect to any MCP server. Use STDIO, HTTP SSE, or Streamable HTTP transports.',
  },
  {
    icon: DollarSign,
    title: 'Cost Tracking',
    description: 'Built-in metrics for token usage and estimated costs per agent and crew.',
  },
  {
    icon: Zap,
    title: 'Streaming',
    description: 'Real-time token streaming for responsive user experiences.',
  },
  {
    icon: Shield,
    title: 'Type Safe',
    description: 'Full TypeScript support with comprehensive type definitions.',
  },
];

export function Features() {
  return (
    <section className="py-section bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-h1 font-bold text-text-primary mb-4">
            Everything you need
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Build sophisticated multi-agent systems with a simple, powerful API.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 bg-surface border border-border rounded-2xl transition-all hover:shadow-card hover:border-accent-200"
            >
              <div className="w-12 h-12 bg-accent-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent-100 transition-colors">
                <feature.icon className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-h3 font-semibold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-body text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
