'use client';
import { TextHoverEffect, MenuItem, GitHubButton } from './ui';
import { menuItems } from './constants';
import { useEffect, useState, useRef } from 'react';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        setScrolled(window.scrollY > headerRef.current.offsetHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      {/* Camada de fundo que se integra com os beams */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0512]/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      ></div>

      {/* Borda inferior sutil */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c95bf5]/20 to-transparent ${
          scrolled ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      ></div>

      {/* Conteúdo do header */}
      <div className="relative max-w-6xl mx-auto flex items-center justify-between p-4 px-6">
        <TextHoverEffect
          text={'中澤'}
          duration={0}
          className="text-xl font-medium text-gray-200 hover:text-[#c95bf5] z-10"
        />

        <div className="flex items-center gap-6 z-10">
          {menuItems.map((type, index) => (
            <MenuItem
              key={index}
              type={type}
              className="text-gray-300 hover:text-[#c95bf5] transition-colors duration-300"
            />
          ))}
        </div>

        <GitHubButton className="text-gray-300 hover:text-[#c95bf5] transition-colors duration-300 z-10" />
      </div>
    </header>
  );
};
