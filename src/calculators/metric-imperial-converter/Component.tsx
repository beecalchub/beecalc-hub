'use client';

import React, { useMemo, useState } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { convertAll, type ConversionCategory } from './logic';

const CATEGORIES: Array<{ value: ConversionCategory; label: string }> = [
  { value: 'weight', label: 'Weight' },
  { value: 'volume', label: 'Volume' },
  { value: 'length', label: 'Length' },
  { value: 'area', label: 'Area' },
  { value: 'temperature', label: 'Temperature' },
];

export function MetricImperialConverterCalculator() {
  const [category, setCategory] = useState<ConversionCategory>('weight');
  const [value, setValue] = useState(10);
  const [direction, setDirection] = useState<'toMetric' | 'toImperial'>('toMetric');

  const results = useMemo(() => convertAll(category, value, direction), [category, value, direction]);

  const reset = () => { setCategory('weight'); setValue(10); setDirection('toMetric'); };

  const copyText = () => formatResultsForCopy('Unit Conversion', results.map((r) => ({
    label: `${formatNumber(r.fromValue, 4)} ${r.fromUnit}`,
    value: `${formatNumber(r.toValue, 4)} ${r.toUnit}`,
  })));

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SelectInput
            label="Category"
            value={category}
            onChange={(v) => setCategory(v as ConversionCategory)}
            options={CATEGORIES}
          />
          <NumberInput
            label="Value"
            value={value}
            onChange={setValue}
            step={0.1}
          />
          <SelectInput
            label="Direction"
            value={direction}
            onChange={(v) => setDirection(v as 'toMetric' | 'toImperial')}
            options={[
              { value: 'toMetric', label: 'Imperial → Metric' },
              { value: 'toImperial', label: 'Metric → Imperial' },
            ]}
          />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={reset} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel title="Conversions">
        {results.map((r, i) => (
          <ResultRow
            key={i}
            label={`${formatNumber(r.fromValue, 4)} ${r.fromUnit}`}
            value={formatNumber(r.toValue, 4)}
            unit={r.toUnit}
            highlight={i === 0}
          />
        ))}
      </ResultPanel>
    </div>
  );
}
