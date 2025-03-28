'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, SocialIcons } from './';
import { menuItems } from '../constants';

export const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-gradient-to-b from-[#1a0a2a] to-[#2d0b4a] z-50 shadow-2xl"
          >
            <div className="h-full flex flex-col p-6">
              <div className="flex justify-end mb-8">
                <button
                  onClick={onClose}
                  className="text-gray-300 hover:text-[#c95bf5] transition-colors"
                  aria-label="Fechar menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Itens do menu */}
              <nav className="flex-1 flex flex-col gap-2">
                {menuItems.map((type, index) => (
                  <MenuItem
                    key={index}
                    type={type}
                    className="text-gray-100 hover:text-white text-xl py-4 px-6 rounded-lg hover:bg-[#c95bf5]/20 transition-all duration-300 border-l-4 border-transparent hover:border-[#c95bf5]"
                    onClick={onClose}
                    hideIcon
                  />
                ))}
              </nav>

              {/* Rodapé do menu */}
              <div className="pt-8 border-t border-[#c95bf5]/20 mt-auto">
                <div className="flex justify-center gap-6">
                  <SocialIcons />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
