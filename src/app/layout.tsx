'use client';

import type { Metadata } from 'next';
import React, { useState, useEffect } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { BackgroundBeamsWithCollision } from '@/components/utils';
import { Header, Footer } from '@/components/layout';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { RouteLoader } from '@/components/ui/route-loader';
import { RouteChangeHandler } from '@/handlers/route-change-handler';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // Verifica se é uma página 404
  const is404Page = pathname === '/not-found';

  <RouteChangeHandler onRouteChange={setIsLoading} />;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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

        <BackgroundBeamsWithCollision>
          <div className="w-full grid grid-rows-[auto_1fr_auto] bg-transparent min-h-screen">
            <Header />
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.98,
                }}
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
            {/* Renderiza o Footer apenas se não for página 404 */}
            {!is404Page && <Footer />}
          </div>
        </BackgroundBeamsWithCollision>
      </body>
    </html>
  );
}
