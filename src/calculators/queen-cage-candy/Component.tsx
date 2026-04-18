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
const DEFAULTS: Inputs = {"cageCount":10};
export function QueenCageCandyCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('queen-cage-candy', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('queen-cage-candy', [{ label: 'Powdered sugar needed', value: String(result.powderedSugarOz) }, { label: 'Honey needed', value: String(result.honeyOz) }, { label: 'Total candy weight', value: String(result.total) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Queen Cages" value={inputs.cageCount} onChange={(v) => updateInputs({ cageCount: v })} min={1} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Powdered sugar needed" value={String(result.powderedSugarOz)} unit="oz" highlight />
        <ResultRow label="Honey needed" value={String(result.honeyOz)} unit="oz" />
        <ResultRow label="Total candy weight" value={String(result.total)} unit="oz" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.instructions}</div>
      </ResultPanel>
    </div>
  );
}
