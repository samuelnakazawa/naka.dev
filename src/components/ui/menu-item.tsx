'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/stores/language';

interface MenuItemProps {
  type: keyof typeof menuItems;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ type, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguageStore();

  const { text, path } = t.header.items[type];

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Link href={path} className={'flex items-center gap-2'}>
          <p className="text-white text-[1.2em] ml-[0.5em]">{text}</p>
          <span
            className="absolute left-1/2 -bottom-[10px] h-[3px] bg-[#c95bf5] rounded-full 
                          w-0 group-hover:w-[120%] -translate-x-1/2 
                          transition-all duration-300 ease-out"
          ></span>
        </Link>
      </motion.div>
    </div>
  );
};
