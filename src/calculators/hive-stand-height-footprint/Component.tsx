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
const DEFAULTS: Inputs = {"accessibilityNeeds":"medium","hiveWidthInches":16.25,"hiveDepthInches":19.875};
export function HiveStandHeightFootprintCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('hive-stand-height-footprint', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('hive-stand-height-footprint', [{ label: 'Recommended stand height', value: String(result.recommendedHeightInches) }, { label: 'Hive footprint', value: String(result.footprintSqIn) }, { label: 'Space between hives', value: String(result.spaceBetweenInches) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Accessibility Needs" value={inputs.accessibilityNeeds} onChange={(v) => updateInputs({ accessibilityNeeds: v as Inputs['accessibilityNeeds'] })} options={[{"value":"low","label":"Low (12\")"},{"value":"medium","label":"Medium (18\")"},{"value":"high","label":"High/back-friendly (24\")"}]} />
          <NumberInput label="Hive Width" value={inputs.hiveWidthInches} onChange={(v) => updateInputs({ hiveWidthInches: v })} unit="in" min={10} step={0.5} />
          <NumberInput label="Hive Depth" value={inputs.hiveDepthInches} onChange={(v) => updateInputs({ hiveDepthInches: v })} unit="in" min={10} step={0.5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Recommended stand height" value={String(result.recommendedHeightInches)} unit="in" highlight />
        <ResultRow label="Hive footprint" value={String(result.footprintSqIn)} unit="sq in" />
        <ResultRow label="Space between hives" value={String(result.spaceBetweenInches)} unit="in" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
