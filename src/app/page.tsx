'use client';

import { usePathname } from 'next/navigation';
import { HomeSection, Container } from '@/components/layout';
import { skills } from '@/components/constants';
import { useState } from 'react';

export default function Home() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  return (
    <Container isHomePage={isHomePage}>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center ">
        <HomeSection />
      </section>
    </Container>
  );
}
