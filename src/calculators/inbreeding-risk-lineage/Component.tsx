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
const DEFAULTS: Inputs = {"generationsTracked":3,"breederColoniesUsed":5,"outcrossFrequency":"biennial"};
export function InbreedingRiskLineageCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('inbreeding-risk-lineage', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('inbreeding-risk-lineage', [{ label: 'Inbreeding risk', value: String(result.inbreedingRiskPercent) }, { label: 'Risk level', value: String(result.riskLevel) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Generations Tracked" value={inputs.generationsTracked} onChange={(v) => updateInputs({ generationsTracked: v })} min={1} max={15} step={1} />
          <NumberInput label="Breeder Colonies Used" value={inputs.breederColoniesUsed} onChange={(v) => updateInputs({ breederColoniesUsed: v })} min={1} max={50} step={1} />
          <SelectInput label="Outcross Frequency" value={inputs.outcrossFrequency} onChange={(v) => updateInputs({ outcrossFrequency: v as Inputs['outcrossFrequency'] })} options={[{"value":"annual","label":"Annual"},{"value":"biennial","label":"Every 2 years"},{"value":"rare","label":"Rarely"},{"value":"never","label":"Never"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Inbreeding risk" value={String(result.inbreedingRiskPercent)} unit="%" highlight />
        <ResultRow label="Risk level" value={String(result.riskLevel)} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
