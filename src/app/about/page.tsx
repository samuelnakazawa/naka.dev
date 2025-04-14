'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { AiOutlineDownload } from 'react-icons/ai';
import { SocialIcons, SkillCard } from '@/components/ui';
import { skills, education, experiences, cardSkills } from '@/components/constants';
import { Card } from '@/components/ui/hover-card';
import { useLanguageStore } from '@/stores/language';

export default function LivingResume() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const [showAllSkillsMobile, setShowAllSkillsMobile] = useState(false);
  const initialMobileSkills = 4;
  const skillsToShow = showAllSkillsMobile ? skills : skills.slice(0, initialMobileSkills);
  const { t } = useLanguageStore();

  const handleCardHover = (id: number | null) => {
    setHoveredCard(id);
  };

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const pdfFile = '/documents/samuel-nakazawa-resume.pdf';

  return (
    <div className="min-h-screen pt-32 md:pt-40 relative overflow-hidden text-white">
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-24 max-w-6xl justify-between z-10 mx-auto py-12 md:py-20"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#e2d9f3]">Hello, I'm Samuel</h2>

            <div className="space-y-4 text-[#d8c7ff] leading-relaxed">
              <p>
                I'm a <span className="text-[#c95bf5]">Frontend Engineer</span> passionate about
                teaching and learning about Web Development
              </p>

              <p>
                Currently at <span className="text-[#c95bf5]">Globo</span>.
              </p>
              <p>
                Let's talk about{' '}
                <span className="text-[#c95bf5]">
                  Web Development, Acessibility, User Experience and Web Performance
                </span>
              </p>

              <div className="pt-4 border-t border-[#2d1b4a] ">
                <p className="text-[#b8a2e0]">
                  Outside of work, you'll find me exploring new web technologies, experimenting with
                  machine learning, or just petting cats around the neighborhood.
                </p>
              </div>
              <div className="md:mt-8">
                <SocialIcons />
              </div>
            </div>
          </div>

          <div className="hidden md:block relative w-48 h-48">
            <img
              src="/images/samuelnakazawa.jpeg"
              alt="Samuel Nakazawa"
              className=" w-64 h-64 md:w-80 md:h-80 object-cover border-4 border-[#c95bf5]/30"
            />
          </div>
        </div>
      </motion.section>
      <div ref={ref} className="container mx-auto px-6 py-24 relative z-10">
        <section className="mb-32" aria-labelledby="experience-heading">
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
      </div>
      <div ref={ref} className="container mx-auto px-6 relative z-10">
        <section className="min-h-screen py-20 ">
          <>
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
          </>
        </section>

        <a
          href={pdfFile}
          download="Samuel-Nakazawa-Curriculo.pdf"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c95bf5] to-[#9a4dff] text-white rounded-lg hover:from-[#b142e8] hover:to-[#8a3df5] transition-all shadow-lg flex-1 sm:flex-none justify-center"
        >
          <AiOutlineDownload size={18} /> {t.resume['cv-button']}
        </a>
      </div>
    </div>
  );
}
