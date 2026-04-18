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
const DEFAULTS: Inputs = {"cellBarsCount":3,"graftsPerBar":15,"acceptanceRate":70,"harvestCycles":12};
export function RoyalJellyProductionCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('royal-jelly-production', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('royal-jelly-production', [{ label: 'Total grafts', value: String(result.totalGrafts) }, { label: 'Accepted cells', value: String(result.acceptedCells) }, { label: 'Grams per harvest', value: String(result.gramsPerHarvest) }, { label: 'Total season grams', value: String(result.totalGramsSeason) }, { label: 'Estimated value', value: String(result.estimatedValue) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Cell Bars per Harvest" value={inputs.cellBarsCount} onChange={(v) => updateInputs({ cellBarsCount: v })} min={1} step={1} />
          <NumberInput label="Grafts per Bar" value={inputs.graftsPerBar} onChange={(v) => updateInputs({ graftsPerBar: v })} min={5} max={30} step={1} />
          <NumberInput label="Acceptance Rate" value={inputs.acceptanceRate} onChange={(v) => updateInputs({ acceptanceRate: v })} unit="%" min={0} max={100} step={5} />
          <NumberInput label="Harvest Cycles per Season" value={inputs.harvestCycles} onChange={(v) => updateInputs({ harvestCycles: v })} min={1} max={30} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total grafts" value={result.totalGrafts} />
        <ResultRow label="Accepted cells" value={result.acceptedCells} highlight />
        <ResultRow label="Grams per harvest" value={result.gramsPerHarvest} unit="g" />
        <ResultRow label="Total season grams" value={result.totalGramsSeason} unit="g" highlight />
        <ResultRow label="Estimated value" value={`$${result.estimatedValue.toFixed(2)}`} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
