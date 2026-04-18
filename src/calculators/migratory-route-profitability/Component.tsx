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
const DEFAULTS: Inputs = {"hiveCount":400,"stops":5,"totalMiles":3500,"totalRevenue":50000,"totalFuelCost":2500,"laborDays":30,"laborRate":25};
export function MigratoryRouteProfitabilityCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('migratory-route-profitability', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('migratory-route-profitability', [{ label: 'Gross revenue', value: String(result.grossRevenue) }, { label: 'Total costs', value: String(result.totalCosts) }, { label: 'Net profit', value: String(result.netProfit) }, { label: 'Profit per hive', value: String(result.profitPerHive) }, { label: 'Profit per mile', value: String(result.profitPerMile) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Hives on Route" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Number of Stops" value={inputs.stops} onChange={(v) => updateInputs({ stops: v })} min={1} max={20} step={1} />
          <NumberInput label="Total Miles" value={inputs.totalMiles} onChange={(v) => updateInputs({ totalMiles: v })} min={0} step={100} />
          <NumberInput label="Total Revenue" value={inputs.totalRevenue} onChange={(v) => updateInputs({ totalRevenue: v })} unit="$" min={0} step={500} />
          <NumberInput label="Fuel Costs" value={inputs.totalFuelCost} onChange={(v) => updateInputs({ totalFuelCost: v })} unit="$" min={0} step={100} />
          <NumberInput label="Labor Days" value={inputs.laborDays} onChange={(v) => updateInputs({ laborDays: v })} min={1} step={1} />
          <NumberInput label="Labor Rate" value={inputs.laborRate} onChange={(v) => updateInputs({ laborRate: v })} unit="$/hr" min={0} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Gross revenue" value={`$${result.grossRevenue.toFixed(2)}`} highlight />
        <ResultRow label="Total costs" value={`$${result.totalCosts.toFixed(2)}`} />
        <ResultRow label="Net profit" value={`$${result.netProfit.toFixed(2)}`} highlight />
        <ResultRow label="Profit per hive" value={`$${result.profitPerHive.toFixed(2)}`} />
        <ResultRow label="Profit per mile" value={`$${result.profitPerMile.toFixed(2)}`} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
