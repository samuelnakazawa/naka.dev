'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { MenuItem, SocialIcons } from './';
import { menuItems } from '@/components/constants';
import { useLanguageStore } from '@/stores/language';

export const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useLanguageStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-screen bg-[#0f0524]/25 backdrop-blur-lg z-40"
            onClick={onClose}
            aria-label={t.header['menu-open']}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#0f0524]/95 backdrop-blur-lg z-50 shadow-2xl border-l border-[#c95bf5]/10"
          >
            <div className="h-screen flex flex-col">
              <div className="p-6 border-b border-[#c95bf5]/10">
                <div className="flex justify-between items-center mb-4">
                  <Link className="text-2xl font-bold text-white" href="/" onClick={onClose}>
                    中澤
                  </Link>

                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-[#c95bf5]/20 transition-colors"
                    aria-label={t.header['menu-close']}
                  >
                    <svg
                      className="w-6 h-6 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                  {Object.keys(t.header.items).map((type, index) => (
                    <MenuItem
                      key={index}
                      type={type}
                      className="text-gray-200 hover:text-white text-lg py-4 px-4 rounded-lg hover:bg-[#c95bf5]/10 transition-all duration-200 border-l-4 border-transparent hover:border-[#c95bf5]"
                      onClick={onClose}
                      hideIcon
                    />
                  ))}
                </nav>
              </div>

              <div className="p-6 border-t border-[#c95bf5]/10">
                <div className="flex justify-center gap-6 mb-4">
                  <SocialIcons />
                </div>
                <p className="text-center text-xs text-gray-500">
                  © {new Date().getFullYear()} Samuel Nakazawa. All rights reserved.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
