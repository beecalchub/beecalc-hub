'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateRoi } from './logic';
const DEFAULTS = { initialInvestment: 2000, annualRevenue: 1500, annualCosts: 600, yearsToProject: 5 };
export function RoiCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('roi', DEFAULTS);
  const result = useMemo(() => calculateRoi(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('ROI', [{ label: 'Annual ROI', value: formatPercent(result.roiPercent) }, { label: 'Payback', value: `${result.paybackYears} years` }, { label: `${inputs.yearsToProject}-year profit`, value: formatCurrency(result.totalProfit) }]);
  return (
    <div className="space-y-6">
      <Card><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInput label="Initial Investment" value={inputs.initialInvestment} onChange={(v) => updateInputs({ initialInvestment: v })} unit="$" min={0} step={100} helpText="Hives, equipment, bees" />
        <NumberInput label="Annual Revenue" value={inputs.annualRevenue} onChange={(v) => updateInputs({ annualRevenue: v })} unit="$/yr" min={0} step={100} helpText="Honey, wax, pollination" />
        <NumberInput label="Annual Costs" value={inputs.annualCosts} onChange={(v) => updateInputs({ annualCosts: v })} unit="$/yr" min={0} step={50} helpText="Feed, treatment, supplies" />
        <NumberInput label="Years to Project" value={inputs.yearsToProject} onChange={(v) => updateInputs({ yearsToProject: v })} min={1} max={10} step={1} />
      </div><div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div></Card>
      <ResultPanel>
        <ResultRow label="Annual profit" value={formatCurrency(result.annualProfit)} highlight />
        <ResultRow label="Annual ROI" value={formatPercent(result.roiPercent)} highlight />
        <ResultRow label="Payback period" value={result.paybackYears > 0 ? `${formatNumber(result.paybackYears)} years` : 'N/A (no profit)'} />
        <ResultRow label={`${inputs.yearsToProject}-year total profit`} value={formatCurrency(result.totalProfit)} highlight />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Year-by-Year Projection</h3>
        <div className="space-y-1">{result.cumulativeByYear.map(y => (
          <div key={y.year} className="flex justify-between text-sm py-1.5 border-b border-smoke-100 last:border-0">
            <span className="text-smoke-600">Year {y.year}</span>
            <span className={`font-mono font-medium ${y.cumulative >= 0 ? 'text-meadow-600' : 'text-red-600'}`}>{formatCurrency(y.cumulative)}</span>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
