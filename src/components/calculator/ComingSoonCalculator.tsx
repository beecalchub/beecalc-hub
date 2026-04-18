'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import type { CalculatorMeta } from '@/types/calculator';
import { getRelatedCalculators } from '@/data/registry';

interface ComingSoonCalculatorProps {
  calculator: CalculatorMeta;
}

export function ComingSoonCalculator({ calculator }: ComingSoonCalculatorProps) {
  const related = getRelatedCalculators(calculator.slug).filter((r) => r.isMvp);

  return (
    <Card className="text-center max-w-lg mx-auto" padding="lg">
      <span className="text-5xl mb-4 block">{calculator.icon}</span>
      <h2 className="font-display text-xl text-smoke-800 mb-2">{calculator.title}</h2>
      <p className="text-smoke-500 mb-6">
        This calculator is coming soon. We&apos;re building it with the same care as our existing tools.
      </p>

      {related.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-smoke-600 mb-3">In the meantime, try these:</p>
          <div className="flex flex-col gap-2">
            {related.slice(0, 3).map((r) => (
              <Link
                key={r.slug}
                href={`/calculator/${r.slug}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-honey-50 hover:bg-honey-100 transition-colors text-sm"
              >
                <span>{r.icon}</span>
                <span className="text-honey-800 font-medium">{r.shortTitle || r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <Link href="/calculators" className="btn-secondary text-sm">
        Browse All Calculators
      </Link>
    </Card>
  );
}
