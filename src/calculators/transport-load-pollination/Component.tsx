'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"hivesToMove":48,"truckCapacity":48,"avgHiveWeight":120,"tripMiles":50};
export function TransportLoadPollinationCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('transport-load-pollination', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('transport-load-pollination', [{ label: 'Loads needed', value: String(result.loadsNeeded) }, { label: 'Total weight', value: String(result.totalWeight) }, { label: 'Driving time', value: String(result.drivingTimeHours) }, { label: 'Fuel cost estimate', value: String(result.fuelCostEstimate) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Hives to Move" value={inputs.hivesToMove} onChange={(v) => updateInputs({ hivesToMove: v })} min={1} step={1} />
          <NumberInput label="Truck Capacity" value={inputs.truckCapacity} onChange={(v) => updateInputs({ truckCapacity: v })} unit="hives" min={1} step={4} />
          <NumberInput label="Avg Hive Weight" value={inputs.avgHiveWeight} onChange={(v) => updateInputs({ avgHiveWeight: v })} unit="lbs" min={50} step={10} />
          <NumberInput label="Trip Distance One-way" value={inputs.tripMiles} onChange={(v) => updateInputs({ tripMiles: v })} unit="mi" min={1} step={10} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Loads needed" value={String(result.loadsNeeded)} unit="loads" highlight />
        <ResultRow label="Total weight" value={String(result.totalWeight)} unit="lbs" />
        <ResultRow label="Driving time" value={String(result.drivingTimeHours)} unit="hrs" />
        <ResultRow label="Fuel cost estimate" value={`$${result.fuelCostEstimate.toFixed(2)}`} highlight />
      </ResultPanel>
    </div>
  );
}
