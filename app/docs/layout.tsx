import { DocsLayout } from 'fumadocs-ui/layout';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout 
      tree={source.pageTree} 
      nav={{ title: 'AxCrew' }}
      links={[
        {
          text: 'GitHub',
          url: 'https://github.com/amitdeshmukh/ax-crew',
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
