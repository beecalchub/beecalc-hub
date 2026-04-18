'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateSplit } from './logic';

const DEFAULTS = { framesOfBees: 12, framesOfBrood: 7, framesOfHoney: 5, queenAvailable: true, seasonMonth: 4 };

const MONTHS = [
  { value: '1', label: 'January' }, { value: '2', label: 'February' }, { value: '3', label: 'March' },
  { value: '4', label: 'April' }, { value: '5', label: 'May' }, { value: '6', label: 'June' },
  { value: '7', label: 'July' }, { value: '8', label: 'August' }, { value: '9', label: 'September' },
  { value: '10', label: 'October' }, { value: '11', label: 'November' }, { value: '12', label: 'December' },
];

// Fix #18: uses shared Checkbox
export function SplitPlanningCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('split-planning', DEFAULTS);
  const result = useMemo(() => calculateSplit(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Split Planning', [
    { label: 'Can split?', value: result.canSplit ? 'Yes' : 'No' },
    { label: 'Max splits', value: result.maxSplits },
    { label: 'Recommendation', value: result.recommendation },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frames of Bees" value={inputs.framesOfBees} onChange={(v) => updateInputs({ framesOfBees: v })} min={1} max={30} step={1} />
          <NumberInput label="Frames of Brood" value={inputs.framesOfBrood} onChange={(v) => updateInputs({ framesOfBrood: v })} min={0} max={20} step={1} />
          <NumberInput label="Frames of Honey/Stores" value={inputs.framesOfHoney} onChange={(v) => updateInputs({ framesOfHoney: v })} min={0} max={15} step={1} />
          <SelectInput label="Season" value={String(inputs.seasonMonth)} onChange={(v) => updateInputs({ seasonMonth: parseInt(v) })} options={MONTHS} />
        </div>
        <div className="mt-3">
          <Checkbox
            label="Queen or queen cell available for split"
            checked={inputs.queenAvailable}
            onChange={(v) => updateInputs({ queenAvailable: v })}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel>
        <div className={`p-4 rounded-lg border mb-3 ${result.canSplit ? 'bg-meadow-50 border-meadow-200' : 'bg-orange-50 border-orange-200'}`}>
          <p className={`font-medium ${result.canSplit ? 'text-meadow-700' : 'text-orange-700'}`}>
            {result.canSplit ? `✓ Yes - up to ${result.maxSplits} split${result.maxSplits > 1 ? 's' : ''}` : '✗ Not recommended yet'}
          </p>
          <p className="text-sm text-smoke-600 mt-1">{result.recommendation}</p>
        </div>

        {result.canSplit && (
          <>
            <p className="text-sm font-medium text-smoke-700 mt-3 mb-1">Per split (nuc):</p>
            <ResultRow label="Bees frames" value={result.perSplit.beesFrames} unit="frames" />
            <ResultRow label="Brood frames" value={result.perSplit.broodFrames} unit="frames" />
            <ResultRow label="Honey frames" value={result.perSplit.honeyFrames} unit="frames" />
            <p className="text-sm font-medium text-smoke-700 mt-3 mb-1">Parent colony retains:</p>
            <ResultRow label="Bees frames" value={result.parentRetains.beesFrames} unit="frames" />
            <ResultRow label="Brood frames" value={result.parentRetains.broodFrames} unit="frames" />
            <ResultRow label="Honey frames" value={result.parentRetains.honeyFrames} unit="frames" />
          </>
        )}

        {result.risks.length > 0 && (
          <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm font-medium text-orange-700 mb-1">Risks:</p>
            {result.risks.map((r, i) => <p key={i} className="text-sm text-orange-600">• {r}</p>)}
          </div>
        )}
        {result.tips.length > 0 && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-medium text-blue-700 mb-1">Tips:</p>
            {result.tips.map((t, i) => <p key={i} className="text-sm text-blue-600">• {t}</p>)}
          </div>
        )}
      </ResultPanel>
    </div>
  );
}
