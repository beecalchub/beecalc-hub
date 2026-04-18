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
import { calculateWholesaleRetail, type ScenarioResult } from './logic';

const DEFAULTS = {
  totalJars: 200, retailPricePerJar: 14, wholesalePricePerJar: 8,
  retailSellThroughPercent: 85, wholesaleSellThroughPercent: 100,
  retailTimeCostPerJar: 1.5, wholesaleTimeCostPerJar: 0.25, costPerJar: 4.50,
};

function ScenarioCard({ title, data, best }: { title: string; data: ScenarioResult; best: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${best ? 'border-honey-300 bg-honey-50' : 'border-smoke-200 bg-white'}`}>
      <h4 className="font-display text-sm text-smoke-800 mb-2 flex items-center gap-2">
        {title}
        {best && <span className="text-xs bg-honey-200 text-honey-800 px-2 py-0.5 rounded-full font-medium">Best</span>}
      </h4>
      <p className="text-xl font-mono font-bold text-smoke-800 mb-2">{formatCurrency(data.netProfit)}</p>
      <div className="space-y-1 text-sm text-smoke-600">
        <div className="flex justify-between"><span>Jars sold</span><span className="font-medium">{formatInteger(data.jarsSold)}</span></div>
        <div className="flex justify-between"><span>Revenue</span><span>{formatCurrency(data.grossRevenue)}</span></div>
        <div className="flex justify-between"><span>Production</span><span>-{formatCurrency(data.productionCost)}</span></div>
        <div className="flex justify-between"><span>Time/selling</span><span>-{formatCurrency(data.timeCost)}</span></div>
        <div className="flex justify-between"><span>Unsold</span><span>{formatInteger(data.unsoldJars)} jars</span></div>
      </div>
    </div>
  );
}

export function WholesaleVsRetailCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('wholesale-retail', DEFAULTS);
  const result = useMemo(() => calculateWholesaleRetail(inputs), [inputs]);

  const bestProfit = Math.max(result.retail.netProfit, result.wholesale.netProfit, result.mixed.netProfit);

  const copyText = () => formatResultsForCopy('Wholesale vs Retail', [
    { label: 'All retail profit', value: formatCurrency(result.retail.netProfit) },
    { label: 'All wholesale profit', value: formatCurrency(result.wholesale.netProfit) },
    { label: 'Mixed profit', value: formatCurrency(result.mixed.netProfit) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Total Jars" value={inputs.totalJars} onChange={(v) => updateInputs({ totalJars: v })} min={1} step={10} />
          <NumberInput label="Cost per Jar" value={inputs.costPerJar} onChange={(v) => updateInputs({ costPerJar: v })} unit="$" min={0} step={0.25} helpText="Production cost" />
          <NumberInput label="Retail Price" value={inputs.retailPricePerJar} onChange={(v) => updateInputs({ retailPricePerJar: v })} unit="$/jar" min={0} step={0.5} />
          <NumberInput label="Wholesale Price" value={inputs.wholesalePricePerJar} onChange={(v) => updateInputs({ wholesalePricePerJar: v })} unit="$/jar" min={0} step={0.5} />
          <NumberInput label="Retail Sell-Through" value={inputs.retailSellThroughPercent} onChange={(v) => updateInputs({ retailSellThroughPercent: v })} unit="%" min={0} max={100} helpText="% you expect to sell retail" />
          <NumberInput label="Wholesale Sell-Through" value={inputs.wholesaleSellThroughPercent} onChange={(v) => updateInputs({ wholesaleSellThroughPercent: v })} unit="%" min={0} max={100} />
          <NumberInput label="Retail Time Cost" value={inputs.retailTimeCostPerJar} onChange={(v) => updateInputs({ retailTimeCostPerJar: v })} unit="$/jar" min={0} step={0.25} helpText="Farmers market time, labels, etc." />
          <NumberInput label="Wholesale Time Cost" value={inputs.wholesaleTimeCostPerJar} onChange={(v) => updateInputs({ wholesaleTimeCostPerJar: v })} unit="$/jar" min={0} step={0.1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ScenarioCard title="100% Retail" data={result.retail} best={result.retail.netProfit === bestProfit} />
        <ScenarioCard title="100% Wholesale" data={result.wholesale} best={result.wholesale.netProfit === bestProfit} />
        <ScenarioCard title="Mixed (60/40)" data={result.mixed} best={result.mixed.netProfit === bestProfit} />
      </div>

      <div className="p-4 bg-honey-50 border border-honey-200 rounded-lg text-sm text-honey-800">
        {result.recommendation}
      </div>
    </div>
  );
}
