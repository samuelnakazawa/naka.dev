'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MenuItem, SocialIcons } from './';

export const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const t = useTranslations('header');
  const [mounted, setMounted] = useState(false);

  const menuKeys = Object.keys(t.raw('items') as Record<string, unknown>) as Array<string>;

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  if (!isOpen && !mounted) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 h-screen bg-[#0f0524]/25 backdrop-blur-lg transition-opacity duration-300 ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs border-l border-[#c95bf5]/10 bg-[#0f0524]/95 shadow-2xl backdrop-blur-lg transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mounted ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTransitionEnd={() => {
          if (!isOpen) setMounted(false);
        }}
      >
        <div className="flex h-[100dvh] flex-col">
          <div className="border-b border-[#c95bf5]/10 p-6">
            <div className="flex items-center justify-between">
              <Link className="text-2xl font-bold text-white" href="/" onClick={onClose}>
                中澤
              </Link>

              <button
                onClick={onClose}
                className="cursor-pointer rounded-full p-2 transition-colors hover:bg-[#c95bf5]/20"
                aria-label={t('menu-close')}
              >
                <svg
                  className="h-6 w-6 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-2 p-6">
            {menuKeys.map(type => (
              <MenuItem key={type} type={type} onClick={onClose} />
            ))}
          </nav>

          <div className="shrink-0 border-t border-[#c95bf5]/10 p-6">
            <div className="mb-4 flex justify-center gap-6">
              <SocialIcons />
            </div>
            <p className="text-center text-xs text-gray-500">
              &copy; {new Date().getFullYear()} Samuel Nakazawa
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
