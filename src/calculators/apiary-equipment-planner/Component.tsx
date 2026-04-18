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
const DEFAULTS: Inputs = {"hiveCount":5,"setupLevel":"standard"};
export function ApiaryEquipmentPlannerCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('apiary-equipment-planner', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('apiary-equipment-planner', [{ label: 'Total cost', value: String(result.totalCost) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Setup Level" value={inputs.setupLevel} onChange={(v) => updateInputs({ setupLevel: v as Inputs['setupLevel'] })} options={[{"value":"basic","label":"Basic (hobbyist)"},{"value":"standard","label":"Standard"},{"value":"commercial","label":"Commercial"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total cost" value={`$${result.totalCost.toFixed(2)}`} highlight />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Equipment List</h3>
        <div className="space-y-1 max-h-80 overflow-y-auto">{result.items.map((row: Record<string, unknown>, i: number) => (
          <div key={i} className="flex justify-between text-sm py-1.5 border-b border-smoke-100">
            <span className="text-smoke-700 font-medium">{String(row.name)}</span>
            <span className="text-smoke-500">Qty: {String(row.qty)}</span>
            <span className="text-smoke-500">${String(row.cost)}</span>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
