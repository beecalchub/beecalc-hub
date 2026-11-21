import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCalculatorBySlug, getAllSlugs } from '@/data/registry';
import { RU_CATEGORIES, ruCalcTitle, ruCalcDesc } from '@/i18n/ru';
import { SITE_NAME, SITE_URL } from '@/data/constants';
import { RuCalculatorPageClient } from './client';
import { getRuCalcDict } from '@/i18n/calc/server';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return {};
  const ruTitle = ruCalcTitle(slug, calc.title);
  const ruDesc = ruCalcDesc(slug, calc.description);
  const catTitle = RU_CATEGORIES[calc.categorySlug]?.title ?? calc.categorySlug;
  const url = `${SITE_URL}/ru/calculator/${slug}`;

  return {
    title: `${ruTitle} - ${catTitle}`,
    description: ruDesc,
    openGraph: {
      title: `${ruTitle} | ${SITE_NAME}`,
      description: ruDesc,
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE_URL}/calculator/${slug}`,
        ru: url,
      },
    },
  };
}

export default async function RuCalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) notFound();

  return <RuCalculatorPageClient slug={slug} dict={getRuCalcDict(slug)} />;
}
