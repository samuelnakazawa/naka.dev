'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { MenuItemType } from '@/types/components';

interface MenuItemProps {
  type: MenuItemType;
  hideIcon?: boolean;
  onClick?: () => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({ type, hideIcon, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const menuData = {
    home: { icon: '/home.svg', text: 'Home', path: '/' },
    about: { icon: '/user.svg', text: 'About', path: '/about' },
    // projects: { icon: '/project.svg', text: 'Projects', path: '/projects' },
    resume: { icon: '/resume.svg', text: 'Resume', path: '/resume' },
    // blog: { icon: '/blog.svg', text: 'Blog', path: '/blog' },
  };

  const { icon, text, path } = menuData[type];

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Link
          className="flex items-center relative cursor-pointer"
          key={path}
          href={path}
          onClick={onClick}
        >
          {!hideIcon && <img src={icon} alt={text} className="w-[1.2em] h-[1.2em] " />}
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
