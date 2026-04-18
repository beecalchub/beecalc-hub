'use client';

import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateJarInventory } from './logic';

const DEFAULTS = {
  expectedHoneyLbs: 100,
  pct8oz: 20,
  pct16oz: 50,
  pct32oz: 30,
  extraJarPercent: 10,
};

// Fix #6: validates that size percentages sum to 100
export function JarInventoryPlannerCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('jar-inventory', DEFAULTS);

  const pctTotal = inputs.pct8oz + inputs.pct16oz + inputs.pct32oz;
  const pctError = pctTotal !== 100 ? `Total is ${pctTotal}% - should be 100%` : undefined;

  const result = useMemo(() => calculateJarInventory({
    expectedHoneyLbs: inputs.expectedHoneyLbs,
    jarSizes: [
      { sizeOz: 8, percent: inputs.pct8oz },
      { sizeOz: 16, percent: inputs.pct16oz },
      { sizeOz: 32, percent: inputs.pct32oz },
    ],
    extraJarPercent: inputs.extraJarPercent,
  }), [inputs]);

  const copyText = () => formatResultsForCopy('Jar Inventory', [
    { label: 'Total jars', value: result.totalJars },
    ...result.lines.map((l) => ({ label: `${l.sizeOz} oz jars`, value: l.jarCount })),
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Expected Honey" value={inputs.expectedHoneyLbs} onChange={(v) => updateInputs({ expectedHoneyLbs: v })} unit="lbs" min={1} step={10} />
          <NumberInput label="Extra Jar Buffer" value={inputs.extraJarPercent} onChange={(v) => updateInputs({ extraJarPercent: v })} unit="%" min={0} max={50} helpText="Extra jars for breakage / spares" />
        </div>

        <div className="mt-4 mb-2 flex items-center justify-between">
          <p className="text-sm text-smoke-600 font-medium">Jar size distribution:</p>
          {pctError ? (
            <p className="text-xs text-red-600 font-medium" role="alert">{pctError}</p>
          ) : (
            <p className="text-xs text-meadow-600 font-medium">✓ 100%</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="8 oz jars" value={inputs.pct8oz} onChange={(v) => updateInputs({ pct8oz: v })} unit="%" min={0} max={100} />
          <NumberInput label="16 oz (1 lb) jars" value={inputs.pct16oz} onChange={(v) => updateInputs({ pct16oz: v })} unit="%" min={0} max={100} />
          <NumberInput label="32 oz (2 lb) jars" value={inputs.pct32oz} onChange={(v) => updateInputs({ pct32oz: v })} unit="%" min={0} max={100} />
        </div>

        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel>
        <ResultRow label="Total jars needed" value={formatInteger(result.totalJars)} highlight />
        <ResultRow label="Total lids" value={formatInteger(result.totalLids)} />
        <ResultRow label="Total labels" value={formatInteger(result.totalLabels)} />
        {result.lines.map((l) => (
          <ResultRow key={l.sizeOz} label={`${l.sizeOz} oz jars`} value={formatInteger(l.jarCount)} unit="jars" />
        ))}
      </ResultPanel>
    </div>
  );
}
