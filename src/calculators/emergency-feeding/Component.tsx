'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateEmergencyFeeding, type EmergencyFeedingInputs } from './logic';

const DEFAULTS: EmergencyFeedingInputs = { framesOfBees: 6, currentStoresLbs: 5, outsideTempF: 45, daysUntilForage: 21 };

const urgencyColors = { none: 'bg-meadow-50 border-meadow-200 text-meadow-700', watch: 'bg-blue-50 border-blue-200 text-blue-700', 'feed-soon': 'bg-orange-50 border-orange-200 text-orange-700', 'feed-now': 'bg-red-50 border-red-200 text-red-700' };
const urgencyLabels = { none: 'No emergency - stores are adequate', watch: 'Monitor - stores are getting low', 'feed-soon': 'Feed soon - stores running low', 'feed-now': 'Feed immediately - starvation risk' };

export function EmergencyFeedingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('emergency-feed', DEFAULTS);
  const result = useMemo(() => calculateEmergencyFeeding(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Emergency Feeding', [
    { label: 'Urgency', value: urgencyLabels[result.urgency] },
    { label: 'Method', value: result.method },
    { label: 'Amount', value: result.amountNeeded },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Frames of Bees" value={inputs.framesOfBees} onChange={(v) => updateInputs({ framesOfBees: v })} min={1} max={20} step={1} />
          <NumberInput label="Current Stores" value={inputs.currentStoresLbs} onChange={(v) => updateInputs({ currentStoresLbs: v })} unit="lbs" min={0} step={2} />
          <NumberInput label="Outside Temperature" value={inputs.outsideTempF} onChange={(v) => updateInputs({ outsideTempF: v })} unit="°F" min={-20} max={110} step={5} />
          <NumberInput label="Days Until Forage Available" value={inputs.daysUntilForage} onChange={(v) => updateInputs({ daysUntilForage: v })} min={1} max={120} step={7} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <div className={`p-4 rounded-lg border mb-3 ${urgencyColors[result.urgency]}`}>
          <p className="font-medium text-base">{urgencyLabels[result.urgency]}</p>
        </div>
        <ResultRow label="Stores remaining" value={formatNumber(result.daysOfStoresRemaining)} unit="days" highlight />
        <ResultRow label="Recommended method" value={result.method} />
        <ResultRow label="Amount needed" value={result.amountNeeded} />
        <div className="mt-3 p-3 bg-smoke-50 rounded-lg text-sm text-smoke-600">{result.methodReason}</div>
      </ResultPanel>
      <Card>
        <h3 className="font-display text-base text-smoke-800 mb-3">Instructions</h3>
        <ol className="space-y-2">{result.instructions.map((s, i) => (
          <li key={i} className="flex gap-3 text-sm text-smoke-700">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-honey-100 text-honey-700 text-xs font-bold flex items-center justify-center">{i+1}</span>
            <span className="pt-0.5">{s}</span>
          </li>
        ))}</ol>
      </Card>
      <AssumptionsPanel assumptions={[
        { label: 'Daily consumption', value: '~0.12 lbs per frame of bees' },
        { label: 'Below 40°F', value: 'Use dry sugar or fondant only' },
        { label: 'Above 55°F', value: 'Liquid syrup is fine' },
      ]} />
    </div>
  );
}
