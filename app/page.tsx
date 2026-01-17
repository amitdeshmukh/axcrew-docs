import { Hero, Features, CodeDemo } from '@/components/landing';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CodeDemo />
      <Features />
    </main>
  );
}
