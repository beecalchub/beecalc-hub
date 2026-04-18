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
const DEFAULTS: Inputs = {"strongHiveBrood":8,"strongHiveBees":10,"weakHiveBrood":2,"weakHiveBees":4};
export function HiveBalancingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('hive-balancing', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('hive-balancing', [{ label: 'Transfer brood frames', value: String(result.transferBrood) }, { label: 'New strong hive brood', value: String(result.newStrongBrood) }, { label: 'New weak hive brood', value: String(result.newWeakBrood) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Strong Hive - Brood Frames" value={inputs.strongHiveBrood} onChange={(v) => updateInputs({ strongHiveBrood: v })} unit="frames" min={0} step={1} />
          <NumberInput label="Strong Hive - Bee Frames" value={inputs.strongHiveBees} onChange={(v) => updateInputs({ strongHiveBees: v })} unit="frames" min={0} step={1} />
          <NumberInput label="Weak Hive - Brood Frames" value={inputs.weakHiveBrood} onChange={(v) => updateInputs({ weakHiveBrood: v })} unit="frames" min={0} step={1} />
          <NumberInput label="Weak Hive - Bee Frames" value={inputs.weakHiveBees} onChange={(v) => updateInputs({ weakHiveBees: v })} unit="frames" min={0} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Transfer brood frames" value={result.transferBrood} unit="frames" highlight />
        <ResultRow label="New strong hive brood" value={result.newStrongBrood} unit="frames" />
        <ResultRow label="New weak hive brood" value={result.newWeakBrood} unit="frames" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
