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
import { calculateSwarmRisk } from './logic';
const DEFAULTS = { queenCellsSeen: false, framesOfBees: 12, congested: false, swarmSeasonActive: true, queenAgeYears: 1, lastInspection: 7 };
const levelColors: Record<string, string> = { Critical: 'bg-red-50 border-red-200 text-red-700', High: 'bg-orange-50 border-orange-200 text-orange-700', Moderate: 'bg-yellow-50 border-yellow-200 text-yellow-700', Low: 'bg-meadow-50 border-meadow-200 text-meadow-700' };
export function SwarmRiskCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('swarm-risk', DEFAULTS);
  const result = useMemo(() => calculateSwarmRisk(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Swarm Risk', [{ label: 'Score', value: `${result.score}/100` }, { label: 'Level', value: result.level }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frames of Bees" value={inputs.framesOfBees} onChange={(v) => updateInputs({ framesOfBees: v })} min={1} max={30} step={1} />
          <NumberInput label="Queen Age" value={inputs.queenAgeYears} onChange={(v) => updateInputs({ queenAgeYears: v })} unit="years" min={0} max={5} step={0.5} />
          <NumberInput label="Days Since Last Inspection" value={inputs.lastInspection} onChange={(v) => updateInputs({ lastInspection: v })} min={0} step={1} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Queen cells observed" checked={inputs.queenCellsSeen} onChange={(v) => updateInputs({ queenCellsSeen: v })} />
          <Checkbox label="Hive feels congested" checked={inputs.congested} onChange={(v) => updateInputs({ congested: v })} />
          <Checkbox label="Swarm season active" checked={inputs.swarmSeasonActive} onChange={(v) => updateInputs({ swarmSeasonActive: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <div className={`p-5 rounded-xl border-2 mb-4 text-center ${levelColors[result.level]}`}>
          <p className="text-3xl font-mono font-bold">{result.score}/100</p>
          <p className="text-lg font-display mt-1">{result.level} Risk</p>
          <p className="text-sm mt-1">{result.verdict}</p>
        </div>
        <div className="space-y-2">{result.factors.map(f => (
          <div key={f.factor} className="flex justify-between text-sm py-1.5 border-b border-smoke-100 last:border-0">
            <div><span className="text-smoke-700 font-medium">{f.factor}</span><span className="text-smoke-400 ml-2 text-xs">{f.note}</span></div>
            <span className="font-mono text-smoke-800">+{f.score}</span>
          </div>
        ))}</div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Actions</h3>
        <ul className="space-y-2" role="list">{result.actions.map((a, i) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{a}</li>)}</ul>
      </Card>
    </div>
  );
}
