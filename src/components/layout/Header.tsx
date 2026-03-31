'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  GitHubButton,
  MobileMenu,
  HamburgerButton,
  MenuItem,
  LanguageSwitcher,
} from '@/components/ui';
import { Link } from '@/i18n/navigation';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number>(0);
  const t = useTranslations('header');

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        if (!headerRef.current) return;

        const scrollY = window.scrollY;
        setScrolled(scrollY > 10);

        if (isMobile) return;

        const content =
          contentRef.current ??
          (contentRef.current = headerRef.current.querySelector(
            '.header-content'
          ) as HTMLElement | null);
        if (!content) return;

        const scale = String(1 - Math.min(scrollY * 0.002, 0.05));
        const opacity = String(1 - Math.min(scrollY * 0.005, 0.2));
        headerRef.current.style.transform = `scaleY(${1 - Math.min(scrollY * 0.002, 0.1)})`;
        content.style.setProperty('--scale', scale);
        content.style.setProperty('--opacity', opacity);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  const menuKeys = Object.keys(t.raw('items') as Record<string, unknown>) as Array<string>;

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 h-20 origin-top transition-all duration-500 ease-out"
    >
      <div className="mx-auto h-full max-w-6xl px-6 lg:px-8">
        <div
          className={`absolute inset-0 bg-[#0a0512]/90 shadow-lg backdrop-blur-md transition-all duration-500`}
          style={{
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          }}
        />

        <div
          className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c95bf5]/30 to-transparent ${
            scrolled && !isMobile ? 'opacity-100' : 'opacity-70'
          } transition-opacity duration-300`}
        />

        <div
          className="header-content relative mx-auto flex h-full max-w-6xl items-center justify-between transition-transform duration-500"
          style={
            {
              '--scale': 1,
              '--opacity': 1,
              transform: isMobile ? 'none' : 'scale(var(--scale))',
              opacity: 'var(--opacity)',
            } as React.CSSProperties
          }
        >
          <Link
            className="z-10 text-2xl font-medium text-gray-200 transition-colors duration-300 hover:text-[#c95bf5]"
            href="/"
          >
            中澤
          </Link>

          <div className="z-10 hidden items-center gap-8 md:flex">
            {menuKeys.map(type => (
              <MenuItem
                key={type}
                type={type}
                className="text-sm text-gray-300 transition-colors duration-300 hover:text-[#c95bf5]"
              />
            ))}
          </div>

          <div className="z-10 flex items-center gap-5">
            <LanguageSwitcher />
            <GitHubButton />
            <HamburgerButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>
    </header>
  );
};
