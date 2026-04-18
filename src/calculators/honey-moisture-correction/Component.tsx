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
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatPercent } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateMoistureCorrection } from './logic';

const DEFAULTS = { currentMoisture: 19.5, targetMoisture: 18.0, honeyWeightLbs: 60 };

export function HoneyMoistureCorrectionCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('moisture-correction', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateMoistureCorrection(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Moisture Correction', [
    { label: 'Current', value: formatPercent(inputs.currentMoisture) },
    { label: 'Water to remove', value: isMetric ? `${formatNumber(result.waterToRemoveKg)} kg` : `${formatNumber(result.waterToRemoveLbs)} lbs` },
    { label: 'Final weight', value: isMetric ? `${formatNumber(result.finalWeightKg)} kg` : `${formatNumber(result.finalWeightLbs)} lbs` },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="Current Moisture" value={inputs.currentMoisture} onChange={(v) => updateInputs({ currentMoisture: v })} unit="%" min={10} max={30} step={0.1} helpText="From refractometer reading" />
          <NumberInput label="Target Moisture" value={inputs.targetMoisture} onChange={(v) => updateInputs({ targetMoisture: v })} unit="%" min={10} max={20} step={0.1} />
          <NumberInput label="Honey Weight" value={inputs.honeyWeightLbs} onChange={(v) => updateInputs({ honeyWeightLbs: v })} unit="lbs" min={1} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <div className={`p-3 rounded-lg border mb-3 ${result.isAcceptable ? 'bg-meadow-50 border-meadow-200 text-meadow-700' : 'bg-orange-50 border-orange-200 text-orange-700'}`}>
          <p className="text-sm font-medium">{result.status}</p>
        </div>
        {result.needsDrying && (
          <>
            <ResultRow label="Water to remove" value={isMetric ? formatNumber(result.waterToRemoveKg) : formatNumber(result.waterToRemoveLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
            <ResultRow label="Weight loss" value={formatPercent(result.weightLossPercent)} />
            <ResultRow label="Final weight" value={isMetric ? formatNumber(result.finalWeightKg) : formatNumber(result.finalWeightLbs)} unit={isMetric ? 'kg' : 'lbs'} />
          </>
        )}
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: 'Ideal moisture', value: '≤18.0%' },
        { label: 'Legal max (most regions)', value: '18.6%' },
        { label: 'Fermentation risk', value: 'Increases rapidly above 19%' },
      ]} />
    </div>
  );
}
