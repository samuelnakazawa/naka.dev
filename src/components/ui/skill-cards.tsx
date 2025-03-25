'use client';
import { Skill } from '@/types';
import { useState } from 'react';

interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export const SkillCard = ({ skill, className }: SkillCardProps) => {
  const iconColor = '#c95bf5';
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`relative p-6 rounded-lg border border-transparent hover:border-[#c95bf5] transition-all duration-300 group ${className}`}
      style={{
        boxShadow: '0 4px 6px rgba(201, 91, 245, 0.1)',
      }}
      aria-label={`Skill: ${skill.name}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#c95bf5] text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
          {skill.name}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-l-transparent border-r-transparent border-t-[#c95bf5]"></div>
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-4 flex items-center justify-center">
          <img
            src={skill.iconPath}
            alt={`${skill.name} icon`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={{
              filter: `drop-shadow(0 0 6px ${iconColor}66)`,
            }}
          />
        </div>

        <h3 className="text-xl font-semibold mb-2 text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
          {skill.name}
        </h3>

        <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-[#c95bf5] h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${skill.level * 20}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
