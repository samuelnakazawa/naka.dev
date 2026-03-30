'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Skill } from '@/types';
import { Tooltip } from './tooltip';

interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export const SkillCard = ({ skill, className }: SkillCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={`group relative rounded-xl border border-gray-800 p-6 transition-all duration-300 hover:border-[#c95bf5] ${className ?? ''}`}
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
      <div className="absolute inset-0 overflow-hidden rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(201,91,245,0.1)_0%,_transparent_70%)]" />
      </div>

      {showTooltip && <Tooltip text={skill.name} />}

      <div className="relative z-[2] flex flex-col items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center">
          <Image
            src={skill.iconPath}
            alt={`${skill.name} icon`}
            width={64}
            height={64}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={{
              filter: 'drop-shadow(0 0 12px rgba(201, 91, 245, 0.5))',
            }}
          />
        </div>

        <h3 className="mb-2 px-3 text-xl font-semibold text-white">{skill.name}</h3>
      </div>
    </div>
  );
};
