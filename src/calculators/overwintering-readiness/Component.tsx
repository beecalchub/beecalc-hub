'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateOverwintering } from './logic';

const DEFAULTS = {
  framesOfBees: 8, honeyStoresLbs: 60, queenConfirmed: true,
  varroaTreated: true, miteLevelPercent: 1, entranceReducerInstalled: true,
  ventilationAdequate: true, diseaseSignsObserved: false,
};

const gradeColors = {
  A: 'text-meadow-700 bg-meadow-100',
  B: 'text-blue-700 bg-blue-100',
  C: 'text-yellow-700 bg-yellow-100',
  D: 'text-orange-700 bg-orange-100',
  F: 'text-red-700 bg-red-100',
};

// Fix #18: uses shared Checkbox component (was inline Check component)
export function OverwinteringReadinessCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('overwintering', DEFAULTS);
  const result = useMemo(() => calculateOverwintering(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Overwintering Readiness', [
    { label: 'Score', value: `${result.totalScore}/100 (${result.grade})` },
    { label: 'Verdict', value: result.verdict },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frames of Bees" value={inputs.framesOfBees} onChange={(v) => updateInputs({ framesOfBees: v })} min={1} max={20} step={1} />
          <NumberInput label="Honey Stores" value={inputs.honeyStoresLbs} onChange={(v) => updateInputs({ honeyStoresLbs: v })} unit="lbs" min={0} step={5} />
          <NumberInput label="Mite Level (post-treatment)" value={inputs.miteLevelPercent} onChange={(v) => updateInputs({ miteLevelPercent: v })} unit="%" min={0} max={20} step={0.5} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Queen confirmed" checked={inputs.queenConfirmed} onChange={(v) => updateInputs({ queenConfirmed: v })} />
          <Checkbox label="Varroa treated this fall" checked={inputs.varroaTreated} onChange={(v) => updateInputs({ varroaTreated: v })} />
          <Checkbox label="Entrance reducer installed" checked={inputs.entranceReducerInstalled} onChange={(v) => updateInputs({ entranceReducerInstalled: v })} />
          <Checkbox label="Adequate ventilation" checked={inputs.ventilationAdequate} onChange={(v) => updateInputs({ ventilationAdequate: v })} />
          <Checkbox label="Disease signs observed" checked={inputs.diseaseSignsObserved} onChange={(v) => updateInputs({ diseaseSignsObserved: v })} />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel title="Winter Readiness Score">
        <div className="text-center mb-4">
          <span className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-display ${gradeColors[result.grade]}`}>
            {result.grade}
          </span>
          <p className="text-2xl font-mono font-bold text-smoke-800 mt-2">{result.totalScore}/100</p>
          <p className="text-sm text-smoke-600 mt-1">{result.verdict}</p>
        </div>
        <div className="space-y-2">
          {result.breakdown.map((b) => (
            <div key={b.category} className="flex items-center justify-between text-sm py-1.5 border-b border-smoke-100 last:border-0">
              <div>
                <span className="text-smoke-700 font-medium">{b.category}</span>
                <span className="text-smoke-400 ml-2 text-xs">{b.note}</span>
              </div>
              <span className="font-mono text-smoke-800 flex-shrink-0 ml-2">{b.score}/{b.max}</span>
            </div>
          ))}
        </div>
      </ResultPanel>
    </div>
  );
}
