'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"hivesDeployed":100,"ratePerHive":200,"crops":2,"bonusPerCrop":500};
export function PollinationRevenueCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('pollination-revenue', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('pollination-revenue', [{ label: 'Base revenue', value: String(result.baseRevenue) }, { label: 'Bonus revenue', value: String(result.bonusRevenue) }, { label: 'Total revenue', value: String(result.totalRevenue) }, { label: 'Per hive', value: String(result.revenuePerHive) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Hives Deployed" value={inputs.hivesDeployed} onChange={(v) => updateInputs({ hivesDeployed: v })} min={1} step={1} />
          <NumberInput label="Rate per Hive" value={inputs.ratePerHive} onChange={(v) => updateInputs({ ratePerHive: v })} unit="$" min={0} step={25} />
          <NumberInput label="Number of Crops" value={inputs.crops} onChange={(v) => updateInputs({ crops: v })} min={1} max={10} step={1} />
          <NumberInput label="Bonus per Crop" value={inputs.bonusPerCrop} onChange={(v) => updateInputs({ bonusPerCrop: v })} unit="$" min={0} step={100} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Base revenue" value={`$${result.baseRevenue.toFixed(2)}`} highlight />
        <ResultRow label="Bonus revenue" value={`$${result.bonusRevenue.toFixed(2)}`} />
        <ResultRow label="Total revenue" value={`$${result.totalRevenue.toFixed(2)}`} highlight />
        <ResultRow label="Per hive" value={`$${result.revenuePerHive.toFixed(2)}`} />
      </ResultPanel>
    </div>
  );
}
