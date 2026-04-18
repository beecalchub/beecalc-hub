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
const DEFAULTS: Inputs = {"frameCount":8,"queenCagesPerFrame":20,"attendantBees":"moderate"};
export function QueenBankCapacityCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('queen-bank-capacity', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('queen-bank-capacity', [{ label: 'Maximum queens', value: String(result.maxQueens) }, { label: 'Recommended load', value: String(result.recommendedLoad) }, { label: 'Nurse bees needed', value: String(result.nurseBeesNeeded) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frames in Bank" value={inputs.frameCount} onChange={(v) => updateInputs({ frameCount: v })} min={2} max={20} step={1} />
          <NumberInput label="Cages per Frame" value={inputs.queenCagesPerFrame} onChange={(v) => updateInputs({ queenCagesPerFrame: v })} min={5} max={30} step={1} />
          <SelectInput label="Attendant Density" value={inputs.attendantBees} onChange={(v) => updateInputs({ attendantBees: v as Inputs['attendantBees'] })} options={[{"value":"heavy","label":"Heavy (best care)"},{"value":"moderate","label":"Moderate"},{"value":"light","label":"Light"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Maximum queens" value={String(result.maxQueens)} highlight />
        <ResultRow label="Recommended load" value={String(result.recommendedLoad)} highlight />
        <ResultRow label="Nurse bees needed" value={String(result.nurseBeesNeeded)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
