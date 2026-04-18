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
import { calculateWaxMothRisk, type WaxMothInputs } from './logic';
const DEFAULTS: WaxMothInputs = { storedCombFrames: 20, storageType: 'open-air', colonyStrength: 'average', avgTempF: 80, hasParadichlorobenzene: false };
const riskColors: Record<string, string> = { Low: 'bg-meadow-50 border-meadow-200 text-meadow-700', Moderate: 'bg-yellow-50 border-yellow-200 text-yellow-700', High: 'bg-red-50 border-red-200 text-red-700' };
export function WaxMothRiskCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('wax-moth', DEFAULTS);
  const result = useMemo(() => calculateWaxMothRisk(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Wax Moth Risk', [{ label: 'Score', value: `${result.riskScore}/100` }, { label: 'Risk', value: result.riskLevel }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Stored Comb Frames" value={inputs.storedCombFrames} onChange={(v) => updateInputs({ storedCombFrames: v })} min={0} max={200} step={5} />
          <SelectInput label="Storage Method" value={inputs.storageType} onChange={(v) => updateInputs({ storageType: v as WaxMothInputs['storageType'] })} options={[{ value: 'open-air', label: 'Open air (stacked supers)' }, { value: 'sealed-container', label: 'Sealed container/bag' }, { value: 'freezer-treated', label: 'Freezer treated + sealed' }]} />
          <SelectInput label="Colony/Comb Source" value={inputs.colonyStrength} onChange={(v) => updateInputs({ colonyStrength: v as WaxMothInputs['colonyStrength'] })} options={[{ value: 'strong', label: 'Strong colony (in use)' }, { value: 'average', label: 'Average colony' }, { value: 'weak', label: 'Weak colony' }, { value: 'dead-out', label: 'Dead-out / empty equipment' }]} />
          <NumberInput label="Avg Storage Temperature" value={inputs.avgTempF} onChange={(v) => updateInputs({ avgTempF: v })} unit="°F" min={30} max={110} step={5} />
        </div>
        <div className="mt-3"><Checkbox label="Using paradichlorobenzene (PDB) or Certan" checked={inputs.hasParadichlorobenzene} onChange={(v) => updateInputs({ hasParadichlorobenzene: v })} /></div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel title="Wax Moth Risk Assessment">
        <div className="text-center mb-4">
          <p className="text-3xl font-mono font-bold text-smoke-800">{result.riskScore}/100</p>
          <div className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-medium ${riskColors[result.riskLevel]}`}>{result.riskLevel} Risk</div>
        </div>
        <div className="space-y-2">{result.breakdown.map((b) => (
          <div key={b.factor} className="flex items-center justify-between text-sm py-1.5 border-b border-smoke-100 last:border-0">
            <div><span className="text-smoke-700 font-medium">{b.factor}</span><span className="text-smoke-400 ml-2 text-xs">{b.note}</span></div>
            <span className="font-mono text-smoke-800 flex-shrink-0 ml-2">{b.score}/{b.max}</span>
          </div>
        ))}</div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Recommendations</h3>
        <ul className="space-y-2" role="list">{result.recommendations.map((r, i) => (<li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{r}</li>))}</ul>
      </Card>
    </div>
  );
}
