'use client';

import { useTranslations } from 'next-intl';

export const HamburgerButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
  const t = useTranslations('header');

  return (
    <div className="z-20 flex flex-1 justify-center md:hidden">
      <button
        className="cursor-pointer focus:outline-none"
        onClick={onClick}
        aria-label={isOpen ? t('menu-close') : t('menu-open')}
      >
        <div className="flex w-6 flex-col gap-1.5">
          <span className="h-0.5 rounded-full bg-gray-300" />
          <span className="h-0.5 rounded-full bg-gray-300" />
          <span className="h-0.5 rounded-full bg-gray-300" />
        </div>
      </button>
    </div>
  );
};
