'use client';
import { motion } from 'framer-motion';

export const HamburgerButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="md:hidden z-20 flex justify-center flex-1">
      <button
        className="focus:outline-none cursor-pointer"
        onClick={onClick}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
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
