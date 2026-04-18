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
const DEFAULTS: Inputs = {"eggsFound":true,"youngLarvae":true,"queenSeen":false,"workerLayers":false,"daysSinceLastCheck":7};
export function QueenrightnessCheckerCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('queenrightness-checker', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('queenrightness-checker', [{ label: 'Queenright?', value: String(result.queenright) }, { label: 'Confidence', value: String(result.confidence) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Days Since Last Inspection" value={inputs.daysSinceLastCheck} onChange={(v) => updateInputs({ daysSinceLastCheck: v })} min={0} step={1} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Eggs found" checked={inputs.eggsFound} onChange={(v) => updateInputs({ eggsFound: v })} />
          <Checkbox label="Young larvae (under 3 days)" checked={inputs.youngLarvae} onChange={(v) => updateInputs({ youngLarvae: v })} />
          <Checkbox label="Queen spotted" checked={inputs.queenSeen} onChange={(v) => updateInputs({ queenSeen: v })} />
          <Checkbox label="Multiple eggs per cell (laying workers)" checked={inputs.workerLayers} onChange={(v) => updateInputs({ workerLayers: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Queenright?" value={result.queenright ? 'Yes' : 'No'} highlight />
        <ResultRow label="Confidence" value={result.confidence} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.diagnosis}</div>
      </ResultPanel>
      {result.nextSteps.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Next Steps</h3>
        <ul className="space-y-2" role="list">{result.nextSteps.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
