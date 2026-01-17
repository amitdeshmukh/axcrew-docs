import { Hero, Features, CodeDemo, Footer } from '@/components/landing';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <CodeDemo />
      <Footer />
    </main>
  );
}
