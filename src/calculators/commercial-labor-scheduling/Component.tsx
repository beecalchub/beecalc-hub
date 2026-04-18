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
const DEFAULTS: Inputs = {"totalHives":200,"workers":3,"tasksPerDay":"moderate"};
export function CommercialLaborSchedulingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('commercial-labor-scheduling', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('commercial-labor-scheduling', [{ label: 'Hives per worker per day', value: String(result.hivesPerWorkerPerDay) }, { label: 'Days to complete', value: String(result.daysToComplete) }, { label: 'Total labor hours', value: String(result.laborHoursTotal) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Total Hives" value={inputs.totalHives} onChange={(v) => updateInputs({ totalHives: v })} min={1} step={10} />
          <NumberInput label="Number of Workers" value={inputs.workers} onChange={(v) => updateInputs({ workers: v })} min={1} max={20} step={1} />
          <SelectInput label="Task Complexity" value={inputs.tasksPerDay} onChange={(v) => updateInputs({ tasksPerDay: v as Inputs['tasksPerDay'] })} options={[{"value":"light","label":"Light (checks)"},{"value":"moderate","label":"Moderate (feeding)"},{"value":"heavy","label":"Heavy (splits/treatment)"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Hives per worker per day" value={String(result.hivesPerWorkerPerDay)} highlight />
        <ResultRow label="Days to complete" value={String(result.daysToComplete)} unit="days" highlight />
        <ResultRow label="Total labor hours" value={String(result.laborHoursTotal)} unit="hrs" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
