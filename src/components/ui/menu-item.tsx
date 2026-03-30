'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

interface MenuItemProps {
  type: string;
  onClick?: () => void;
  className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ type, onClick }) => {
  const t = useTranslations('header');
  const pathname = usePathname();

  const text = t(`items.${type}.text`);
  const path = t(`items.${type}.path`);
  const isActive = pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <div className="group relative" onClick={onClick}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Link href={path} className="flex flex-col items-center">
          <p
            className={`px-2 text-[1.2em] ${
              isActive ? 'font-medium text-[#c95bf5]' : 'text-white hover:text-[#c95bf5]'
            }`}
          >
            {text}
          </p>
        </Link>
      </motion.div>
    </div>
  );
};
