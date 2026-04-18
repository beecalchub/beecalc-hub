import React from 'react';
import Link from 'next/link';
import { getCalculatorBySlug } from '@/data/registry';

const POPULAR = [
  { slug: 'sugar-syrup', reason: 'Most used feeding tool' },
  { slug: 'varroa-infestation-rate', reason: 'Essential mite monitoring' },
  { slug: 'honey-moisture-correction', reason: 'Quality assurance' },
  { slug: 'cost-per-hive', reason: 'Know your numbers' },
  { slug: 'split-planning', reason: 'Spring management' },
  { slug: 'oav-dosing', reason: 'Treatment safety' },
  { slug: 'harvest-estimator', reason: 'Production planning' },
  { slug: 'overwintering-readiness', reason: 'Winter prep' },
];

export function PopularTools() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl sm:text-3xl text-smoke-900 mb-2">Popular Tools</h2>
        <p className="text-smoke-500">What beekeepers use most</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {POPULAR.map(({ slug, reason }) => {
          const calc = getCalculatorBySlug(slug);
          if (!calc) return null;
          return (
            <Link
              key={slug}
              href={`/calculator/${slug}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-white border border-smoke-100 hover:border-honey-200 hover:shadow-card-hover transition-all group"
            >
              <span className="text-xl flex-shrink-0">{calc.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-smoke-800 group-hover:text-honey-700 transition-colors truncate">
                  {calc.shortTitle || calc.title}
                </p>
                <p className="text-xs text-smoke-400">{reason}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
