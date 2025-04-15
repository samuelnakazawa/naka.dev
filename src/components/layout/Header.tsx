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
        const scrollY = window.scrollY;
        setScrolled(scrollY > 10);

        if (headerRef.current) {
          const scale = 1 - Math.min(scrollY * 0.002, 0.05);
          const opacity = 1 - Math.min(scrollY * 0.005, 0.2);
          headerRef.current.style.transform = `scaleY(${1 - Math.min(scrollY * 0.002, 0.1)})`;
          headerRef.current.querySelector('.header-content')?.style.setProperty('--scale', scale);
          headerRef.current
            .querySelector('.header-content')
            ?.style.setProperty('--opacity', opacity);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-500 ease-out origin-top"
    >
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scrolled ? 'bg-[#0a0512]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        style={{
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        }}
      ></div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c95bf5]/30 to-transparent ${
          scrolled ? 'opacity-100' : 'opacity-70'
        } transition-opacity duration-300`}
      ></div>

      <div
        className="header-content relative h-full max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-8 transition-transform duration-500"
        style={
          {
            '--scale': 1,
            '--opacity': 1,
            transform: 'scale(var(--scale))',
            opacity: 'var(--opacity)',
          } as React.CSSProperties
        }
      >
        <Link
          className="text-2xl font-medium text-gray-200 hover:text-[#c95bf5] z-10 transition-colors duration-300"
          href="/"
        >
          中澤
        </Link>

        <div className="hidden md:flex items-center gap-8 z-10">
          {Object.keys(t.header.items).map((type, index) => (
            <MenuItem
              key={index}
              type={type}
              className="text-gray-300 hover:text-[#c95bf5] transition-colors duration-300 text-sm"
            />
          ))}
        </div>

        <div className="flex items-center gap-5 z-10">
          <div className="hidden md:block">
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
