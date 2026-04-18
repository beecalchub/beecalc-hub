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
const DEFAULTS: Inputs = {"currentSuperFillPercent":60,"daysIntoFlow":10,"flowPeakIn":15,"weatherForecast":"ideal"};
export function SuperAdditionTimingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('super-addition-timing', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('super-addition-timing', [{ label: 'Add super now?', value: String(result.addSuperNow) }, { label: 'Days until full', value: String(result.daysToFull) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Current Super Fill" value={inputs.currentSuperFillPercent} onChange={(v) => updateInputs({ currentSuperFillPercent: v })} unit="%" min={0} max={100} step={5} />
          <NumberInput label="Days Into Flow" value={inputs.daysIntoFlow} onChange={(v) => updateInputs({ daysIntoFlow: v })} min={0} step={1} />
          <NumberInput label="Days to Flow Peak" value={inputs.flowPeakIn} onChange={(v) => updateInputs({ flowPeakIn: v })} min={0} max={60} step={1} />
          <SelectInput label="Weather Forecast" value={inputs.weatherForecast} onChange={(v) => updateInputs({ weatherForecast: v as Inputs['weatherForecast'] })} options={[{"value":"ideal","label":"Ideal"},{"value":"mixed","label":"Mixed"},{"value":"poor","label":"Poor"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Add super now?" value={result.addSuperNow ? 'Yes' : 'No'} highlight />
        <ResultRow label="Days until full" value={String(result.daysToFull)} unit="days" highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
