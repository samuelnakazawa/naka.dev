'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export function InfoSection() {
  const t = useTranslations('about');
  const locale = useLocale();

  const resumeHref = `/documents/Samuel_Nakazawa_Resume_SWE-${locale}.pdf`;
  const resumeDownloadName = `Samuel-Nakazawa-Resume-${locale}.pdf`;

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-12">
      <p className="mb-8 text-3xl font-bold text-[#e2d9f3] md:text-4xl">{t('info.h1')}</p>
      <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-16">
        <div className="w-full max-w-xs">
          <a
            href={resumeHref}
            download={resumeDownloadName}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#c95bf5] to-[#9a4dff] px-6 py-3 text-center text-white shadow-lg transition-all hover:from-[#b142e8] hover:to-[#8a3df5]"
          >
            <DownloadIcon /> {t('info.cv-button')}
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
