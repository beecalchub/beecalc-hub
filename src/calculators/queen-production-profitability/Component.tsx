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
const DEFAULTS: Inputs = {"queensPerMonth":50,"seasonMonths":5,"pricePerQueen":35,"feedCostPerQueen":2,"laborHoursPerQueen":0.5,"laborRate":25};
export function QueenProductionProfitabilityCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('queen-production-profitability', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('queen-production-profitability', [{ label: 'Total queens', value: String(result.totalQueens) }, { label: 'Revenue', value: String(result.revenue) }, { label: 'Costs', value: String(result.costs) }, { label: 'Net profit', value: String(result.profit) }, { label: 'Profit per queen', value: String(result.profitPerQueen) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Queens Sold per Month" value={inputs.queensPerMonth} onChange={(v) => updateInputs({ queensPerMonth: v })} min={1} step={1} />
          <NumberInput label="Season Months" value={inputs.seasonMonths} onChange={(v) => updateInputs({ seasonMonths: v })} min={1} max={9} step={1} />
          <NumberInput label="Price per Queen" value={inputs.pricePerQueen} onChange={(v) => updateInputs({ pricePerQueen: v })} unit="$" min={0} step={5} />
          <NumberInput label="Feed Cost per Queen" value={inputs.feedCostPerQueen} onChange={(v) => updateInputs({ feedCostPerQueen: v })} unit="$" min={0} step={1} />
          <NumberInput label="Labor Hours per Queen" value={inputs.laborHoursPerQueen} onChange={(v) => updateInputs({ laborHoursPerQueen: v })} min={0} step={0.1} />
          <NumberInput label="Labor Rate" value={inputs.laborRate} onChange={(v) => updateInputs({ laborRate: v })} unit="$/hr" min={0} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total queens" value={String(result.totalQueens)} highlight />
        <ResultRow label="Revenue" value={`$${result.revenue.toFixed(2)}`} highlight />
        <ResultRow label="Costs" value={`$${result.costs.toFixed(2)}`} />
        <ResultRow label="Net profit" value={`$${result.profit.toFixed(2)}`} highlight />
        <ResultRow label="Profit per queen" value={`$${result.profitPerQueen.toFixed(2)}`} />
      </ResultPanel>
    </div>
  );
}
