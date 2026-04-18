'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"hives":5,"deepBoxes":2,"mediumBoxes":2,"shallowBoxes":0,"boxWidth":10};
export function FrameCountByConfigCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('frame-count-by-config', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('frame-count-by-config', [{ label: 'Deep frames', value: String(result.deepFrames) }, { label: 'Medium frames', value: String(result.mediumFrames) }, { label: 'Shallow frames', value: String(result.shallowFrames) }, { label: 'Total frames', value: String(result.totalFrames) }, { label: 'Estimated cost', value: String(result.estimatedCost) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hives} onChange={(v) => updateInputs({ hives: v })} min={1} step={1} />
          <NumberInput label="Deep Boxes per Hive" value={inputs.deepBoxes} onChange={(v) => updateInputs({ deepBoxes: v })} min={0} max={4} step={1} />
          <NumberInput label="Medium Boxes per Hive" value={inputs.mediumBoxes} onChange={(v) => updateInputs({ mediumBoxes: v })} min={0} max={6} step={1} />
          <NumberInput label="Shallow Boxes per Hive" value={inputs.shallowBoxes} onChange={(v) => updateInputs({ shallowBoxes: v })} min={0} max={6} step={1} />
          <SelectInput label="Box Width" value={String(inputs.boxWidth)} onChange={(v) => updateInputs({ boxWidth: Number(v) })} options={[{"value":"10","label":"10-frame"},{"value":"8","label":"8-frame"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Deep frames" value={String(result.deepFrames)} />
        <ResultRow label="Medium frames" value={String(result.mediumFrames)} />
        <ResultRow label="Shallow frames" value={String(result.shallowFrames)} />
        <ResultRow label="Total frames" value={String(result.totalFrames)} highlight />
        <ResultRow label="Estimated cost" value={`$${result.estimatedCost.toFixed(2)}`} highlight />
      </ResultPanel>
    </div>
  );
}
