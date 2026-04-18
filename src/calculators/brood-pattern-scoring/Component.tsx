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
const DEFAULTS: Inputs = {"emptyCells":10,"totalCells":100,"cappedRatio":80,"solidityVisual":"mostly-solid"};
export function BroodPatternScoringCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('brood-pattern-scoring', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('brood-pattern-scoring', [{ label: 'Pattern score', value: String(result.score) }, { label: 'Grade', value: String(result.grade) }, { label: 'Empty cell percentage', value: String(result.emptyPercent) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Empty Cells in Brood Area" value={inputs.emptyCells} onChange={(v) => updateInputs({ emptyCells: v })} min={0} step={1} />
          <NumberInput label="Total Brood Cells Inspected" value={inputs.totalCells} onChange={(v) => updateInputs({ totalCells: v })} min={1} step={10} />
          <NumberInput label="Capped Brood Ratio" value={inputs.cappedRatio} onChange={(v) => updateInputs({ cappedRatio: v })} unit="%" min={0} max={100} step={5} />
          <SelectInput label="Visual Pattern" value={inputs.solidityVisual} onChange={(v) => updateInputs({ solidityVisual: v as Inputs['solidityVisual'] })} options={[{"value":"solid","label":"Solid"},{"value":"mostly-solid","label":"Mostly solid"},{"value":"mixed","label":"Mixed"},{"value":"spotty","label":"Spotty"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Pattern score" value={result.score} highlight />
        <ResultRow label="Grade" value={result.grade} highlight />
        <ResultRow label="Empty cell percentage" value={result.emptyPercent} unit="%" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.diagnosis}</div>
      </ResultPanel>
    </div>
  );
}
