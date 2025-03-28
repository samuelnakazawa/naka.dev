'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { socialLinks } from '@/components/constants';

export const SocialIcons = () => {
  const validLinks = socialLinks.filter((link) => link.url && typeof link.url === 'string');

  if (validLinks.length === 0) {
    console.warn('No valid social links provided');
    return null;
  }

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
      className="flex items-center justify-center md:justify-start gap-6 mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {validLinks.map((link, index) => (
        <motion.div
          key={`${link.name}-${index}`}
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            aria-label={link.name}
          >
            <div className="p-3 rounded-full bg-gradient-to-br from-[#c95bf5]/10 to-[#c95bf5]/5 group-hover:from-[#c95bf5]/20 group-hover:to-[#c95bf5]/10 transition-all duration-300 shadow-lg group-hover:shadow-[#c95bf5]/20">
              <motion.div
                className="text-white/80 group-hover:text-[#c95bf5] transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                {link.icon}
              </motion.div>
            </div>

            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-white bg-neutral-800 px-2 py-1 rounded whitespace-nowrap transition-opacity duration-200">
              {link.name}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};
