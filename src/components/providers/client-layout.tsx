'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RouteLoader } from '@/components/ui/route-loader';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const isHomePage = pathname === '/' || pathname === '/pt';

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col justify-center overflow-hidden',
        isHomePage ? 'bg-[#0d0d0d]' : 'bg-gradient-to-b from-[#0f0524] via-[#1a0a2a] to-[#251240]'
      )}
    >
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, delay: 0.2 },
            }}
          >
            <RouteLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid min-h-screen w-full grid-rows-[auto_1fr_auto] bg-transparent">
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            exit={{
              opacity: 0,
              y: -20,
              transition: { duration: 0.3 },
            }}
            className="flex flex-col"
          >
            {!isLoading && children}
          </motion.main>
        </AnimatePresence>
        {!isHomePage && <Footer />}
      </div>
    </div>
  );
}
