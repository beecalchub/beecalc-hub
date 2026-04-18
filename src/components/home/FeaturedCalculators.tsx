import React from 'react';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { getMvpCalculators } from '@/data/registry';

const FEATURED_SLUGS = [
  'sugar-syrup',
  'varroa-infestation-rate',
  'honey-bottling',
  'winter-stores',
  'queen-rearing-timeline',
  'apiary-profit',
];

export function FeaturedCalculators() {
  const mvp = getMvpCalculators();
  const featured = FEATURED_SLUGS
    .map((slug) => mvp.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  return (
    <section className="container-page py-12 sm:py-16">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl sm:text-3xl text-smoke-900 mb-2">Featured Calculators</h2>
        <p className="text-smoke-500">The most-used tools for everyday beekeeping</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featured.map((calc) => (
          <CalculatorCard key={calc.slug} calculator={calc} />
        ))}
      </div>
    </section>
  );
}
