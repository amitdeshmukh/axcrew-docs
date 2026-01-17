import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider';
import { StaticSearchDialog } from '@/components/search/StaticSearchDialog';

export const metadata: Metadata = {
  title: {
    default: 'AxCrew - Build AI Agent Teams with JSON',
    template: '%s | AxCrew',
  },
  description: 'A no-code framework for building and managing crews of AI agents with JSON configuration. Powered by AxLLM.',
  keywords: ['AI agents', 'LLM', 'multi-agent', 'AxLLM', 'TypeScript', 'JSON configuration'],
  authors: [{ name: 'Amit Deshmukh' }],
  openGraph: {
    title: 'AxCrew - Build AI Agent Teams with JSON',
    description: 'A no-code framework for building and managing crews of AI agents with JSON configuration.',
    url: 'https://axcrew.dev',
    siteName: 'AxCrew',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AxCrew - Build AI Agent Teams with JSON',
    description: 'A no-code framework for building and managing crews of AI agents with JSON configuration.',
    creator: '@amitdeshmukh',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <RootProvider
          search={{
            SearchDialog: StaticSearchDialog,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
