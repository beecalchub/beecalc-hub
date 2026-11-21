'use client';

import { useT } from '@/i18n/runtime';
import React from 'react';
import { useIsMetricSafe } from '@/context/UnitSystemContext';
import { metricOf, convertDisplayValue, convertValueWithUnit } from '@/lib/autoUnits';

interface ResultRowProps {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  detail?: string;
}

// Fix #13: detail renders inline, not detached. Whole row is one semantic block.
export function ResultRow({ label, value, unit, highlight = false, detail }: ResultRowProps) {
  const t = useT();
  const isMetric = useIsMetricSafe();
  // Show metric automatically when the calculator itself only works in imperial units
  if (isMetric) {
    const conv = metricOf(unit);
    if (conv) {
      const converted = convertDisplayValue(value, conv);
      if (converted !== null) {
        value = converted;
        unit = conv.unit;
      }
    } else if (!unit && typeof value === 'string') {
      value = convertValueWithUnit(value) ?? value;
    }
  }
  return (
    <div
      className={`py-2.5 ${
        highlight ? 'bg-honey-100/50 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-lg' : ''
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
        <span className="text-sm text-smoke-600">{t(label)}</span>
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-mono font-medium ${
              highlight ? 'text-xl text-honey-800' : 'text-base text-smoke-800'
            }`}
          >
            {t(value)}
          </span>
          {unit && <span className="text-sm text-smoke-500">{t.unit(unit, value)}</span>}
        </div>
      </div>
      {detail && (
        <p className="text-xs text-smoke-400 mt-0.5">{t(detail)}</p>
      )}
    </div>
  );
}
