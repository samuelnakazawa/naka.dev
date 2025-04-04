'use client';
import { SkillCard } from '@/components/ui';
import { HeroSection } from '@/components/layout';
import { skills } from '@/components/constants';
import { useState } from 'react';
import { useLanguageStore } from '@/stores/language';

export default function Home() {
  const [showAllSkillsMobile, setShowAllSkillsMobile] = useState(false);
  const initialMobileSkills = 4;
  const skillsToShow = showAllSkillsMobile ? skills : skills.slice(0, initialMobileSkills);
  const { t } = useLanguageStore();

  return (
    <>
      <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 ">
        <HeroSection />
      </section>

      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120a1f] to-[#1a0a2a]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#c95bf5]/15 via-[#c95bf5]/10 to-[#c95bf5]/05"></div>
        <div className="absolute bottom-0 h-20 w-full bg-gradient-to-t from-[#1a0a2a] to-transparent"></div>
      </div>

      <section className="min-h-screen py-20 px-4 sm:px-8 bg-gradient-to-b from-[#1a0a2a] via-[#1f0e35] to-[#251240]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-[#c95bf5]">
            {t.home.skillset}
          </h2>

          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          <div className="md:hidden grid grid-cols-2 gap-6">
            {skillsToShow.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          {skills.length > initialMobileSkills && (
            <div className="md:hidden mt-8 flex justify-center">
              <button
                onClick={() => setShowAllSkillsMobile(!showAllSkillsMobile)}
                className="px-6 py-2 rounded-full bg-[#1a0a2a] hover:bg-[#2d0b4a] text-[#c95bf5] font-medium transition-all duration-300 border border-[#c95bf5]/30 hover:border-[#c95bf5]/50"
              >
                {showAllSkillsMobile
                  ? t.home['show-less-button']
                  : `${t.home['show-more-button']} +${skills.length - initialMobileSkills}`}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
