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
const DEFAULTS: Inputs = {"framesOfBees":10,"queenYearsOld":1,"broodFrames":6,"storesFrames":3,"equipmentQuality":"good"};
export function ColonyScoringSaleValueCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('colony-scoring-sale-value', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('colony-scoring-sale-value', [{ label: 'Colony score', value: String(result.score) }, { label: 'Estimated value', value: String(result.estimatedValue) }, { label: 'Grade', value: String(result.grade) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frames of Bees" value={inputs.framesOfBees} onChange={(v) => updateInputs({ framesOfBees: v })} min={1} max={20} step={1} />
          <NumberInput label="Queen Age" value={inputs.queenYearsOld} onChange={(v) => updateInputs({ queenYearsOld: v })} unit="years" min={0} max={5} step={0.5} />
          <NumberInput label="Brood Frames" value={inputs.broodFrames} onChange={(v) => updateInputs({ broodFrames: v })} min={0} max={15} step={1} />
          <NumberInput label="Stores Frames" value={inputs.storesFrames} onChange={(v) => updateInputs({ storesFrames: v })} min={0} max={15} step={1} />
          <SelectInput label="Equipment Quality" value={inputs.equipmentQuality} onChange={(v) => updateInputs({ equipmentQuality: v as Inputs['equipmentQuality'] })} options={[{"value":"new","label":"New"},{"value":"good","label":"Good"},{"value":"used","label":"Well-used"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Colony score" value={String(result.score)} highlight />
        <ResultRow label="Estimated value" value={`$${result.estimatedValue.toFixed(2)}`} highlight />
        <ResultRow label="Grade" value={String(result.grade)} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
