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
const DEFAULTS: Inputs = {"boxWidthInches":18.375,"frameType":"standard"};
export function FoundationlessFrameSpacingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('foundationless-frame-spacing', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('foundationless-frame-spacing', [{ label: 'Frames that fit', value: String(result.framesFitting) }, { label: 'Gap between frames', value: String(result.spacingInches) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Box Interior Width" value={inputs.boxWidthInches} onChange={(v) => updateInputs({ boxWidthInches: v })} unit="in" min={10} max={25} step={0.125} />
          <SelectInput label="Frame Type" value={inputs.frameType} onChange={(v) => updateInputs({ frameType: v as Inputs['frameType'] })} options={[{"value":"standard","label":"Standard (1⅜\")"},{"value":"wide","label":"Wide (1½\")"},{"value":"narrow","label":"Narrow (1¼\")"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Frames that fit" value={String(result.framesFitting)} unit="frames" highlight />
        <ResultRow label="Gap between frames" value={String(result.spacingInches)} unit="in" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
