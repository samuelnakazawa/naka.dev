'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Tooltip } from './tooltip';

export const GitHubButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations('header');

  return (
    <motion.a
      href="https://github.com/samuelnakazawa/naka.dev"
      target="_blank"
      rel="noopener noreferrer"
      className="relative ml-[20px] inline-flex h-[4em] w-[4em] items-center justify-center rounded-lg border border-white bg-transparent from-[#c95bf5] to-[#8a2be2] px-4 py-3 font-semibold text-white transition-all duration-500 ease-in-out hover:border-transparent hover:bg-gradient-to-tr hover:shadow-lg hover:shadow-[#c95bf5]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      aria-label={t('button')}
    >
      <Image
        src="/star.svg"
        alt=""
        width={32}
        height={32}
        className="h-[2em] w-[2em] transition-transform duration-500 ease-in-out hover:scale-110"
        aria-hidden="true"
      />
      {isHovered && <Tooltip text={t('button')} position="bottom" />}
    </motion.a>
  );
};
