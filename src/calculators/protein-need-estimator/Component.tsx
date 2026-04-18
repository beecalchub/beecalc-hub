'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatCurrency, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateProteinNeed, type ProteinInputs } from './logic';

const DEFAULTS: ProteinInputs = { hiveCount: 5, avgBroodFrames: 4, naturalPollenAvailable: 'scarce', weeksToSupplement: 6 };

export function ProteinNeedEstimatorCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('protein-need', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateProteinNeed(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Protein Need', [
    { label: 'Patties (8 oz)', value: result.pattyCount8oz },
    { label: 'Cost', value: formatCurrency(result.estimatedCost) },
  ]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Avg Brood Frames" value={inputs.avgBroodFrames} onChange={(v) => updateInputs({ avgBroodFrames: v })} min={0} max={15} step={1} />
          <SelectInput label="Natural Pollen Availability" value={inputs.naturalPollenAvailable} onChange={(v) => updateInputs({ naturalPollenAvailable: v as ProteinInputs['naturalPollenAvailable'] })} options={[
            { value: 'abundant', label: 'Abundant (no supplement needed)' }, { value: 'moderate', label: 'Moderate' },
            { value: 'scarce', label: 'Scarce' }, { value: 'none', label: 'None (dearth / winter)' },
          ]} />
          <NumberInput label="Weeks to Supplement" value={inputs.weeksToSupplement} onChange={(v) => updateInputs({ weeksToSupplement: v })} min={1} max={20} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total protein feed" value={isMetric ? formatNumber(result.proteinNeededKg) : formatNumber(result.proteinNeededLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <ResultRow label="Patties needed (8 oz)" value={formatInteger(result.pattyCount8oz)} highlight />
        <ResultRow label="Pollen substitute" value={isMetric ? formatNumber(result.pollenSubKg) : formatNumber(result.pollenSubLbs)} unit={isMetric ? 'kg' : 'lbs'} />
        <ResultRow label="Estimated cost" value={formatCurrency(result.estimatedCost)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: 'Weekly need per hive', value: '~0.06 lbs per brood frame (when no pollen)' },
        { label: 'Pollen sub ratio in patty', value: '~35% by weight' },
        { label: 'Cost estimate', value: '~$3.50/lb for mixed patty ingredients' },
      ]} />
    </div>
  );
}
