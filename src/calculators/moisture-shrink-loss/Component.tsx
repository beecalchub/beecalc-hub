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
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatPercent, formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateMoistureShrink } from './logic';
const DEFAULTS = { startingWeightLbs: 100, startingMoisture: 20, targetMoisture: 18 };
export function MoistureShrinkLossCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('moisture-shrink', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateMoistureShrink(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Moisture Shrink', [{ label: 'Water removed', value: isMetric ? `${result.waterRemovedKg} kg` : `${result.waterRemovedLbs} lbs` }, { label: 'Weight loss', value: formatPercent(result.weightLossPercent) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="Starting Weight" value={inputs.startingWeightLbs} onChange={(v) => updateInputs({ startingWeightLbs: v })} unit="lbs" min={1} step={10} helpText={isMetric ? `≈ ${formatNumber(inputs.startingWeightLbs * 0.4536)} kg` : undefined} />
          <NumberInput label="Starting Moisture" value={inputs.startingMoisture} onChange={(v) => updateInputs({ startingMoisture: v })} unit="%" min={15} max={30} step={0.5} />
          <NumberInput label="Target Moisture" value={inputs.targetMoisture} onChange={(v) => updateInputs({ targetMoisture: v })} unit="%" min={14} max={20} step={0.5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Water removed" value={isMetric ? formatNumber(result.waterRemovedKg) : formatNumber(result.waterRemovedLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <ResultRow label="Final weight" value={isMetric ? formatNumber(result.finalWeightKg) : formatNumber(result.finalWeightLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <ResultRow label="Weight loss" value={formatPercent(result.weightLossPercent)} />
        <ResultRow label="Revenue impact (at $10/lb)" value={formatCurrency(result.revenueLostAtPricePerLb)} detail="Weight lost × honey price" />
      </ResultPanel>
      <AssumptionsPanel assumptions={[{ label: 'Formula', value: 'final = start × (100 − start%) / (100 − target%)' }, { label: 'Revenue estimate', value: '$10/lb average honey price' }, { label: 'Note', value: 'Lower moisture = better quality, but less weight to sell' }]} />
    </div>
  );
}
