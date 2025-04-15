'use client';

import { HeroSection, ResumeSection, SkillSection, InfoSection } from './';
import { Container } from '@/components/layout';
import { useLanguageStore } from '@/stores/language';

export default function LivingResume() {
  return (
    <Container>
      <div className="min-h-screenrelative overflow-hidden text-white">
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
