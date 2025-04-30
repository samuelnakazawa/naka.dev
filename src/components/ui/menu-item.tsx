'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLanguageStore } from '@/stores/language';

interface MenuItemProps {
  type: keyof typeof menuItems;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ type, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguageStore();
  const pathname = usePathname();

  const { text, path } = t.header.items[type];
  const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));

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
        <Link href={path} className="flex flex-col items-center">
          <p
            className={`text-[1.2em] px-2 ${
              isActive ? 'text-[#c95bf5] font-medium' : 'text-white hover:text-[#c95bf5]'
            }`}
          >
            {text}
          </p>
        </Link>
      </motion.div>
    </div>
  );
};
