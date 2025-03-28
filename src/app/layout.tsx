'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { BackgroundBeamsWithCollision } from '@/components/ui';
import { Header, Footer } from '@/components';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

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

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BackgroundBeamsWithCollision>
          <div className="w-full grid grid-rows-[auto_1fr_auto] bg-transparent min-h-screen">
            <Header />
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
          </div>
        </BackgroundBeamsWithCollision>
      </body>
    </html>
  );
}
