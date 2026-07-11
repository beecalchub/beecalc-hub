import React from 'react';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://beecalchub.com'),
  title: {
    default: 'BeeCalc Hub - Professional Beekeeping Calculators',
    template: '%s | BeeCalc Hub',
  },
  description:
    'Free, practical calculators for beekeepers - from feeding and honey production to varroa management and business planning.',
  keywords: ['beekeeping', 'calculator', 'apiary', 'honey', 'varroa', 'bee', 'hive management'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'BeeCalc Hub',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'BeeCalc Hub - Smart tools for smarter beekeeping' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-2CPGZ55BT9" />
    </html>
  );
}
