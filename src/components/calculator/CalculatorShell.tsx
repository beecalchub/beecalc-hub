'use client';

import React, { useEffect } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { CalculatorTypeBadge } from '@/components/ui/Badge';
import { FavoriteButton } from '@/components/calculator/FavoriteButton';
import { UnitToggle } from '@/components/calculator/UnitToggle';
import { DisclaimerBar } from '@/components/calculator/DisclaimerBar';
import { RelatedCalculators } from '@/components/calculator/RelatedCalculators';
import { SupportBanner } from '@/components/calculator/SupportBanner';
import { useRecentlyUsed } from '@/hooks/useRecentlyUsed';
import { getCategoryTitle } from '@/data/categories';
import type { CalculatorMeta } from '@/types/calculator';

interface CalculatorShellProps {
  calculator: CalculatorMeta;
  children: React.ReactNode;
}

export function CalculatorShell({ calculator, children }: CalculatorShellProps) {
  const { addRecentlyUsed } = useRecentlyUsed();
  const categoryTitle = getCategoryTitle(calculator.categorySlug);

  useEffect(() => {
    addRecentlyUsed(calculator.slug);
  }, [calculator.slug, addRecentlyUsed]);

  return (
    <div className="container-page py-6 sm:py-8">
      <Breadcrumb
        items={[
          { label: 'Calculators', href: '/calculators' },
          { label: categoryTitle, href: `/category/${calculator.categorySlug}` },
          { label: calculator.shortTitle || calculator.title },
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" aria-hidden="true">{calculator.icon}</span>
            <h1 className="font-display text-2xl sm:text-3xl text-smoke-900">
              {calculator.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <CalculatorTypeBadge type={calculator.type} />
            <FavoriteButton slug={calculator.slug} />
          </div>
          <p className="text-smoke-600 text-sm sm:text-base max-w-2xl">
            {calculator.description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <UnitToggle />
        </div>
      </div>

      {/* Calculator content */}
      <div className="mb-8">
        {children}
      </div>

      {/* Support the project - shows once per session, dismissible */}
      <SupportBanner
        bmcUsername="beecalchub"
        donationUrl="https://donate.stripe.com/8x200k3mE1qH7z46T6eEo00"
        compact
        className="mb-8"
      />

      {/* Related calculators */}
      <RelatedCalculators slug={calculator.slug} />

      {/* Disclaimer */}
      <DisclaimerBar />
    </div>
  );
}
