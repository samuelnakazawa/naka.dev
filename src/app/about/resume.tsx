'use client';

import { useState, useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { education, experiences, cardSkills } from '@/components/constants';
import { Card } from '@/components/ui';

export function ResumeSection() {
  const ref = useRef(null);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const handleCardHover = (id: number | null) => {
    setHoveredCard(id);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <>
      <section className="mb-32" aria-labelledby="experience-heading" ref={ref}>
        <motion.h2
          id="experience-heading"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-4xl font-bold mb-12 text-[#e2d9f3]"
        >
          Professional Journey
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {experiences.map((exp) => (
            <Card
              key={exp.id}
              id={exp.id}
              role={exp.role}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              hoveredCard={hoveredCard}
              setHoveredCard={handleCardHover}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card
            key={education.id}
            id={education.id}
            role={education.role}
            company={education.company}
            period={education.period}
            description={education.description}
            hoveredCard={hoveredCard}
            setHoveredCard={handleCardHover}
          />
        </div>

        <div className="lg:col-span-2">
          <Card
            key={cardSkills.id}
            id={cardSkills.id}
            role={cardSkills.role}
            company={cardSkills.company}
            description={cardSkills.description}
            hoveredCard={hoveredCard}
            setHoveredCard={handleCardHover}
          />
        </div>
      </section>
    </>
  );
}
