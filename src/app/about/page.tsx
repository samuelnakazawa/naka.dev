import type { Metadata } from 'next';

import { HeroSection, ResumeSection, SkillSection, InfoSection } from '@/components/layout/about';
import { Container } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Samuel Nakazawa | About',
  description: 'Learn more about me, my skills, and my experience.',
  keywords: ['developer', 'portfolio', 'about', 'projects', 'globo', 'ciandt'],
};

export default function LivingResume() {
  return (
    <Container>
      <div className="min-h-screen relative overflow-hidden text-white">
        <HeroSection />
        <div className="container mx-auto py-16 relative z-10">
          <ResumeSection />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <SkillSection />
          <InfoSection />
        </div>
      </div>
    </Container>
  );
}
