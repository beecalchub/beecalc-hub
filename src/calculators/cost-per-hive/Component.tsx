'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateCostPerHive } from './logic';

const DEFAULTS = { equipmentCost: 350, equipmentLifeYears: 10, beeCost: 0, feedCostPerYear: 30, treatmentCostPerYear: 25, laborHoursPerYear: 15, laborRatePerHour: 20, miscCostPerYear: 20 };

export function CostPerHiveCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('cost-per-hive', DEFAULTS);
  const result = useMemo(() => calculateCostPerHive(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Cost Per Hive', [
    { label: 'Annual cost', value: formatCurrency(result.totalAnnualCost) },
    { label: 'Monthly cost', value: formatCurrency(result.monthlyCost) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Equipment Cost (one-time)" value={inputs.equipmentCost} onChange={(v) => updateInputs({ equipmentCost: v })} unit="$" min={0} step={25} />
          <NumberInput label="Equipment Lifespan" value={inputs.equipmentLifeYears} onChange={(v) => updateInputs({ equipmentLifeYears: v })} unit="years" min={1} max={30} />
          <NumberInput label="Bee Purchase (annual)" value={inputs.beeCost} onChange={(v) => updateInputs({ beeCost: v })} unit="$/yr" min={0} helpText="0 if established colony" />
          <NumberInput label="Feed Cost" value={inputs.feedCostPerYear} onChange={(v) => updateInputs({ feedCostPerYear: v })} unit="$/yr" min={0} />
          <NumberInput label="Treatment Cost" value={inputs.treatmentCostPerYear} onChange={(v) => updateInputs({ treatmentCostPerYear: v })} unit="$/yr" min={0} />
          <NumberInput label="Labor Hours" value={inputs.laborHoursPerYear} onChange={(v) => updateInputs({ laborHoursPerYear: v })} unit="hrs/yr" min={0} />
          <NumberInput label="Labor Rate" value={inputs.laborRatePerHour} onChange={(v) => updateInputs({ laborRatePerHour: v })} unit="$/hr" min={0} />
          <NumberInput label="Misc / Overhead" value={inputs.miscCostPerYear} onChange={(v) => updateInputs({ miscCostPerYear: v })} unit="$/yr" min={0} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Annual cost per hive" value={formatCurrency(result.totalAnnualCost)} highlight />
        <ResultRow label="Monthly cost per hive" value={formatCurrency(result.monthlyCost)} />
        {result.breakdown.map((b) => (
          <ResultRow key={b.label} label={b.label} value={formatCurrency(b.amount)} detail={`${b.percent}%`} />
        ))}
      </ResultPanel>
    </div>
  );
}
