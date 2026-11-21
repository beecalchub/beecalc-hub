'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { getCalculatorBySlug, getRelatedCalculators } from '@/data/registry';
import { calculatorComponents } from '@/calculators';
import { CalculatorTypeBadge } from '@/components/ui/Badge';
import { FavoriteButton } from '@/components/calculator/FavoriteButton';
import { UnitToggle } from '@/components/calculator/UnitToggle';
import { RuSupportBanner } from '@/components/ru/RuSupportBanner';
import { useRecentlyUsed } from '@/hooks/useRecentlyUsed';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { I18nProvider, type CalcDict } from '@/i18n/runtime';
import { RU_UI, RU_CATEGORIES, ruCalcTitle, ruCalcDesc } from '@/i18n/ru';

interface Props {
  slug: string;
  dict: CalcDict;
}

export function RuCalculatorPageClient({ slug, dict }: Props) {
  const { addRecentlyUsed } = useRecentlyUsed();
  const { setUnitSystem } = useUnitSystem();

  // Russian-speaking visitors: default to metric unless they already chose a system
  useEffect(() => {
    try {
      if (window.localStorage.getItem('beecalc-unit-system') === null) setUnitSystem('metric');
    } catch {
      // localStorage unavailable
    }
  }, [setUnitSystem]);
  const calculator = getCalculatorBySlug(slug);

  useEffect(() => {
    addRecentlyUsed(slug);
  }, [slug, addRecentlyUsed]);

  if (!calculator) return null;

  const Component = calculatorComponents[slug];
  const ruTitle = ruCalcTitle(slug, calculator.title);
  const ruDesc = ruCalcDesc(slug, calculator.description);
  const catRu = RU_CATEGORIES[calculator.categorySlug];
  const related = getRelatedCalculators(slug);

  return (
    <I18nProvider dict={dict}>
    <div className="container-page py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-smoke-400 mb-6 flex-wrap" aria-label="Хлебные крошки">
        <Link href="/ru/calculators" className="hover:text-honey-700 transition-colors">
          {RU_UI.calculator.breadcrumbRoot}
        </Link>
        <span aria-hidden="true">/</span>
        <Link href={`/ru/category/${calculator.categorySlug}`} className="hover:text-honey-700 transition-colors">
          {catRu?.title ?? calculator.categorySlug}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-smoke-600">{ruTitle}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" aria-hidden="true">{calculator.icon}</span>
            <h1 className="font-display text-2xl sm:text-3xl text-smoke-900">{ruTitle}</h1>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <CalculatorTypeBadge type={calculator.type} />
            <FavoriteButton slug={calculator.slug} />
          </div>
          <p className="text-smoke-600 text-sm sm:text-base max-w-2xl">{ruDesc}</p>
        </div>
        <div className="flex-shrink-0">
          <UnitToggle />
        </div>
      </div>


      {/* Calculator */}
      <div className="mb-8">
        {Component ? <Component /> : (
          <div className="p-6 rounded-xl border border-smoke-200 bg-white text-smoke-600">
            Калькулятор скоро появится.
          </div>
        )}
      </div>

      <RuSupportBanner compact />

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-8 mb-8">
          <h3 className="font-display text-lg text-smoke-800 mb-3">{RU_UI.calculator.related}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {related.map((calc) => (
              <Link
                key={calc.slug}
                href={`/ru/calculator/${calc.slug}`}
                className="flex items-center gap-3 p-3 rounded-lg border border-smoke-100 hover:border-honey-200 hover:bg-honey-50/50 transition-all"
              >
                <span className="text-lg" aria-hidden="true">{calc.icon}</span>
                <div>
                  <p className="text-sm font-medium text-smoke-800">{ruCalcTitle(calc.slug, calc.title)}</p>
                  <p className="text-xs text-smoke-500 line-clamp-1">{ruCalcDesc(calc.slug, calc.shortDescription)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-3 rounded-lg bg-smoke-50 border border-smoke-100 text-xs text-smoke-500">
        {RU_UI.calculator.disclaimer}{' '}
        <Link href="/ru/disclaimer" className="text-honey-700 hover:underline">
          {RU_UI.calculator.disclaimerLink}
        </Link>
      </div>
    </div>
    </I18nProvider>
  );
}
