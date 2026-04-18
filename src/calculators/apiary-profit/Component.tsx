'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateApiaryProfit } from './logic';

const DEFAULTS = { hiveCount: 10, honeyRevenuePerHive: 250, otherRevenuePerHive: 30, costPerHive: 140, fixedCosts: 500 };

export function ApiaryProfitCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('apiary-profit', DEFAULTS);
  const result = useMemo(() => calculateApiaryProfit(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Apiary Profit', [
    { label: 'Revenue', value: formatCurrency(result.totalRevenue) },
    { label: 'Costs', value: formatCurrency(result.totalCosts) },
    { label: 'Net profit', value: formatCurrency(result.netProfit) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Honey Revenue / Hive" value={inputs.honeyRevenuePerHive} onChange={(v) => updateInputs({ honeyRevenuePerHive: v })} unit="$/yr" min={0} step={25} />
          <NumberInput label="Other Revenue / Hive" value={inputs.otherRevenuePerHive} onChange={(v) => updateInputs({ otherRevenuePerHive: v })} unit="$/yr" min={0} helpText="Wax, pollination, nucs, etc." />
          <NumberInput label="Cost / Hive" value={inputs.costPerHive} onChange={(v) => updateInputs({ costPerHive: v })} unit="$/yr" min={0} step={10} helpText="Use cost-per-hive calculator" />
          <NumberInput label="Fixed Costs" value={inputs.fixedCosts} onChange={(v) => updateInputs({ fixedCosts: v })} unit="$/yr" min={0} helpText="Insurance, land, association fees" />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Net Profit" value={formatCurrency(result.netProfit)} highlight />
        <div className={`p-3 rounded-lg ${result.isProfitable ? 'bg-meadow-50 text-meadow-700' : 'bg-red-50 text-red-700'} text-sm font-medium mb-2`}>
          {result.isProfitable ? '✓ Profitable' : '✗ Operating at a loss'}
        </div>
        <ResultRow label="Total revenue" value={formatCurrency(result.totalRevenue)} />
        <ResultRow label="Total costs" value={formatCurrency(result.totalCosts)} />
        <ResultRow label="Profit per hive" value={formatCurrency(result.profitPerHive)} />
        <ResultRow label="Profit margin" value={formatPercent(result.profitMargin)} />
      </ResultPanel>
    </div>
  );
}
