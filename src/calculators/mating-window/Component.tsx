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
const DEFAULTS: Inputs = {"emergeDate":"2026-06-01","latitudeDegrees":42};
export function MatingWindowCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('mating-window', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('mating-window', [{ label: 'Mating window opens', value: String(result.openingDay) }, { label: 'Optimal mating day', value: String(result.optimalDay) }, { label: 'Window closes', value: String(result.closingDay) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-field">Queen Emerge Date</label><input type="date" value={inputs.emergeDate} onChange={(e) => updateInputs({ emergeDate: e.target.value })} className="input-field" /></div>
          <NumberInput label="Your Latitude" value={inputs.latitudeDegrees} onChange={(v) => updateInputs({ latitudeDegrees: v })} unit="°" min={15} max={60} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Mating window opens" value={String(result.openingDay)} highlight />
        <ResultRow label="Optimal mating day" value={String(result.optimalDay)} highlight />
        <ResultRow label="Window closes" value={String(result.closingDay)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
