'use client';

import { motion } from 'framer-motion';
import { useLanguageStore } from '@/stores/language';

export const HamburgerButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  const { t } = useLanguageStore();
  return (
    <div className="md:hidden z-20 flex justify-center flex-1">
      <button
        className="focus:outline-none cursor-pointer"
        onClick={onClick}
        aria-label={isOpen ? t.header['menu-close'] : t.header['menu-open']}
      >
        <div className="w-6 flex flex-col gap-1.5">
          <span className="h-0.5 bg-gray-300 rounded-full" />
          <span className="h-0.5 bg-gray-300 rounded-full" />
          <span className="h-0.5 bg-gray-300 rounded-full" />
        </div>
      </button>
    </div>
  );
};
