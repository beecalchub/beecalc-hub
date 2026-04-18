'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"apiary1Hives":10,"apiary1Yield":600,"apiary1Losses":1,"apiary2Hives":10,"apiary2Yield":450,"apiary2Losses":3};
export function ApiaryComparisonCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('apiary-comparison', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('apiary-comparison', [{ label: 'Apiary 1 per hive', value: String(result.apiary1PerHive) }, { label: 'Apiary 2 per hive', value: String(result.apiary2PerHive) }, { label: 'Better apiary', value: String(result.betterApiary) }, { label: 'Yield difference', value: String(result.yieldDifference) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Apiary 1 Hives" value={inputs.apiary1Hives} onChange={(v) => updateInputs({ apiary1Hives: v })} min={1} step={1} />
          <NumberInput label="Apiary 1 Yield" value={inputs.apiary1Yield} onChange={(v) => updateInputs({ apiary1Yield: v })} unit="lbs" min={0} step={10} />
          <NumberInput label="Apiary 1 Losses" value={inputs.apiary1Losses} onChange={(v) => updateInputs({ apiary1Losses: v })} min={0} step={1} />
          <NumberInput label="Apiary 2 Hives" value={inputs.apiary2Hives} onChange={(v) => updateInputs({ apiary2Hives: v })} min={1} step={1} />
          <NumberInput label="Apiary 2 Yield" value={inputs.apiary2Yield} onChange={(v) => updateInputs({ apiary2Yield: v })} unit="lbs" min={0} step={10} />
          <NumberInput label="Apiary 2 Losses" value={inputs.apiary2Losses} onChange={(v) => updateInputs({ apiary2Losses: v })} min={0} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Apiary 1 per hive" value={String(result.apiary1PerHive)} unit="lbs" highlight />
        <ResultRow label="Apiary 2 per hive" value={String(result.apiary2PerHive)} unit="lbs" highlight />
        <ResultRow label="Better apiary" value={String(result.betterApiary)} highlight />
        <ResultRow label="Yield difference" value={String(result.yieldDifference)} unit="lbs" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
