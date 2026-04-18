'use client';

import React, { useMemo, useState } from 'react';
import { SelectInput } from '@/components/ui/SelectInput';
import { SliderInput } from '@/components/ui/SliderInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatInteger, formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateBroodArea } from './logic';

export function BroodAreaCalculator() {
  const { isMetric } = useUnitSystem();
  const [frameType, setFrameType] = useState<'deep' | 'medium'>('deep');
  const [frameCount, setFrameCount] = useState(8);
  const [coverages, setCoverages] = useState<number[]>([80, 90, 85, 70, 60, 50, 40, 30]);

  const updateCoverage = (idx: number, val: number) => {
    setCoverages((prev) => { const n = [...prev]; n[idx] = val; return n; });
  };

  const adjustFrameCount = (count: number) => {
    setFrameCount(count);
    setCoverages((prev) => {
      if (count > prev.length) return [...prev, ...Array(count - prev.length).fill(50)];
      return prev.slice(0, count);
    });
  };

  const result = useMemo(() => calculateBroodArea({
    frames: coverages.slice(0, frameCount).map((c) => ({ coveragePercent: c })),
    frameType,
  }), [coverages, frameCount, frameType]);

  const resetAll = () => { setFrameType('deep'); setFrameCount(8); setCoverages([80, 90, 85, 70, 60, 50, 40, 30]); };

  const copyText = () => formatResultsForCopy('Brood Area', [
    { label: 'Effective frames', value: result.effectiveFullFrames },
    { label: 'Total cells', value: formatInteger(result.totalCells) },
    { label: 'Queen rating', value: result.queenRating },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <SelectInput label="Frame Type" value={frameType} onChange={(v) => setFrameType(v as 'deep' | 'medium')} options={[{ value: 'deep', label: 'Deep (Langstroth)' }, { value: 'medium', label: 'Medium' }]} />
          <div>
            <label className="label-field">Frames with Brood</label>
            <input type="number" value={frameCount} onChange={(e) => adjustFrameCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))} min={1} max={20} className="input-field" />
          </div>
        </div>
        <p className="text-sm text-smoke-600 mb-3 font-medium">Coverage per frame (% of each side with brood):</p>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {coverages.slice(0, frameCount).map((cov, i) => (
            <SliderInput key={i} label={`Frame ${i + 1}`} value={cov} onChange={(v) => updateCoverage(i, v)} min={0} max={100} step={5} unit="%" />
          ))}
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetAll} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Effective full frames" value={formatNumber(result.effectiveFullFrames)} unit="frames" highlight />
        <ResultRow label="Total brood cells" value={formatInteger(result.totalCells)} />
        <ResultRow label="Brood area" value={isMetric ? formatNumber(result.totalSqCm) : formatNumber(result.totalSqInches)} unit={isMetric ? 'cm²' : 'in²'} />
        <ResultRow label="Est. eggs/day" value={formatInteger(result.estimatedEggsPerDay)} />
        <div className="mt-3 p-3 rounded-lg bg-honey-50 text-honey-800 text-sm font-medium">{result.queenRating}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: 'Cells per deep frame', value: '~7,000 (both sides)' },
        { label: 'Cells per medium frame', value: '~4,900 (both sides)' },
        { label: 'Worker brood cycle', value: '21 days' },
      ]} />
    </div>
  );
}
