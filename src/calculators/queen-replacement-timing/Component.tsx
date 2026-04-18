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
const DEFAULTS: Inputs = {"queenAgeYears":1.5,"broodPatternQuality":"fair","temperament":"calm","honeyProduction":"average"};
export function QueenReplacementTimingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('queen-replacement-timing', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('queen-replacement-timing', [{ label: 'Replace queen?', value: String(result.shouldReplace) }, { label: 'Urgency', value: String(result.urgency) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Queen Age" value={inputs.queenAgeYears} onChange={(v) => updateInputs({ queenAgeYears: v })} unit="years" min={0} max={5} step={0.5} />
          <SelectInput label="Brood Pattern" value={inputs.broodPatternQuality} onChange={(v) => updateInputs({ broodPatternQuality: v as Inputs['broodPatternQuality'] })} options={[{"value":"excellent","label":"Excellent (solid)"},{"value":"fair","label":"Fair"},{"value":"spotty","label":"Spotty"}]} />
          <SelectInput label="Temperament" value={inputs.temperament} onChange={(v) => updateInputs({ temperament: v as Inputs['temperament'] })} options={[{"value":"calm","label":"Calm"},{"value":"moderate","label":"Moderate"},{"value":"defensive","label":"Defensive"}]} />
          <SelectInput label="Honey Production" value={inputs.honeyProduction} onChange={(v) => updateInputs({ honeyProduction: v as Inputs['honeyProduction'] })} options={[{"value":"high","label":"High"},{"value":"average","label":"Average"},{"value":"low","label":"Low"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Replace queen?" value={result.shouldReplace ? 'Yes' : 'No'} highlight />
        <ResultRow label="Urgency" value={result.urgency} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.timing}</div>
      </ResultPanel>
      {result.reasons.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Reasons</h3>
        <ul className="space-y-2" role="list">{result.reasons.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
