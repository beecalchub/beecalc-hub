import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getCalculatorsByCategory } from '@/data/registry';
import { RU_UI, RU_CATEGORIES, ruCalcTitle, ruCalcDesc } from '@/i18n/ru';
import { SITE_URL } from '@/data/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  const ru = RU_CATEGORIES[slug];
  return {
    title: ru?.title ?? cat.title,
    description: ru?.description ?? cat.description,
    alternates: {
      canonical: `${SITE_URL}/ru/category/${slug}`,
      languages: { en: `${SITE_URL}/category/${slug}`, ru: `${SITE_URL}/ru/category/${slug}` },
    },
  };
}

export default async function RuCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const ru = RU_CATEGORIES[slug];
  const calculators = getCalculatorsByCategory(slug);

  return (
    <div className="container-page py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-smoke-400 mb-6" aria-label="Хлебные крошки">
        <Link href="/ru/calculators" className="hover:text-honey-700 transition-colors">
          {RU_UI.calculator.breadcrumbRoot}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-smoke-600">{ru?.title ?? category.title}</span>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl" aria-hidden="true">{category.icon}</span>
          <h1 className="font-display text-3xl sm:text-4xl text-smoke-900">{ru?.title ?? category.title}</h1>
        </div>
        <p className="text-smoke-600 max-w-2xl">{ru?.description ?? category.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/ru/calculator/${calc.slug}`}
            className="card-interactive group block p-4 sm:p-5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl" aria-hidden="true">{calc.icon}</span>
              <h3 className="font-display text-base sm:text-lg text-smoke-800 group-hover:text-honey-700 transition-colors leading-tight">
                {ruCalcTitle(calc.slug, calc.title)}
              </h3>
            </div>
            <p className="text-sm text-smoke-500 line-clamp-2">
              {ruCalcDesc(calc.slug, calc.shortDescription)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
