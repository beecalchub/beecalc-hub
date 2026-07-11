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
import { formatNumber, formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"hiveCount":5,"boxCountPerHive":4,"coatsPerSurface":2,"surfaceType":"paint"};
export function PaintStainQuantityCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('paint-stain-quantity', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const fmt = (v: unknown): string => (typeof v === 'number' ? formatNumber(v) : String(v));
  const copyText = () => formatResultsForCopy('Paint / Stain Quantity Calculator', [{ label: 'Gallons needed', value: String(result.gallonsNeeded) }, { label: 'Estimated cost', value: String(result.costEstimate) }, { label: 'Total coverage', value: String(result.coverageSqFt) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Boxes per Hive" value={inputs.boxCountPerHive} onChange={(v) => updateInputs({ boxCountPerHive: v })} min={1} max={6} step={1} />
          <NumberInput label="Coats per Surface" value={inputs.coatsPerSurface} onChange={(v) => updateInputs({ coatsPerSurface: v })} min={1} max={3} step={1} />
          <SelectInput label="Finish Type" value={inputs.surfaceType} onChange={(v) => updateInputs({ surfaceType: v as Inputs['surfaceType'] })} options={[{"value":"paint","label":"Paint"},{"value":"stain","label":"Stain"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Gallons needed" value={fmt(result.gallonsNeeded)} unit="gal" highlight />
        <ResultRow label="Estimated cost" value={formatCurrency(result.costEstimate)} highlight />
        <ResultRow label="Total coverage" value={fmt(result.coverageSqFt)} unit="sq ft" />
      </ResultPanel>
    </div>
  );
}
