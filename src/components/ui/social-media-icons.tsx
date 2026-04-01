'use client';

import NextLink from 'next/link';
import Image from 'next/image';
import { socialLinks } from '@/components/constants';

export const SocialIcons = () => {
  return (
    <div className="mt-8 flex items-center justify-center gap-6 md:justify-start">
      {socialLinks.map(link => (
        <div
          key={link.name}
          className="transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-110 active:scale-90"
        >
          <NextLink
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
            aria-label={link.name}
          >
            <div className="rounded-full bg-gradient-to-br from-[#c95bf5]/10 to-[#c95bf5]/5 p-3 shadow-lg transition-all duration-300 group-hover:from-[#c95bf5]/20 group-hover:to-[#c95bf5]/10 group-hover:shadow-[#c95bf5]/20">
              <Image
                src={link.icon}
                alt=""
                width={24}
                height={24}
                className="text-white/80 transition-colors duration-300 group-hover:text-[#c95bf5]"
                aria-hidden="true"
              />
            </div>

            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-neutral-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {link.name}
            </span>
          </NextLink>
        </div>
      ))}
    </div>
  );
};
