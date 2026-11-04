import type { ReactNode } from 'react';
import Header from '@/components/feature/Header';
import Footer from '@/components/feature/Footer';

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background-100 text-foreground-950">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}