'use client';
import { useLanguageStore } from '@/stores/language';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Tooltip } from './tooltip';

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguageStore();
  const [isHovered, setIsHovered] = useState(false);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.button
      onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
      className="relative inline-flex items-center justify-center px-4 py-3 bg-transparent text-white font-semibold rounded-lg border border-white transition-all duration-500 ease-in-out hover:border-transparent hover:bg-gradient-to-tr from-[#c95bf5] to-[#8a2be2] hover:shadow-lg hover:shadow-[#c95bf5]/50 ml-[20px] w-[4em] h-[4em] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      aria-label={lang === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
    >
      <div className="relative w-8 h-8 overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          {lang === 'en' ? (
            <motion.div
              key="us-flag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.3 }}
              className="text-2xl"
            >
              <Image
                src="/us.svg"
                alt="US Flag"
                width={32}
                height={32}
                className="w-8 h-8 object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              key="br-flag"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.3 }}
              className="text-2xl"
            >
              <Image
                src="/brazil.svg"
                alt="Bandeira do Brasil"
                width={32}
                height={32}
                className="w-8 h-8 object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isHovered && <Tooltip text={lang === 'en' ? 'EN-US' : 'PT-BR'} position={'bottom'} />}

      <motion.span
        className="absolute inset-0 rounded-full bg-white opacity-0"
        initial={false}
        animate={{ opacity: 0 }}
        whileTap={{
          opacity: 0.3,
          scale: 2,
          transition: { duration: 0.3 },
        }}
      />
    </motion.button>
  );
};
