'use client';
import React, { useMemo } from 'react';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"season":"spring","experienceLevel":"intermediate","colonyIssues":false};
export function InspectionIntervalCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('inspection-interval', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('inspection-interval', [{ label: 'Inspection interval', value: String(result.intervalDays) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Season" value={inputs.season} onChange={(v) => updateInputs({ season: v as Inputs['season'] })} options={[{"value":"spring","label":"Spring"},{"value":"summer","label":"Summer"},{"value":"fall","label":"Fall"},{"value":"winter","label":"Winter"}]} />
          <SelectInput label="Experience Level" value={inputs.experienceLevel} onChange={(v) => updateInputs({ experienceLevel: v as Inputs['experienceLevel'] })} options={[{"value":"beginner","label":"Beginner"},{"value":"intermediate","label":"Intermediate"},{"value":"expert","label":"Expert"}]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Colony currently has issues" checked={inputs.colonyIssues} onChange={(v) => updateInputs({ colonyIssues: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Inspection interval" value={result.intervalDays} unit="days" highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
      {result.checklist.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">What to Check</h3>
        <ul className="space-y-2" role="list">{result.checklist.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
