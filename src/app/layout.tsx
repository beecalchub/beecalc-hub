import { GoogleAnalytics } from '@next/third-parties/google';
import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
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
      </body>
      <GoogleAnalytics gaId="G-2CPGZ55BT9" />
    </html>
  );
}
