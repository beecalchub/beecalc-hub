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
import { calculateWinterStores, type ClimateZone, type WinterStoresInputs } from './logic';

const DEFAULTS: WinterStoresInputs = {
  climateZone: 'moderate',
  colonyStrength: 'average',
  currentStoresLbs: 40,
  hiveCount: 1,
};

const statusColors = {
  surplus: 'text-meadow-700 bg-meadow-50 border-meadow-200',
  adequate: 'text-blue-700 bg-blue-50 border-blue-200',
  deficit: 'text-orange-700 bg-orange-50 border-orange-200',
  critical: 'text-red-700 bg-red-50 border-red-200',
};

// Fix #5: Proper metric/imperial handling - input label and results both switch cleanly
export function WinterStoresCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('winter-stores', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateWinterStores(inputs), [inputs]);

  const copyText = () =>
    formatResultsForCopy('Winter Stores', [
      { label: 'Required per hive', value: isMetric ? `${result.requiredPerHiveKg} kg` : `${result.requiredPerHiveLbs} lbs` },
      { label: 'Deficit per hive', value: isMetric ? `${result.deficitPerHiveKg} kg` : `${result.deficitPerHiveLbs} lbs` },
      { label: 'Status', value: result.status.toUpperCase() },
    ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput
            label="Climate Zone"
            value={inputs.climateZone}
            onChange={(v) => updateInputs({ climateZone: v as ClimateZone })}
            options={[
              { value: 'north', label: 'Northern (long, cold winters)' },
              { value: 'moderate', label: 'Moderate (typical winters)' },
              { value: 'south', label: 'Southern (mild winters)' },
            ]}
          />
          <SelectInput
            label="Colony Strength"
            value={inputs.colonyStrength}
            onChange={(v) => updateInputs({ colonyStrength: v as 'strong' | 'average' | 'weak' })}
            options={[
              { value: 'strong', label: 'Strong (8+ frames of bees)' },
              { value: 'average', label: 'Average (5-7 frames)' },
              { value: 'weak', label: 'Weak (under 5 frames)' },
            ]}
          />
          <NumberInput
            label="Current Stores"
            value={inputs.currentStoresLbs}
            onChange={(v) => updateInputs({ currentStoresLbs: v })}
            unit="lbs"
            min={0}
            step={5}
            helpText={isMetric ? `≈ ${formatNumber(inputs.currentStoresLbs * 0.4536)} kg` : 'Estimated weight of honey/sugar stores'}
          />
          <NumberInput
            label="Number of Hives"
            value={inputs.hiveCount}
            onChange={(v) => updateInputs({ hiveCount: v })}
            min={1}
            step={1}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel>
        <ResultRow
          label="Required per hive"
          value={isMetric ? formatNumber(result.requiredPerHiveKg) : result.requiredPerHiveLbs}
          unit={isMetric ? 'kg' : 'lbs'}
          highlight
        />
        <ResultRow
          label="Deficit per hive"
          value={isMetric ? formatNumber(result.deficitPerHiveKg) : result.deficitPerHiveLbs}
          unit={isMetric ? 'kg' : 'lbs'}
          highlight={result.deficitPerHiveLbs > 0}
        />
        {inputs.hiveCount > 1 && (
          <ResultRow
            label="Total deficit (all hives)"
            value={isMetric ? formatNumber(result.totalDeficitLbs * 0.4536) : result.totalDeficitLbs}
            unit={isMetric ? 'kg' : 'lbs'}
          />
        )}
        {result.syrupGallonsNeeded > 0 && (
          <>
            <ResultRow
              label="2:1 syrup needed"
              value={isMetric ? formatNumber(result.syrupGallonsNeeded * 3.785) : result.syrupGallonsNeeded}
              unit={isMetric ? 'liters' : 'gallons'}
            />
            <ResultRow
              label="Sugar needed"
              value={isMetric ? formatNumber(result.sugarLbsNeeded * 0.4536) : result.sugarLbsNeeded}
              unit={isMetric ? 'kg' : 'lbs'}
            />
          </>
        )}

        <div className={`mt-4 p-4 rounded-lg border ${statusColors[result.status]}`}>
          <p className="font-medium capitalize mb-1">Status: {result.status}</p>
          <p className="text-sm">{result.statusMessage}</p>
        </div>
      </ResultPanel>

      <AssumptionsPanel
        assumptions={[
          { label: 'Northern winter stores', value: '~80 lbs / 36 kg per hive' },
          { label: 'Moderate winter stores', value: '~60 lbs / 27 kg per hive' },
          { label: 'Southern winter stores', value: '~40 lbs / 18 kg per hive' },
          { label: 'Syrup conversion', value: '~80% of fed syrup stored as honey equivalent' },
        ]}
      />
    </div>
  );
}
