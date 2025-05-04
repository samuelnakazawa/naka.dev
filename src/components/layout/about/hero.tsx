'use client';

import { motion } from 'framer-motion';
import { useLanguageStore } from '@/stores/language';
import { SocialIcons } from '@/components/ui';

export function HeroSection() {
  const { t } = useLanguageStore();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-32 max-w-6xl mx-auto pt-32 pb-20"
    >
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f0e9ff] leading-tight">
            {t.about.hero.h1} <span className="text-[#c95bf5]">Samuel Nakazawa</span>
          </h1>

          <div className="space-y-6 text-[#d8c7ff] text-lg leading-relaxed">
            <p className="max-w-2xl">
              {t.about.hero.im}
              <span className="text-[#c95bf5] font-medium">{t.about.hero.span1}</span>{' '}
              {t.about.hero.text1}
            </p>

            <p>
              {t.about.hero.text2} <span className="text-[#c95bf5] font-medium">Globo</span>.
            </p>

            <p className="max-w-2xl">
              {t.about.hero.text3}{' '}
              <span className="text-[#c95bf5] font-medium">{t.about.hero.span2}</span>
            </p>

            <div className="pt-6 border-t border-[#2d1b4a]/50 rounded-lg">
              <p className="text-[#b8a2e0]">{t.about.hero.text4}</p>
            </div>

            <div className="pt-2">
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="hidden md:block relative w-64 h-64 lg:w-72 lg:h-72 mr-2 mt-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative w-full h-full group"
            whileHover={{ y: -5 }}
          >
            <div
              className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#c95bf5] to-[#7a36f4] opacity-0 
                            group-hover:opacity-70 blur-sm group-hover:blur-xs transition-all duration-300"
            ></div>

            <div className="absolute inset-0 rounded-lg bg-[#0a0512] shadow-[0_25px_50px_-12px_rgba(201,91,245,0.25)] group-hover:shadow-[0_35px_60px_-15px_rgba(201,91,245,0.3)] transition-all duration-300"></div>

            <div className="relative z-10 w-full h-full bg-[#0a0512] rounded-lg overflow-hidden shadow-[0_10px_30px_-10px_rgba(201,91,245,0.3)]">
              <img
                src="/images/samuelnakazawa.jpeg"
                alt="Samuel Nakazawa"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 rounded-lg border border-[#2d1b4a]/50 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
