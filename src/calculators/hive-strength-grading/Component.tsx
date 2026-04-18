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
import { calculateHiveStrength, type HiveStrengthInputs } from './logic';

const DEFAULTS: HiveStrengthInputs = {
  framesOfBees: 8, framesOfBrood: 5, queenSeen: true,
  queenAge: '1-year', temperament: 'calm', diseasePresent: false, framesOfHoney: 3,
};

const gradeColors = { A: 'text-meadow-700 bg-meadow-100', B: 'text-blue-700 bg-blue-100', C: 'text-yellow-700 bg-yellow-100', D: 'text-orange-700 bg-orange-100', F: 'text-red-700 bg-red-100' };

export function HiveStrengthGradingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('hive-strength', DEFAULTS);
  const result = useMemo(() => calculateHiveStrength(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Hive Strength Grade', [
    { label: 'Grade', value: `${result.grade} (${result.totalScore}/100)` },
    { label: 'Pollination ready', value: result.pollinationReady ? 'Yes' : 'No' },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frames of Bees" value={inputs.framesOfBees} onChange={(v) => updateInputs({ framesOfBees: v })} min={1} max={20} step={1} />
          <NumberInput label="Frames of Brood" value={inputs.framesOfBrood} onChange={(v) => updateInputs({ framesOfBrood: v })} min={0} max={15} step={1} />
          <NumberInput label="Frames of Honey" value={inputs.framesOfHoney} onChange={(v) => updateInputs({ framesOfHoney: v })} min={0} max={10} step={1} />
          <SelectInput label="Queen Age" value={inputs.queenAge} onChange={(v) => updateInputs({ queenAge: v as HiveStrengthInputs['queenAge'] })} options={[
            { value: 'new', label: 'New (this season)' }, { value: '1-year', label: '1 Year' },
            { value: '2-year', label: '2+ Years' }, { value: 'unknown', label: 'Unknown' },
          ]} />
          <SelectInput label="Temperament" value={inputs.temperament} onChange={(v) => updateInputs({ temperament: v as HiveStrengthInputs['temperament'] })} options={[
            { value: 'calm', label: 'Calm' }, { value: 'moderate', label: 'Moderate' }, { value: 'aggressive', label: 'Aggressive' },
          ]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Queen seen during inspection" checked={inputs.queenSeen} onChange={(v) => updateInputs({ queenSeen: v })} />
          <Checkbox label="Disease signs present" checked={inputs.diseasePresent} onChange={(v) => updateInputs({ diseasePresent: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel title="Strength Grade">
        <div className="text-center mb-4">
          <span className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-display ${gradeColors[result.grade]}`}>{result.grade}</span>
          <p className="text-2xl font-mono font-bold text-smoke-800 mt-2">{result.totalScore}/100</p>
          <p className="text-sm text-smoke-600 mt-1">{result.gradeLabel}</p>
        </div>
        <div className={`p-3 rounded-lg border mb-3 ${result.pollinationReady ? 'bg-meadow-50 border-meadow-200 text-meadow-700' : 'bg-orange-50 border-orange-200 text-orange-700'}`}>
          <p className="text-sm font-medium">{result.pollinationReady ? '✓ Pollination Ready' : '✗ Not Pollination Ready'}</p>
          <p className="text-xs mt-0.5">{result.pollinationMessage}</p>
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
