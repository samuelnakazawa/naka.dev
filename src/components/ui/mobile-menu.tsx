'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MenuItem, SocialIcons } from './';

export const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const t = useTranslations('header');

  const menuKeys = Object.keys(t.raw('items') as Record<string, unknown>) as Array<string>;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 h-screen bg-[#0f0524]/25 backdrop-blur-lg"
            onClick={onClose}
            aria-label={t('menu-open')}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs border-l border-[#c95bf5]/10 bg-[#0f0524]/95 shadow-2xl backdrop-blur-lg"
          >
            <div className="flex h-screen flex-col">
              <div className="border-b border-[#c95bf5]/10 p-6">
                <div className="mb-4 flex items-center justify-between">
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

              <div className="flex-1 overflow-y-auto p-6">
                <nav className="flex flex-col gap-2">
                  {menuKeys.map(type => (
                    <MenuItem key={type} type={type} onClick={onClose} />
                  ))}
                </nav>
              </div>

              <div className="border-t border-[#c95bf5]/10 p-6">
                <div className="mb-4 flex justify-center gap-6">
                  <SocialIcons />
                </div>
                <p className="text-center text-xs text-gray-500">
                  &copy; {new Date().getFullYear()} Samuel Nakazawa
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
