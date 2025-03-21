'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

type MenuItemType = 'home' | 'about' | 'projects' | 'resume' | 'blog';

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
      className="relative after:content-[''] after:block after:bg-[#c95bf5]  after:rounded-[16px] after:h-[5px] after:w-0 after:absolute after:left-0 after:-bottom-[8px] after:transition-all after:duration-300 after:ease-out hover:after:w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <a className="flex items-center">
          <img src={icon} alt={text} className="w-[1em] h-[1em] invert" />
          <p className="invert text-[0.5em] ml-[0.5em]">{text}</p>
        </a>
      </motion.div>
    </div>
  );
};
