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
const DEFAULTS: Inputs = {"frameLengthIn":17.625,"frameHeightIn":9,"coveredLengthIn":14,"coveredHeightIn":7};
export function FrameCoveragePercentCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('frame-coverage-percent', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('frame-coverage-percent', [{ label: 'Coverage', value: String(result.coveragePercent) }, { label: 'Area covered', value: String(result.coveredSqIn) }, { label: 'Total frame area', value: String(result.totalSqIn) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frame Length" value={inputs.frameLengthIn} onChange={(v) => updateInputs({ frameLengthIn: v })} unit="in" min={10} step={0.25} />
          <NumberInput label="Frame Height" value={inputs.frameHeightIn} onChange={(v) => updateInputs({ frameHeightIn: v })} unit="in" min={4} step={0.25} />
          <NumberInput label="Covered Length" value={inputs.coveredLengthIn} onChange={(v) => updateInputs({ coveredLengthIn: v })} unit="in" min={0} step={0.5} />
          <NumberInput label="Covered Height" value={inputs.coveredHeightIn} onChange={(v) => updateInputs({ coveredHeightIn: v })} unit="in" min={0} step={0.5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Coverage" value={String(result.coveragePercent)} unit="%" highlight />
        <ResultRow label="Area covered" value={String(result.coveredSqIn)} unit="sq in" />
        <ResultRow label="Total frame area" value={String(result.totalSqIn)} unit="sq in" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.description}</div>
      </ResultPanel>
    </div>
  );
}
