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
import { calculateInspectionScore, type InspectionInputs } from './logic';

const DEFAULTS: InspectionInputs = { queenSeen: true, eggsPresent: true, broodPattern: 'solid', framesOfBees: 8, temperament: 'calm', honeyStoresFrames: 3, diseaseSymptoms: false, queenCells: 'none', pestsSeen: false, orientation: '' };
const gradeColors: Record<string, string> = { A: 'text-meadow-700 bg-meadow-100', B: 'text-blue-700 bg-blue-100', C: 'text-yellow-700 bg-yellow-100', D: 'text-orange-700 bg-orange-100', F: 'text-red-700 bg-red-100' };

export function InspectionNoteToScoreCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('inspection-score', DEFAULTS);
  const result = useMemo(() => calculateInspectionScore(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Inspection Score', [{ label: 'Grade', value: `${result.grade} (${result.totalScore}/100)` }, { label: 'Status', value: result.gradeLabel }]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Brood Pattern" value={inputs.broodPattern} onChange={(v) => updateInputs({ broodPattern: v as InspectionInputs['broodPattern'] })} options={[{ value: 'solid', label: 'Solid (good)' }, { value: 'spotty', label: 'Spotty / patchy' }, { value: 'none', label: 'No brood' }]} />
          <NumberInput label="Frames of Bees" value={inputs.framesOfBees} onChange={(v) => updateInputs({ framesOfBees: v })} min={1} max={20} step={1} />
          <SelectInput label="Temperament" value={inputs.temperament} onChange={(v) => updateInputs({ temperament: v as InspectionInputs['temperament'] })} options={[{ value: 'calm', label: 'Calm' }, { value: 'moderate', label: 'Moderate' }, { value: 'defensive', label: 'Defensive / aggressive' }]} />
          <NumberInput label="Honey Stores" value={inputs.honeyStoresFrames} onChange={(v) => updateInputs({ honeyStoresFrames: v })} unit="frames" min={0} max={15} step={1} />
          <SelectInput label="Queen Cells" value={inputs.queenCells} onChange={(v) => updateInputs({ queenCells: v as InspectionInputs['queenCells'] })} options={[{ value: 'none', label: 'None' }, { value: 'supersedure', label: 'Supersedure cells' }, { value: 'swarm', label: 'Swarm cells' }]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Queen seen" checked={inputs.queenSeen} onChange={(v) => updateInputs({ queenSeen: v })} />
          <Checkbox label="Eggs present" checked={inputs.eggsPresent} onChange={(v) => updateInputs({ eggsPresent: v })} />
          <Checkbox label="Disease symptoms" checked={inputs.diseaseSymptoms} onChange={(v) => updateInputs({ diseaseSymptoms: v })} />
          <Checkbox label="Pests seen (SHB, moths, mites)" checked={inputs.pestsSeen} onChange={(v) => updateInputs({ pestsSeen: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel title="Inspection Score">
        <div className="text-center mb-4">
          <span className={`inline-flex items-center justify-center w-20 h-20 rounded-full text-3xl font-display ${gradeColors[result.grade]}`}>{result.grade}</span>
          <p className="text-2xl font-mono font-bold text-smoke-800 mt-2">{result.totalScore}/100</p>
          <p className="text-sm text-smoke-600 mt-1">{result.gradeLabel}</p>
        </div>
        <div className="space-y-2">{result.breakdown.map((b) => (
          <div key={b.factor} className="flex items-center justify-between text-sm py-1.5 border-b border-smoke-100 last:border-0">
            <div><span className="text-smoke-700 font-medium">{b.factor}</span><span className="text-smoke-400 ml-2 text-xs">{b.note}</span></div>
            <span className="font-mono text-smoke-800 flex-shrink-0 ml-2">{b.score}/{b.max}</span>
          </div>
        ))}</div>
      </ResultPanel>
      {result.alerts.length > 0 && <Card className="border-red-200 bg-red-50"><h3 className="font-display text-base text-red-800 mb-2">Alerts</h3>
        <ul className="space-y-1.5" role="list">{result.alerts.map((a, i) => <li key={i} className="text-sm text-red-700 flex gap-2"><span aria-hidden="true">⚠️</span>{a}</li>)}</ul></Card>}
      {result.actions.length > 0 && <Card className="border-blue-200 bg-blue-50"><h3 className="font-display text-base text-blue-800 mb-2">Recommended Actions</h3>
        <ul className="space-y-1.5" role="list">{result.actions.map((a, i) => <li key={i} className="text-sm text-blue-700 flex gap-2"><span aria-hidden="true">→</span>{a}</li>)}</ul></Card>}
    </div>
  );
}
