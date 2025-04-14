'use client';
import { HomeSection } from '@/components/layout';
import { skills } from '@/components/constants';
import { useState } from 'react';

export default function Home() {
  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center ">
        <HomeSection />
      </section>
    </>
  );
}
