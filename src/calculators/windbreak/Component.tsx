'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatNumber, formatPercent } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateWindbreak, type WindbreakInputs } from './logic';
const DEFAULTS: WindbreakInputs = { apiaryWidthFt: 30, dominantWindDirection: 'northwest', avgWindSpeedMph: 12, windbreakType: 'natural-trees', windbreakHeightFt: 15, distanceFromHivesFt: 40 };
export function WindbreakCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('windbreak', DEFAULTS);
  const result = useMemo(() => calculateWindbreak(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Windbreak', [{ label: 'Wind reduction', value: formatPercent(result.windReductionPercent, 0) }, { label: 'Protection zone', value: `${result.protectionZoneFt} ft` }]);
  return (
    <div className="space-y-6">
      <Card><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInput label="Apiary Width" value={inputs.apiaryWidthFt} onChange={(v) => updateInputs({ apiaryWidthFt: v })} unit="ft" min={5} step={5} />
        <NumberInput label="Avg Wind Speed" value={inputs.avgWindSpeedMph} onChange={(v) => updateInputs({ avgWindSpeedMph: v })} unit="mph" min={0} max={50} step={2} />
        <SelectInput label="Dominant Wind Direction" value={inputs.dominantWindDirection} onChange={(v) => updateInputs({ dominantWindDirection: v as WindbreakInputs['dominantWindDirection'] })} options={[{ value: 'north', label: 'North' }, { value: 'south', label: 'South' }, { value: 'east', label: 'East' }, { value: 'west', label: 'West' }, { value: 'northwest', label: 'Northwest' }]} />
        <SelectInput label="Windbreak Type" value={inputs.windbreakType} onChange={(v) => updateInputs({ windbreakType: v as WindbreakInputs['windbreakType'] })} options={[{ value: 'natural-trees', label: 'Trees / hedge' }, { value: 'fence', label: 'Fence / wall' }, { value: 'building', label: 'Building' }, { value: 'none', label: 'None' }]} />
        {inputs.windbreakType !== 'none' && <>
          <NumberInput label="Windbreak Height" value={inputs.windbreakHeightFt} onChange={(v) => updateInputs({ windbreakHeightFt: v })} unit="ft" min={3} max={60} step={1} />
          <NumberInput label="Distance from Hives" value={inputs.distanceFromHivesFt} onChange={(v) => updateInputs({ distanceFromHivesFt: v })} unit="ft" min={1} step={5} />
        </>}
      </div><div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div></Card>
      <ResultPanel>
        <ResultRow label="Wind reduction" value={formatPercent(result.windReductionPercent, 0)} highlight />
        <ResultRow label="Protection zone" value={formatNumber(result.protectionZoneFt)} unit="ft downwind" />
        <ResultRow label="Placement" value={result.protectionAdequate ? '✓ Good' : '⚠ Needs adjustment'} />
        <div className={`mt-3 p-4 rounded-lg border ${result.protectionAdequate ? 'bg-meadow-50 border-meadow-200 text-meadow-700' : 'bg-orange-50 border-orange-200 text-orange-700'}`}><p className="text-sm">{result.recommendation}</p></div>
        <div className="mt-3">{result.benefits.map((b, i) => <p key={i} className="text-sm text-smoke-600 py-0.5 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{b}</p>)}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[{ label: 'Protection zone', value: '~10× windbreak height' }, { label: 'Ideal distance', value: '1–3× windbreak height from hives' }, { label: 'Trees', value: '~70% wind reduction (allow some airflow)' }, { label: 'Solid wall', value: 'Creates turbulence - 50% mesh is often better' }]} />
    </div>
  );
}
