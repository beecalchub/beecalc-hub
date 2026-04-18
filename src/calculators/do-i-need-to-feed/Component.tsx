'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateDoINeedToFeed, type DoINeedToFeedInputs } from './logic';

const DEFAULTS: DoINeedToFeedInputs = { currentStoresLbs: 12, framesOfBees: 7, season: 'spring', daysUntilForage: 21, hiveFeltWeight: 'medium', flowActive: false };
const answerColors = { yes: 'bg-red-50 border-red-200 text-red-700', probably: 'bg-orange-50 border-orange-200 text-orange-700', monitor: 'bg-yellow-50 border-yellow-200 text-yellow-700', no: 'bg-meadow-50 border-meadow-200 text-meadow-700' };

export function DoINeedToFeedCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('need-feed', DEFAULTS);
  const result = useMemo(() => calculateDoINeedToFeed(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Do I Need to Feed?', [{ label: 'Answer', value: result.answerLabel }, { label: 'What', value: result.whatToFeed }, { label: 'How much', value: result.howMuch }]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Current Stores (estimated)" value={inputs.currentStoresLbs} onChange={(v) => updateInputs({ currentStoresLbs: v })} unit="lbs" min={0} step={5} helpText="Heft the hive or count honey frames" />
          <NumberInput label="Frames of Bees" value={inputs.framesOfBees} onChange={(v) => updateInputs({ framesOfBees: v })} min={1} max={20} step={1} />
          <SelectInput label="Season" value={inputs.season} onChange={(v) => updateInputs({ season: v as DoINeedToFeedInputs['season'] })} options={[
            { value: 'spring', label: 'Spring' }, { value: 'summer', label: 'Summer' },
            { value: 'fall', label: 'Fall' }, { value: 'winter', label: 'Winter' },
          ]} />
          <NumberInput label="Days Until Forage" value={inputs.daysUntilForage} onChange={(v) => updateInputs({ daysUntilForage: v })} min={0} max={120} step={7} helpText="When will flowers bloom?" />
          <SelectInput label="Hive Felt Weight (heft test)" value={inputs.hiveFeltWeight} onChange={(v) => updateInputs({ hiveFeltWeight: v as DoINeedToFeedInputs['hiveFeltWeight'] })} options={[
            { value: 'very-light', label: 'Very light - tips easily' },
            { value: 'light', label: 'Light - lifts without much effort' },
            { value: 'medium', label: 'Medium - noticeable weight' },
            { value: 'heavy', label: 'Heavy - hard to lift' },
          ]} />
        </div>
        <div className="mt-3"><Checkbox label="Nectar flow currently active" checked={inputs.flowActive} onChange={(v) => updateInputs({ flowActive: v })} /></div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <div className={`p-5 rounded-xl border-2 mb-4 text-center ${answerColors[result.answer]}`}>
          <p className="text-2xl font-display mb-1">{result.answerLabel}</p>
          <p className="text-sm mt-1">{result.explanation}</p>
        </div>
        <ResultRow label="Urgency" value={result.urgency} />
        <ResultRow label="What to feed" value={result.whatToFeed} />
        <ResultRow label="How much" value={result.howMuch} />
        <ResultRow label="How often" value={result.howOften} />
      </ResultPanel>
    </div>
  );
}
