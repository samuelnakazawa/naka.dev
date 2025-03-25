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
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-neutral-800/50 shadow-sm' : 'border-b border-transparent'
      }`}
      style={{ fontSize: '32px' }}
    >
      <div
        className={`flex items-center justify-between p-4 mx-auto max-w-6xl backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'bg-black/20' : 'bg-transparent'
        }`}
      >
        <TextHoverEffect text={'中澤'} duration={0} />
        <div className="flex items-center space-x-6">
          {menuItems.map((type, index) => (
            <MenuItem key={index} type={type} />
          ))}
        </div>
        <div>
          <GitHubButton />
        </div>
      </div>
    </header>
  );
};
