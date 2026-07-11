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
const DEFAULTS: Inputs = {"totalJars":240,"jarsPerCase":12,"caseType":"cardboard"};
export function HoneyJarCasePackCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('honey-jar-case-pack', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const fmt = (v: unknown): string => (typeof v === 'number' ? formatNumber(v) : String(v));
  const copyText = () => formatResultsForCopy('Honey Jar Case Pack Calculator', [{ label: 'Cases needed', value: String(result.casesNeeded) }, { label: 'Partial case has', value: String(result.partialCaseJars) }, { label: 'Packaging cost', value: String(result.materialCost) }, { label: 'Stackable height', value: String(result.stackableHeight) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Total Jars" value={inputs.totalJars} onChange={(v) => updateInputs({ totalJars: v })} min={1} step={1} />
          <NumberInput label="Jars per Case" value={inputs.jarsPerCase} onChange={(v) => updateInputs({ jarsPerCase: v })} min={1} step={1} />
          <SelectInput label="Case Type" value={inputs.caseType} onChange={(v) => updateInputs({ caseType: v as Inputs['caseType'] })} options={[{"value":"cardboard","label":"Cardboard box"},{"value":"plastic","label":"Plastic tray"},{"value":"shrink-wrap","label":"Shrink wrap"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Cases needed" value={fmt(result.casesNeeded)} unit="cases" highlight />
        <ResultRow label="Partial case has" value={fmt(result.partialCaseJars)} unit="jars" />
        <ResultRow label="Packaging cost" value={formatCurrency(result.materialCost)} highlight />
        <ResultRow label="Stackable height" value={fmt(result.stackableHeight)} unit="cases" />
      </ResultPanel>
    </div>
  );
}
