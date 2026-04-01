'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SocialIcons } from '@/components/ui';

export function HeroSection() {
  const t = useTranslations('about');

  return (
    <section className="animate-fade-in mx-auto mb-32 max-w-6xl pb-20 pt-32">
      <div className="flex flex-col items-start gap-12 md:flex-row">
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl font-bold leading-tight text-[#f0e9ff] md:text-5xl">
            {t('hero.h1')} <span className="text-[#c95bf5]">Samuel Nakazawa</span>
          </h1>

          <div className="space-y-6 text-lg leading-relaxed text-[#d8c7ff]">
            <p className="max-w-2xl">
              {t('hero.im')}
              <span className="font-medium text-[#c95bf5]">{t('hero.span1')}</span>{' '}
              {t('hero.text1')}
            </p>

            <p>
              {t('hero.text2')} <span className="font-medium text-[#c95bf5]">Globo</span>.
            </p>

            <p className="max-w-2xl">
              {t('hero.text3')}{' '}
              <span className="font-medium text-[#c95bf5]">{t('hero.span2')}</span>
            </p>

            <div className="rounded-lg border-t border-[#2d1b4a]/50 pt-6">
              <p className="text-[#b8a2e0]">{t('hero.text4')}</p>
            </div>

            <div className="pt-2">
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="relative mr-2 mt-2 hidden h-64 w-64 md:block lg:h-72 lg:w-72">
          <div className="animate-slide-up group relative h-full w-full transition-transform duration-300 hover:-translate-y-1">
            <div className="group-hover:blur-xs absolute -inset-0.5 rounded-lg bg-gradient-to-r from-[#c95bf5] to-[#7a36f4] opacity-0 blur-sm transition-all duration-300 group-hover:opacity-70" />

            <div className="absolute inset-0 rounded-lg bg-[#0a0512] shadow-[0_25px_50px_-12px_rgba(201,91,245,0.25)] transition-all duration-300 group-hover:shadow-[0_35px_60px_-15px_rgba(201,91,245,0.3)]" />

            <div className="relative z-10 h-full w-full overflow-hidden rounded-lg bg-[#0a0512] shadow-[0_10px_30px_-10px_rgba(201,91,245,0.3)]">
              <Image
                src="/images/samuelnakazawa.jpeg"
                alt="Samuel Nakazawa"
                width={288}
                height={288}
                sizes="(max-width: 768px) 0px, (max-width: 1024px) 256px, 288px"
                className="h-full w-full object-cover"
                priority
                fetchPriority="high"
                quality={85}
              />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-lg border border-[#2d1b4a]/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
