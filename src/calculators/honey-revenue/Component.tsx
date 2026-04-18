'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateHoneyRevenue } from './logic';

const DEFAULTS = { jarSizeOz: 16, jarCount: 100, pricePerJar: 12, wholesalePercent: 20, wholesaleDiscount: 30 };

export function HoneyRevenueCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('honey-revenue', DEFAULTS);
  const result = useMemo(() => calculateHoneyRevenue(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Honey Revenue', [
    { label: 'Total revenue', value: formatCurrency(result.totalRevenue) },
    { label: 'Retail', value: formatCurrency(result.retailRevenue) },
    { label: 'Wholesale', value: formatCurrency(result.wholesaleRevenue) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Jar Size" value={inputs.jarSizeOz} onChange={(v) => updateInputs({ jarSizeOz: v })} unit="oz" min={1} />
          <NumberInput label="Total Jars" value={inputs.jarCount} onChange={(v) => updateInputs({ jarCount: v })} min={1} step={10} />
          <NumberInput label="Retail Price per Jar" value={inputs.pricePerJar} onChange={(v) => updateInputs({ pricePerJar: v })} unit="$" min={0} step={0.5} />
          <NumberInput label="Wholesale %" value={inputs.wholesalePercent} onChange={(v) => updateInputs({ wholesalePercent: v })} unit="%" min={0} max={100} helpText="Percent of jars sold wholesale" />
          <NumberInput label="Wholesale Discount" value={inputs.wholesaleDiscount} onChange={(v) => updateInputs({ wholesaleDiscount: v })} unit="% off retail" min={0} max={70} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total Revenue" value={formatCurrency(result.totalRevenue)} highlight />
        <ResultRow label="Retail revenue" value={formatCurrency(result.retailRevenue)} detail={`${formatInteger(result.retailJars)} jars`} />
        <ResultRow label="Wholesale revenue" value={formatCurrency(result.wholesaleRevenue)} detail={`${formatInteger(result.wholesaleJars)} jars`} />
        <ResultRow label="Avg revenue per jar" value={formatCurrency(result.avgRevenuePerJar)} />
        <ResultRow label="Revenue per lb" value={formatCurrency(result.revenuePerLb)} />
      </ResultPanel>
    </div>
  );
}
