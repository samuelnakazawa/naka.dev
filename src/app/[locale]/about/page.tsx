import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroSection, ResumeSection, SkillSection, InfoSection } from '@/components/layout/about';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.about' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: ['developer', 'portfolio', 'about', 'globo', 'ciandt', 'frontend engineer'],
  };
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-24 lg:px-8">
      <div className="relative min-h-screen overflow-hidden text-white">
        <HeroSection />
        <div className="container relative z-10 mx-auto py-16">
          <ResumeSection />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <SkillSection />
          <InfoSection />
        </div>
      </div>
    </div>
  );
}
