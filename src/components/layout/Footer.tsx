'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { profileLinks } from '@/components/constants';

export const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="w-full bg-gradient-to-b from-transparent via-[#1a0a2a]/80 to-[#251240] px-4 pb-6 pt-4 text-white md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#c95bf5]/30 to-transparent" />

        <div className="flex flex-col justify-between text-center backdrop-blur-sm md:flex-row md:text-left">
          <p className="text-sm text-[#e2d9f3]">
            &copy; {new Date().getFullYear()} {t('rightsHolder')}
          </p>

          <div className="mt-4 flex justify-center gap-6 md:mt-0 md:justify-end">
            <a
              href={profileLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#d8c7ff] transition duration-300 hover:text-[#c95bf5]"
            >
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={profileLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#d8c7ff] transition duration-300 hover:text-[#c95bf5]"
            >
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <Link
              href="/contact"
              className="flex items-center gap-1 text-[#d8c7ff] transition duration-300 hover:text-[#c95bf5]"
            >
              <span className="hidden sm:inline">E-mail</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
