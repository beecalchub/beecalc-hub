import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { getCalculatorsByCategory } from '@/data/registry';
import { RU_UI, RU_CATEGORIES, ruCalcTitle, ruCalcDesc, ruPlural } from '@/i18n/ru';
import { SITE_URL } from '@/data/constants';

export const metadata: Metadata = {
  title: 'Все калькуляторы',
  description:
    'Полная библиотека калькуляторов BeeCalc Hub для пчеловодов: подкормка, мёд, варроа, матководство, оборудование и экономика пасеки.',
  alternates: {
    canonical: `${SITE_URL}/ru/calculators`,
    languages: { en: `${SITE_URL}/calculators`, ru: `${SITE_URL}/ru/calculators` },
  },
};

export default function RuCalculatorsPage() {
  return (
    <div className="container-page py-6 sm:py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-2">{RU_UI.allCalcsPage.title}</h1>
        <p className="text-smoke-500">{RU_UI.allCalcsPage.subtitle}</p>
      </div>

      <div className="space-y-10">
        {categories.map((cat) => {
          const calcs = getCalculatorsByCategory(cat.slug);
          if (calcs.length === 0) return null;
          const ru = RU_CATEGORIES[cat.slug];
          return (
            <section key={cat.slug}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <Link href={`/ru/category/${cat.slug}`} className="flex items-center gap-2 group">
                  <span className="text-2xl" aria-hidden="true">{cat.icon}</span>
                  <h2 className="font-display text-xl sm:text-2xl text-smoke-900 group-hover:text-honey-700 transition-colors">
                    {ru?.title ?? cat.title}
                  </h2>
                </Link>
                <span className="text-xs text-smoke-400 flex-shrink-0">
                  {ruPlural(calcs.length, 'калькулятор', 'калькулятора', 'калькуляторов')}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {calcs.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/ru/calculator/${calc.slug}`}
                    className="card-interactive group block p-4"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-lg" aria-hidden="true">{calc.icon}</span>
                      <h3 className="font-display text-base text-smoke-800 group-hover:text-honey-700 transition-colors leading-tight">
                        {ruCalcTitle(calc.slug, calc.title)}
                      </h3>
                    </div>
                    <p className="text-sm text-smoke-500 line-clamp-2">
                      {ruCalcDesc(calc.slug, calc.shortDescription)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
