'use client';

import { AiOutlineDownload } from 'react-icons/ai';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function InfoSection() {
  const t = useTranslations('about');

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24 md:py-12">
      <p className="mb-8 text-3xl font-bold text-[#e2d9f3] md:text-4xl">{t('info.h1')}</p>
      <div className="flex w-full flex-row justify-center gap-16">
        <div className="w-full max-w-xs">
          <a
            href="/documents/samuel-nakazawa-resume.pdf"
            download="Samuel-Nakazawa-Resume.pdf"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#c95bf5] to-[#9a4dff] px-6 py-3 text-center text-white shadow-lg transition-all hover:from-[#b142e8] hover:to-[#8a3df5]"
          >
            <AiOutlineDownload size={18} /> {t('info.cv-button')}
          </a>
        </div>
        <div className="w-full max-w-xs">
          <Link
            href="/contact"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#c95bf5] to-[#9a4dff] px-6 py-3 text-center text-white shadow-lg transition-all hover:from-[#b142e8] hover:to-[#8a3df5]"
          >
            {t('info.chat')}
          </Link>
        </div>
      </div>
    </div>
  );
}
