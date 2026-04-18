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
import { calculateWaterRequirement, type WaterInputs, type Season } from './logic';

const DEFAULTS: WaterInputs = { hiveCount: 5, season: 'summer', averageTempF: 85, nearestWaterSourceFt: 800 };

export function WaterRequirementEstimatorCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('water-req', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateWaterRequirement(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Water Requirement', [
    { label: 'Per hive/day', value: isMetric ? `${result.litersPerHivePerDay} L` : `${result.gallonsPerHivePerDay} gal` },
    { label: 'Total/week', value: isMetric ? `${result.totalLitersPerWeek} L` : `${result.totalGallonsPerWeek} gal` },
    { label: 'Container', value: `${result.containerSizeGallons} gal, refill every ${result.refillFrequencyDays} days` },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Season" value={inputs.season} onChange={(v) => updateInputs({ season: v as Season })} options={[
            { value: 'spring', label: 'Spring' }, { value: 'summer', label: 'Summer' },
            { value: 'fall', label: 'Fall' }, { value: 'winter', label: 'Winter' },
          ]} />
          <NumberInput
            label="Average Temperature"
            value={inputs.averageTempF}
            onChange={(v) => updateInputs({ averageTempF: v })}
            unit="°F"
            min={20}
            max={120}
            step={5}
            helpText={isMetric ? `≈ ${formatNumber((inputs.averageTempF - 32) * 5 / 9)}°C` : undefined}
          />
          <NumberInput
            label="Nearest Water Source"
            value={inputs.nearestWaterSourceFt}
            onChange={(v) => updateInputs({ nearestWaterSourceFt: v })}
            unit="ft"
            min={0}
            step={50}
            helpText={isMetric ? `≈ ${formatNumber(inputs.nearestWaterSourceFt * 0.3048)} m` : 'Pond, stream, birdbath, etc.'}
          />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <ResultRow
          label="Per hive per day"
          value={isMetric ? formatNumber(result.litersPerHivePerDay) : formatNumber(result.gallonsPerHivePerDay, 3)}
          unit={isMetric ? 'liters' : 'gallons'}
        />
        <ResultRow
          label="Total daily"
          value={isMetric ? formatNumber(result.totalLitersPerDay) : formatNumber(result.totalGallonsPerDay)}
          unit={isMetric ? 'liters' : 'gallons'}
          highlight
        />
        <ResultRow
          label="Total weekly"
          value={isMetric ? formatNumber(result.totalLitersPerWeek) : formatNumber(result.totalGallonsPerWeek)}
          unit={isMetric ? 'liters' : 'gallons'}
          highlight
        />
        <ResultRow label="Suggested container" value={result.containerSizeGallons} unit="gallon container" />
        <ResultRow label="Refill every" value={result.refillFrequencyDays} unit="days" />

        <div className={`mt-3 p-4 rounded-lg border ${result.needsSupplementalWater ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-meadow-50 border-meadow-200 text-meadow-700'}`}>
          <p className="text-sm">{result.recommendation}</p>
        </div>
      </ResultPanel>

      <AssumptionsPanel assumptions={[
        { label: 'Base water need', value: '~1 quart (0.95 L) per hive per day in summer' },
        { label: 'High temp adjustment', value: '+30% above 90°F, +50% above 100°F' },
        { label: 'Ideal water distance', value: 'Within 500 ft (150 m) of hives' },
        { label: 'Water source tip', value: 'Provide landing spots (corks, pebbles) to prevent drowning' },
      ]} />
    </div>
  );
}
