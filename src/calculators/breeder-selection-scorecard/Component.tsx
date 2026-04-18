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
const DEFAULTS: Inputs = {"honeyProduction":4,"temperament":5,"mitetolerance":4,"overwintering":5,"buildup":4};
export function BreederSelectionScorecardCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('breeder-selection-scorecard', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('breeder-selection-scorecard', [{ label: 'Breeder score', value: String(result.score) }, { label: 'Grade', value: String(result.grade) }, { label: 'Breeder-worthy?', value: String(result.breederWorthy) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Honey Production (1-5)" value={inputs.honeyProduction} onChange={(v) => updateInputs({ honeyProduction: v })} min={1} max={5} step={1} />
          <NumberInput label="Temperament (1-5)" value={inputs.temperament} onChange={(v) => updateInputs({ temperament: v })} min={1} max={5} step={1} />
          <NumberInput label="Mite Tolerance (1-5)" value={inputs.mitetolerance} onChange={(v) => updateInputs({ mitetolerance: v })} min={1} max={5} step={1} />
          <NumberInput label="Overwintering (1-5)" value={inputs.overwintering} onChange={(v) => updateInputs({ overwintering: v })} min={1} max={5} step={1} />
          <NumberInput label="Spring Buildup (1-5)" value={inputs.buildup} onChange={(v) => updateInputs({ buildup: v })} min={1} max={5} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Breeder score" value={String(result.score)} highlight />
        <ResultRow label="Grade" value={String(result.grade)} highlight />
        <ResultRow label="Breeder-worthy?" value={result.breederWorthy ? 'Yes' : 'No'} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
