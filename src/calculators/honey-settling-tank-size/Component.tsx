'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateSettlingTank } from './logic';
const DEFAULTS = { totalHoneyLbs: 200, settlingDays: 3, batchesPerSeason: 2 };
export function HoneySettlingTankSizeCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('settling-tank', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateSettlingTank(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Settling Tank', [{ label: 'Volume needed', value: isMetric ? `${result.volumeLiters} L` : `${result.volumeGallons} gal` }, { label: 'Recommended tank', value: `${result.recommendedTankGallons} gal` }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="Total Honey (season)" value={inputs.totalHoneyLbs} onChange={(v) => updateInputs({ totalHoneyLbs: v })} unit="lbs" min={10} step={25} />
          <NumberInput label="Batches per Season" value={inputs.batchesPerSeason} onChange={(v) => updateInputs({ batchesPerSeason: v })} min={1} max={10} step={1} />
          <NumberInput label="Settling Days" value={inputs.settlingDays} onChange={(v) => updateInputs({ settlingDays: v })} unit="days" min={1} max={14} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Honey volume per batch" value={isMetric ? formatNumber(result.volumeLiters) : formatNumber(result.volumeGallons)} unit={isMetric ? 'liters' : 'gallons'} />
        <ResultRow label="Recommended tank size" value={result.recommendedTankGallons} unit="gallons" highlight />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Tips</h3>
        <ul className="space-y-2" role="list">{result.tips.map((t, i) => (<li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{t}</li>))}</ul>
      </Card>
    </div>
  );
}
