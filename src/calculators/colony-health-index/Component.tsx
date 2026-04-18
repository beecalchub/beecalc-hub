'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
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
const DEFAULTS: Inputs = {"population":8,"broodQuality":"good","stores":3,"mitesPerHundred":1.5,"diseaseSigns":false};
export function ColonyHealthIndexCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('colony-health-index', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('colony-health-index', [{ label: 'Health Index', value: String(result.index) }, { label: 'Grade', value: String(result.grade) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frames of Bees" value={inputs.population} onChange={(v) => updateInputs({ population: v })} min={1} max={20} step={1} />
          <SelectInput label="Brood Quality" value={inputs.broodQuality} onChange={(v) => updateInputs({ broodQuality: v as Inputs['broodQuality'] })} options={[{"value":"excellent","label":"Excellent"},{"value":"good","label":"Good"},{"value":"fair","label":"Fair"},{"value":"poor","label":"Poor"}]} />
          <NumberInput label="Frames of Stores" value={inputs.stores} onChange={(v) => updateInputs({ stores: v })} min={0} max={15} step={1} />
          <NumberInput label="Mites per 100 Bees" value={inputs.mitesPerHundred} onChange={(v) => updateInputs({ mitesPerHundred: v })} min={0} max={20} step={0.5} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Disease signs present" checked={inputs.diseaseSigns} onChange={(v) => updateInputs({ diseaseSigns: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Health Index" value={result.index} highlight />
        <ResultRow label="Grade" value={result.grade} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.verdict}</div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Score Breakdown</h3>
        <div className="space-y-1 max-h-80 overflow-y-auto">{result.breakdown.map((row: Record<string, unknown>, i: number) => (
          <div key={i} className="flex justify-between text-sm py-1.5 border-b border-smoke-100">
            <span className="text-smoke-700 font-medium">{String(row.factor)}</span>
            <span className="text-smoke-500">{String(row.score)}/</span>
            <span className="text-smoke-500">{String(row.max)}</span>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
