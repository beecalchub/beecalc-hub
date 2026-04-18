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
import { calculateHarvest, type HarvestInputs } from './logic';

const DEFAULTS: HarvestInputs = { superCount: 3, framesPerSuper: 10, avgCoveragePercent: 80, frameType: 'medium' };

export function HarvestEstimatorCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('harvest-estimator', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateHarvest(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Harvest Estimate', [
    { label: 'Total honey', value: isMetric ? `${result.totalHoneyKg} kg` : `${result.totalHoneyLbs} lbs` },
    { label: 'Volume', value: isMetric ? `${result.totalLiters} L` : `${result.totalGallons} gal` },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Honey Supers" value={inputs.superCount} onChange={(v) => updateInputs({ superCount: v })} min={1} max={50} step={1} />
          <NumberInput label="Frames per Super" value={inputs.framesPerSuper} onChange={(v) => updateInputs({ framesPerSuper: v })} min={1} max={12} step={1} />
          <SelectInput label="Frame Type" value={inputs.frameType} onChange={(v) => updateInputs({ frameType: v as 'deep' | 'medium' | 'shallow' })} options={[{ value: 'deep', label: 'Deep (~8 lbs/frame)' }, { value: 'medium', label: 'Medium (~5 lbs/frame)' }, { value: 'shallow', label: 'Shallow (~3.5 lbs/frame)' }]} />
          <NumberInput label="Avg Frame Coverage" value={inputs.avgCoveragePercent} onChange={(v) => updateInputs({ avgCoveragePercent: v })} unit="%" min={10} max={100} step={5} helpText="How full are frames on average?" />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Estimated harvest" value={isMetric ? formatNumber(result.totalHoneyKg) : formatNumber(result.totalHoneyLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <ResultRow label="Volume" value={isMetric ? formatNumber(result.totalLiters) : formatNumber(result.totalGallons)} unit={isMetric ? 'liters' : 'gallons'} />
        <ResultRow label="Total frames" value={result.totalFrames} />
        <ResultRow label="Effective full frames" value={formatNumber(result.effectiveFrames)} />
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: 'Deep frame', value: '~8 lbs honey when full' },
        { label: 'Medium frame', value: '~5 lbs honey when full' },
        { label: 'Shallow frame', value: '~3.5 lbs honey when full' },
        { label: 'Honey density', value: '~12 lbs per gallon' },
      ]} />
    </div>
  );
}
