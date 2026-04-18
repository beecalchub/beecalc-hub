'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatInteger, formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateCombHoney, type CombHoneyInputs } from './logic';
const DEFAULTS: CombHoneyInputs = { sectionCount: 24, sectionType: 'ross-round', avgCompletionPercent: 75 };
export function CombHoneyYieldCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('comb-honey', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateCombHoney(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Comb Honey Yield', [{ label: 'Completed sections', value: result.completedSections }, { label: 'Total weight', value: isMetric ? `${result.totalWeightKg} kg` : `${result.totalWeightLbs} lbs` }, { label: 'Value', value: formatCurrency(result.estimatedValue) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="Total Sections" value={inputs.sectionCount} onChange={(v) => updateInputs({ sectionCount: v })} min={1} max={200} step={1} />
          <SelectInput label="Section Type" value={inputs.sectionType} onChange={(v) => updateInputs({ sectionType: v as CombHoneyInputs['sectionType'] })} options={[{ value: 'ross-round', label: 'Ross Rounds (~8 oz)' }, { value: 'cut-comb', label: 'Cut Comb (~12 oz)' }, { value: 'cassette', label: 'Cassette (~10 oz)' }]} />
          <NumberInput label="Avg Completion" value={inputs.avgCompletionPercent} onChange={(v) => updateInputs({ avgCompletionPercent: v })} unit="%" min={10} max={100} step={5} helpText="% of sections fully capped" />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Completed sections" value={formatInteger(result.completedSections)} highlight />
        <ResultRow label="Total weight" value={isMetric ? formatNumber(result.totalWeightKg) : formatNumber(result.totalWeightLbs)} unit={isMetric ? 'kg' : 'lbs'} />
        <ResultRow label="Estimated value" value={formatCurrency(result.estimatedValue)} highlight />
      </ResultPanel>
      <AssumptionsPanel assumptions={[{ label: 'Ross Round', value: '~8 oz per section' }, { label: 'Cut comb', value: '~12 oz per section' }, { label: 'Comb honey price', value: '~$1.50/oz (premium product)' }]} />
    </div>
  );
}
