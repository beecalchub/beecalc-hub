import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { getCalculatorsByCategory } from '@/data/registry';

export function CategoryOverview() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container-page">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl text-smoke-900 mb-2">Calculator Categories</h2>
          <p className="text-smoke-500">Tools organized by what you need to do</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const count = getCalculatorsByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-start gap-3 p-4 rounded-xl border border-smoke-100 hover:border-honey-200 hover:shadow-warm transition-all group"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{cat.icon}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-base text-smoke-800 group-hover:text-honey-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-smoke-500 mt-0.5 line-clamp-2">{cat.description}</p>
                  <span className="text-xs text-honey-600 font-medium mt-1 inline-block">
                    {count} calculator{count !== 1 ? 's' : ''}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
