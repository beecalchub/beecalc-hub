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
import { calculateCashFlow } from './logic';
const DEFAULTS = { hiveCount: 10, honeyRevenue: 3000, waxRevenue: 200, pollinationRevenue: 1500, nucSalesRevenue: 800, springCosts: 1200, summerCosts: 400, fallCosts: 600, winterCosts: 200 };
export function CashFlowBySeasonCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('cash-flow', DEFAULTS);
  const result = useMemo(() => calculateCashFlow(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Cash Flow', [{ label: 'Annual net', value: formatCurrency(result.annualNet) }, ...result.seasons.map(s => ({ label: s.season, value: formatCurrency(s.net) }))]);
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-medium text-smoke-700 mb-2">Annual Revenue Sources:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <NumberInput label="Honey Sales" value={inputs.honeyRevenue} onChange={(v) => updateInputs({ honeyRevenue: v })} unit="$/yr" min={0} step={100} />
          <NumberInput label="Wax / Products" value={inputs.waxRevenue} onChange={(v) => updateInputs({ waxRevenue: v })} unit="$/yr" min={0} step={50} />
          <NumberInput label="Pollination Contracts" value={inputs.pollinationRevenue} onChange={(v) => updateInputs({ pollinationRevenue: v })} unit="$/yr" min={0} step={100} />
          <NumberInput label="Nuc / Queen Sales" value={inputs.nucSalesRevenue} onChange={(v) => updateInputs({ nucSalesRevenue: v })} unit="$/yr" min={0} step={100} />
        </div>
        <p className="text-sm font-medium text-smoke-700 mb-2">Seasonal Costs:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <NumberInput label="Spring" value={inputs.springCosts} onChange={(v) => updateInputs({ springCosts: v })} unit="$" min={0} step={50} />
          <NumberInput label="Summer" value={inputs.summerCosts} onChange={(v) => updateInputs({ summerCosts: v })} unit="$" min={0} step={50} />
          <NumberInput label="Fall" value={inputs.fallCosts} onChange={(v) => updateInputs({ fallCosts: v })} unit="$" min={0} step={50} />
          <NumberInput label="Winter" value={inputs.winterCosts} onChange={(v) => updateInputs({ winterCosts: v })} unit="$" min={0} step={50} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Annual net" value={formatCurrency(result.annualNet)} highlight />
        <ResultRow label="Total revenue" value={formatCurrency(result.totalRevenue)} />
        <ResultRow label="Total costs" value={formatCurrency(result.totalCosts)} />
        <ResultRow label="Best season" value={result.bestSeason} />
        <ResultRow label="Tightest season" value={result.worstSeason} />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Seasonal Breakdown</h3>
        <div className="space-y-2">{result.seasons.map(s => (
          <div key={s.season} className="p-3 rounded-lg bg-smoke-50">
            <div className="flex justify-between items-center mb-1"><span className="font-medium text-smoke-700">{s.season}</span><span className={`font-mono font-medium ${s.net >= 0 ? 'text-meadow-600' : 'text-red-600'}`}>{formatCurrency(s.net)}</span></div>
            <div className="flex justify-between text-xs text-smoke-500"><span>Revenue: {formatCurrency(s.revenue)}</span><span>Costs: {formatCurrency(s.costs)}</span><span>Cumulative: {formatCurrency(s.cumulative)}</span></div>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
