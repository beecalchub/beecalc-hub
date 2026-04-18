'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"perimeterFt":100,"bearPressure":"medium","hasGround":false};
export function ElectricFenceRequirementCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('electric-fence-requirement', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('electric-fence-requirement', [{ label: 'Wire strands', value: String(result.wireStrands) }, { label: 'Total wire', value: String(result.totalWireFt) }, { label: 'Energizer output', value: String(result.energizerJoules) }, { label: 'Estimated cost', value: String(result.estimatedCost) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Perimeter" value={inputs.perimeterFt} onChange={(v) => updateInputs({ perimeterFt: v })} unit="ft" min={20} step={10} />
          <SelectInput label="Bear Pressure" value={inputs.bearPressure} onChange={(v) => updateInputs({ bearPressure: v as Inputs['bearPressure'] })} options={[{"value":"low","label":"Low (4 strands)"},{"value":"medium","label":"Medium (5 strands)"},{"value":"high","label":"High (6 strands)"}]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Ground rods already installed" checked={inputs.hasGround} onChange={(v) => updateInputs({ hasGround: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Wire strands" value={String(result.wireStrands)} unit="strands" highlight />
        <ResultRow label="Total wire" value={String(result.totalWireFt)} unit="ft" />
        <ResultRow label="Energizer output" value={String(result.energizerJoules)} unit="joules" />
        <ResultRow label="Estimated cost" value={`$${result.estimatedCost.toFixed(2)}`} highlight />
      </ResultPanel>
      {result.tips.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Tips</h3>
        <ul className="space-y-2" role="list">{result.tips.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
