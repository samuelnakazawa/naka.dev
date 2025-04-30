'use client';

import { profileLinks } from '@/components/constants';
import { useLanguageStore } from '@/stores/language';

export const Footer = () => {
  const { t } = useLanguageStore();
  return (
    <footer className="w-full text-white pt-4 pb-6 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-[#1a0a2a]/80 to-[#251240]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 ">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c95bf5]/30 to-transparent mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between text-center md:text-left backdrop-blur-sm ">
          <p className="text-sm text-[#e2d9f3]">
            &copy; {`${new Date().getFullYear()} ${t.footer.rightsHolder}`}
          </p>

          <div className="flex gap-6 mt-4 md:mt-0 justify-center md:justify-end">
            <a
              href={profileLinks['github']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8c7ff] hover:text-[#c95bf5] transition duration-300 flex items-center gap-1"
            >
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href={profileLinks['linkedin']}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8c7ff] hover:text-[#c95bf5] transition duration-300 flex items-center gap-1"
            >
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
            <a
              href="/contact"
              className="text-[#d8c7ff] hover:text-[#c95bf5] transition duration-300 flex items-center gap-1"
            >
              <span className="hidden sm:inline">E-mail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
