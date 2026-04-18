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
const DEFAULTS: Inputs = {"tempHighF":82,"tempLowF":62,"rainfallInches":1.2,"daylight":14};
export function WeatherLinkedNectarFlowCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('weather-linked-nectar-flow', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('weather-linked-nectar-flow', [{ label: 'Nectar flow index', value: String(result.nectarFlowIndex) }, { label: 'Condition', value: String(result.condition) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Daily High" value={inputs.tempHighF} onChange={(v) => updateInputs({ tempHighF: v })} unit="°F" min={30} max={110} step={1} />
          <NumberInput label="Daily Low" value={inputs.tempLowF} onChange={(v) => updateInputs({ tempLowF: v })} unit="°F" min={10} max={90} step={1} />
          <NumberInput label="Weekly Rainfall" value={inputs.rainfallInches} onChange={(v) => updateInputs({ rainfallInches: v })} unit="in" min={0} max={10} step={0.1} />
          <NumberInput label="Daylight Hours" value={inputs.daylight} onChange={(v) => updateInputs({ daylight: v })} min={8} max={16} step={0.5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Nectar flow index" value={String(result.nectarFlowIndex)} highlight />
        <ResultRow label="Condition" value={String(result.condition)} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
