'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatPercent, formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateBroodBreak, type BroodBreakInputs } from './logic';
const DEFAULTS: BroodBreakInputs = { currentMitePercent: 4, breakDays: 24, treatDuringBreak: true, treatmentEfficacy: 90 };
export function BroodBreakEffectCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('brood-break', DEFAULTS);
  const result = useMemo(() => calculateBroodBreak(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Brood Break Effect', [{ label: 'Reduction', value: formatPercent(result.miteReductionPercent, 0) }, { label: 'Result', value: formatPercent(result.resultingMitePercent) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Current Mite %" value={inputs.currentMitePercent} onChange={(v) => updateInputs({ currentMitePercent: v })} unit="%" min={0} max={20} step={0.5} />
          <NumberInput label="Brood Break Duration" value={inputs.breakDays} onChange={(v) => updateInputs({ breakDays: v })} unit="days" min={7} max={42} step={1} helpText="21 days = 1 full brood cycle" />
          <NumberInput label="Treatment Efficacy" value={inputs.treatmentEfficacy} onChange={(v) => updateInputs({ treatmentEfficacy: v })} unit="%" min={50} max={99} step={5} />
        </div>
        <div className="mt-3"><Checkbox label="Treat with OAV during broodless period" checked={inputs.treatDuringBreak} onChange={(v) => updateInputs({ treatDuringBreak: v })} /></div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Mite reduction" value={formatPercent(result.miteReductionPercent, 0)} highlight />
        <ResultRow label="Resulting mite level" value={formatPercent(result.resultingMitePercent)} highlight />
        <ResultRow label="Brood cycles disrupted" value={formatNumber(result.broodCyclesDisrupted)} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.explanation}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[{ label: 'Natural reduction per cycle', value: '~15% per brood cycle disrupted' }, { label: 'Max natural reduction', value: '~50%' }, { label: 'Brood cycle', value: '21 days' }]} />
    </div>
  );
}
