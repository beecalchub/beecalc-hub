'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatInteger, formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateHoneyExpect, type HoneyExpectInputs } from './logic';

const DEFAULTS: HoneyExpectInputs = { hiveCount: 2, region: 'midwest', hiveAge: 'established', colonyStrength: 'average', localFlora: 'good', weather: 'average' };

export function HowMuchHoneyCanIExpectCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('honey-expect', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateHoneyExpect(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Honey Expectation', [{ label: 'Per hive', value: isMetric ? `${result.perHiveKg} kg` : `${result.perHiveLbs} lbs` }, { label: 'Total', value: isMetric ? `${result.totalKg} kg` : `${result.totalLbs} lbs` }, { label: 'Revenue', value: formatCurrency(result.revenueEstimate) }]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} max={100} step={1} />
          <SelectInput label="Region" value={inputs.region} onChange={(v) => updateInputs({ region: v as HoneyExpectInputs['region'] })} options={[
            { value: 'northern', label: 'Northern US / Canada (~50 lbs avg)' }, { value: 'midwest', label: 'Midwest (~65 lbs avg)' },
            { value: 'southern', label: 'Southern US (~45 lbs avg)' }, { value: 'west', label: 'Western / Arid (~40 lbs avg)' },
            { value: 'pacific-nw', label: 'Pacific NW (~55 lbs avg)' },
          ]} />
          <SelectInput label="Hive Age" value={inputs.hiveAge} onChange={(v) => updateInputs({ hiveAge: v as HoneyExpectInputs['hiveAge'] })} options={[
            { value: 'first-year', label: 'First year (new colony)' }, { value: 'established', label: 'Established (2+ years)' },
          ]} />
          <SelectInput label="Colony Strength" value={inputs.colonyStrength} onChange={(v) => updateInputs({ colonyStrength: v as HoneyExpectInputs['colonyStrength'] })} options={[
            { value: 'strong', label: 'Strong' }, { value: 'average', label: 'Average' }, { value: 'weak', label: 'Weak' },
          ]} />
          <SelectInput label="Local Forage Quality" value={inputs.localFlora} onChange={(v) => updateInputs({ localFlora: v as HoneyExpectInputs['localFlora'] })} options={[
            { value: 'excellent', label: 'Excellent (diverse, abundant)' }, { value: 'good', label: 'Good' },
            { value: 'moderate', label: 'Moderate' }, { value: 'poor', label: 'Poor (urban, dry)' },
          ]} />
          <SelectInput label="Expected Weather" value={inputs.weather} onChange={(v) => updateInputs({ weather: v as HoneyExpectInputs['weather'] })} options={[
            { value: 'good', label: 'Good (warm, moderate rain)' }, { value: 'average', label: 'Average' }, { value: 'poor', label: 'Poor (drought or cold wet)' },
          ]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Per hive estimate" value={isMetric ? formatNumber(result.perHiveKg) : formatNumber(result.perHiveLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <ResultRow label="Range" value={`${result.rangeMin}–${result.rangeMax}`} unit="lbs per hive" />
        <ResultRow label="Total (all hives)" value={isMetric ? formatNumber(result.totalKg) : formatNumber(result.totalLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <ResultRow label="≈ jars (16 oz)" value={formatInteger(result.jars16oz)} unit="jars" />
        <ResultRow label="Revenue estimate (at $10/lb)" value={formatCurrency(result.revenueEstimate)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.explanation}</div>
      </ResultPanel>
      {result.tips.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Good to Know</h3>
        <ul className="space-y-2" role="list">{result.tips.map((t, i) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{t}</li>)}</ul>
      </Card>}
    </div>
  );
}
