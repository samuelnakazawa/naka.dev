'use client';
import { TextHoverEffect, GitHubButton, MobileMenu, HamburgerButton, MenuItem } from './ui';
import { menuItems } from './constants';
import { useEffect, useState, useRef } from 'react';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0512]/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c95bf5]/20 to-transparent ${
          scrolled ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
      ></div>
      <div className="relative max-w-6xl mx-auto flex items-center justify-between py-4">
        <TextHoverEffect
          text={'中澤'}
          duration={0}
          className="text-xl font-medium text-gray-200 hover:text-[#c95bf5] z-10"
        />

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6 z-10">
          {menuItems.map((type, index) => (
            <MenuItem
              key={index}
              type={type}
              className="text-gray-300 hover:text-[#c95bf5] transition-colors duration-300"
            />
          ))}
        </div>

        <div className="flex items-center gap-4 z-10">
          <GitHubButton className="text-gray-300 hover:text-[#c95bf5] transition-colors duration-300" />
          <HamburgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
