'use client';

import React from 'react';
import Link from 'next/link';
import { CalculatorTypeBadge } from '@/components/ui/Badge';
import { FavoriteButton } from '@/components/calculator/FavoriteButton';
import type { CalculatorMeta } from '@/types/calculator';

interface CalculatorCardProps {
  calculator: CalculatorMeta;
  showCategory?: boolean;
}

export function CalculatorCard({ calculator, showCategory = false }: CalculatorCardProps) {
  return (
    <Link
      href={`/calculator/${calculator.slug}`}
      className="card-interactive group block relative"
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">{calculator.icon}</span>
            <h3 className="font-display text-base sm:text-lg text-smoke-800 group-hover:text-honey-700 transition-colors leading-tight">
              {calculator.shortTitle || calculator.title}
            </h3>
          </div>
          <div onClick={(e) => e.preventDefault()}>
            <FavoriteButton slug={calculator.slug} size="sm" />
          </div>
        </div>

        <p className="text-sm text-smoke-500 mb-3 line-clamp-2">
          {calculator.shortDescription}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <CalculatorTypeBadge type={calculator.type} />
          {!calculator.isMvp && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-smoke-100 text-smoke-500 font-medium">
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
