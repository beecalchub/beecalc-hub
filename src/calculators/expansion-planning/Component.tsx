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
import { calculateExpansion, type ExpansionInputs } from './logic';
const DEFAULTS: ExpansionInputs = { currentHives: 5, targetHives: 20, method: 'mixed', splitsPerYear: 30, nucCost: 200, newEquipmentPerHive: 180, yearsAllowed: 5 };
export function ExpansionPlanningCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('expansion', DEFAULTS);
  const result = useMemo(() => calculateExpansion(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Expansion Plan', [{ label: 'Years', value: result.yearsToTarget }, { label: 'Cost', value: formatCurrency(result.totalCost) }]);
  return (
    <div className="space-y-6">
      <Card><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInput label="Current Hives" value={inputs.currentHives} onChange={(v) => updateInputs({ currentHives: v })} min={1} max={500} step={1} />
        <NumberInput label="Target Hives" value={inputs.targetHives} onChange={(v) => updateInputs({ targetHives: v })} min={2} max={1000} step={5} />
        <SelectInput label="Expansion Method" value={inputs.method} onChange={(v) => updateInputs({ method: v as ExpansionInputs['method'] })} options={[{ value: 'splits', label: 'Splits only (cheapest)' }, { value: 'purchase', label: 'Purchase nucs (fastest)' }, { value: 'mixed', label: 'Mix of splits + purchases' }]} />
        {inputs.method !== 'purchase' && <NumberInput label="Split Rate" value={inputs.splitsPerYear} onChange={(v) => updateInputs({ splitsPerYear: v })} unit="% of hives/yr" min={10} max={50} step={5} />}
        {inputs.method !== 'splits' && <NumberInput label="Nuc Cost" value={inputs.nucCost} onChange={(v) => updateInputs({ nucCost: v })} unit="$" min={0} step={25} />}
        <NumberInput label="New Equipment per Hive" value={inputs.newEquipmentPerHive} onChange={(v) => updateInputs({ newEquipmentPerHive: v })} unit="$" min={0} step={10} />
        <NumberInput label="Max Years Allowed" value={inputs.yearsAllowed} onChange={(v) => updateInputs({ yearsAllowed: v })} min={1} max={10} step={1} />
      </div><div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div></Card>
      <ResultPanel>
        <ResultRow label="Hives to add" value={formatInteger(result.hivesNeeded)} highlight />
        <ResultRow label="Years to reach target" value={result.yearsToTarget} unit="years" highlight />
        <ResultRow label="Total expansion cost" value={formatCurrency(result.totalCost)} highlight />
        <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Year-by-Year Plan</h3>
        <div className="overflow-x-auto -mx-4 sm:-mx-6"><table className="w-full text-sm min-w-[400px]"><thead><tr className="border-b border-smoke-200 text-left"><th scope="col" className="py-2 px-4 sm:px-6 text-smoke-500 font-medium">Year</th><th scope="col" className="py-2 px-2 text-smoke-500 font-medium text-right">Start</th><th scope="col" className="py-2 px-2 text-smoke-500 font-medium text-right">Added</th><th scope="col" className="py-2 px-2 text-smoke-500 font-medium text-right">End</th><th scope="col" className="py-2 px-4 sm:px-6 text-smoke-500 font-medium text-right">Cost</th></tr></thead>
          <tbody>{result.yearlyPlan.map(y => (<tr key={y.year} className="border-b border-smoke-50"><td className="py-2 px-4 sm:px-6 text-smoke-700">Year {y.year}</td><td className="py-2 px-2 text-right text-smoke-600">{y.startHives}</td><td className="py-2 px-2 text-right text-meadow-600 font-medium">+{y.added}</td><td className="py-2 px-2 text-right text-smoke-800 font-medium">{y.endHives}</td><td className="py-2 px-4 sm:px-6 text-right text-smoke-800">{formatCurrency(y.cost)}</td></tr>))}</tbody>
        </table></div>
      </Card>
    </div>
  );
}
