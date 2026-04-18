'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculatePlanting, type PlantingInputs } from './logic';
const DEFAULTS: PlantingInputs = { areaSqFt: 5000, budget: 200, region: 'temperate', goalBloom: 'all-season' };
export function PlantingCalculatorPollinatorCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('planting', DEFAULTS);
  const result = useMemo(() => calculatePlanting(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Pollinator Planting', [{ label: 'Seed needed', value: `${result.totalSeedLbs} lbs` }, { label: 'Cost', value: formatCurrency(result.totalCost) }]);
  return (
    <div className="space-y-6">
      <Card><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInput label="Planting Area" value={inputs.areaSqFt} onChange={(v) => updateInputs({ areaSqFt: v })} unit="ft²" min={100} step={500} />
        <NumberInput label="Budget" value={inputs.budget} onChange={(v) => updateInputs({ budget: v })} unit="$" min={0} step={25} />
        <SelectInput label="Bloom Goal" value={inputs.goalBloom} onChange={(v) => updateInputs({ goalBloom: v as PlantingInputs['goalBloom'] })} options={[{ value: 'all-season', label: 'All-season coverage' }, { value: 'spring', label: 'Spring focus' }, { value: 'summer', label: 'Summer focus' }, { value: 'fall', label: 'Fall focus' }]} />
      </div><div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div></Card>
      <ResultPanel>
        <ResultRow label="Total seed needed" value={formatNumber(result.totalSeedLbs)} unit="lbs" highlight />
        <ResultRow label="Estimated cost" value={formatCurrency(result.totalCost)} highlight />
        <ResultRow label="Bloom coverage" value={result.bloomCalendar} />
        <ResultRow label="Budget coverage" value={`${result.coveragePercent}%`} />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.tip}</div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Recommended Plants</h3>
        <div className="space-y-2">{result.plants.map(p => (
          <div key={p.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-smoke-50 rounded-lg gap-1">
            <div><span className="font-medium text-smoke-700">{p.name}</span><span className="text-xs text-smoke-400 ml-2">{p.bloomTime}</span><span className={`text-xs ml-2 px-1.5 py-0.5 rounded ${p.nectarValue === 'high' ? 'bg-meadow-100 text-meadow-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.nectarValue} nectar</span></div>
            <div className="text-sm text-smoke-600">{p.seedNeeded > 0 ? `${formatNumber(p.seedNeeded)} lbs - ${formatCurrency(p.cost)}` : 'Free / allow to grow'}</div>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
