'use client';

import { HeroSection, ResumeSection, SkillSection, InfoSection } from './';
import { useLanguageStore } from '@/stores/language';

export default function LivingResume() {
  return (
    <div className="min-h-screen pt-32 md:pt-40 relative overflow-hidden text-white">
      <HeroSection />
      <div className="container mx-auto px-6 py-16 relative z-10">
        <ResumeSection />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <SkillSection />
        <InfoSection />
      </div>
    </div>
  );
}
