'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateReplacement, type ReplacementInputs } from './logic';
const DEFAULTS: ReplacementInputs = { totalHives: 10, lossPercent: 30, replacementMethod: 'nucs', costPerNuc: 200, costPerPackage: 160, equipmentReplacement: 30, lostHoneyLbsPerHive: 50, honeyPrice: 10 };
export function ReplacementCostWinterLossesCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('winter-loss', DEFAULTS);
  const result = useMemo(() => calculateReplacement(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Winter Loss Cost', [{ label: 'Hives lost', value: result.hivesLost }, { label: 'Total impact', value: formatCurrency(result.totalImpact) }]);
  return (
    <div className="space-y-6">
      <Card><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInput label="Total Hives Going Into Winter" value={inputs.totalHives} onChange={(v) => updateInputs({ totalHives: v })} min={1} step={1} />
        <NumberInput label="Expected Loss Rate" value={inputs.lossPercent} onChange={(v) => updateInputs({ lossPercent: v })} unit="%" min={0} max={100} step={5} helpText="National avg ~30%" />
        <SelectInput label="Replacement Method" value={inputs.replacementMethod} onChange={(v) => updateInputs({ replacementMethod: v as ReplacementInputs['replacementMethod'] })} options={[{ value: 'nucs', label: 'Buy nucs' }, { value: 'packages', label: 'Buy packages' }, { value: 'splits', label: 'Splits from survivors (free bees)' }]} />
        {inputs.replacementMethod === 'nucs' && <NumberInput label="Nuc Cost" value={inputs.costPerNuc} onChange={(v) => updateInputs({ costPerNuc: v })} unit="$" min={0} step={25} />}
        {inputs.replacementMethod === 'packages' && <NumberInput label="Package Cost" value={inputs.costPerPackage} onChange={(v) => updateInputs({ costPerPackage: v })} unit="$" min={0} step={20} />}
        <NumberInput label="Equipment Replacement per Hive" value={inputs.equipmentReplacement} onChange={(v) => updateInputs({ equipmentReplacement: v })} unit="$" min={0} step={10} helpText="Damaged frames, mold cleanup" />
        <NumberInput label="Lost Honey per Dead Hive" value={inputs.lostHoneyLbsPerHive} onChange={(v) => updateInputs({ lostHoneyLbsPerHive: v })} unit="lbs" min={0} step={10} />
        <NumberInput label="Honey Price" value={inputs.honeyPrice} onChange={(v) => updateInputs({ honeyPrice: v })} unit="$/lb" min={0} step={1} />
      </div><div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div></Card>
      <ResultPanel>
        <ResultRow label="Hives lost" value={formatInteger(result.hivesLost)} unit={`of ${inputs.totalHives}`} highlight />
        <ResultRow label="Bee replacement cost" value={formatCurrency(result.replacementCost)} />
        <ResultRow label="Equipment repair/replace" value={formatCurrency(result.equipmentCost)} />
        <ResultRow label="Lost honey revenue" value={formatCurrency(result.lostRevenue)} />
        <ResultRow label="Total financial impact" value={formatCurrency(result.totalImpact)} highlight />
        <ResultRow label="Cost per lost hive" value={formatCurrency(result.costPerLostHive)} />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Tips</h3><ul className="space-y-2" role="list">{result.tips.map((t, i) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{t}</li>)}</ul></Card>
    </div>
  );
}
