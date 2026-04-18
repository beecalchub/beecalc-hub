'use client';
import React, { useMemo } from 'react';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"region":"midwest"};
export function LocalBloomCalendarCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('local-bloom-calendar', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('local-bloom-calendar', [{ label: 'Main flow period', value: String(result.mainFlow) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Region" value={inputs.region} onChange={(v) => updateInputs({ region: v as Inputs['region'] })} options={[{"value":"northeast","label":"Northeast"},{"value":"southeast","label":"Southeast"},{"value":"midwest","label":"Midwest"},{"value":"southwest","label":"Southwest"},{"value":"northwest","label":"Pacific Northwest"},{"value":"pacific","label":"California/Pacific"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Main flow period" value={String(result.mainFlow)} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Bloom Calendar</h3>
        <div className="space-y-1 max-h-80 overflow-y-auto">{result.blooms.map((row: Record<string, unknown>, i: number) => (
          <div key={i} className="flex justify-between text-sm py-1.5 border-b border-smoke-100">
            <span className="text-smoke-700 font-medium">{String(row.plant)}</span>
            <span className="text-smoke-500">Starts: {String(row.start)}</span>
            <span className="text-smoke-500">Peak: {String(row.peak)}</span>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
