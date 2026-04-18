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
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateLandArea, type LandAreaInputs } from './logic';
const DEFAULTS: LandAreaInputs = { lengthFt: 200, widthFt: 150, shape: 'rectangle', radiusFt: 100 };
export function LandAreaCoverageCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('land-area', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateLandArea(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Land Area', [{ label: 'Area', value: isMetric ? `${result.sqMeters} m² (${result.hectares} ha)` : `${result.sqFt} ft² (${result.acres} ac)` }, { label: 'Hives supported', value: result.hivesSupported }]);
  return (
    <div className="space-y-6">
      <Card><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectInput label="Shape" value={inputs.shape} onChange={(v) => updateInputs({ shape: v as LandAreaInputs['shape'] })} options={[{ value: 'rectangle', label: 'Rectangle' }, { value: 'circle', label: 'Circle' }, { value: 'triangle', label: 'Triangle' }]} />
        {inputs.shape === 'circle' ? (
          <NumberInput label="Radius" value={inputs.radiusFt} onChange={(v) => updateInputs({ radiusFt: v })} unit="ft" min={1} step={10} />
        ) : (<>
          <NumberInput label={inputs.shape === 'triangle' ? 'Base' : 'Length'} value={inputs.lengthFt} onChange={(v) => updateInputs({ lengthFt: v })} unit="ft" min={1} step={10} />
          <NumberInput label={inputs.shape === 'triangle' ? 'Height' : 'Width'} value={inputs.widthFt} onChange={(v) => updateInputs({ widthFt: v })} unit="ft" min={1} step={10} />
        </>)}
      </div><div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div></Card>
      <ResultPanel>
        <ResultRow label="Area" value={isMetric ? formatInteger(result.sqMeters) : formatInteger(result.sqFt)} unit={isMetric ? 'm²' : 'ft²'} highlight />
        <ResultRow label="Acres" value={formatNumber(result.acres, 3)} />
        <ResultRow label="Hectares" value={formatNumber(result.hectares, 3)} />
        <ResultRow label="Hives supported" value={result.hivesSupported} unit="hives" highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
