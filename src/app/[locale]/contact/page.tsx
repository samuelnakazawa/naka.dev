import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/layout';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.contact' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: ['developer', 'portfolio', 'contact', 'frontend', 'design'],
  };
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-16 pt-24 lg:px-8">
      <section className="min-h-[calc(100vh-80px)]">
        <div className="mx-auto max-w-6xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
