'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatNumber, formatPercent } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateVarroaGrowth } from './logic';
const DEFAULTS = { currentMitePercent: 1.5, monthsToProject: 6, treatmentMonth: 3, treatmentEfficacy: 85 };
export function VarroaGrowthProjectionCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('varroa-growth', DEFAULTS);
  const result = useMemo(() => calculateVarroaGrowth({ ...inputs, treatmentMonth: inputs.treatmentMonth > 0 ? inputs.treatmentMonth : null }), [inputs]);
  const copyText = () => formatResultsForCopy('Varroa Growth', [{ label: 'Peak', value: formatPercent(result.peakPercent) }, { label: 'Critical in', value: result.monthsUntilCritical !== null ? `${result.monthsUntilCritical} months` : 'Not reached' }]);
  const riskColors: Record<string, string> = { Low: 'text-meadow-600', Moderate: 'text-yellow-600', High: 'text-orange-600', Critical: 'text-red-600' };
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Current Mite %" value={inputs.currentMitePercent} onChange={(v) => updateInputs({ currentMitePercent: v })} unit="%" min={0} max={20} step={0.5} />
          <NumberInput label="Months to Project" value={inputs.monthsToProject} onChange={(v) => updateInputs({ monthsToProject: v })} min={1} max={12} step={1} />
          <NumberInput label="Treatment Month (0=none)" value={inputs.treatmentMonth} onChange={(v) => updateInputs({ treatmentMonth: v })} min={0} max={12} step={1} helpText="0 = no treatment" />
          <NumberInput label="Treatment Efficacy" value={inputs.treatmentEfficacy} onChange={(v) => updateInputs({ treatmentEfficacy: v })} unit="%" min={50} max={99} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Peak mite level" value={formatPercent(result.peakPercent)} highlight />
        <ResultRow label="Months until critical (3%)" value={result.monthsUntilCritical !== null ? `${result.monthsUntilCritical}` : 'Not reached'} unit={result.monthsUntilCritical !== null ? 'months' : ''} />
        <div className="mt-3 p-3 bg-smoke-50 rounded-lg text-sm text-smoke-600">{result.treatmentImpact}</div>
        <div className="mt-3 space-y-1">{result.projections.map((p) => (
          <div key={p.month} className="flex justify-between text-sm py-1 border-b border-smoke-100">
            <span className="text-smoke-500">Month {p.month}</span>
            <span className={`font-mono font-medium ${riskColors[p.risk]}`}>{formatPercent(p.mitePercent)} - {p.risk}</span>
          </div>
        ))}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[{ label: 'Monthly growth rate', value: '~12% compound' }, { label: 'Critical threshold', value: '3%' }, { label: 'Typical OAV efficacy', value: '85-95%' }]} />
    </div>
  );
}
