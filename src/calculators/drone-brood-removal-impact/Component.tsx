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
import { formatPercent, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateDroneBroodRemoval } from './logic';
const DEFAULTS = { framesRemoved: 1, removalFrequencyDays: 24, cyclesPerSeason: 3, currentMitePercent: 3 };
export function DroneBroodRemovalImpactCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('drone-removal', DEFAULTS);
  const result = useMemo(() => calculateDroneBroodRemoval(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Drone Brood Removal', [{ label: 'Mites trapped', value: formatInteger(result.totalMitesTrapped) }, { label: 'Reduction', value: formatPercent(result.reductionPercent, 0) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Drone Frames Removed per Cycle" value={inputs.framesRemoved} onChange={(v) => updateInputs({ framesRemoved: v })} min={1} max={4} step={1} />
          <NumberInput label="Removal Cycles per Season" value={inputs.cyclesPerSeason} onChange={(v) => updateInputs({ cyclesPerSeason: v })} min={1} max={6} step={1} />
          <NumberInput label="Current Mite %" value={inputs.currentMitePercent} onChange={(v) => updateInputs({ currentMitePercent: v })} unit="%" min={0} max={20} step={0.5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Estimated mites trapped" value={formatInteger(result.totalMitesTrapped)} unit="total season" highlight />
        <ResultRow label="Mite reduction" value={formatPercent(result.reductionPercent, 0)} highlight />
        <ResultRow label="Resulting mite level" value={formatPercent(result.resultingMitePercent)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[{ label: 'Mites per drone frame', value: '~200 (full capped drone frame)' }, { label: 'Max reduction', value: '~30% as standalone method' }, { label: 'Best combined with', value: 'OAV, formic acid, or other treatments' }]} />
    </div>
  );
}
