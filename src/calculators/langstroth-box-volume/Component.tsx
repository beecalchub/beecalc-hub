'use client';
import React, { useMemo } from 'react';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"boxType":"deep","frameCount":10};
export function LangstrothBoxVolumeCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('langstroth-box-volume', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('langstroth-box-volume', [{ label: 'Volume (cubic inches)', value: String(result.volumeCuIn) }, { label: 'Volume (liters)', value: String(result.volumeLiters) }, { label: 'Honey capacity', value: String(result.honeyCapacityLbs) }, { label: 'Full box weight', value: String(result.weightFullLbs) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Box Type" value={inputs.boxType} onChange={(v) => updateInputs({ boxType: v as Inputs['boxType'] })} options={[{"value":"deep","label":"Deep (9⅝\")"},{"value":"medium","label":"Medium (6⅝\")"},{"value":"shallow","label":"Shallow (5¾\")"}]} />
          <SelectInput label="Frame Count" value={String(inputs.frameCount)} onChange={(v) => updateInputs({ frameCount: Number(v) })} options={[{"value":"10","label":"10-frame"},{"value":"8","label":"8-frame"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Volume (cubic inches)" value={String(result.volumeCuIn)} unit="in³" highlight />
        <ResultRow label="Volume (liters)" value={String(result.volumeLiters)} unit="L" />
        <ResultRow label="Honey capacity" value={String(result.honeyCapacityLbs)} unit="lbs" highlight />
        <ResultRow label="Full box weight" value={String(result.weightFullLbs)} unit="lbs" />
      </ResultPanel>
    </div>
  );
}
