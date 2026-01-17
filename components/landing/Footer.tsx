import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-xl text-text-primary">AxCrew</span>
            <span className="text-text-secondary text-sm">
              © {new Date().getFullYear()} Amit Deshmukh
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/docs"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Documentation
            </Link>
            <a
              href="https://www.npmjs.com/package/@amitdeshmukh/ax-crew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              npm
            </a>
            <a
              href="https://github.com/amitdeshmukh/ax-crew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/amitdeshmukh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
