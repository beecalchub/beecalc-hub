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
const DEFAULTS: Inputs = {"startDate":"2026-03-01","currentFramesOfBees":4,"targetFramesByFlow":16,"flowStartDate":"2026-05-15"};
export function SpringBuildupCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('spring-buildup', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('spring-buildup', [{ label: 'Weeks until flow', value: String(result.weeksUntilFlow) }, { label: 'Growth needed per week', value: String(result.weeklyGrowthNeeded) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-field">Today</label><input type="date" value={inputs.startDate} onChange={(e) => updateInputs({ startDate: e.target.value })} className="input-field" /></div>
          <NumberInput label="Current Frames of Bees" value={inputs.currentFramesOfBees} onChange={(v) => updateInputs({ currentFramesOfBees: v })} min={1} max={15} step={1} />
          <NumberInput label="Target by Flow" value={inputs.targetFramesByFlow} onChange={(v) => updateInputs({ targetFramesByFlow: v })} min={1} max={25} step={1} />
          <div><label className="label-field">Flow Start Date</label><input type="date" value={inputs.flowStartDate} onChange={(e) => updateInputs({ flowStartDate: e.target.value })} className="input-field" /></div>
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Weeks until flow" value={String(result.weeksUntilFlow)} unit="weeks" highlight />
        <ResultRow label="Growth needed per week" value={String(result.weeklyGrowthNeeded)} unit="frames" highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.feedRecommendation}</div>
      </ResultPanel>
    </div>
  );
}
