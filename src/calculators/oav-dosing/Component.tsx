'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateOavDosing } from './logic';

const DEFAULTS = { broodBoxCount: 2, hiveCount: 1, hasScreenBottom: false };

// Fix #10, #18: uses shared Checkbox component
export function OavDosingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('oav-dosing', DEFAULTS);
  const result = useMemo(() => calculateOavDosing(inputs), [inputs]);

  const copyText = () =>
    formatResultsForCopy('OAV Dosing', [
      { label: 'Per hive', value: `${result.gramsPerHive} g` },
      { label: 'Total', value: `${formatNumber(result.totalGrams)} g` },
      { label: 'Protocol', value: `${result.rounds} rounds, ${result.daysBetweenRounds} days apart` },
    ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput
            label="Brood Boxes per Hive"
            value={inputs.broodBoxCount}
            onChange={(v) => updateInputs({ broodBoxCount: v })}
            min={1}
            max={5}
            step={1}
            helpText="Deep or medium brood boxes"
          />
          <NumberInput
            label="Number of Hives"
            value={inputs.hiveCount}
            onChange={(v) => updateInputs({ hiveCount: v })}
            min={1}
            step={1}
          />
        </div>
        <div className="mt-3">
          <Checkbox
            label="Hives have screened bottom boards"
            checked={inputs.hasScreenBottom}
            onChange={(v) => updateInputs({ hasScreenBottom: v })}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel>
        <ResultRow label="OA per hive" value={result.gramsPerHive} unit="g" highlight />
        <ResultRow label="Total OA needed" value={formatNumber(result.totalGrams)} unit="g" highlight />
        <ResultRow label="Total OA needed" value={formatNumber(result.totalOunces, 2)} unit="oz" />
        <ResultRow label="Treatment rounds" value={result.rounds} unit="rounds" />
        <ResultRow label="Days between rounds" value={result.daysBetweenRounds} unit="days" />

        {inputs.hiveCount > 1 && (
          <ResultRow
            label={`Total for full protocol (${result.rounds} rounds)`}
            value={formatNumber(result.totalGrams * result.rounds)}
            unit="g"
          />
        )}
      </ResultPanel>

      <Card className="border-red-200 bg-red-50">
        <h3 className="font-display text-base text-red-800 mb-3 flex items-center gap-2">
          <span aria-hidden="true">⚠️</span> Safety Requirements
        </h3>
        <ul className="space-y-2" role="list">
          {result.safetyNotes.map((note, i) => (
            <li key={i} className="text-sm text-red-700 flex items-start gap-2">
              <span className="text-red-400 mt-0.5" aria-hidden="true">•</span>
              {note}
            </li>
          ))}
        </ul>
      </Card>

      <AssumptionsPanel
        assumptions={[
          { label: 'Dose per brood box', value: '1 gram oxalic acid dihydrate' },
          { label: 'Maximum per hive', value: '4 grams' },
          { label: 'Standard protocol', value: '3 rounds, 5 days apart (with brood)' },
          { label: 'Broodless treatment', value: '1 round sufficient' },
        ]}
      />
    </div>
  );
}
