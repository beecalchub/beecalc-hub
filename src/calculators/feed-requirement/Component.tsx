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
import { calculateFeedRequirement, type FeedRequirementInputs } from './logic';

const DEFAULTS: FeedRequirementInputs = { hiveCount: 5, avgPopulationFrames: 7, season: 'fall-prep', currentStoresLbs: 10, daysToFeed: 30 };

export function FeedRequirementCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('feed-req', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateFeedRequirement(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Feed Requirement', [
    { label: 'Deficit', value: isMetric ? `${result.deficitKg} kg` : `${result.deficitLbs} lbs` },
    { label: 'Sugar needed', value: isMetric ? `${result.sugarKg} kg` : `${result.sugarLbs} lbs` },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Avg Frames of Bees" value={inputs.avgPopulationFrames} onChange={(v) => updateInputs({ avgPopulationFrames: v })} min={1} max={20} step={1} />
          <SelectInput label="Season / Purpose" value={inputs.season} onChange={(v) => updateInputs({ season: v as FeedRequirementInputs['season'] })} options={[
            { value: 'spring-buildup', label: 'Spring Buildup' }, { value: 'dearth', label: 'Summer Dearth' },
            { value: 'fall-prep', label: 'Fall Preparation' }, { value: 'winter', label: 'Winter' },
          ]} />
          <NumberInput label="Days to Feed" value={inputs.daysToFeed} onChange={(v) => updateInputs({ daysToFeed: v })} min={7} max={180} step={7} />
          <NumberInput label="Current Stores per Hive" value={inputs.currentStoresLbs} onChange={(v) => updateInputs({ currentStoresLbs: v })} unit="lbs" min={0} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Daily consumption (all hives)" value={isMetric ? formatNumber(result.dailyConsumptionLbs * 0.4536) : formatNumber(result.dailyConsumptionLbs)} unit={isMetric ? 'kg/day' : 'lbs/day'} />
        <ResultRow label="Total needed" value={isMetric ? formatNumber(result.totalNeededKg) : formatNumber(result.totalNeededLbs)} unit={isMetric ? 'kg' : 'lbs'} />
        <ResultRow label="Feed deficit" value={isMetric ? formatNumber(result.deficitKg) : formatNumber(result.deficitLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        {result.deficitLbs > 0 && (<>
          <ResultRow label="Syrup to make" value={isMetric ? formatNumber(result.syrupLiters) : result.syrupGallons} unit={isMetric ? 'liters' : 'gallons'} highlight />
          <ResultRow label="Sugar to buy" value={isMetric ? formatNumber(result.sugarKg) : formatNumber(result.sugarLbs)} unit={isMetric ? 'kg' : 'lbs'} />
        </>)}
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.feedingSchedule}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: 'Spring consumption', value: '~0.15 lbs/frame/day' },
        { label: 'Fall consumption', value: '~0.12 lbs/frame/day' },
        { label: 'Winter consumption', value: '~0.06 lbs/frame/day' },
      ]} />
    </div>
  );
}
