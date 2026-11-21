import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { getCalculatorsByCategory, getCalculatorBySlug } from '@/data/registry';
import { RU_UI, RU_CATEGORIES, ruCalcTitle, ruCalcDesc, ruPlural } from '@/i18n/ru';
import { RuSupportBanner } from '@/components/ru/RuSupportBanner';
import { SITE_URL } from '@/data/constants';

export const metadata: Metadata = {
  title: 'BeeCalc Hub - Калькуляторы для пчеловодов',
  description:
    'Бесплатные практичные калькуляторы для пчеловодов: сироп, зимние запасы, заклещённость, медосбор, матководство и экономика пасеки.',
  alternates: {
    canonical: `${SITE_URL}/ru`,
    languages: { en: SITE_URL, ru: `${SITE_URL}/ru` },
  },
};

const FEATURED_SLUGS = [
  'sugar-syrup',
  'varroa-infestation-rate',
  'honey-bottling',
  'winter-stores',
  'queen-rearing-timeline',
  'apiary-profit',
];

const POPULAR_SLUGS = [
  'sugar-syrup',
  'varroa-infestation-rate',
  'honey-moisture-correction',
  'cost-per-hive',
  'split-planning',
  'oav-dosing',
  'harvest-estimator',
  'overwintering-readiness',
];

export default function RuHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden honeycomb-bg">
        <div className="container-page py-16 sm:py-24">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-smoke-900 mb-4 leading-tight">
              {RU_UI.hero.titleLine1}
              <span className="text-honey-600 block">{RU_UI.hero.titleAccent}</span>
            </h1>
            <p className="text-lg sm:text-xl text-smoke-600 mb-8 leading-relaxed max-w-xl">
              {RU_UI.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/ru/calculators" className="btn-primary text-base px-6 py-3">
                {RU_UI.hero.browseAll}
              </Link>
              <Link href="/ru/category/education-and-hobbyist" className="btn-secondary text-base px-6 py-3">
                {RU_UI.hero.newToBeekeeping}
              </Link>
            </div>
          </div>
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 text-8xl opacity-20 select-none" aria-hidden="true">
            🐝🍯
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-page py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl text-smoke-900 mb-2">{RU_UI.featured.title}</h2>
          <p className="text-smoke-500">{RU_UI.featured.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_SLUGS.map((slug) => {
            const calc = getCalculatorBySlug(slug);
            if (!calc) return null;
            return (
              <Link
                key={slug}
                href={`/ru/calculator/${slug}`}
                className="card-interactive group block p-4 sm:p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl" aria-hidden="true">{calc.icon}</span>
                  <h3 className="font-display text-base sm:text-lg text-smoke-800 group-hover:text-honey-700 transition-colors leading-tight">
                    {ruCalcTitle(slug, calc.title)}
                  </h3>
                </div>
                <p className="text-sm text-smoke-500 line-clamp-2">{ruCalcDesc(slug, calc.shortDescription)}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular */}
      <section className="container-page pb-12 sm:pb-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl text-smoke-900 mb-2">{RU_UI.popular.title}</h2>
          <p className="text-smoke-500">{RU_UI.popular.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {POPULAR_SLUGS.map((slug) => {
            const calc = getCalculatorBySlug(slug);
            if (!calc) return null;
            return (
              <Link
                key={slug}
                href={`/ru/calculator/${slug}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white border border-smoke-100 hover:border-honey-200 hover:shadow-card-hover transition-all group"
              >
                <span className="text-xl flex-shrink-0">{calc.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-smoke-800 group-hover:text-honey-700 transition-colors truncate">
                    {ruCalcTitle(slug, calc.title)}
                  </p>
                  <p className="text-xs text-smoke-400">{RU_UI.popular.reasons[slug] ?? ''}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container-page">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl text-smoke-900 mb-2">{RU_UI.categoriesSection.title}</h2>
            <p className="text-smoke-500">{RU_UI.categoriesSection.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((cat) => {
              const count = getCalculatorsByCategory(cat.slug).length;
              const ru = RU_CATEGORIES[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={`/ru/category/${cat.slug}`}
                  className="flex items-start gap-3 p-4 rounded-xl border border-smoke-100 hover:border-honey-200 hover:shadow-warm transition-all group"
                >
                  <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{cat.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-base text-smoke-800 group-hover:text-honey-700 transition-colors">
                      {ru?.title ?? cat.title}
                    </h3>
                    <p className="text-xs text-smoke-500 mt-0.5 line-clamp-2">{ru?.description ?? cat.description}</p>
                    <span className="text-xs text-honey-600 font-medium mt-1 inline-block">
                      {ruPlural(count, 'калькулятор', 'калькулятора', 'калькуляторов')}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="container-page py-4">
        <RuSupportBanner />
      </div>

      {/* Beginner */}
      <section className="bg-gradient-to-br from-honey-50 to-comb-100 py-12 sm:py-16">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h2 className="font-display text-2xl sm:text-3xl text-smoke-900 mb-2">{RU_UI.beginner.title}</h2>
            <p className="text-smoke-600">{RU_UI.beginner.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {RU_UI.beginner.tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/ru/calculator/${tool.slug}`}
                className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-card hover:shadow-warm transition-all group"
              >
                <span className="text-3xl flex-shrink-0">{tool.icon}</span>
                <div>
                  <p className="font-display text-base text-smoke-800 group-hover:text-honey-700 transition-colors">
                    {tool.label}
                  </p>
                  <p className="text-sm text-smoke-500">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/ru/category/education-and-hobbyist" className="btn-secondary">
              {RU_UI.beginner.seeAll}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
