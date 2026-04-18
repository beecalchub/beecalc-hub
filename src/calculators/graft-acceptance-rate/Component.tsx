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
const DEFAULTS: Inputs = {"graftsAttempted":20,"graftsAccepted":14,"larvaeAge":"under-24h","starterStrength":"strong"};
export function GraftAcceptanceRateCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('graft-acceptance-rate', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('graft-acceptance-rate', [{ label: 'Acceptance rate', value: String(result.acceptancePercent) }, { label: 'Grade', value: String(result.grade) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Grafts Attempted" value={inputs.graftsAttempted} onChange={(v) => updateInputs({ graftsAttempted: v })} min={1} step={1} />
          <NumberInput label="Grafts Accepted" value={inputs.graftsAccepted} onChange={(v) => updateInputs({ graftsAccepted: v })} min={0} step={1} />
          <SelectInput label="Larvae Age" value={inputs.larvaeAge} onChange={(v) => updateInputs({ larvaeAge: v as Inputs['larvaeAge'] })} options={[{"value":"under-24h","label":"Under 24h (ideal)"},{"value":"24-36h","label":"24-36h"},{"value":"over-36h","label":"Over 36h"}]} />
          <SelectInput label="Starter Strength" value={inputs.starterStrength} onChange={(v) => updateInputs({ starterStrength: v as Inputs['starterStrength'] })} options={[{"value":"strong","label":"Strong"},{"value":"moderate","label":"Moderate"},{"value":"weak","label":"Weak"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Acceptance rate" value={String(result.acceptancePercent)} unit="%" highlight />
        <ResultRow label="Grade" value={String(result.grade)} highlight />
      </ResultPanel>
      {result.tips.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Improvement Tips</h3>
        <ul className="space-y-2" role="list">{result.tips.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
