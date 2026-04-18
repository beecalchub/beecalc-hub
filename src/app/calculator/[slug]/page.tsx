import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCalculatorBySlug, getAllSlugs } from '@/data/registry';
import { getCategoryTitle } from '@/data/categories';
import { SITE_NAME, SITE_URL } from '@/data/constants';
import { CalculatorPageClient } from './client';

interface CalculatorPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return {};
  const categoryTitle = getCategoryTitle(calc.categorySlug);
  const title = `${calc.title} - ${categoryTitle}`;
  const url = `${SITE_URL}/calculator/${calc.slug}`;

  return {
    title,
    description: calc.description,
    openGraph: {
      title: `${calc.title} | ${SITE_NAME}`,
      description: calc.shortDescription,
      url,
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { slug } = await params;
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) notFound();

  return <CalculatorPageClient slug={slug} />;
}
