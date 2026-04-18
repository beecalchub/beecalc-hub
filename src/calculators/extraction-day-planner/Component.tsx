'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatNumber, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateExtractionDay } from './logic';
const DEFAULTS = { totalFrames: 40, extractorCapacity: 4, minutesPerLoad: 15, setupMinutes: 30, cleanupMinutes: 45, helpersCount: 1 };
export function ExtractionDayPlannerCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('extraction-day', DEFAULTS);
  const result = useMemo(() => calculateExtractionDay(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Extraction Day', [{ label: 'Total loads', value: result.totalLoads }, { label: 'Total time', value: `${result.totalHours} hours` }, { label: 'Start by', value: result.startTimeFor5pm }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Total Frames to Extract" value={inputs.totalFrames} onChange={(v) => updateInputs({ totalFrames: v })} min={1} max={200} step={1} />
          <NumberInput label="Extractor Capacity" value={inputs.extractorCapacity} onChange={(v) => updateInputs({ extractorCapacity: v })} unit="frames" min={2} max={72} step={2} />
          <NumberInput label="Minutes per Load" value={inputs.minutesPerLoad} onChange={(v) => updateInputs({ minutesPerLoad: v })} unit="min" min={5} max={30} step={5} helpText="Uncap + spin + drain" />
          <NumberInput label="Helpers" value={inputs.helpersCount} onChange={(v) => updateInputs({ helpersCount: v })} min={1} max={5} step={1} helpText="More helpers = faster uncapping" />
          <NumberInput label="Setup Time" value={inputs.setupMinutes} onChange={(v) => updateInputs({ setupMinutes: v })} unit="min" min={10} max={60} step={5} />
          <NumberInput label="Cleanup Time" value={inputs.cleanupMinutes} onChange={(v) => updateInputs({ cleanupMinutes: v })} unit="min" min={15} max={90} step={5} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total extractor loads" value={formatInteger(result.totalLoads)} highlight />
        <ResultRow label="Extraction time" value={formatInteger(result.extractionMinutes)} unit="min" />
        <ResultRow label="Total time" value={formatNumber(result.totalHours)} unit="hours" highlight />
        <ResultRow label="To finish by 5 PM, start at" value={result.startTimeFor5pm} />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Timeline</h3>
        <div className="space-y-2">{result.timeline.map((t, i) => (
          <div key={i} className="flex gap-3 text-sm py-1.5 border-b border-smoke-100 last:border-0"><span className="text-smoke-400 font-mono w-20 flex-shrink-0">{t.time}</span><span className="text-smoke-700">{t.task}</span></div>
        ))}</div>
      </Card>
    </div>
  );
}
