'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

import {
  GitHubButton,
  MobileMenu,
  HamburgerButton,
  MenuItem,
  LanguageSwitcher,
} from '@/components/ui';
import { menuItems } from '@/components/constants';
import { useLanguageStore } from '@/stores/language';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const { t } = useLanguageStore();

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
      <div className="relative max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <Link className="text-xl font-medium text-gray-200 hover:text-[#c95bf5] z-10" href="/">
          中澤
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6 z-10">
          {Object.keys(t.header.items).map((type, index) => (
            <MenuItem
              key={index}
              type={type}
              className="text-gray-300 hover:text-[#c95bf5] transition-colors duration-300"
            />
          ))}
        </div>

        <div className="flex items-center gap-4 z-10">
          <div className=" md:block">
            <LanguageSwitcher />
          </div>

          <GitHubButton className="text-gray-300 hover:text-[#c95bf5] transition-colors duration-300" />

          <HamburgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(!isMenuOpen)} />
    </header>
  );
};
