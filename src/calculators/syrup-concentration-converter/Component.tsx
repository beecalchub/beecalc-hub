'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatNumber, formatPercent } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateSyrupConversion, type SyrupConversionInputs } from './logic';

const DEFAULTS: SyrupConversionInputs = { mode: 'ratio-to-brix', sugarParts: 2, waterParts: 1, brix: 67 };

export function SyrupConcentrationConverterCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('syrup-conc', DEFAULTS);
  const result = useMemo(() => calculateSyrupConversion(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Syrup Concentration', [
    { label: 'Brix', value: `${result.brix}°` }, { label: 'Ratio', value: result.ratio },
  ]);
  return (
    <div className="space-y-6">
      <Card>
        <SelectInput label="Convert From" value={inputs.mode} onChange={(v) => updateInputs({ mode: v as SyrupConversionInputs['mode'] })} options={[
          { value: 'ratio-to-brix', label: 'Sugar:Water ratio → Brix / concentration' },
          { value: 'brix-to-ratio', label: 'Brix reading → ratio / composition' },
        ]} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {inputs.mode === 'ratio-to-brix' ? (<>
            <NumberInput label="Sugar Parts" value={inputs.sugarParts} onChange={(v) => updateInputs({ sugarParts: v })} min={0} step={0.5} helpText="By weight" />
            <NumberInput label="Water Parts" value={inputs.waterParts} onChange={(v) => updateInputs({ waterParts: v })} min={0.1} step={0.5} helpText="By weight" />
          </>) : (
            <NumberInput label="Brix Reading" value={inputs.brix} onChange={(v) => updateInputs({ brix: v })} unit="°Bx" min={0} max={85} step={1} helpText="From refractometer" />
          )}
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Brix" value={`${result.brix}°`} highlight />
        <ResultRow label="Sugar content" value={formatPercent(result.sugarPercent, 1)} />
        <ResultRow label="Approximate ratio" value={result.ratio} />
        <ResultRow label="Density" value={formatNumber(result.densityLbPerGal)} unit="lbs/gal" />
        <ResultRow label="Sugar per gallon" value={formatNumber(result.sugarLbsPerGallon)} unit="lbs" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.use}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: '1:1 syrup', value: '~50° Brix' }, { label: '2:1 syrup', value: '~67° Brix' },
        { label: 'Honey', value: '~80° Brix' }, { label: 'Density formula', value: 'Approximation based on sugar fraction' },
      ]} />
    </div>
  );
}
