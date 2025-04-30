import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Samuel Nakazawa | Frontend Engineer',
  description:
    'Hi there! I am a frontend engineer currently working at Globo, former CI&T and Dextra.',
};

import { HomeSection, Container } from '@/components/layout';
import { skills } from '@/components/constants';

export default function Home() {
  return (
    <Container>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center ">
        <HomeSection />
      </section>
    </Container>
  );
}
