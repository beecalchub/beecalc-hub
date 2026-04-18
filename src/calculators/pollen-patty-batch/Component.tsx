'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatCurrency, formatPercent } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculatePollenPatty, type PollenPattyInputs } from './logic';

const DEFAULTS: PollenPattyInputs = { pattyCount: 10, pattyWeightOz: 8, proteinPercent: 15, recipe: 'standard' };

export function PollenPattyBatchCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('pollen-patty', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculatePollenPatty(inputs), [inputs]);

  const copyText = () =>
    formatResultsForCopy('Pollen Patty Batch', [
      { label: 'Patties', value: inputs.pattyCount },
      { label: 'Pollen sub', value: isMetric ? `${result.pollenSubKg} kg` : `${result.pollenSubLbs} lbs` },
      { label: 'Sugar', value: isMetric ? `${result.sugarKg} kg` : `${result.sugarLbs} lbs` },
      { label: 'Cost', value: formatCurrency(result.costEstimate) },
    ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Patties" value={inputs.pattyCount} onChange={(v) => updateInputs({ pattyCount: v })} min={1} max={200} step={1} />
          <NumberInput label="Patty Weight" value={inputs.pattyWeightOz} onChange={(v) => updateInputs({ pattyWeightOz: v })} unit="oz each" min={4} max={32} step={2} helpText="8 oz is standard" />
          <SelectInput
            label="Recipe"
            value={inputs.recipe}
            onChange={(v) => updateInputs({ recipe: v as PollenPattyInputs['recipe'] })}
            options={[
              { value: 'standard', label: 'Standard (~15% protein)' },
              { value: 'high-protein', label: 'High Protein (~22% protein)' },
              { value: 'budget', label: 'Budget (~10% protein)' },
            ]}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel>
        <ResultRow label="Pollen substitute" value={isMetric ? formatNumber(result.pollenSubKg) : formatNumber(result.pollenSubLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <ResultRow label="Sugar" value={isMetric ? formatNumber(result.sugarKg) : formatNumber(result.sugarLbs)} unit={isMetric ? 'kg' : 'lbs'} />
        <ResultRow label="Water" value={isMetric ? formatNumber(result.waterMl) : formatNumber(result.waterCups)} unit={isMetric ? 'ml' : 'cups'} />
        <ResultRow label="Honey or syrup" value={isMetric ? formatNumber(result.honeyOrSyrupMl) : formatNumber(result.honeyOrSyrupCups)} unit={isMetric ? 'ml' : 'cups'} />
        <ResultRow label="Total batch weight" value={isMetric ? formatNumber(result.totalWeightKg) : formatNumber(result.totalWeightLbs)} unit={isMetric ? 'kg' : 'lbs'} />
        <ResultRow label="Protein content" value={formatPercent(result.proteinContentPercent, 0)} />
        <ResultRow label="Estimated cost" value={formatCurrency(result.costEstimate)} />
      </ResultPanel>

      <AssumptionsPanel assumptions={[
        { label: 'Standard patty', value: '8 oz (½ lb)' },
        { label: 'Standard protein', value: '~15% from pollen substitute' },
        { label: 'High protein', value: '~22% for spring buildup' },
        { label: 'Placement', value: 'Directly on top bars over the cluster' },
      ]} />

      <div className="text-sm text-smoke-500 bg-smoke-50 rounded-lg p-4">
        <p className="font-medium text-smoke-700 mb-1">Example usage:</p>
        <p>Making 10 standard patties at 8 oz each? You&apos;ll need about 1.75 lbs of pollen substitute, 2.25 lbs of sugar, and small amounts of water and honey as binders. Mix to a Play-Doh consistency and flatten between wax paper.</p>
      </div>
    </div>
  );
}
