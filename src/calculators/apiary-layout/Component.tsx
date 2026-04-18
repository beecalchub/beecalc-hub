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
const DEFAULTS: Inputs = {"hiveCount":8,"arrangement":"pairs","spaceBetweenFt":6};
export function ApiaryLayoutCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('apiary-layout', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('apiary-layout', [{ label: 'Configuration', value: String(result.configuration) }, { label: 'Total length needed', value: String(result.totalLengthFt) }, { label: 'Total area', value: String(result.totalAreaSqFt) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Arrangement" value={inputs.arrangement} onChange={(v) => updateInputs({ arrangement: v as Inputs['arrangement'] })} options={[{"value":"row","label":"Single row"},{"value":"pairs","label":"Pairs"},{"value":"horseshoe","label":"Horseshoe"},{"value":"cluster","label":"Cluster"}]} />
          <NumberInput label="Space Between Hives" value={inputs.spaceBetweenFt} onChange={(v) => updateInputs({ spaceBetweenFt: v })} unit="ft" min={2} max={20} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Configuration" value={String(result.configuration)} highlight />
        <ResultRow label="Total length needed" value={String(result.totalLengthFt)} unit="ft" />
        <ResultRow label="Total area" value={String(result.totalAreaSqFt)} unit="sq ft" highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
