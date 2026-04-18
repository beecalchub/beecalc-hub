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
const DEFAULTS: Inputs = {"hives":50,"servicesLevel":"full","distance":100,"durationDays":21};
export function CustomQuoteBuilderCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('custom-quote-builder', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('custom-quote-builder', [{ label: 'Base quote', value: String(result.baseQuote) }, { label: 'Travel fee', value: String(result.travelFee) }, { label: 'Service fee', value: String(result.serviceFee) }, { label: 'Total quote', value: String(result.totalQuote) }, { label: 'Suggested deposit (30%)', value: String(result.depositSuggested) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hives} onChange={(v) => updateInputs({ hives: v })} min={1} step={1} />
          <SelectInput label="Service Level" value={inputs.servicesLevel} onChange={(v) => updateInputs({ servicesLevel: v as Inputs['servicesLevel'] })} options={[{"value":"basic","label":"Basic pollination"},{"value":"full","label":"Full service"},{"value":"premium","label":"Premium (includes extras)"}]} />
          <NumberInput label="Distance One-way" value={inputs.distance} onChange={(v) => updateInputs({ distance: v })} unit="mi" min={0} step={10} />
          <NumberInput label="Duration" value={inputs.durationDays} onChange={(v) => updateInputs({ durationDays: v })} unit="days" min={1} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Base quote" value={`$${result.baseQuote.toFixed(2)}`} highlight />
        <ResultRow label="Travel fee" value={`$${result.travelFee.toFixed(2)}`} />
        <ResultRow label="Service fee" value={`$${result.serviceFee.toFixed(2)}`} />
        <ResultRow label="Total quote" value={`$${result.totalQuote.toFixed(2)}`} highlight />
        <ResultRow label="Suggested deposit (30%)" value={`$${result.depositSuggested.toFixed(2)}`} />
      </ResultPanel>
    </div>
  );
}
