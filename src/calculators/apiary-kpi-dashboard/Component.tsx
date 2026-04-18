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
const DEFAULTS: Inputs = {"hiveCount":20,"harvestLbs":1200,"revenue":6000,"costs":2500,"lossPercent":18,"avgMiteCount":1.2};
export function ApiaryKpiDashboardCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('apiary-kpi-dashboard', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('apiary-kpi-dashboard', [{ label: 'Overall health', value: String(result.overallHealth) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Hive Count" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Total Harvest" value={inputs.harvestLbs} onChange={(v) => updateInputs({ harvestLbs: v })} unit="lbs" min={0} step={50} />
          <NumberInput label="Total Revenue" value={inputs.revenue} onChange={(v) => updateInputs({ revenue: v })} unit="$" min={0} step={100} />
          <NumberInput label="Total Costs" value={inputs.costs} onChange={(v) => updateInputs({ costs: v })} unit="$" min={0} step={100} />
          <NumberInput label="Loss Rate" value={inputs.lossPercent} onChange={(v) => updateInputs({ lossPercent: v })} unit="%" min={0} max={100} step={5} />
          <NumberInput label="Avg Mite Count" value={inputs.avgMiteCount} onChange={(v) => updateInputs({ avgMiteCount: v })} unit="/100" min={0} step={0.5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Overall health" value={String(result.overallHealth)} highlight />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">KPIs</h3>
        <div className="space-y-1 max-h-80 overflow-y-auto">{result.kpis.map((row: Record<string, unknown>, i: number) => (
          <div key={i} className="flex justify-between text-sm py-1.5 border-b border-smoke-100">
            <span className="text-smoke-700 font-medium">{String(row.metric)}</span>
            <span className="text-smoke-500">{String(row.value)}</span>
            <span className="text-smoke-500">{String(row.status)}</span>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
