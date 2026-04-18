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
const DEFAULTS: Inputs = {"hiveCount":5,"broodBoxes":2,"supers":2,"frameSize":"deep"};
export function FoundationSheetRequirementCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('foundation-sheet-requirement', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('foundation-sheet-requirement', [{ label: 'Total foundation sheets', value: String(result.totalFrames) }, { label: 'Deep sheets', value: String(result.deepSheets) }, { label: 'Medium sheets', value: String(result.mediumSheets) }, { label: 'Shallow sheets', value: String(result.shallowSheets) }, { label: 'Estimated cost', value: String(result.estimatedCost) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Brood Boxes per Hive" value={inputs.broodBoxes} onChange={(v) => updateInputs({ broodBoxes: v })} min={1} max={3} step={1} />
          <NumberInput label="Supers per Hive" value={inputs.supers} onChange={(v) => updateInputs({ supers: v })} min={0} max={5} step={1} />
          <SelectInput label="Brood Frame Size" value={inputs.frameSize} onChange={(v) => updateInputs({ frameSize: v as Inputs['frameSize'] })} options={[{"value":"deep","label":"Deep"},{"value":"medium","label":"Medium"},{"value":"shallow","label":"Shallow"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total foundation sheets" value={result.totalFrames} unit="sheets" highlight />
        <ResultRow label="Deep sheets" value={result.deepSheets} />
        <ResultRow label="Medium sheets" value={result.mediumSheets} />
        <ResultRow label="Shallow sheets" value={result.shallowSheets} />
        <ResultRow label="Estimated cost" value={`$${result.estimatedCost.toFixed(2)}`} highlight />
      </ResultPanel>
    </div>
  );
}
