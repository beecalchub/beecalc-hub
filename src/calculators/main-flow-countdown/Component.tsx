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
const DEFAULTS: Inputs = {"todayDate":"2026-04-15","flowStartDate":"2026-06-01","flowEndDate":"2026-07-31","superCount":0};
export function MainFlowCountdownCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('main-flow-countdown', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('main-flow-countdown', [{ label: 'Days until flow', value: String(result.daysUntilFlow) }, { label: 'Flow length', value: String(result.daysOfFlow) }, { label: 'Current phase', value: String(result.phase) }, { label: 'Supers needed now', value: String(result.supersNeededNow) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label-field">Today</label><input type="date" value={inputs.todayDate} onChange={(e) => updateInputs({ todayDate: e.target.value })} className="input-field" /></div>
          <div><label className="label-field">Flow Start</label><input type="date" value={inputs.flowStartDate} onChange={(e) => updateInputs({ flowStartDate: e.target.value })} className="input-field" /></div>
          <div><label className="label-field">Flow End</label><input type="date" value={inputs.flowEndDate} onChange={(e) => updateInputs({ flowEndDate: e.target.value })} className="input-field" /></div>
          <NumberInput label="Current Supers On" value={inputs.superCount} onChange={(v) => updateInputs({ superCount: v })} min={0} max={10} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Days until flow" value={String(result.daysUntilFlow)} unit="days" highlight />
        <ResultRow label="Flow length" value={String(result.daysOfFlow)} unit="days" />
        <ResultRow label="Current phase" value={String(result.phase)} highlight />
        <ResultRow label="Supers needed now" value={String(result.supersNeededNow)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
