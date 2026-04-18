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
const DEFAULTS: Inputs = {"boxCount":10,"boxType":"hive-body","fastenerType":"nails"};
export function NailScrewMaterialCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('nail-screw-material', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('nail-screw-material', [{ label: 'Fasteners needed', value: String(result.fastenersNeeded) }, { label: 'Packages to buy', value: String(result.poundsOrBoxes) }, { label: 'Estimated cost', value: String(result.estimatedCost) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Boxes" value={inputs.boxCount} onChange={(v) => updateInputs({ boxCount: v })} min={1} step={1} />
          <SelectInput label="Assembly Type" value={inputs.boxType} onChange={(v) => updateInputs({ boxType: v as Inputs['boxType'] })} options={[{"value":"hive-body","label":"Hive body"},{"value":"frame","label":"Frame"},{"value":"super","label":"Super"}]} />
          <SelectInput label="Fastener" value={inputs.fastenerType} onChange={(v) => updateInputs({ fastenerType: v as Inputs['fastenerType'] })} options={[{"value":"nails","label":"Nails"},{"value":"screws","label":"Screws"},{"value":"both","label":"Both"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Fasteners needed" value={String(result.fastenersNeeded)} unit="pcs" highlight />
        <ResultRow label="Packages to buy" value={String(result.poundsOrBoxes)} unit="boxes" />
        <ResultRow label="Estimated cost" value={`$${result.estimatedCost.toFixed(2)}`} />
      </ResultPanel>
    </div>
  );
}
