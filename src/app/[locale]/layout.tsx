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
    metadataBase: new URL('https://samuelnakazawa.com'),
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
      url: 'https://samuelnakazawa.com',
      siteName: 'Samuel Nakazawa',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: 'https://samuelnakazawa.com/images/og-image.jpeg',
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
      images: ['https://samuelnakazawa.com/images/og-image.jpeg'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: 'https://samuelnakazawa.com',
      languages: {
        en: 'https://samuelnakazawa.com',
        pt: 'https://samuelnakazawa.com/pt',
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
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Samuel Nakazawa',
                jobTitle: 'Frontend Engineer',
                url: 'https://samuelnakazawa.com',
                image: 'https://samuelnakazawa.com/images/samuelnakazawa.jpeg',
                sameAs: [
                  'https://github.com/samuelnakazawa',
                  'https://www.linkedin.com/in/samuel-nakazawa-960301141/',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Samuel Nakazawa',
                url: 'https://samuelnakazawa.com',
                inLanguage: ['pt-BR', 'en-US'],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://samuelnakazawa.com',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'About',
                    item: 'https://samuelnakazawa.com/about',
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: 'Contact',
                    item: 'https://samuelnakazawa.com/contact',
                  },
                ],
              },
            ]),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <ClientLayout>{children}</ClientLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
