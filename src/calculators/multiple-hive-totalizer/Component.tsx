'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"hives":10,"avgHarvestPerHive":50,"avgCostPerHive":150,"avgRevenuePerHive":500};
export function MultipleHiveTotalizerCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('multiple-hive-totalizer', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('multiple-hive-totalizer', [{ label: 'Total harvest', value: String(result.totalHarvest) }, { label: 'Total cost', value: String(result.totalCost) }, { label: 'Total revenue', value: String(result.totalRevenue) }, { label: 'Total profit', value: String(result.totalProfit) }, { label: 'Avg profit per hive', value: String(result.avgProfit) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hives} onChange={(v) => updateInputs({ hives: v })} min={1} step={1} />
          <NumberInput label="Avg Harvest per Hive" value={inputs.avgHarvestPerHive} onChange={(v) => updateInputs({ avgHarvestPerHive: v })} unit="lbs" min={0} step={5} />
          <NumberInput label="Avg Cost per Hive" value={inputs.avgCostPerHive} onChange={(v) => updateInputs({ avgCostPerHive: v })} unit="$" min={0} step={10} />
          <NumberInput label="Avg Revenue per Hive" value={inputs.avgRevenuePerHive} onChange={(v) => updateInputs({ avgRevenuePerHive: v })} unit="$" min={0} step={10} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total harvest" value={String(result.totalHarvest)} unit="lbs" highlight />
        <ResultRow label="Total cost" value={`$${result.totalCost.toFixed(2)}`} />
        <ResultRow label="Total revenue" value={`$${result.totalRevenue.toFixed(2)}`} highlight />
        <ResultRow label="Total profit" value={`$${result.totalProfit.toFixed(2)}`} highlight />
        <ResultRow label="Avg profit per hive" value={`$${result.avgProfit.toFixed(2)}`} />
      </ResultPanel>
    </div>
  );
}
