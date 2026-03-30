'use client';

import NextLink from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { socialLinks } from '@/components/constants';

export const SocialIcons = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  return (
    <motion.div
      className="mt-8 flex items-center justify-center gap-6 md:justify-start"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map(link => (
        <motion.div key={link.name} variants={itemVariants} whileHover="hover" whileTap="tap">
          <NextLink
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            aria-label={link.name}
          >
            <div className="rounded-full bg-gradient-to-br from-[#c95bf5]/10 to-[#c95bf5]/5 p-3 shadow-lg transition-all duration-300 group-hover:from-[#c95bf5]/20 group-hover:to-[#c95bf5]/10 group-hover:shadow-[#c95bf5]/20">
              <Image
                src={link.icon}
                alt=""
                width={24}
                height={24}
                className="text-white/80 transition-colors duration-300 group-hover:text-[#c95bf5]"
                aria-hidden="true"
              />
            </div>

            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-neutral-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {link.name}
            </span>
          </NextLink>
        </motion.div>
      ))}
    </motion.div>
  );
};
