import { useState } from 'react';
import { skills } from '@/components/constants';
import { SkillCard } from '@/components/ui';
import { useLanguageStore } from '@/stores/language';

export function SkillSection() {
  const [showAllSkillsMobile, setShowAllSkillsMobile] = useState(false);
  const initialMobileSkills = 4;
  const skillsToShow = showAllSkillsMobile ? skills : skills.slice(0, initialMobileSkills);
  const { t } = useLanguageStore();

  return (
    <section className="min-h-screen py-24 ">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 items-center text-[#c95bf5]">
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
    </section>
  );
}
