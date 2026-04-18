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
const DEFAULTS: Inputs = {"totalHives":200,"fieldsCount":4,"daysOnSite":21,"travelDaysTotal":4};
export function PollinationDeploymentPlannerCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('pollination-deployment-planner', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('pollination-deployment-planner', [{ label: 'Hives per field', value: String(result.hivesPerField) }, { label: 'Total project days', value: String(result.totalProjectDays) }, { label: 'Setup days', value: String(result.setupDaysNeeded) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Total Hives" value={inputs.totalHives} onChange={(v) => updateInputs({ totalHives: v })} min={1} step={1} />
          <NumberInput label="Fields to Pollinate" value={inputs.fieldsCount} onChange={(v) => updateInputs({ fieldsCount: v })} min={1} step={1} />
          <NumberInput label="Days on Site" value={inputs.daysOnSite} onChange={(v) => updateInputs({ daysOnSite: v })} min={1} step={1} />
          <NumberInput label="Total Travel Days" value={inputs.travelDaysTotal} onChange={(v) => updateInputs({ travelDaysTotal: v })} min={1} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Hives per field" value={String(result.hivesPerField)} highlight />
        <ResultRow label="Total project days" value={String(result.totalProjectDays)} unit="days" />
        <ResultRow label="Setup days" value={String(result.setupDaysNeeded)} unit="days" />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
