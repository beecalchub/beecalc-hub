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
import { formatNumber, formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateFeedCost, type FeedCostInputs } from './logic';

const DEFAULTS: FeedCostInputs = { sugarPricePerLb: 0.65, syrupRatio: '2:1', gallonsPerHive: 2, hiveCount: 5 };

// Fix #12: Added metric display in results
export function FeedCostCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('feed-cost', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateFeedCost(inputs), [inputs]);

  const copyText = () =>
    formatResultsForCopy('Feed Cost', [
      { label: 'Total sugar', value: isMetric ? `${formatNumber(result.totalSugarKg)} kg` : `${result.totalSugarLbs} lbs` },
      { label: 'Cost per hive', value: formatCurrency(result.costPerHive) },
      { label: 'Total cost', value: formatCurrency(result.totalCost) },
    ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput
            label="Sugar Price"
            value={inputs.sugarPricePerLb}
            onChange={(v) => updateInputs({ sugarPricePerLb: v })}
            unit="$ per lb"
            min={0.01}
            step={0.05}
          />
          <SelectInput
            label="Syrup Ratio"
            value={inputs.syrupRatio}
            onChange={(v) => updateInputs({ syrupRatio: v as '1:1' | '2:1' })}
            options={[
              { value: '1:1', label: '1:1 (Spring)' },
              { value: '2:1', label: '2:1 (Fall)' },
            ]}
          />
          <NumberInput
            label="Gallons per Hive"
            value={inputs.gallonsPerHive}
            onChange={(v) => updateInputs({ gallonsPerHive: v })}
            unit="gal"
            min={0.5}
            step={0.5}
            helpText={isMetric ? `≈ ${formatNumber(inputs.gallonsPerHive * 3.785)} L` : undefined}
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
        <ResultRow label="Total cost" value={formatCurrency(result.totalCost)} highlight />
        <ResultRow label="Cost per hive" value={formatCurrency(result.costPerHive)} highlight />
        <ResultRow
          label="Total sugar needed"
          value={isMetric ? formatNumber(result.totalSugarKg) : formatNumber(result.totalSugarLbs)}
          unit={isMetric ? 'kg' : 'lbs'}
        />
        <ResultRow
          label="Total syrup volume"
          value={isMetric ? formatNumber(result.totalSyrupGallons * 3.785) : formatNumber(result.totalSyrupGallons)}
          unit={isMetric ? 'liters' : 'gallons'}
        />
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: '1:1 syrup', value: '~5.3 lbs sugar per gallon' },
        { label: '2:1 syrup', value: '~10.6 lbs sugar per gallon' },
        { label: 'Water cost', value: 'Not included (negligible)' },
      ]} />
    </div>
  );
}
