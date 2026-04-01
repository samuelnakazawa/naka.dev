import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ClientLayout } from '@/components/providers/client-layout';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata.home' });

  return {
    metadataBase: new URL('https://naka.dev'),
    title: {
      default: t('title'),
      template: '%s | Samuel Nakazawa',
    },
    description: t('description'),
    keywords: [
      'frontend engineer',
      'react',
      'typescript',
      'next.js',
      'web performance',
      'samuel nakazawa',
    ],
    authors: [{ name: 'Samuel Nakazawa' }],
    creator: 'Samuel Nakazawa',
    openGraph: {
      type: 'website',
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      url: 'https://naka.dev',
      siteName: 'Samuel Nakazawa',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: 'https://naka.dev/images/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Samuel Nakazawa - Frontend Engineer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://naka.dev/images/og-image.png'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: 'https://naka.dev',
      languages: {
        en: 'https://naka.dev',
        pt: 'https://naka.dev/pt',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/images/samuelnakazawa.jpeg"
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Samuel Nakazawa',
              jobTitle: 'Frontend Engineer',
              url: 'https://naka.dev',
              sameAs: [
                'https://github.com/samuelnakazawa',
                'https://www.linkedin.com/in/samuel-nakazawa-960301141/',
              ],
            }),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
