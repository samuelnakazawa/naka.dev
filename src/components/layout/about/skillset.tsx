'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { skills } from '@/components/constants';
import { SkillCard } from '@/components/ui';

export function SkillSection() {
  const [showAllSkillsMobile, setShowAllSkillsMobile] = useState(false);
  const initialMobileSkills = 4;
  const skillsToShow = showAllSkillsMobile ? skills : skills.slice(0, initialMobileSkills);
  const t = useTranslations('skill');

  return (
    <section className="min-h-screen py-24 md:min-h-[calc(100vh-80px)] md:py-12">
      <h2 className="mb-12 items-center text-3xl font-bold text-[#c95bf5]">{t('skillset')}</h2>

      <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-3 xl:grid-cols-4">
        {skills.map(skill => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 md:hidden">
        {skillsToShow.map(skill => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>

      {skills.length > initialMobileSkills && (
        <div className="mt-8 flex justify-center md:hidden">
          <button
            onClick={() => setShowAllSkillsMobile(!showAllSkillsMobile)}
            className="cursor-pointer rounded-full border border-[#c95bf5]/30 bg-[#1a0a2a] px-6 py-2 font-medium text-[#c95bf5] transition-all duration-300 hover:border-[#c95bf5]/50 hover:bg-[#2d0b4a]"
          >
            {showAllSkillsMobile
              ? t('show-less-button')
              : `${t('show-more-button')} +${skills.length - initialMobileSkills}`}
          </button>
        </div>
      )}
    </section>
  );
}
