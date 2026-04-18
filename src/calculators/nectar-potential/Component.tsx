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
import { formatNumber, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateNectar, type NectarInputs } from './logic';
const DEFAULTS: NectarInputs = { dominantFlora: 'mixed', acreage: 10, floraHealthPercent: 80, weatherQuality: 'good' };
export function NectarPotentialCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('nectar', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateNectar(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Nectar Potential', [{ label: 'Honey potential', value: isMetric ? `${result.honeyPotentialKg} kg` : `${result.honeyPotentialLbs} lbs` }, { label: 'Hives supported', value: result.hivesSupported }]);
  return (
    <div className="space-y-6">
      <Card><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectInput label="Dominant Flora" value={inputs.dominantFlora} onChange={(v) => updateInputs({ dominantFlora: v as NectarInputs['dominantFlora'] })} options={[{ value: 'clover', label: 'Clover' }, { value: 'wildflower', label: 'Wildflower mix' }, { value: 'fruit-trees', label: 'Fruit trees / orchard' }, { value: 'canola', label: 'Canola / rapeseed' }, { value: 'buckwheat', label: 'Buckwheat' }, { value: 'mixed', label: 'Mixed landscape' }]} />
        <NumberInput label="Forage Acreage" value={inputs.acreage} onChange={(v) => updateInputs({ acreage: v })} unit="acres" min={0.5} step={5} />
        <NumberInput label="Flora Health" value={inputs.floraHealthPercent} onChange={(v) => updateInputs({ floraHealthPercent: v })} unit="%" min={10} max={100} step={10} helpText="Bloom density & health" />
        <SelectInput label="Weather Quality" value={inputs.weatherQuality} onChange={(v) => updateInputs({ weatherQuality: v as NectarInputs['weatherQuality'] })} options={[{ value: 'excellent', label: 'Excellent (warm, moderate rain)' }, { value: 'good', label: 'Good' }, { value: 'average', label: 'Average' }, { value: 'poor', label: 'Poor (drought or cold)' }]} />
      </div><div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div></Card>
      <ResultPanel>
        <ResultRow label="Honey potential" value={isMetric ? formatInteger(result.honeyPotentialKg) : formatInteger(result.honeyPotentialLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <ResultRow label="Nectar per acre" value={formatInteger(result.nectarLbsPerAcre)} unit="lbs" />
        <ResultRow label="Total nectar" value={formatInteger(result.totalNectarLbs)} unit="lbs" />
        <ResultRow label="Hives supportable" value={result.hivesSupported} unit="hives" highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.qualityNote}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[{ label: 'Nectar to honey', value: '~4 lbs nectar → 1 lb honey' }, { label: 'Surplus per hive', value: '~60 lbs (above bees\' own needs)' }, { label: 'Canola', value: 'Highest nectar producer (~300 lbs/acre)' }, { label: 'Clover', value: '~200 lbs nectar/acre' }]} />
    </div>
  );
}
