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
const DEFAULTS: Inputs = {"lastInspectionDays":10,"weatherFavorable":true,"colonyHealthy":true,"swarmSeason":true};
export function InspectionRecommendationEngineCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('inspection-recommendation-engine', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('inspection-recommendation-engine', [{ label: 'Inspect now?', value: String(result.shouldInspect) }, { label: 'Priority', value: String(result.priority) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Days Since Last Inspection" value={inputs.lastInspectionDays} onChange={(v) => updateInputs({ lastInspectionDays: v })} min={0} step={1} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Weather is favorable" checked={inputs.weatherFavorable} onChange={(v) => updateInputs({ weatherFavorable: v })} />
          <Checkbox label="Colony was healthy last check" checked={inputs.colonyHealthy} onChange={(v) => updateInputs({ colonyHealthy: v })} />
          <Checkbox label="Swarm season active" checked={inputs.swarmSeason} onChange={(v) => updateInputs({ swarmSeason: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Inspect now?" value={result.shouldInspect ? 'Yes' : 'No'} highlight />
        <ResultRow label="Priority" value={String(result.priority)} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
      {result.checklist.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Focus on</h3>
        <ul className="space-y-2" role="list">{result.checklist.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
