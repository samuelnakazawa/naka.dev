'use client';
import { useState } from 'react';

import { Skill } from '@/types';
import { Tooltip } from './';

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

      {showTooltip && <Tooltip text={skill.name} />}

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
      </div>
    </div>
  );
};
