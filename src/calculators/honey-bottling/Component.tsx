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
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateBottling, JAR_SIZES } from './logic';

const DEFAULTS = { totalHoneyLbs: 60, jarSizeOz: 16, overheadPercent: 5 };

// Fix #11: Added metric display for results
export function HoneyBottlingCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('honey-bottling', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateBottling(inputs), [inputs]);

  const copyText = () =>
    formatResultsForCopy('Honey Bottling', [
      { label: 'Jars to fill', value: result.jarCount },
      { label: 'Honey per jar', value: `${result.honeyPerJarLbs} lbs` },
      { label: 'Leftover', value: `${result.leftoverOz} oz` },
    ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput
            label="Total Honey"
            value={inputs.totalHoneyLbs}
            onChange={(v) => updateInputs({ totalHoneyLbs: v })}
            unit="lbs"
            min={1}
            step={5}
            helpText={isMetric ? `≈ ${formatNumber(inputs.totalHoneyLbs * 0.4536)} kg` : undefined}
          />
          <SelectInput
            label="Jar Size"
            value={String(inputs.jarSizeOz)}
            onChange={(v) => updateInputs({ jarSizeOz: Number(v) })}
            options={JAR_SIZES.map((j) => ({ value: String(j.value), label: j.label }))}
          />
          <NumberInput
            label="Waste / Overhead"
            value={inputs.overheadPercent}
            onChange={(v) => updateInputs({ overheadPercent: v })}
            unit="%"
            min={0}
            max={20}
            step={1}
            helpText="Lost to straining, sticking, sampling"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>
      <ResultPanel>
        <ResultRow label="Jars to fill" value={formatInteger(result.jarCount)} unit="jars" highlight />
        <ResultRow
          label="Usable honey"
          value={isMetric ? formatNumber(result.usableHoneyOz * 28.35 / 1000, 1) : formatNumber(result.usableHoneyOz)}
          unit={isMetric ? 'kg' : 'oz'}
        />
        <ResultRow
          label="Leftover honey"
          value={isMetric ? formatNumber(result.leftoverOz * 28.35) : formatNumber(result.leftoverOz)}
          unit={isMetric ? 'g' : 'oz'}
        />
        <ResultRow
          label="Total bottled weight"
          value={isMetric ? formatNumber(result.totalWeightLbs * 0.4536) : formatNumber(result.totalWeightLbs)}
          unit={isMetric ? 'kg' : 'lbs'}
        />
      </ResultPanel>
      <AssumptionsPanel assumptions={[
        { label: 'Honey density', value: '~12 lbs per gallon / 1.42 kg/L' },
        { label: 'Default overhead', value: '5% for straining and residue' },
      ]} />
    </div>
  );
}
