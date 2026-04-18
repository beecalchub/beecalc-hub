'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"hiveCount":5,"trapType":"screen","collectionMonths":4};
export function PropolisYieldValueCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('propolis-yield-value', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('propolis-yield-value', [{ label: 'Grams per hive', value: String(result.gramsPerHive) }, { label: 'Total grams', value: String(result.totalGrams) }, { label: 'Total ounces', value: String(result.totalOz) }, { label: 'Estimated value', value: String(result.estimatedValue) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Collection Method" value={inputs.trapType} onChange={(v) => updateInputs({ trapType: v as Inputs['trapType'] })} options={[{"value":"screen","label":"Propolis screen (best)"},{"value":"gate","label":"Entrance gate"},{"value":"none","label":"Scraping only"}]} />
          <NumberInput label="Collection Months" value={inputs.collectionMonths} onChange={(v) => updateInputs({ collectionMonths: v })} min={1} max={12} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Grams per hive" value={result.gramsPerHive} unit="g" highlight />
        <ResultRow label="Total grams" value={result.totalGrams} unit="g" />
        <ResultRow label="Total ounces" value={result.totalOz} unit="oz" />
        <ResultRow label="Estimated value" value={`$${result.estimatedValue.toFixed(2)}`} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
