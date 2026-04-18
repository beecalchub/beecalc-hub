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
const DEFAULTS: Inputs = {"colonyCount":10,"expectedLossPercent":25,"replacementType":"nuc","avgPriceEach":200};
export function WinterLossReplacementCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('winter-loss-replacement', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('winter-loss-replacement', [{ label: 'Expected losses', value: String(result.lossesExpected) }, { label: 'Replacement cost', value: String(result.replacementCost) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Colonies Going Into Winter" value={inputs.colonyCount} onChange={(v) => updateInputs({ colonyCount: v })} min={1} step={1} />
          <NumberInput label="Expected Loss Rate" value={inputs.expectedLossPercent} onChange={(v) => updateInputs({ expectedLossPercent: v })} unit="%" min={0} max={100} step={5} />
          <SelectInput label="Replacement Type" value={inputs.replacementType} onChange={(v) => updateInputs({ replacementType: v as Inputs['replacementType'] })} options={[{"value":"nuc","label":"Nucs"},{"value":"package","label":"Packages"},{"value":"splits","label":"Splits (own)"}]} />
          <NumberInput label="Price per Unit" value={inputs.avgPriceEach} onChange={(v) => updateInputs({ avgPriceEach: v })} unit="$" min={0} step={10} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Expected losses" value={String(result.lossesExpected)} unit="colonies" highlight />
        <ResultRow label="Replacement cost" value={`$${result.replacementCost.toFixed(2)}`} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
