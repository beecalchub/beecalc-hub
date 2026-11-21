'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher, useCurrentLocale } from './LanguageSwitcher';
import { RU_UI } from '@/i18n/ru';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const locale = useCurrentLocale();
  const isRu = locale === 'ru';
  const prefix = isRu ? '/ru' : '';

  const navLinks = [
    { href: `${prefix}/calculators`, label: isRu ? RU_UI.nav.allCalculators : 'All Calculators' },
    { href: `${prefix}/about`, label: isRu ? RU_UI.nav.about : 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-smoke-100">
      <div className="container-page flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <Link href={prefix === '' ? '/' : prefix} className="flex items-center gap-2 group">
          <span className="text-2xl" aria-hidden="true">🐝</span>
          <span className="font-display text-xl text-honey-800 group-hover:text-honey-600 transition-colors">
            BeeCalc Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-5">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-smoke-600 hover:text-honey-700 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher compact />
        </div>

        {/* Mobile: switcher + menu button */}
        <div className="sm:hidden flex items-center gap-2">
          <LanguageSwitcher compact />
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-smoke-600 hover:text-honey-700"
            aria-label={isRu ? RU_UI.nav.openMenu : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  );
}
