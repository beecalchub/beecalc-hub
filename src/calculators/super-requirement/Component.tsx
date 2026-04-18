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
import { formatInteger, formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateSuperRequirement, type SuperInputs } from './logic';

const DEFAULTS: SuperInputs = { hiveCount: 5, flowStrength: 'moderate', frameType: 'medium', framesPerBox: 10 };

export function SuperRequirementCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('super-req', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateSuperRequirement(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Super Requirement', [
    { label: 'Supers per hive', value: result.supersPerHive },
    { label: 'Total supers', value: result.totalSupers },
    { label: 'Est. yield', value: isMetric ? `${result.estimatedYieldKg} kg` : `${result.estimatedYieldLbs} lbs` },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Expected Flow Strength" value={inputs.flowStrength} onChange={(v) => updateInputs({ flowStrength: v as 'light' | 'moderate' | 'heavy' })} options={[{ value: 'light', label: 'Light (1 super/hive)' }, { value: 'moderate', label: 'Moderate (2 supers/hive)' }, { value: 'heavy', label: 'Heavy (3 supers/hive)' }]} />
          <SelectInput label="Super Type" value={inputs.frameType} onChange={(v) => updateInputs({ frameType: v as 'deep' | 'medium' | 'shallow' })} options={[{ value: 'deep', label: 'Deep' }, { value: 'medium', label: 'Medium' }, { value: 'shallow', label: 'Shallow' }]} />
          <NumberInput label="Frames per Box" value={inputs.framesPerBox} onChange={(v) => updateInputs({ framesPerBox: v })} min={8} max={12} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Supers per hive" value={result.supersPerHive} highlight />
        <ResultRow label="Total supers needed" value={formatInteger(result.totalSupers)} highlight />
        <ResultRow label="Total frames" value={formatInteger(result.totalFrames)} />
        <ResultRow label="Max estimated yield" value={isMetric ? formatNumber(result.estimatedYieldKg) : formatNumber(result.estimatedYieldLbs)} unit={isMetric ? 'kg' : 'lbs'} />
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: 'Deep super capacity', value: '~80 lbs when full' },
        { label: 'Medium super capacity', value: '~50 lbs when full' },
        { label: 'Shallow super capacity', value: '~35 lbs when full' },
        { label: 'Note', value: 'Always have an extra super ready per hive' },
      ]} />
    </div>
  );
}
