'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"hiveCount":5,"currentStoresLbs":40,"targetStoresLbs":80,"daysUntilFirstFrost":45,"miteCheckDone":false};
export function FallPreparationCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('fall-preparation', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('fall-preparation', [{ label: 'Stores deficit', value: String(result.storesDeficitLbs) }, { label: 'Sugar to buy', value: String(result.sugarNeededLbs) }, { label: 'Estimated cost', value: String(result.costEstimate) }, { label: 'Urgency', value: String(result.urgency) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Current Stores per Hive" value={inputs.currentStoresLbs} onChange={(v) => updateInputs({ currentStoresLbs: v })} unit="lbs" min={0} step={5} />
          <NumberInput label="Target Stores per Hive" value={inputs.targetStoresLbs} onChange={(v) => updateInputs({ targetStoresLbs: v })} unit="lbs" min={40} max={120} step={5} />
          <NumberInput label="Days Until First Frost" value={inputs.daysUntilFirstFrost} onChange={(v) => updateInputs({ daysUntilFirstFrost: v })} min={0} max={180} step={7} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Mite check already completed" checked={inputs.miteCheckDone} onChange={(v) => updateInputs({ miteCheckDone: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Stores deficit" value={String(result.storesDeficitLbs)} unit="lbs" highlight />
        <ResultRow label="Sugar to buy" value={String(result.sugarNeededLbs)} unit="lbs" />
        <ResultRow label="Estimated cost" value={`$${result.costEstimate.toFixed(2)}`} highlight />
        <ResultRow label="Urgency" value={String(result.urgency)} highlight />
      </ResultPanel>
      {result.checklist.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Fall Checklist</h3>
        <ul className="space-y-2" role="list">{result.checklist.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
