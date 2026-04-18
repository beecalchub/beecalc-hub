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
import { calculatePollinationPricing } from './logic';

const DEFAULTS = { hiveCount: 48, basePricePerHive: 150, transportMiles: 100, fuelCostPerMile: 2.50, durationWeeks: 3, managementVisits: 2, visitCostPerHive: 5 };

export function PollinationContractPricingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('pollination-pricing', DEFAULTS);
  const result = useMemo(() => calculatePollinationPricing(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Pollination Contract', [
    { label: 'Total contract', value: formatCurrency(result.totalContractPrice) },
    { label: 'Per hive', value: formatCurrency(result.pricePerHive) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Hives for Contract" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Base Price / Hive" value={inputs.basePricePerHive} onChange={(v) => updateInputs({ basePricePerHive: v })} unit="$" min={0} step={10} />
          <NumberInput label="Transport Distance" value={inputs.transportMiles} onChange={(v) => updateInputs({ transportMiles: v })} unit="miles (one-way)" min={0} />
          <NumberInput label="Fuel/Transport Cost" value={inputs.fuelCostPerMile} onChange={(v) => updateInputs({ fuelCostPerMile: v })} unit="$/mile" min={0} step={0.25} />
          <NumberInput label="Duration" value={inputs.durationWeeks} onChange={(v) => updateInputs({ durationWeeks: v })} unit="weeks" min={1} />
          <NumberInput label="Management Visits" value={inputs.managementVisits} onChange={(v) => updateInputs({ managementVisits: v })} min={0} />
          <NumberInput label="Visit Cost / Hive" value={inputs.visitCostPerHive} onChange={(v) => updateInputs({ visitCostPerHive: v })} unit="$" min={0} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total contract price" value={formatCurrency(result.totalContractPrice)} highlight />
        <ResultRow label="Hive fees" value={formatCurrency(result.hiveFees)} />
        <ResultRow label="Transport (round trip)" value={formatCurrency(result.transportCost)} />
        <ResultRow label="Management visits" value={formatCurrency(result.managementCost)} />
        <ResultRow label="Effective price / hive" value={formatCurrency(result.pricePerHive)} />
        <ResultRow label="Price / hive / week" value={formatCurrency(result.pricePerHivePerWeek)} />
      </ResultPanel>
    </div>
  );
}
