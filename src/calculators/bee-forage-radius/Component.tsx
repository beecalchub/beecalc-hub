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
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateForageRadius } from './logic';

const DEFAULTS = { radiusMiles: 3, colonyCount: 5 };

export function BeeForageRadiusCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('bee-forage', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateForageRadius(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Bee Forage Radius', [
    { label: 'Area', value: isMetric ? `${result.areaHectares} ha` : `${result.areaAcres} acres` },
    { label: 'Per colony', value: isMetric ? `${result.hectaresPerColony} ha` : `${result.acresPerColony} acres` },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Forage Radius" value={inputs.radiusMiles} onChange={(v) => updateInputs({ radiusMiles: v })} unit="miles" min={0.5} max={10} step={0.5} helpText="Typical bee foraging range: 2-3 miles" />
          <NumberInput label="Colony Count" value={inputs.colonyCount} onChange={(v) => updateInputs({ colonyCount: v })} min={1} step={1} helpText="Colonies sharing this forage area" />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total forage area" value={isMetric ? formatInteger(result.areaHectares) : formatInteger(result.areaAcres)} unit={isMetric ? 'hectares' : 'acres'} highlight />
        <ResultRow label="Radius" value={isMetric ? formatNumber(result.radiusKm) : formatNumber(result.radiusMiles)} unit={isMetric ? 'km' : 'miles'} />
        <ResultRow label="Area per colony" value={isMetric ? formatInteger(result.hectaresPerColony) : formatInteger(result.acresPerColony)} unit={isMetric ? 'ha/colony' : 'acres/colony'} highlight />
        <div className="mt-3 p-3 bg-smoke-50 rounded-lg text-sm text-smoke-600">{result.competitionLevel}</div>
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: 'Typical foraging radius', value: '2-3 miles (3-5 km)' },
        { label: 'Max foraging radius', value: '~5 miles (8 km)' },
        { label: 'Comfortable density', value: '>200 acres per colony in typical landscape' },
      ]} />
    </div>
  );
}
