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
const DEFAULTS: Inputs = {"hiveCount":48,"hivesPerPallet":4,"palletsPerTruck":12};
export function PalletLoadingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('pallet-loading', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('pallet-loading', [{ label: 'Pallets needed', value: String(result.palletsNeeded) }, { label: 'Trucks needed', value: String(result.trucksNeeded) }, { label: 'Hives per truck', value: String(result.hivesPerTruck) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Hives per Pallet" value={String(inputs.hivesPerPallet)} onChange={(v) => updateInputs({ hivesPerPallet: Number(v) })} options={[{"value":"4","label":"4-way"},{"value":"6","label":"6-way"},{"value":"8","label":"8-way"}]} />
          <NumberInput label="Pallets per Truck Load" value={inputs.palletsPerTruck} onChange={(v) => updateInputs({ palletsPerTruck: v })} min={1} max={60} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Pallets needed" value={String(result.palletsNeeded)} unit="pallets" highlight />
        <ResultRow label="Trucks needed" value={String(result.trucksNeeded)} unit="loads" highlight />
        <ResultRow label="Hives per truck" value={String(result.hivesPerTruck)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
