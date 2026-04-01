'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period?: string;
  description: unknown[];
}

export function ResumeSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const t = useTranslations('about');

  const handleCardHover = (id: number | null) => setHoveredCard(id);

  const experienceItems = t.raw('experience.items') as Record<
    string,
    {
      role: string;
      company: string;
      period: string;
      description: unknown[];
    }
  >;

  const experiences: ExperienceItem[] = Object.entries(experienceItems).map(([, item], index) => ({
    id: index + 1,
    role: item.role,
    company: item.company,
    period: item.period,
    description: item.description,
  }));

  const educationItem = t.raw('education.item') as {
    institution: string;
    period: string;
    description: string[];
  };

  const education: ExperienceItem = {
    id: experiences.length + 1,
    role: t('education.role'),
    company: educationItem.institution,
    period: educationItem.period,
    description: educationItem.description,
  };

  const languagesData = t.raw('languages') as {
    title: string;
    description: string[];
  };

  const cardSkills = {
    id: experiences.length + 2,
    role: languagesData.title,
    description: languagesData.description,
  };

  return (
    <>
      <section className="mb-32" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="mb-12 text-3xl font-bold text-[#e2d9f3] md:text-4xl">
          {t('card.resume')}
        </h2>

        <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {experiences.map(exp => (
            <Card
              key={exp.id}
              id={exp.id}
              role={exp.role}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              hoveredCard={hoveredCard}
              setHoveredCard={handleCardHover}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card
            id={education.id}
            role={education.role}
            company={education.company}
            period={education.period}
            description={education.description}
            hoveredCard={hoveredCard}
            setHoveredCard={handleCardHover}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          />
        </div>

        <div className="lg:col-span-2">
          <Card
            id={cardSkills.id}
            role={cardSkills.role}
            description={cardSkills.description}
            hoveredCard={hoveredCard}
            setHoveredCard={handleCardHover}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          />
        </div>
      </section>
    </>
  );
}
