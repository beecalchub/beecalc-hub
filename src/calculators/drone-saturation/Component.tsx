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
const DEFAULTS: Inputs = {"queensBreeding":5,"droneColoniesNearby":20,"dcaDistanceMiles":2};
export function DroneSaturationCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('drone-saturation', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('drone-saturation', [{ label: 'Estimated drones', value: String(result.dronesEstimated) }, { label: 'Drones per queen', value: String(result.saturationRatio) }, { label: 'Adequate saturation?', value: String(result.adequate) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Queens to Breed" value={inputs.queensBreeding} onChange={(v) => updateInputs({ queensBreeding: v })} min={1} step={1} />
          <NumberInput label="Drone Colonies Within 3mi" value={inputs.droneColoniesNearby} onChange={(v) => updateInputs({ droneColoniesNearby: v })} min={0} step={1} />
          <NumberInput label="Known DCA Distance" value={inputs.dcaDistanceMiles} onChange={(v) => updateInputs({ dcaDistanceMiles: v })} unit="mi" min={0} max={10} step={0.5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Estimated drones" value={String(result.dronesEstimated)} unit="drones" highlight />
        <ResultRow label="Drones per queen" value={String(result.saturationRatio)} />
        <ResultRow label="Adequate saturation?" value={result.adequate ? 'Yes' : 'No'} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
