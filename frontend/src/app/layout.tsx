import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { Providers } from '@/components/providers';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | SUOAI',
    default: 'SUOAI - AI-Powered Orientation Platform for Immigrants in Finland',
  },
  description: 'Learn Finnish, build your career, and find municipal services with AI-powered personalization.',
  keywords: ['Finland', 'immigration', 'Finnish language', 'CV builder', 'municipal services'],
  authors: [{ name: 'SUOAI Team' }],
  creator: 'MiniMax Agent',
  openGraph: {
    type: 'website',
    locale: 'fi_FI',
    url: 'https://souai.fi',
    title: 'SUOAI - AI-Powered Orientation Platform',
    description: 'Learn Finnish, build your career, and find municipal services with AI-powered personalization.',
    siteName: 'SUOAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SUOAI - AI-Powered Orientation Platform',
    description: 'Learn Finnish, build your career, and find municipal services with AI-powered personalization.',
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

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  let messages;
  
  try {
    messages = (await import(`../../../public/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={inter.className}>
      <body className="min-h-screen bg-white dark:bg-gray-900">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
