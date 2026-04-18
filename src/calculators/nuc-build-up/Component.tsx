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
const DEFAULTS: Inputs = {"startingFrames":5,"weeksToBuildUp":10,"feedingIntensity":"moderate"};
export function NucBuildUpCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('nuc-build-up', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('nuc-build-up', [{ label: 'Final frames', value: String(result.finalFrames) }, { label: 'Ready for full hive at week', value: String(result.readyAt) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Starting Frames of Bees" value={inputs.startingFrames} onChange={(v) => updateInputs({ startingFrames: v })} min={2} max={8} step={1} />
          <NumberInput label="Weeks to Project" value={inputs.weeksToBuildUp} onChange={(v) => updateInputs({ weeksToBuildUp: v })} min={2} max={20} step={1} />
          <SelectInput label="Feeding Intensity" value={inputs.feedingIntensity} onChange={(v) => updateInputs({ feedingIntensity: v as Inputs['feedingIntensity'] })} options={[{"value":"aggressive","label":"Aggressive (daily syrup)"},{"value":"moderate","label":"Moderate"},{"value":"minimal","label":"Minimal / natural"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Final frames" value={result.finalFrames} unit="frames" highlight />
        <ResultRow label="Ready for full hive at week" value={result.readyAt} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Projection</h3>
        <div className="space-y-1 max-h-64 overflow-y-auto">{result.weekly.map((row: Record<string, number>, i: number) => (
          <div key={i} className="flex justify-between text-sm py-1 border-b border-smoke-50">
            <span className="text-smoke-600">Week: {row.week}</span>
            <span className="text-smoke-600">Frames: {row.frames}</span>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
