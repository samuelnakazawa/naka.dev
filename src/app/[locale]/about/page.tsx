import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/layout/about';

function SectionSkeleton() {
  return <div className="h-64 animate-pulse rounded-xl bg-[#1a0a2a]" />;
}

const ResumeSection = dynamic(
  () => import('@/components/layout/about/resume').then(mod => ({ default: mod.ResumeSection })),
  { loading: () => <SectionSkeleton /> }
);
const SkillSection = dynamic(
  () => import('@/components/layout/about/skillset').then(mod => ({ default: mod.SkillSection })),
  { loading: () => <SectionSkeleton /> }
);
const InfoSection = dynamic(
  () => import('@/components/layout/about/info').then(mod => ({ default: mod.InfoSection })),
  { loading: () => <SectionSkeleton /> }
);

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
      <div className="relative min-h-screen text-white">
        <HeroSection />
        <div className="container relative z-10 mx-auto py-8">
          <ResumeSection />
        </div>
        <div className="container relative z-10 mx-auto px-6 py-16">
          <SkillSection />
        </div>
        <div className="container relative z-10 mx-auto px-6">
          <InfoSection />
        </div>
      </div>
    </div>
  );
}
