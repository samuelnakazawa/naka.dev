'use client';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Tooltip } from './tooltip';

export const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isHovered, setIsHovered] = useState(false);

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'pt' : 'en';
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="animate-slide-up relative ml-[20px] inline-flex h-[4em] w-[4em] cursor-pointer items-center justify-center rounded-lg border border-white bg-transparent from-[#c95bf5] to-[#8a2be2] px-4 py-3 font-semibold text-white transition-all duration-500 ease-in-out hover:border-transparent hover:bg-gradient-to-tr hover:shadow-lg hover:shadow-[#c95bf5]/50 disabled:opacity-70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={locale === 'en' ? 'Switch to Portuguese' : 'Mudar para Inglês'}
    >
      <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden">
        <Image
          key={locale}
          src={locale === 'en' ? '/us.svg' : '/brazil.svg'}
          alt={locale === 'en' ? 'US Flag' : 'Bandeira do Brasil'}
          width={32}
          height={32}
          className="h-8 w-8 object-cover"
        />
      </div>

      {isHovered && <Tooltip text={locale === 'en' ? 'EN-US' : 'PT-BR'} position="bottom" />}
    </button>
  );
};
