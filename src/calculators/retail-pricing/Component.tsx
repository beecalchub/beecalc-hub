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
import { calculateRetailPricing } from './logic';

const DEFAULTS = { costPerLb: 5.50, jarSizeOz: 16, targetMarginPercent: 50, localAvgPrice: 14 };

export function RetailPricingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('retail-pricing', DEFAULTS);
  const result = useMemo(() => calculateRetailPricing(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Retail Pricing', [
    { label: 'Cost per jar', value: formatCurrency(result.costPerJar) },
    { label: 'Suggested price', value: formatCurrency(result.suggestedPrice) },
    { label: 'Margin', value: formatPercent(result.marginAtSuggested) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Cost per Pound (production)" value={inputs.costPerLb} onChange={(v) => updateInputs({ costPerLb: v })} unit="$/lb" min={0} step={0.25} />
          <NumberInput label="Jar Size" value={inputs.jarSizeOz} onChange={(v) => updateInputs({ jarSizeOz: v })} unit="oz" min={1} />
          <NumberInput label="Target Margin" value={inputs.targetMarginPercent} onChange={(v) => updateInputs({ targetMarginPercent: v })} unit="%" min={5} max={90} />
          <NumberInput label="Local Avg Price (same size)" value={inputs.localAvgPrice} onChange={(v) => updateInputs({ localAvgPrice: v })} unit="$" min={0} helpText="For market comparison" />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Suggested retail price" value={formatCurrency(result.suggestedPrice)} highlight />
        <ResultRow label="Your cost per jar" value={formatCurrency(result.costPerJar)} />
        <ResultRow label="Margin at suggested price" value={formatPercent(result.marginAtSuggested)} />
        <ResultRow label="Price per oz" value={formatCurrency(result.pricePerOz)} />
        <div className="mt-3 p-3 bg-smoke-50 rounded-lg text-sm">
          <p className="text-smoke-600">
            <strong>Local comparison:</strong> At {formatCurrency(result.priceAtLocalAvg)}, your margin would be {formatPercent(result.marginAtLocalAvg)}.
          </p>
        </div>
      </ResultPanel>
    </div>
  );
}
