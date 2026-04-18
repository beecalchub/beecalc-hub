'use client';
import React, { useMemo } from 'react';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateShade, type ShadeInputs } from './logic';
const DEFAULTS: ShadeInputs = { morningShade: 'full-sun', afternoonShade: 'partial', region: 'moderate', hiveFacing: 'south' };
const ratingColors: Record<string, string> = { Excellent: 'bg-meadow-100 text-meadow-700', Good: 'bg-blue-100 text-blue-700', Acceptable: 'bg-yellow-100 text-yellow-700', Poor: 'bg-red-100 text-red-700' };
export function ShadeSunExposureCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('shade-sun', DEFAULTS);
  const result = useMemo(() => calculateShade(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Shade/Sun Exposure', [{ label: 'Score', value: `${result.score}/100` }, { label: 'Rating', value: result.rating }]);
  return (
    <div className="space-y-6">
      <Card><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectInput label="Morning Sun (before noon)" value={inputs.morningShade} onChange={(v) => updateInputs({ morningShade: v as ShadeInputs['morningShade'] })} options={[{ value: 'full-sun', label: 'Full sun' }, { value: 'partial', label: 'Partial shade' }, { value: 'full-shade', label: 'Full shade' }]} />
        <SelectInput label="Afternoon Sun (after noon)" value={inputs.afternoonShade} onChange={(v) => updateInputs({ afternoonShade: v as ShadeInputs['afternoonShade'] })} options={[{ value: 'full-sun', label: 'Full sun' }, { value: 'partial', label: 'Partial shade / dappled' }, { value: 'full-shade', label: 'Full shade' }]} />
        <SelectInput label="Climate" value={inputs.region} onChange={(v) => updateInputs({ region: v as ShadeInputs['region'] })} options={[{ value: 'hot', label: 'Hot (southern / desert)' }, { value: 'moderate', label: 'Moderate / temperate' }, { value: 'cold', label: 'Cold (northern)' }]} />
        <SelectInput label="Hive Entrance Faces" value={inputs.hiveFacing} onChange={(v) => updateInputs({ hiveFacing: v as ShadeInputs['hiveFacing'] })} options={[{ value: 'south', label: 'South' }, { value: 'east', label: 'East' }, { value: 'west', label: 'West' }, { value: 'north', label: 'North' }]} />
      </div><div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div></Card>
      <ResultPanel title="Sun Exposure Assessment">
        <div className="text-center mb-4"><p className="text-3xl font-mono font-bold text-smoke-800">{result.score}/100</p><span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${ratingColors[result.rating]}`}>{result.rating}</span></div>
        <div className="p-3 bg-smoke-50 rounded-lg text-sm text-smoke-600 mb-3">{result.recommendation}</div>
        {result.benefits.length > 0 && <div className="mb-2">{result.benefits.map((b, i) => <p key={i} className="text-sm text-meadow-700 flex gap-2 py-0.5"><span aria-hidden="true">✓</span>{b}</p>)}</div>}
        {result.concerns.length > 0 && <div>{result.concerns.map((c, i) => <p key={i} className="text-sm text-orange-600 flex gap-2 py-0.5"><span aria-hidden="true">⚠</span>{c}</p>)}</div>}
      </ResultPanel>
    </div>
  );
}
