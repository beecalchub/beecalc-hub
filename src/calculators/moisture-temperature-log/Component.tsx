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
const DEFAULTS: Inputs = {"moisturePercent":17.8,"temperatureF":90};
export function MoistureTemperatureLogCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('moisture-temperature-log', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('moisture-temperature-log', [{ label: 'Honey stable?', value: String(result.honeyStable) }, { label: 'Bottling ready?', value: String(result.bottlingReady) }, { label: 'Status', value: String(result.status) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Moisture Content" value={inputs.moisturePercent} onChange={(v) => updateInputs({ moisturePercent: v })} unit="%" min={10} max={25} step={0.1} />
          <NumberInput label="Honey Temperature" value={inputs.temperatureF} onChange={(v) => updateInputs({ temperatureF: v })} unit="°F" min={40} max={130} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Honey stable?" value={result.honeyStable ? 'Yes' : 'No'} highlight />
        <ResultRow label="Bottling ready?" value={result.bottlingReady ? 'Yes' : 'No'} highlight />
        <ResultRow label="Status" value={String(result.status)} highlight />
      </ResultPanel>
      {result.concerns.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Concerns</h3>
        <ul className="space-y-2" role="list">{result.concerns.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
