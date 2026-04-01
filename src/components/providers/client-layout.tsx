'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/' || pathname === '/pt';

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col justify-center overflow-hidden',
        isHomePage ? 'bg-[#0d0d0d]' : 'bg-gradient-to-b from-[#0f0524] via-[#1a0a2a] to-[#251240]'
      )}
    >
      <div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto] bg-transparent">
        <Header />
        <main id="main-content" className="animate-fade-in flex flex-col">
          {children}
        </main>
        {!isHomePage && <Footer />}
      </div>
    </div>
  );
}
