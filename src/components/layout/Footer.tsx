'use client';

import React from 'react';
import Link from 'next/link';
import { useCurrentLocale } from './LanguageSwitcher';
import { RU_UI } from '@/i18n/ru';

// Client component so copyright year is always current; locale-aware (EN at root, RU under /ru)
export function Footer() {
  const locale = useCurrentLocale();
  const isRu = locale === 'ru';
  const p = isRu ? '/ru' : '';
  const f = RU_UI.footer;

  return (
    <footer className="bg-hive-900 text-hive-300 mt-auto">
      <div className="container-page py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href={p === '' ? '/' : p} className="flex items-center gap-2 mb-3">
              <span className="text-xl" aria-hidden="true">🐝</span>
              <span className="font-display text-lg text-honey-300">BeeCalc Hub</span>
            </Link>
            <p className="text-sm text-hive-400 leading-relaxed">
              {isRu
                ? f.brandDesc
                : 'Free, practical calculators built for beekeepers - hobbyist to commercial.'}
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-display text-sm text-honey-300 mb-3">{isRu ? f.calculators : 'Calculators'}</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li><Link href={`${p}/calculators`} className="hover:text-honey-200 transition-colors">{isRu ? RU_UI.nav.allCalculators : 'All Calculators'}</Link></li>
              <li><Link href={`${p}/category/feeding-and-nutrition`} className="hover:text-honey-200 transition-colors">{isRu ? f.feeding : 'Feeding'}</Link></li>
              <li><Link href={`${p}/category/honey-production-and-extraction`} className="hover:text-honey-200 transition-colors">{isRu ? f.honeyProduction : 'Honey Production'}</Link></li>
              <li><Link href={`${p}/category/varroa-and-pest-management`} className="hover:text-honey-200 transition-colors">{isRu ? f.varroa : 'Varroa Management'}</Link></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-display text-sm text-honey-300 mb-3">{isRu ? f.more : 'More'}</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li><Link href={`${p}/category/business-and-profitability`} className="hover:text-honey-200 transition-colors">{isRu ? f.business : 'Business Tools'}</Link></li>
              <li><Link href={`${p}/category/education-and-hobbyist`} className="hover:text-honey-200 transition-colors">{isRu ? f.beginners : 'Beginner Tools'}</Link></li>
              <li><Link href={`${p}/category/environmental-and-forage`} className="hover:text-honey-200 transition-colors">{isRu ? f.forage : 'Forage Tools'}</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-display text-sm text-honey-300 mb-3">{isRu ? f.info : 'Info'}</h4>
            <ul className="space-y-2 text-sm" role="list">
              <li><Link href={`${p}/about`} className="hover:text-honey-200 transition-colors">{isRu ? RU_UI.nav.about : 'About'}</Link></li>
              <li><Link href={`${p}/disclaimer`} className="hover:text-honey-200 transition-colors">{isRu ? f.disclaimer : 'Disclaimer'}</Link></li>
              <li><Link href={`${p}/contact`} className="hover:text-honey-200 transition-colors">{isRu ? f.contact : 'Contact'}</Link></li>
              <li><Link href={`${p}/support`} className="hover:text-honey-200 transition-colors">{isRu ? f.supportUs : 'Support Us'}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-hive-700 text-center text-xs text-hive-500">
          © {new Date().getFullYear()} BeeCalc Hub. {isRu ? f.copyright : 'Free tools for beekeepers everywhere.'}
        </div>
      </div>
    </footer>
  );
}
