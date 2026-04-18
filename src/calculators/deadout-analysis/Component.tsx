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
const DEFAULTS: Inputs = {"clusterSmall":false,"honeyRemaining":false,"deadBroodPresent":false,"dysentryStreaks":false,"mitesOnBees":false,"headsInCells":false};
export function DeadoutAnalysisCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('deadout-analysis', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('deadout-analysis', [{ label: 'Likely cause', value: String(result.likelyCause) }, { label: 'Confidence', value: String(result.confidence) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Cluster was small (<baseball size)" checked={inputs.clusterSmall} onChange={(v) => updateInputs({ clusterSmall: v })} />
          <Checkbox label="Plenty of honey remaining" checked={inputs.honeyRemaining} onChange={(v) => updateInputs({ honeyRemaining: v })} />
          <Checkbox label="Dead brood in cells" checked={inputs.deadBroodPresent} onChange={(v) => updateInputs({ deadBroodPresent: v })} />
          <Checkbox label="Dysentery streaks on hive" checked={inputs.dysentryStreaks} onChange={(v) => updateInputs({ dysentryStreaks: v })} />
          <Checkbox label="Visible mites on dead bees" checked={inputs.mitesOnBees} onChange={(v) => updateInputs({ mitesOnBees: v })} />
          <Checkbox label="Bees head-first in cells (starvation)" checked={inputs.headsInCells} onChange={(v) => updateInputs({ headsInCells: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Likely cause" value={result.likelyCause} highlight />
        <ResultRow label="Confidence" value={result.confidence} />
      </ResultPanel>
      {result.prevention.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Prevention for Next Year</h3>
        <ul className="space-y-2" role="list">{result.prevention.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
