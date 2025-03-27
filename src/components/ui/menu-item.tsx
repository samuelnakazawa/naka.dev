'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItemType } from '../../types/components';

interface MenuItemProps {
  type: MenuItemType;
}

export const MenuItem: React.FC<MenuItemProps> = ({ type }) => {
  const [isHovered, setIsHovered] = useState(false);

  const menuData = {
    home: { icon: '/home.svg', text: 'Home' },
    about: { icon: '/user.svg', text: 'About' },
    projects: { icon: '/project.svg', text: 'Projects' },
    resume: { icon: '/resume.svg', text: 'Resume' },
    blog: { icon: '/blog.svg', text: 'Blog' },
  };

  const { icon, text } = menuData[type];

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
        <a className="flex items-center relative cursor-pointer">
          <img src={icon} alt={text} className="w-[1.2em] h-[1.2em] invert" />
          <p className="invert text-[1.2em] ml-[0.5em]">{text}</p>

          <span
            className="absolute left-1/2 -bottom-[10px] h-[3px] bg-[#c95bf5] rounded-full 
                          w-0 group-hover:w-[120%] -translate-x-1/2 
                          transition-all duration-300 ease-out"
          ></span>
        </a>
      </motion.div>
    </div>
  );
};
