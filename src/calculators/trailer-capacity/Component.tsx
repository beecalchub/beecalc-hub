'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"trailerLengthFt":20,"trailerWidthFt":8,"hiveFootprintFt":1.75,"stackHeight":1};
export function TrailerCapacityCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('trailer-capacity', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('trailer-capacity', [{ label: 'Hives per layer', value: String(result.hivesPerLayer) }, { label: 'Total hives', value: String(result.totalHives) }, { label: 'Loaded weight', value: String(result.weightLbs) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Trailer Length" value={inputs.trailerLengthFt} onChange={(v) => updateInputs({ trailerLengthFt: v })} unit="ft" min={4} step={1} />
          <NumberInput label="Trailer Width" value={inputs.trailerWidthFt} onChange={(v) => updateInputs({ trailerWidthFt: v })} unit="ft" min={4} step={0.5} />
          <NumberInput label="Hive Footprint" value={inputs.hiveFootprintFt} onChange={(v) => updateInputs({ hiveFootprintFt: v })} unit="ft" min={1} max={3} step={0.1} />
          <NumberInput label="Stack Height" value={inputs.stackHeight} onChange={(v) => updateInputs({ stackHeight: v })} min={1} max={4} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Hives per layer" value={String(result.hivesPerLayer)} />
        <ResultRow label="Total hives" value={String(result.totalHives)} highlight />
        <ResultRow label="Loaded weight" value={String(result.weightLbs)} unit="lbs" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
