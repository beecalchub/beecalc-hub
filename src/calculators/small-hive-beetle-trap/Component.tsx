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
import { formatInteger, formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateSHBTraps, type SHBTrapInputs } from './logic';
const DEFAULTS: SHBTrapInputs = { hiveCount: 5, trapType: 'between-frames', infestationLevel: 'moderate' };
export function SmallHiveBeetleTrapCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('shb-trap', DEFAULTS);
  const result = useMemo(() => calculateSHBTraps(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('SHB Traps', [{ label: 'Traps needed', value: result.totalTraps }, { label: 'Oil needed', value: `${result.oilNeededOz} oz` }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <SelectInput label="Trap Type" value={inputs.trapType} onChange={(v) => updateInputs({ trapType: v as SHBTrapInputs['trapType'] })} options={[{ value: 'bottom-board', label: 'Bottom board tray' }, { value: 'between-frames', label: 'Between-frame trap' }, { value: 'entrance', label: 'Entrance trap' }]} />
          <SelectInput label="Infestation Level" value={inputs.infestationLevel} onChange={(v) => updateInputs({ infestationLevel: v as SHBTrapInputs['infestationLevel'] })} options={[{ value: 'low', label: 'Low (few beetles)' }, { value: 'moderate', label: 'Moderate' }, { value: 'heavy', label: 'Heavy infestation' }]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Traps per hive" value={result.trapsPerHive} highlight />
        <ResultRow label="Total traps needed" value={formatInteger(result.totalTraps)} highlight />
        <ResultRow label="Oil needed" value={formatNumber(result.oilNeededOz)} unit="oz" />
        <ResultRow label="Check traps every" value={result.checkFrequencyDays} unit="days" />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Management Tips</h3>
        <ul className="space-y-2" role="list">{result.tips.map((t, i) => (<li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{t}</li>))}</ul>
      </Card>
    </div>
  );
}
