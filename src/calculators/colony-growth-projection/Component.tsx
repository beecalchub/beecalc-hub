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
const DEFAULTS: Inputs = {"startBees":10000,"startBrood":3000,"weeksToProject":12,"monthlyGrowthRate":30};
export function ColonyGrowthProjectionCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('colony-growth-projection', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('colony-growth-projection', [{ label: 'Final population', value: String(result.finalBees) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Starting Bee Population" value={inputs.startBees} onChange={(v) => updateInputs({ startBees: v })} min={1000} step={1000} />
          <NumberInput label="Starting Brood Cells" value={inputs.startBrood} onChange={(v) => updateInputs({ startBrood: v })} min={0} step={500} />
          <NumberInput label="Weeks to Project" value={inputs.weeksToProject} onChange={(v) => updateInputs({ weeksToProject: v })} min={1} max={26} step={1} />
          <NumberInput label="Monthly Growth Rate" value={inputs.monthlyGrowthRate} onChange={(v) => updateInputs({ monthlyGrowthRate: v })} unit="%" min={0} max={100} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Final population" value={result.finalBees} unit="bees" highlight />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Projection</h3>
        <div className="space-y-1 max-h-64 overflow-y-auto">{result.weeks.map((row: Record<string, number>, i: number) => (
          <div key={i} className="flex justify-between text-sm py-1 border-b border-smoke-50">
            <span className="text-smoke-600">Week: {row.week}</span>
            <span className="text-smoke-600">Bees: {row.bees}</span>
            <span className="text-smoke-600">Brood: {row.brood}</span>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
