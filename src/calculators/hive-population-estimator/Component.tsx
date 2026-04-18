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
import { formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculatePopulation, type PopulationInputs } from './logic';

const DEFAULTS: PopulationInputs = { framesCoveredWithBees: 8, framesOfBrood: 5, boxType: 'deep' };

const strengthColors = { weak: 'text-red-700 bg-red-50', moderate: 'text-yellow-700 bg-yellow-50', strong: 'text-meadow-700 bg-meadow-50', 'very-strong': 'text-blue-700 bg-blue-50' };

export function HivePopulationEstimatorCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('hive-pop', DEFAULTS);
  const result = useMemo(() => calculatePopulation(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Population Estimate', [
    { label: 'Estimated bees', value: formatInteger(result.estimatedBees) },
    { label: 'Strength', value: result.strengthLabel },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="Frames Covered with Bees" value={inputs.framesCoveredWithBees} onChange={(v) => updateInputs({ framesCoveredWithBees: v })} min={1} max={30} step={0.5} helpText="Both sides counted as one frame" />
          <NumberInput label="Frames of Brood" value={inputs.framesOfBrood} onChange={(v) => updateInputs({ framesOfBrood: v })} min={0} max={20} step={0.5} />
          <SelectInput label="Box Type" value={inputs.boxType} onChange={(v) => updateInputs({ boxType: v as 'deep' | 'medium' })} options={[{ value: 'deep', label: 'Deep (Langstroth)' }, { value: 'medium', label: 'Medium' }]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Estimated population" value={formatInteger(result.estimatedBees)} unit="bees" highlight />
        <ResultRow label="Bees emerging soon" value={formatInteger(result.emergingBees)} unit="bees" />
        <ResultRow label="Projected peak" value={formatInteger(result.projectedPeakPop)} unit="bees" />
        <div className={`mt-3 p-3 rounded-lg ${strengthColors[result.strength]}`}>
          <p className="text-sm font-medium">{result.strengthLabel}</p>
        </div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: 'Bees per deep frame', value: '~2,500' },
        { label: 'Bees per medium frame', value: '~1,750' },
        { label: 'Brood viability', value: '~80% of cells occupied, 90% emerge' },
      ]} />
    </div>
  );
}
