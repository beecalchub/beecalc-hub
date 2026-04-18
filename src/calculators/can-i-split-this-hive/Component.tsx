'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateCanSplit, type CanSplitInputs } from './logic';

const MONTHS = [{ value: '1', label: 'January' }, { value: '2', label: 'February' }, { value: '3', label: 'March' }, { value: '4', label: 'April' }, { value: '5', label: 'May' }, { value: '6', label: 'June' }, { value: '7', label: 'July' }, { value: '8', label: 'August' }, { value: '9', label: 'September' }, { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' }];
const DEFAULTS: CanSplitInputs = { framesOfBees: 10, framesOfBrood: 6, framesOfHoney: 4, queenCellsPresent: false, month: new Date().getMonth() + 1, queenAvailable: true, daysUntilFlow: 30, miteLevel: 1 };
const confColors = { high: 'bg-meadow-50 border-meadow-200 text-meadow-700', moderate: 'bg-blue-50 border-blue-200 text-blue-700', low: 'bg-orange-50 border-orange-200 text-orange-700', no: 'bg-red-50 border-red-200 text-red-700' };

export function CanISplitThisHiveCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('can-split', DEFAULTS);
  const result = useMemo(() => calculateCanSplit(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Can I Split?', [{ label: 'Verdict', value: result.verdict }]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frames of Bees" value={inputs.framesOfBees} onChange={(v) => updateInputs({ framesOfBees: v })} min={1} max={20} step={1} />
          <NumberInput label="Frames of Brood" value={inputs.framesOfBrood} onChange={(v) => updateInputs({ framesOfBrood: v })} min={0} max={15} step={1} />
          <NumberInput label="Frames of Honey" value={inputs.framesOfHoney} onChange={(v) => updateInputs({ framesOfHoney: v })} min={0} max={10} step={1} />
          <SelectInput label="Month" value={String(inputs.month)} onChange={(v) => updateInputs({ month: parseInt(v) })} options={MONTHS} />
          <NumberInput label="Current Mite Level" value={inputs.miteLevel} onChange={(v) => updateInputs({ miteLevel: v })} unit="per 100" min={0} max={20} step={0.5} />
          <NumberInput label="Days Until Flow" value={inputs.daysUntilFlow} onChange={(v) => updateInputs({ daysUntilFlow: v })} min={0} max={120} step={7} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Queen cells present" checked={inputs.queenCellsPresent} onChange={(v) => updateInputs({ queenCellsPresent: v })} />
          <Checkbox label="Mated queen available" checked={inputs.queenAvailable} onChange={(v) => updateInputs({ queenAvailable: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <div className={`p-5 rounded-xl border-2 mb-4 text-center ${confColors[result.confidence]}`}>
          <p className="text-2xl font-display mb-1">{result.canSplit ? '✓ Yes' : '✗ Not Yet'}</p>
          <p className="text-sm">{result.verdict}</p>
        </div>
        {result.reasons.length > 0 && <div className="mb-3">{result.reasons.map((r, i) => <p key={i} className="text-sm text-meadow-700 flex gap-2 py-0.5"><span aria-hidden="true">✓</span>{r}</p>)}</div>}
        {result.warnings.length > 0 && <div>{result.warnings.map((w, i) => <p key={i} className="text-sm text-orange-600 flex gap-2 py-0.5"><span aria-hidden="true">⚠</span>{w}</p>)}</div>}
      </ResultPanel>

      <Card><h3 className="font-display text-base text-smoke-800 mb-3">{result.canSplit ? 'How to Split - Step by Step' : 'What to Do Instead'}</h3>
        <ol className="space-y-2">{result.steps.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm text-smoke-700"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-honey-100 text-honey-700 text-xs font-bold flex items-center justify-center">{i+1}</span><span className="pt-0.5">{s}</span></li>
        ))}</ol>
      </Card>
    </div>
  );
}
