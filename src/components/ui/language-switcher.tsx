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
      className="animate-slide-up relative z-10 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-transparent font-semibold text-white transition-all duration-300 ease-in-out hover:opacity-80 disabled:opacity-70"
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
