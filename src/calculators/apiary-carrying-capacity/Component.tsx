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
const DEFAULTS: Inputs = {"forageAcres":20,"floraQuality":"good","competingHivesNearby":0};
export function ApiaryCarryingCapacityCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('apiary-carrying-capacity', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('apiary-carrying-capacity', [{ label: 'Maximum hives supported', value: String(result.maxHives) }, { label: 'Recommended (70% capacity)', value: String(result.recommendedHives) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Forage Area" value={inputs.forageAcres} onChange={(v) => updateInputs({ forageAcres: v })} unit="acres" min={0.5} step={5} />
          <SelectInput label="Flora Quality" value={inputs.floraQuality} onChange={(v) => updateInputs({ floraQuality: v as Inputs['floraQuality'] })} options={[{"value":"excellent","label":"Excellent"},{"value":"good","label":"Good"},{"value":"moderate","label":"Moderate"},{"value":"poor","label":"Poor"}]} />
          <NumberInput label="Competing Hives Nearby" value={inputs.competingHivesNearby} onChange={(v) => updateInputs({ competingHivesNearby: v })} min={0} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Maximum hives supported" value={result.maxHives} unit="hives" highlight />
        <ResultRow label="Recommended (70% capacity)" value={result.recommendedHives} unit="hives" highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
