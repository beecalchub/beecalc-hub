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
import { formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateHoneyDensity, type HoneyDensityInputs } from './logic';
const DEFAULTS: HoneyDensityInputs = { mode: 'weight-to-volume', weightLbs: 60, volumeGallons: 5, moisturePercent: 18 };
export function HoneyDensityWeightConverterCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('honey-density', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateHoneyDensity(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Honey Density', [{ label: 'Weight', value: isMetric ? `${result.weightKg} kg` : `${result.weightLbs} lbs` }, { label: 'Volume', value: isMetric ? `${result.volumeLiters} L` : `${result.volumeGallons} gal` }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Convert" value={inputs.mode} onChange={(v) => updateInputs({ mode: v as HoneyDensityInputs['mode'] })} options={[{ value: 'weight-to-volume', label: 'Weight → Volume' }, { value: 'volume-to-weight', label: 'Volume → Weight' }]} />
          <NumberInput label="Moisture" value={inputs.moisturePercent} onChange={(v) => updateInputs({ moisturePercent: v })} unit="%" min={14} max={25} step={0.5} />
          {inputs.mode === 'weight-to-volume' ? (
            <NumberInput label="Honey Weight" value={inputs.weightLbs} onChange={(v) => updateInputs({ weightLbs: v })} unit="lbs" min={0} step={5} />
          ) : (
            <NumberInput label="Honey Volume" value={inputs.volumeGallons} onChange={(v) => updateInputs({ volumeGallons: v })} unit="gallons" min={0} step={0.5} />
          )}
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Weight" value={isMetric ? formatNumber(result.weightKg) : formatNumber(result.weightLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <ResultRow label="Volume" value={isMetric ? formatNumber(result.volumeLiters) : formatNumber(result.volumeGallons, 3)} unit={isMetric ? 'liters' : 'gallons'} highlight />
        <ResultRow label="Fluid ounces" value={formatNumber(result.volumeFlOz)} unit="fl oz" />
        <ResultRow label="Density" value={formatNumber(result.densityLbPerGal)} unit="lbs/gal" />
        <ResultRow label="Specific gravity" value={formatNumber(result.specificGravity, 3)} />
      </ResultPanel>
      <AssumptionsPanel assumptions={[{ label: 'Standard density (18% moisture)', value: '1.42 kg/L = 11.85 lbs/gal' }, { label: 'Density variation', value: 'Decreases ~0.005 per 1% moisture increase' }]} />
    </div>
  );
}
