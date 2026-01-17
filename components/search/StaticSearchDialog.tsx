'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { SharedProps } from 'fumadocs-ui/components/dialog/search';

// Search index - will be populated at build time
const searchData = [
  { url: '/docs/', title: 'Introduction', description: 'Getting started with AxCrew' },
  { url: '/docs/getting-started/', title: 'Getting Started', description: 'Installation and basic setup' },
  { url: '/docs/core-concepts/agent-configuration/', title: 'Agent Configuration', description: 'Configure AI agents with JSON' },
  { url: '/docs/core-concepts/crew-configuration/', title: 'Crew Configuration', description: 'Define and initialize agent crews' },
  { url: '/docs/core-concepts/creating-functions/', title: 'Creating Functions', description: 'Create custom tools for agents' },
  { url: '/docs/core-concepts/state-management/', title: 'State Management', description: 'Shared state across agents' },
  { url: '/docs/core-concepts/working-with-examples/', title: 'Working with Examples', description: 'Use examples for agent training' },
  { url: '/docs/advanced-features/streaming-responses/', title: 'Streaming Responses', description: 'Real-time streaming from agents' },
  { url: '/docs/advanced-features/cost-tracking/', title: 'Cost Tracking', description: 'Track API usage and costs' },
  { url: '/docs/advanced-features/mcp-integration/', title: 'MCP Integration', description: 'Model Context Protocol servers' },
  { url: '/docs/advanced-features/ace/', title: 'ACE', description: 'Agentic Context Engineering' },
  { url: '/docs/advanced-features/telemetry/', title: 'Telemetry', description: 'OpenTelemetry integration' },
  { url: '/docs/examples/examples/', title: 'Examples', description: 'Code examples and use cases' },
  { url: '/docs/curated-tools/', title: 'Curated Tools', description: 'MCP servers and AxFunctions' },
  { url: '/docs/reference/axcrew-class/', title: 'AxCrew Class', description: 'API reference for AxCrew' },
  { url: '/docs/reference/stateful-agent/', title: 'StatefulAxAgent', description: 'API reference for StatefulAxAgent' },
  { url: '/docs/reference/types/', title: 'TypeScript Types', description: 'Type definitions reference' },
];

interface SearchResult {
  url: string;
  title: string;
  description: string;
}

export function StaticSearchDialog({ open, onOpenChange }: SharedProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const performSearch = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    
    const lowerQuery = q.toLowerCase();
    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    performSearch(query);
  }, [query, performSearch]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      router.push(results[selectedIndex].url);
      onOpenChange(false);
    } else if (e.key === 'Escape') {
      onOpenChange(false);
    }
  };

  const handleSelect = (url: string) => {
    router.push(url);
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog */}
      <div className="relative w-full max-w-lg mx-4 bg-surface border border-border rounded-xl shadow-elevated overflow-hidden">
        {/* Search input */}
        <div className="flex items-center border-b border-border px-4">
          <svg
            className="h-5 w-5 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search documentation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 py-4 px-3 bg-transparent text-text-primary placeholder:text-text-secondary outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-text-secondary bg-background rounded border border-border">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-text-secondary">
              No results found for "{query}"
            </div>
          )}
          
          {results.map((result, index) => (
            <button
              key={result.url}
              onClick={() => handleSelect(result.url)}
              className={`w-full px-4 py-3 text-left transition-colors ${
                index === selectedIndex
                  ? 'bg-accent-50 text-accent-700'
                  : 'hover:bg-background'
              }`}
            >
              <div className="font-medium text-text-primary">{result.title}</div>
              <div className="text-sm text-text-secondary">{result.description}</div>
            </button>
          ))}
          
          {!query && (
            <div className="px-4 py-8 text-center text-text-secondary">
              Type to search documentation
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-text-secondary">
          <span>
            <kbd className="px-1.5 py-0.5 bg-background rounded border border-border mr-1">↑↓</kbd>
            to navigate
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 bg-background rounded border border-border mr-1">↵</kbd>
            to select
          </span>
        </div>
      </div>
    </div>
  );
}

export default StaticSearchDialog;
