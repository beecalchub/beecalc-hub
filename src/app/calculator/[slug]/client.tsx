'use client';

import React from 'react';
import { getCalculatorBySlug } from '@/data/registry';
import { calculatorComponents } from '@/calculators';
import { CalculatorShell } from '@/components/calculator/CalculatorShell';
import { ComingSoonCalculator } from '@/components/calculator/ComingSoonCalculator';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getCategoryTitle } from '@/data/categories';

interface CalculatorPageClientProps {
  slug: string;
}

export function CalculatorPageClient({ slug }: CalculatorPageClientProps) {
  const calculator = getCalculatorBySlug(slug);
  if (!calculator) return null;

  const Component = calculatorComponents[slug];

  if (!Component) {
    return (
      <div className="container-page py-6 sm:py-8">
        <Breadcrumb
          items={[
            { label: 'Calculators', href: '/calculators' },
            { label: getCategoryTitle(calculator.categorySlug), href: `/category/${calculator.categorySlug}` },
            { label: calculator.shortTitle || calculator.title },
          ]}
        />
        <div className="mt-8">
          <ComingSoonCalculator calculator={calculator} />
        </div>
      </div>
    );
  }

  return (
    <CalculatorShell calculator={calculator}>
      <Component />
    </CalculatorShell>
  );
}
