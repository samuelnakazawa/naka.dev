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
      className={`relative p-6 rounded-xl border border-gray-800 hover:border-[#c95bf5] transition-all duration-300 group ${className}`}
      style={{
        boxShadow: `
          0 0 0 1px rgba(201, 91, 245, 0.1),
          0 2px 4px rgba(201, 91, 245, 0.1),
          0 8px 24px rgba(201, 91, 245, 0.2),
          0 16px 48px rgba(201, 91, 245, 0.2)
        `,
        background: 'transparent',
        backdropFilter: 'blur(4px)',
      }}
      aria-label={`Skill: ${skill.name}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,91,245,0.1)_0%,_transparent_70%)]"></div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#c95bf5] text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap z-10">
          {skill.name}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-l-transparent border-r-transparent border-t-[#c95bf5]"></div>
        </div>
      )}

      <div className="relative flex flex-col items-center z-[2]">
        <div className="w-16 h-16 mb-4 flex items-center justify-center">
          <img
            src={skill.iconPath}
            alt={`${skill.name} icon`}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={{
              filter: `drop-shadow(0 0 12px ${iconColor}80)`,
            }}
          />
        </div>

        <h3 className="text-xl font-semibold mb-2 text-white px-3">{skill.name}</h3>

        <div className="w-full bg-gray-800/50 rounded-full h-2.5 overflow-hidden  ">
          <div
            className="bg-[linear-gradient(to_right,#c95bf5,#9d4edd)] h-2.5 rounded-full transition-all duration-500 ease-out"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
