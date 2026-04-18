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
const DEFAULTS: Inputs = {"rawWaxLbs":5,"method":"hot-water","cleanliness":"medium"};
export function WaxRenderingYieldCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('wax-rendering-yield', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('wax-rendering-yield', [{ label: 'Clean wax yield', value: String(result.cleanWaxLbs) }, { label: 'Yield percentage', value: String(result.yieldPercent) }, { label: 'Slumgum/waste', value: String(result.slumgumLbs) }, { label: 'Estimated value', value: String(result.valueEstimate) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Raw Wax Input" value={inputs.rawWaxLbs} onChange={(v) => updateInputs({ rawWaxLbs: v })} unit="lbs" min={0.5} step={1} />
          <SelectInput label="Rendering Method" value={inputs.method} onChange={(v) => updateInputs({ method: v as Inputs['method'] })} options={[{"value":"solar","label":"Solar melter"},{"value":"hot-water","label":"Hot water bath"},{"value":"steam","label":"Steam"},{"value":"electric","label":"Electric wax melter"}]} />
          <SelectInput label="Wax Cleanliness" value={inputs.cleanliness} onChange={(v) => updateInputs({ cleanliness: v as Inputs['cleanliness'] })} options={[{"value":"dirty","label":"Dirty (old brood comb)"},{"value":"medium","label":"Medium"},{"value":"clean","label":"Clean (cappings)"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Clean wax yield" value={result.cleanWaxLbs} unit="lbs" highlight />
        <ResultRow label="Yield percentage" value={result.yieldPercent} unit="%" />
        <ResultRow label="Slumgum/waste" value={result.slumgumLbs} unit="lbs" />
        <ResultRow label="Estimated value" value={`$${result.valueEstimate.toFixed(2)}`} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
