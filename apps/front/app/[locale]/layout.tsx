import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { scandia, workSans } from '@/app/lib/fonts';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import '../globals.css';
import { MixpanelSnippet } from '../scripts/Mixpanel';
import { Reb2BSnippet } from '../scripts/Reb2B';
import { routing } from '@/i18n/routing';
import { Ketch } from '../scripts/Ketch';
import UniversalMetaTags from '@/app/components/SEO/UniversalMetaTags';

const LocaleDetector = dynamic(() => import('../components/i18n/LocaleDetector'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'AI Code Reviews | CodeRabbit | Try for Free',
  description:
    'AI-first pull request reviewer with context-aware feedback, line-by-line code suggestions, and real-time chat.',
  metadataBase: new URL('https://www.coderabbit.ai'),
  openGraph: {
    title: 'AI Code Reviews | CodeRabbit | Try for Free',
    description:
      'AI-first pull request reviewer with context-aware feedback, line-by-line code suggestions, and real-time chat.',
    url: 'https://www.coderabbit.ai',
    siteName: 'CodeRabbit',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/logo-orange.svg',
        width: 1200,
        height: 630,
        alt: 'CodeRabbit - AI Code Reviews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Code Reviews | CodeRabbit | Try for Free',
    description:
      'AI-first pull request reviewer with context-aware feedback, line-by-line code suggestions, and real-time chat.',
    site: '@coderabbitai',
    creator: '@coderabbitai',
    images: ['/images/logo-orange.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className='scroll-pt-32 scroll-smooth'>
      <body
        className={`${scandia.className} ${workSans.className} antialiased bg-cream-300 dark:bg-neutral-1000 font-body text-neutral-900 dark:text-neutral-0 scroll-smooth transition-colors duration-100`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <UniversalMetaTags />
          <div className='relative min-h-screen overflow-x-clip'>
            <Header />
            {children}
            <Footer />
            <Toaster position='bottom-right' />
            <LocaleDetector />
          </div>
        </NextIntlClientProvider>
      </body>
      <Ketch />
      <MixpanelSnippet />
      <Reb2BSnippet />

      {process.env.NODE_ENV === 'production' && <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />}
    </html>
  );
}
