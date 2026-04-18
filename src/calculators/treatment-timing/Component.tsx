'use client';
import React, { useMemo } from 'react';
import { SelectInput } from '@/components/ui/SelectInput';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateTreatmentTiming, getTreatmentOptions, type TreatmentTimingInputs } from './logic';
const today = new Date().toISOString().split('T')[0];
const DEFAULTS: TreatmentTimingInputs = { lastTreatmentDate: today, treatmentType: 'oav', flowStartDate: today, superRemovalDays: 14 };
export function TreatmentTimingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('treatment-timing', DEFAULTS);
  const result = useMemo(() => calculateTreatmentTiming(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Treatment Timing', [{ label: 'Next treatment', value: result.nextTreatmentDate }, { label: 'Days', value: result.daysUntilNext }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label htmlFor="last-treat" className="label-field">Last Treatment Date</label><input id="last-treat" type="date" value={inputs.lastTreatmentDate} onChange={(e) => updateInputs({ lastTreatmentDate: e.target.value })} className="input-field" /></div>
          <SelectInput label="Treatment Type" value={inputs.treatmentType} onChange={(v) => updateInputs({ treatmentType: v })} options={getTreatmentOptions()} />
          <div><label htmlFor="flow-start" className="label-field">Expected Flow Start</label><input id="flow-start" type="date" value={inputs.flowStartDate} onChange={(e) => updateInputs({ flowStartDate: e.target.value })} className="input-field" /></div>
          <NumberInput label="Days to Remove Supers Before Treatment" value={inputs.superRemovalDays} onChange={(v) => updateInputs({ superRemovalDays: v })} min={0} max={30} step={1} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Next treatment due" value={result.nextTreatmentDate} highlight />
        <ResultRow label="Days until next" value={result.daysUntilNext} unit="days" />
        <ResultRow label="Remove supers by" value={result.supersOffBy} />
        <div className={`mt-3 p-3 rounded-lg border ${result.daysUntilNext <= 14 ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-meadow-50 border-meadow-200 text-meadow-700'}`}><p className="text-sm">{result.recommendation}</p></div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Timeline</h3>
        <div className="space-y-2">{result.schedule.map((s, i) => (
          <div key={i} className="flex gap-3 text-sm py-1.5 border-b border-smoke-100 last:border-0">
            <span className="text-smoke-400 font-mono w-28 flex-shrink-0">{s.date}</span><span className="text-smoke-700">{s.event}</span>
          </div>
        ))}</div>
      </Card>
      <AssumptionsPanel assumptions={[{ label: 'OAV interval', value: '~90 days' }, { label: 'Apivar interval', value: '~180 days' }, { label: 'Formic/Apiguard', value: '~120 days' }]} />
    </div>
  );
}
