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
import { formatCurrency, formatPercent, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateBreakEven } from './logic';

const DEFAULTS = { fixedCostsPerYear: 3000, variableCostPerUnit: 4.50, revenuePerUnit: 12, unitLabel: 'jars' };

export function BreakEvenCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('break-even', DEFAULTS);
  const result = useMemo(() => calculateBreakEven(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Break-Even', [
    { label: 'Break-even units', value: result.breakEvenUnits },
    { label: 'Break-even revenue', value: formatCurrency(result.breakEvenRevenue) },
    { label: 'Contribution margin', value: formatCurrency(result.contributionMargin) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Fixed Costs (annual)" value={inputs.fixedCostsPerYear} onChange={(v) => updateInputs({ fixedCostsPerYear: v })} unit="$/yr" min={0} step={100} helpText="Equipment, insurance, land, dues" />
          <NumberInput label="Variable Cost per Unit" value={inputs.variableCostPerUnit} onChange={(v) => updateInputs({ variableCostPerUnit: v })} unit="$" min={0} step={0.25} helpText="Jars, labels, honey production cost" />
          <NumberInput label="Revenue per Unit" value={inputs.revenuePerUnit} onChange={(v) => updateInputs({ revenuePerUnit: v })} unit="$" min={0} step={0.5} helpText="Selling price per jar" />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <ResultRow label="Break-even point" value={result.breakEvenUnits > 0 ? formatInteger(result.breakEvenUnits) : '-'} unit="units" highlight />
        <ResultRow label="Break-even revenue" value={result.breakEvenRevenue > 0 ? formatCurrency(result.breakEvenRevenue) : '-'} />
        <ResultRow label="Contribution margin" value={formatCurrency(result.contributionMargin)} unit="per unit" />
        <ResultRow label="Margin %" value={formatPercent(result.contributionMarginPercent)} />
        <div className={`mt-3 p-4 rounded-lg border ${result.isProfitablePerUnit ? 'bg-meadow-50 border-meadow-200 text-meadow-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
          <p className="text-sm">{result.message}</p>
        </div>
      </ResultPanel>

      <AssumptionsPanel assumptions={[
        { label: 'Fixed costs', value: 'Costs that don\'t change with production volume' },
        { label: 'Variable costs', value: 'Costs per unit sold (jars, labels, etc.)' },
        { label: 'Contribution margin', value: 'Revenue per unit minus variable cost per unit' },
        { label: 'Break-even formula', value: 'Fixed costs ÷ contribution margin' },
      ]} />

      <div className="text-sm text-smoke-500 bg-smoke-50 rounded-lg p-4">
        <p className="font-medium text-smoke-700 mb-1">Example usage:</p>
        <p>With $3,000 in annual fixed costs, $4.50 variable cost per jar, and $12 selling price, you need to sell 400 jars to break even. Every jar after that earns $7.50 in profit.</p>
      </div>
    </div>
  );
}
