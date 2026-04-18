import React from 'react';
import Link from 'next/link';
import { getRelatedCalculators } from '@/data/registry';

interface RelatedCalculatorsProps {
  slug: string;
}

export function RelatedCalculators({ slug }: RelatedCalculatorsProps) {
  const related = getRelatedCalculators(slug);

  if (related.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="font-display text-lg text-smoke-800 mb-3">Related Calculators</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {related.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculator/${calc.slug}`}
            className="flex items-center gap-3 p-3 rounded-lg border border-smoke-100 hover:border-honey-200 hover:bg-honey-50/50 transition-all"
          >
            <span className="text-lg" aria-hidden="true">{calc.icon}</span>
            <div>
              <p className="text-sm font-medium text-smoke-800">{calc.shortTitle || calc.title}</p>
              <p className="text-xs text-smoke-500">{calc.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
