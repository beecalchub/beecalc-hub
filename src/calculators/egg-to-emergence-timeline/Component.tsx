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
import { calculateEggEmergence, type EggEmergenceInputs } from './logic';
const today = new Date().toISOString().split('T')[0];
const DEFAULTS: EggEmergenceInputs = { caste: 'worker', eggDate: today };
export function EggToEmergenceTimelineCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('egg-emerge', DEFAULTS);
  const result = useMemo(() => calculateEggEmergence(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Egg to Emergence', result.timelineDays.map(t => ({ label: t.event, value: t.date })));
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Caste" value={inputs.caste} onChange={(v) => updateInputs({ caste: v as EggEmergenceInputs['caste'] })} options={[{ value: 'worker', label: 'Worker (21 days)' }, { value: 'drone', label: 'Drone (24 days)' }, { value: 'queen', label: 'Queen (16 days)' }]} />
          <div><label htmlFor="egg-date" className="label-field">Egg Laid On</label><input id="egg-date" type="date" value={inputs.eggDate} onChange={(e) => updateInputs({ eggDate: e.target.value })} className="input-field" /></div>
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Hatch date" value={result.hatchDate} />
        <ResultRow label="Cell capped" value={result.cappedDate} />
        <ResultRow label="Emerges" value={result.emergenceDate} highlight />
        {result.layingDate && <ResultRow label="Should be laying" value={result.layingDate} />}
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Timeline</h3>
        <div className="space-y-2">{result.timelineDays.map((t, i) => (
          <div key={i} className="flex gap-3 py-1.5 border-b border-smoke-100 last:border-0 text-sm">
            <span className="text-honey-500 font-mono font-bold w-12 flex-shrink-0">Day {t.day}</span>
            <span className="text-smoke-700 flex-1">{t.event}</span>
            <span className="text-smoke-400 flex-shrink-0">{t.date}</span>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
