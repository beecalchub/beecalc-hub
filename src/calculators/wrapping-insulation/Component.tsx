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
const DEFAULTS: Inputs = {"hiveCount":5,"wrapType":"foam-board","winterLowF":10,"windExposure":"moderate"};
export function WrappingInsulationCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('wrapping-insulation', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('wrapping-insulation', [{ label: 'Total wrap area', value: String(result.wrapAreaSqFt) }, { label: 'Cost per hive', value: String(result.materialCostEach) }, { label: 'Total cost', value: String(result.totalCost) }, { label: 'Target R-value', value: String(result.rValueTarget) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Wrap Type" value={inputs.wrapType} onChange={(v) => updateInputs({ wrapType: v as Inputs['wrapType'] })} options={[{"value":"tar-paper","label":"Tar paper"},{"value":"foam-board","label":"Foam board"},{"value":"quilt-box","label":"Quilt box"},{"value":"none","label":"No wrap"}]} />
          <NumberInput label="Winter Low Temp" value={inputs.winterLowF} onChange={(v) => updateInputs({ winterLowF: v })} unit="°F" min={-40} max={50} step={5} />
          <SelectInput label="Wind Exposure" value={inputs.windExposure} onChange={(v) => updateInputs({ windExposure: v as Inputs['windExposure'] })} options={[{"value":"sheltered","label":"Sheltered"},{"value":"moderate","label":"Moderate"},{"value":"exposed","label":"Exposed"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total wrap area" value={String(result.wrapAreaSqFt)} unit="sq ft" />
        <ResultRow label="Cost per hive" value={`$${result.materialCostEach.toFixed(2)}`} />
        <ResultRow label="Total cost" value={`$${result.totalCost.toFixed(2)}`} highlight />
        <ResultRow label="Target R-value" value={String(result.rValueTarget)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
