'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Tooltip } from './';

export const GitHubButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.a
      href={'https://github.com/samuelnakazawa/naka.dev'}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-3 bg-transparent text-white font-semibold rounded-lg border border-white transition-all duration-500 ease-in-out hover:border-transparent hover:bg-gradient-to-tr from-[#c95bf5] to-[#8a2be2] hover:shadow-lg hover:shadow-[#c95bf5]/50 ml-[20px] relative w-[4em] h-[4em]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
    >
      <img
        src={'/star.svg'}
        alt={'star my project :)'}
        className="w-[3em] h-[3em] transition-transform duration-500 ease-in-out hover:scale-110"
      />
      {isHovered && <Tooltip text={'Project repository'} />}
    </motion.a>
  );
};
