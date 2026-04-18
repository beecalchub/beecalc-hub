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
const DEFAULTS: Inputs = {"hiveCount":5,"climateType":"moderate","winterOrSummer":"winter"};
export function VentilationCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('ventilation', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('ventilation', [{ label: 'Ventilation area per hive', value: String(result.ventilationArea) }, { label: 'Recommended method', value: String(result.method) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Climate" value={inputs.climateType} onChange={(v) => updateInputs({ climateType: v as Inputs['climateType'] })} options={[{"value":"humid","label":"Humid"},{"value":"moderate","label":"Moderate"},{"value":"arid","label":"Arid"}]} />
          <SelectInput label="Season" value={inputs.winterOrSummer} onChange={(v) => updateInputs({ winterOrSummer: v as Inputs['winterOrSummer'] })} options={[{"value":"winter","label":"Winter"},{"value":"summer","label":"Summer"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Ventilation area per hive" value={String(result.ventilationArea)} unit="sq in" highlight />
        <ResultRow label="Recommended method" value={String(result.method)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
