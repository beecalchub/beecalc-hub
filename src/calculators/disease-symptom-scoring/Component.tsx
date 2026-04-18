'use client';
import React, { useMemo } from 'react';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"deadBeesEntrance":false,"unusualSmell":false,"discoloredBrood":false,"chalkMummies":false,"deformedWings":false,"kWingBees":false};
export function DiseaseSymptomScoringCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('disease-symptom-scoring', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('disease-symptom-scoring', [{ label: 'Risk score', value: String(result.riskScore) }, { label: 'Level', value: String(result.level) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Dead bees at entrance" checked={inputs.deadBeesEntrance} onChange={(v) => updateInputs({ deadBeesEntrance: v })} />
          <Checkbox label="Unusual/foul smell" checked={inputs.unusualSmell} onChange={(v) => updateInputs({ unusualSmell: v })} />
          <Checkbox label="Discolored sunken brood" checked={inputs.discoloredBrood} onChange={(v) => updateInputs({ discoloredBrood: v })} />
          <Checkbox label="Chalk mummies at entrance" checked={inputs.chalkMummies} onChange={(v) => updateInputs({ chalkMummies: v })} />
          <Checkbox label="Bees with deformed wings" checked={inputs.deformedWings} onChange={(v) => updateInputs({ deformedWings: v })} />
          <Checkbox label="K-wing bees visible" checked={inputs.kWingBees} onChange={(v) => updateInputs({ kWingBees: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Risk score" value={result.riskScore} highlight />
        <ResultRow label="Level" value={result.level} highlight />
      </ResultPanel>
      {result.suspected.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Suspected Conditions</h3>
        <ul className="space-y-2" role="list">{result.suspected.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
