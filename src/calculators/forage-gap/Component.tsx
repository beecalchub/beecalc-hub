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
const DEFAULTS: Inputs = {"lastFlowEnd":"2026-07-15","nextFlowStart":"2026-08-20","hiveCount":5,"currentStoresLbs":15};
export function ForageGapCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('forage-gap', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('forage-gap', [{ label: 'Gap duration', value: String(result.gapDays) }, { label: 'Total consumption', value: String(result.consumptionLbs) }, { label: 'Feeding deficit', value: String(result.deficitLbs) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-field">Last Flow Ended</label><input type="date" value={inputs.lastFlowEnd} onChange={(e) => updateInputs({ lastFlowEnd: e.target.value })} className="input-field" /></div>
          <div><label className="label-field">Next Flow Starts</label><input type="date" value={inputs.nextFlowStart} onChange={(e) => updateInputs({ nextFlowStart: e.target.value })} className="input-field" /></div>
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Current Stores per Hive" value={inputs.currentStoresLbs} onChange={(v) => updateInputs({ currentStoresLbs: v })} unit="lbs" min={0} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Gap duration" value={String(result.gapDays)} unit="days" highlight />
        <ResultRow label="Total consumption" value={String(result.consumptionLbs)} unit="lbs" />
        <ResultRow label="Feeding deficit" value={String(result.deficitLbs)} unit="lbs" highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.feedingRecommendation}</div>
      </ResultPanel>
    </div>
  );
}
