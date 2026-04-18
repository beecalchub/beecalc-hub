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
import { formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateJarLabels } from './logic';

const DEFAULTS = {
  qty8oz: 30, qty16oz: 80, qty32oz: 40,
  labelTypes: 1, extraPercent: 10, sheetsPerRoll: 100, labelsPerSheet: 1,
};

export function JarLabelQuantityCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('jar-labels', DEFAULTS);

  const result = useMemo(() => calculateJarLabels({
    jarSizes: [
      { sizeOz: 8, quantity: inputs.qty8oz },
      { sizeOz: 16, quantity: inputs.qty16oz },
      { sizeOz: 32, quantity: inputs.qty32oz },
    ],
    labelTypes: inputs.labelTypes,
    extraPercent: inputs.extraPercent,
    sheetsPerRoll: inputs.sheetsPerRoll,
    labelsPerSheet: inputs.labelsPerSheet,
  }), [inputs]);

  const copyText = () => formatResultsForCopy('Jar Labels', [
    { label: 'Total labels', value: result.labelsWithExtra },
    { label: 'Sheets', value: result.sheetsNeeded },
    { label: 'Rolls', value: result.rollsNeeded },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-medium text-smoke-700 mb-2">Jars per size:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="8 oz jars" value={inputs.qty8oz} onChange={(v) => updateInputs({ qty8oz: v })} min={0} step={5} />
          <NumberInput label="16 oz jars" value={inputs.qty16oz} onChange={(v) => updateInputs({ qty16oz: v })} min={0} step={10} />
          <NumberInput label="32 oz jars" value={inputs.qty32oz} onChange={(v) => updateInputs({ qty32oz: v })} min={0} step={5} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <NumberInput label="Labels per Jar" value={inputs.labelTypes} onChange={(v) => updateInputs({ labelTypes: v })} min={1} max={3} step={1} helpText="1 = front only, 2 = front + back" />
          <NumberInput label="Extra / Waste Buffer" value={inputs.extraPercent} onChange={(v) => updateInputs({ extraPercent: v })} unit="%" min={0} max={50} />
          <NumberInput label="Labels per Sheet" value={inputs.labelsPerSheet} onChange={(v) => updateInputs({ labelsPerSheet: v })} min={1} max={30} step={1} helpText="How many labels per printer sheet" />
          <NumberInput label="Sheets per Roll/Pack" value={inputs.sheetsPerRoll} onChange={(v) => updateInputs({ sheetsPerRoll: v })} min={1} step={25} helpText="For ordering rolls or packs" />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <ResultRow label="Total labels needed" value={formatInteger(result.labelsWithExtra)} highlight />
        <ResultRow label="Sheets needed" value={formatInteger(result.sheetsNeeded)} />
        <ResultRow label="Rolls/packs to order" value={formatInteger(result.rollsNeeded)} highlight />
        <ResultRow label="Total jars" value={formatInteger(result.totalJars)} />
        {result.perSize.filter(p => p.jars > 0).map((p) => (
          <ResultRow key={p.sizeOz} label={`${p.sizeOz} oz labels`} value={formatInteger(p.labels)} />
        ))}
      </ResultPanel>

      <AssumptionsPanel assumptions={[
        { label: 'Extra buffer', value: `${inputs.extraPercent}% for misprints and spares` },
        { label: 'Label types', value: inputs.labelTypes === 1 ? 'Front label only' : `${inputs.labelTypes} labels per jar` },
      ]} />
    </div>
  );
}
