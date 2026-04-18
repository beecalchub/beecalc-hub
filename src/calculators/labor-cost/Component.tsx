'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateLaborCost } from './logic';
const DEFAULTS = { hiveCount: 10, hourlyRate: 20, inspectionHoursPerHive: 0.25, inspectionsPerYear: 12, feedingHoursPerRound: 0.15, feedingRounds: 4, treatmentHoursPerRound: 0.1, treatmentRounds: 3, extractionHoursTotal: 16, miscHoursPerYear: 20 };
export function LaborCostCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('labor-cost', DEFAULTS);
  const result = useMemo(() => calculateLaborCost(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Labor Cost', [{ label: 'Total hours', value: `${result.totalHours} hrs` }, { label: 'Total cost', value: formatCurrency(result.totalCost) }, { label: 'Per hive', value: formatCurrency(result.costPerHive) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Hourly Rate" value={inputs.hourlyRate} onChange={(v) => updateInputs({ hourlyRate: v })} unit="$/hr" min={0} step={5} helpText="Value of your time" />
          <NumberInput label="Hours per Hive per Inspection" value={inputs.inspectionHoursPerHive} onChange={(v) => updateInputs({ inspectionHoursPerHive: v })} unit="hrs" min={0.1} max={2} step={0.05} />
          <NumberInput label="Inspections per Year" value={inputs.inspectionsPerYear} onChange={(v) => updateInputs({ inspectionsPerYear: v })} min={1} max={24} step={1} />
          <NumberInput label="Feeding Hours per Hive per Round" value={inputs.feedingHoursPerRound} onChange={(v) => updateInputs({ feedingHoursPerRound: v })} unit="hrs" min={0.05} max={1} step={0.05} />
          <NumberInput label="Feeding Rounds per Year" value={inputs.feedingRounds} onChange={(v) => updateInputs({ feedingRounds: v })} min={0} max={10} step={1} />
          <NumberInput label="Treatment Hours per Hive per Round" value={inputs.treatmentHoursPerRound} onChange={(v) => updateInputs({ treatmentHoursPerRound: v })} unit="hrs" min={0.05} max={1} step={0.05} />
          <NumberInput label="Treatment Rounds per Year" value={inputs.treatmentRounds} onChange={(v) => updateInputs({ treatmentRounds: v })} min={0} max={6} step={1} />
          <NumberInput label="Extraction & Bottling (total)" value={inputs.extractionHoursTotal} onChange={(v) => updateInputs({ extractionHoursTotal: v })} unit="hrs" min={0} step={2} />
          <NumberInput label="Misc Hours per Year" value={inputs.miscHoursPerYear} onChange={(v) => updateInputs({ miscHoursPerYear: v })} unit="hrs" min={0} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total hours per year" value={formatNumber(result.totalHours)} unit="hours" highlight />
        <ResultRow label="Total labor cost" value={formatCurrency(result.totalCost)} highlight />
        <ResultRow label="Cost per hive" value={formatCurrency(result.costPerHive)} />
        {result.breakdown.map(b => <ResultRow key={b.task} label={b.task} value={formatCurrency(b.cost)} detail={`${formatNumber(b.hours)} hrs`} />)}
      </ResultPanel>
      <AssumptionsPanel assumptions={[{ label: 'Typical hobbyist', value: '15–25 hrs/hive/year' }, { label: 'Typical commercial', value: '6–10 hrs/hive/year (efficiencies of scale)' }]} />
    </div>
  );
}
