'use client';
import React, { useMemo } from 'react';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"equipmentSet":"medium"};
export function StorageSpaceCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('storage-space', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('storage-space', [{ label: 'Floor space needed', value: String(result.sqFtNeeded) }, { label: 'Cubic space', value: String(result.cubicFtNeeded) }, { label: 'Shelving', value: String(result.shelfingLinearFt) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Operation Size" value={inputs.equipmentSet} onChange={(v) => updateInputs({ equipmentSet: v as Inputs['equipmentSet'] })} options={[{"value":"small","label":"Small (1-5 hives)"},{"value":"medium","label":"6-20 hives"},{"value":"large","label":"21-100 hives"},{"value":"commercial","label":"Commercial (100+)"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Floor space needed" value={String(result.sqFtNeeded)} unit="sq ft" highlight />
        <ResultRow label="Cubic space" value={String(result.cubicFtNeeded)} unit="cu ft" />
        <ResultRow label="Shelving" value={String(result.shelfingLinearFt)} unit="linear ft" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.note}</div>
      </ResultPanel>
    </div>
  );
}
