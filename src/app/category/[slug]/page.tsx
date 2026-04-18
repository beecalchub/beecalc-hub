import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getCalculatorsByCategory } from '@/data/registry';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const calculators = getCalculatorsByCategory(slug);
  const available = calculators.filter((c) => c.isMvp);
  const comingSoon = calculators.filter((c) => !c.isMvp);

  return (
    <div className="container-page py-6 sm:py-8">
      <Breadcrumb items={[{ label: 'Calculators', href: '/calculators' }, { label: category.title }]} />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">{category.icon}</span>
          <h1 className="font-display text-3xl sm:text-4xl text-smoke-900">{category.title}</h1>
        </div>
        <p className="text-smoke-600 max-w-2xl">{category.description}</p>
      </div>

      {available.length > 0 && (
        <div className="mb-10">
          <h2 className="font-display text-xl text-smoke-800 mb-4">
            Available Now ({available.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {available.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </div>
      )}

      {comingSoon.length > 0 && (
        <div>
          <h2 className="font-display text-xl text-smoke-800 mb-4">
            Coming Soon ({comingSoon.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingSoon.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
