'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency, formatPercent } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateJarPrice, type JarPriceInputs } from './logic';

const DEFAULTS: JarPriceInputs = { jarSizeOz: 16, costPerJar: 1.00, costOfHoneyPerLb: 3.50, labelAndLidCost: 0.50, sellingVenue: 'farmers-market', region: 'suburban', isRawUnfiltered: true, isVarietal: false, isOrganic: false };

export function WhatJarPriceShouldIChargeCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('jar-price', DEFAULTS);
  const result = useMemo(() => calculateJarPrice(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Jar Pricing', [{ label: 'Suggested price', value: formatCurrency(result.suggestedPrice) }, { label: 'Profit per jar', value: formatCurrency(result.profitPerJar) }, { label: 'Margin', value: formatPercent(result.profitMarginPercent) }]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Jar Size" value={inputs.jarSizeOz} onChange={(v) => updateInputs({ jarSizeOz: v })} unit="oz" min={2} max={64} step={2} />
          <NumberInput label="Jar Cost" value={inputs.costPerJar} onChange={(v) => updateInputs({ costPerJar: v })} unit="$" min={0} step={0.1} helpText="Empty jar cost" />
          <NumberInput label="Your Honey Cost" value={inputs.costOfHoneyPerLb} onChange={(v) => updateInputs({ costOfHoneyPerLb: v })} unit="$/lb" min={0} step={0.25} helpText="Your production cost per lb" />
          <NumberInput label="Label + Lid Cost" value={inputs.labelAndLidCost} onChange={(v) => updateInputs({ labelAndLidCost: v })} unit="$" min={0} step={0.1} />
          <SelectInput label="Selling Venue" value={inputs.sellingVenue} onChange={(v) => updateInputs({ sellingVenue: v as JarPriceInputs['sellingVenue'] })} options={[
            { value: 'farmers-market', label: 'Farmers Market' }, { value: 'retail-store', label: 'Retail Store' },
            { value: 'online', label: 'Online' }, { value: 'friends', label: 'Friends & Family' },
          ]} />
          <SelectInput label="Area" value={inputs.region} onChange={(v) => updateInputs({ region: v as JarPriceInputs['region'] })} options={[
            { value: 'urban', label: 'Urban (higher prices)' }, { value: 'suburban', label: 'Suburban' }, { value: 'rural', label: 'Rural (lower prices)' },
          ]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 mt-3">
          <Checkbox label="Raw / unfiltered" checked={inputs.isRawUnfiltered} onChange={(v) => updateInputs({ isRawUnfiltered: v })} />
          <Checkbox label="Varietal / single-source" checked={inputs.isVarietal} onChange={(v) => updateInputs({ isVarietal: v })} />
          <Checkbox label="Certified organic" checked={inputs.isOrganic} onChange={(v) => updateInputs({ isOrganic: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <div className="text-center mb-4 p-4 bg-honey-50 rounded-xl border border-honey-200">
          <p className="text-sm text-smoke-500 mb-1">Suggested Price</p>
          <p className="text-4xl font-mono font-bold text-smoke-800">{formatCurrency(result.suggestedPrice)}</p>
          <p className="text-sm text-smoke-500 mt-1">Range: {formatCurrency(result.priceRange.min)} – {formatCurrency(result.priceRange.max)}</p>
        </div>
        <ResultRow label="Your cost per jar" value={formatCurrency(result.costPerJar)} />
        <ResultRow label="Profit per jar" value={formatCurrency(result.profitPerJar)} highlight />
        <ResultRow label="Profit margin" value={formatPercent(result.profitMarginPercent)} highlight={result.profitMarginPercent < 30} />
        <ResultRow label="Price per oz" value={formatCurrency(result.pricePerOz)} />
        <ResultRow label="Price per lb" value={formatCurrency(result.pricePerLb)} />
        <div className="mt-3 p-3 bg-smoke-50 rounded-lg text-sm text-smoke-600">{result.positioning}</div>
      </ResultPanel>

      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Pricing Tips</h3>
        <ul className="space-y-2" role="list">{result.tips.map((t, i) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{t}</li>)}</ul>
      </Card>
    </div>
  );
}
