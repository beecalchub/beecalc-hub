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
const DEFAULTS: Inputs = {"milesEachWay":100,"baseRatePerMile":0.5,"fuelPricePerGallon":4,"truckMpg":8};
export function TravelSurchargeCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('travel-surcharge', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('travel-surcharge', [{ label: 'Round trip miles', value: String(result.roundTripMiles) }, { label: 'Fuel cost', value: String(result.fuelCost) }, { label: 'Total surcharge', value: String(result.totalSurcharge) }, { label: 'Per mile', value: String(result.perMile) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Miles Each Way" value={inputs.milesEachWay} onChange={(v) => updateInputs({ milesEachWay: v })} min={0} step={10} />
          <NumberInput label="Base Rate per Mile" value={inputs.baseRatePerMile} onChange={(v) => updateInputs({ baseRatePerMile: v })} unit="$" min={0} step={0.05} />
          <NumberInput label="Fuel Price" value={inputs.fuelPricePerGallon} onChange={(v) => updateInputs({ fuelPricePerGallon: v })} unit="$/gal" min={0} step={0.1} />
          <NumberInput label="Truck MPG (loaded)" value={inputs.truckMpg} onChange={(v) => updateInputs({ truckMpg: v })} min={4} max={30} step={0.5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Round trip miles" value={String(result.roundTripMiles)} unit="mi" />
        <ResultRow label="Fuel cost" value={`$${result.fuelCost.toFixed(2)}`} />
        <ResultRow label="Total surcharge" value={`$${result.totalSurcharge.toFixed(2)}`} highlight />
        <ResultRow label="Per mile" value={`$${result.perMile.toFixed(2)}`} />
      </ResultPanel>
    </div>
  );
}
