'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatNumber, formatPercent } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateThreshold, type ThresholdInputs, type Season } from './logic';

const DEFAULTS: ThresholdInputs = {
  mitesPerHundred: 3, season: 'late-summer', hasSupersOn: false,
  broodPresent: true, queenRightConfirmed: true, daysUntilFlow: 60,
};

const urgencyColors = {
  none: 'bg-meadow-50 border-meadow-200 text-meadow-700',
  monitor: 'bg-blue-50 border-blue-200 text-blue-700',
  plan: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  'treat-soon': 'bg-orange-50 border-orange-200 text-orange-700',
  'treat-now': 'bg-red-50 border-red-200 text-red-700',
};

export function ThresholdActionCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('threshold-action', DEFAULTS);
  const result = useMemo(() => calculateThreshold(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Mite Threshold Action', [
    { label: 'Mites/100', value: inputs.mitesPerHundred },
    { label: 'Threshold', value: `${result.threshold}%` },
    { label: 'Action', value: result.urgencyLabel },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Mites per 100 Bees" value={inputs.mitesPerHundred} onChange={(v) => updateInputs({ mitesPerHundred: v })} min={0} max={30} step={0.5} helpText="From alcohol wash or sugar roll" />
          <SelectInput label="Season" value={inputs.season} onChange={(v) => updateInputs({ season: v as Season })} options={[
            { value: 'early-spring', label: 'Early Spring' }, { value: 'late-spring', label: 'Late Spring' },
            { value: 'summer', label: 'Summer' }, { value: 'late-summer', label: 'Late Summer' },
            { value: 'fall', label: 'Fall' },
          ]} />
          <NumberInput label="Days Until Honey Flow" value={inputs.daysUntilFlow} onChange={(v) => updateInputs({ daysUntilFlow: v })} min={0} max={180} step={7} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="Honey supers currently on" checked={inputs.hasSupersOn} onChange={(v) => updateInputs({ hasSupersOn: v })} />
          <Checkbox label="Brood present" checked={inputs.broodPresent} onChange={(v) => updateInputs({ broodPresent: v })} />
          <Checkbox label="Queen-right confirmed" checked={inputs.queenRightConfirmed} onChange={(v) => updateInputs({ queenRightConfirmed: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <ResultRow label="Your mite level" value={formatNumber(inputs.mitesPerHundred)} unit="per 100 bees" />
        <ResultRow label="Seasonal threshold" value={formatNumber(result.threshold)} unit="per 100 bees" />
        <div className={`mt-3 p-4 rounded-lg border ${urgencyColors[result.urgency]}`}>
          <p className="font-medium text-base mb-1">{result.urgencyLabel}</p>
          <p className="text-sm">{result.recommendation}</p>
        </div>
        <div className="mt-3 p-3 bg-smoke-50 rounded-lg text-sm text-smoke-600">{result.timeframeMessage}</div>
      </ResultPanel>

      <Card>
        <h3 className="font-display text-base text-smoke-800 mb-3">Treatment Options</h3>
        <div className="space-y-2">
          {result.treatmentOptions.map((opt) => (
            <div key={opt.name} className={`flex items-start gap-3 p-3 rounded-lg ${opt.suitable ? 'bg-meadow-50' : 'bg-smoke-50'}`}>
              <span className={`flex-shrink-0 mt-0.5 text-sm ${opt.suitable ? 'text-meadow-600' : 'text-smoke-400'}`}>
                {opt.suitable ? '✓' : '✗'}
              </span>
              <div>
                <p className={`text-sm font-medium ${opt.suitable ? 'text-smoke-800' : 'text-smoke-500'}`}>{opt.name}</p>
                <p className="text-xs text-smoke-500">{opt.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <AssumptionsPanel assumptions={[
        { label: 'Early spring threshold', value: '1 mite per 100 bees' },
        { label: 'Spring/summer threshold', value: '2 mites per 100 bees' },
        { label: 'Fall threshold', value: '3 mites per 100 bees' },
        { label: 'Sample method', value: 'Alcohol wash of ~300 bees (½ cup)' },
      ]} />
    </div>
  );
}
