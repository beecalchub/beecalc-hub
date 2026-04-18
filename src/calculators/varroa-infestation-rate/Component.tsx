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
import { calculateVarroaRate, getMethodInfo, type WashMethod, type VarroaInputs } from './logic';

const DEFAULTS: VarroaInputs = { method: 'alcohol', mitesFound: 0, beeSampleSize: 300 };

const riskColors = {
  low: 'text-meadow-600 bg-meadow-50 border-meadow-200',
  moderate: 'text-yellow-700 bg-yellow-50 border-yellow-200',
  high: 'text-orange-700 bg-orange-50 border-orange-200',
  critical: 'text-red-700 bg-red-50 border-red-200',
};

export function VarroaInfestationRateCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('varroa-rate', DEFAULTS);

  const result = useMemo(() => calculateVarroaRate(inputs), [inputs]);
  const methodInfo = getMethodInfo(inputs.method);

  const copyText = () =>
    formatResultsForCopy('Varroa Infestation Rate', [
      { label: 'Method', value: methodInfo.label },
      { label: 'Mites found', value: inputs.mitesFound },
      { label: 'Infestation rate', value: formatPercent(result.infestationPercent) },
      { label: 'Risk level', value: result.riskLevel.toUpperCase() },
    ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SelectInput
            label="Wash Method"
            value={inputs.method}
            onChange={(v) => updateInputs({ method: v as WashMethod })}
            options={[
              { value: 'alcohol', label: 'Alcohol Wash' },
              { value: 'sugar-roll', label: 'Sugar Roll' },
              { value: 'co2', label: 'CO₂ Wash' },
            ]}
          />
          <NumberInput
            label="Mites Found"
            value={inputs.mitesFound}
            onChange={(v) => updateInputs({ mitesFound: v })}
            min={0}
            step={1}
            helpText="Count of mites from your wash"
          />
          <NumberInput
            label="Bee Sample Size"
            value={inputs.beeSampleSize}
            onChange={(v) => updateInputs({ beeSampleSize: v })}
            min={1}
            step={50}
            helpText="~300 bees = ½ cup"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel visible={inputs.beeSampleSize > 0}>
        <ResultRow
          label="Infestation Rate"
          value={formatPercent(result.infestationPercent)}
          highlight
        />
        <ResultRow
          label="Mites per 100 bees"
          value={formatNumber(result.mitesPerHundred)}
        />

        {/* Risk assessment */}
        <div className={`mt-4 p-4 rounded-lg border ${riskColors[result.riskLevel]}`}>
          <p className="font-medium text-base mb-1 capitalize">
            Risk Level: {result.riskLevel}
          </p>
          <p className="text-sm">{result.recommendation}</p>
        </div>

        <div className="mt-3 text-xs text-smoke-500">
          <p>Treatment thresholds: Spring &lt;{result.thresholdSpring}% · Late Summer &lt;{result.thresholdLateSummer}%</p>
        </div>
      </ResultPanel>

      <AssumptionsPanel
        assumptions={[
          { label: 'Standard sample size', value: '~300 bees (½ cup)' },
          { label: 'Detection accuracy', value: methodInfo.accuracy },
          { label: 'Spring threshold', value: '2% (treat above)' },
          { label: 'Late summer threshold', value: '3% (treat above)' },
        ]}
      />
    </div>
  );
}
