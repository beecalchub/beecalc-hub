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
const DEFAULTS: Inputs = {"yourYieldLbs":500,"hiveCount":10,"region":"midwest"};
export function YieldPerHiveBenchmarkCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('yield-per-hive-benchmark', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('yield-per-hive-benchmark', [{ label: 'Your average per hive', value: String(result.yourAverage) }, { label: 'Regional average', value: String(result.regionalAverage) }, { label: 'Percent of average', value: String(result.percentOfAverage) }, { label: 'Your rank', value: String(result.rank) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Your Total Yield" value={inputs.yourYieldLbs} onChange={(v) => updateInputs({ yourYieldLbs: v })} unit="lbs" min={0} step={10} />
          <NumberInput label="Producing Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Region" value={inputs.region} onChange={(v) => updateInputs({ region: v as Inputs['region'] })} options={[{"value":"northern","label":"Northern"},{"value":"midwest","label":"Midwest"},{"value":"southern","label":"Southern"},{"value":"west","label":"West"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Your average per hive" value={String(result.yourAverage)} unit="lbs" highlight />
        <ResultRow label="Regional average" value={String(result.regionalAverage)} unit="lbs" />
        <ResultRow label="Percent of average" value={String(result.percentOfAverage)} unit="%" highlight />
        <ResultRow label="Your rank" value={String(result.rank)} highlight />
      </ResultPanel>
    </div>
  );
}
