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
const DEFAULTS: Inputs = {"hiveCount":5,"trapDaysPerWeek":3,"seasonWeeks":8,"trapEfficiency":"medium"};
export function PollenHarvestCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('pollen-harvest', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('pollen-harvest', [{ label: 'Grams per hive daily', value: String(result.gramsPerHiveDaily) }, { label: 'Total season yield', value: String(result.totalLbsSeason) }, { label: 'Total kilograms', value: String(result.totalKgSeason) }, { label: 'Estimated value', value: String(result.estimatedValue) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Trap Days per Week" value={inputs.trapDaysPerWeek} onChange={(v) => updateInputs({ trapDaysPerWeek: v })} min={1} max={5} step={1} />
          <NumberInput label="Season Weeks" value={inputs.seasonWeeks} onChange={(v) => updateInputs({ seasonWeeks: v })} min={1} max={20} step={1} />
          <SelectInput label="Trap Efficiency" value={inputs.trapEfficiency} onChange={(v) => updateInputs({ trapEfficiency: v as Inputs['trapEfficiency'] })} options={[{"value":"high","label":"High (60g/hive/day)"},{"value":"medium","label":"Medium (40g)"},{"value":"low","label":"Low (20g)"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Grams per hive daily" value={result.gramsPerHiveDaily} unit="g" />
        <ResultRow label="Total season yield" value={result.totalLbsSeason} unit="lbs" highlight />
        <ResultRow label="Total kilograms" value={result.totalKgSeason} unit="kg" />
        <ResultRow label="Estimated value" value={`$${result.estimatedValue.toFixed(2)}`} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.warning}</div>
      </ResultPanel>
    </div>
  );
}
