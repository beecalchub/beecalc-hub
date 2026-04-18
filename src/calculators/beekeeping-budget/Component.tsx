'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateBudget, type BudgetInputs } from './logic';

const DEFAULTS: BudgetInputs = { hiveCount: 2, isFirstYear: true, hiveType: 'new-langstroth', beeSource: 'nuc', includeExtractor: false, includeProtectiveGear: true, includeFeeding: true, includeMiteTreatment: true };

export function BeekeepingBudgetCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('bee-budget', DEFAULTS);
  const result = useMemo(() => calculateBudget(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Beekeeping Budget', [
    { label: 'First year', value: formatCurrency(result.firstYearTotal) },
    { label: 'Annual recurring', value: formatCurrency(result.annualRecurring) },
    { label: 'Break-even honey', value: `${result.breakEvenLbsHoney} lbs` },
  ]);

  const grouped = result.lineItems.reduce<Record<string, typeof result.lineItems>>((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} max={20} step={1} />
          <SelectInput label="Hive Type" value={inputs.hiveType} onChange={(v) => updateInputs({ hiveType: v as BudgetInputs['hiveType'] })} options={[
            { value: 'new-langstroth', label: 'New Langstroth (~$200)' },
            { value: 'used-langstroth', label: 'Used Langstroth (~$100)' },
            { value: 'top-bar', label: 'Top Bar (~$150)' },
          ]} />
          <SelectInput label="Bee Source" value={inputs.beeSource} onChange={(v) => updateInputs({ beeSource: v as BudgetInputs['beeSource'] })} options={[
            { value: 'nuc', label: '5-frame Nuc (~$200)' },
            { value: 'package', label: 'Package Bees (~$160)' },
            { value: 'swarm', label: 'Caught Swarm (free)' },
          ]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-4">
          <Checkbox label="Include protective gear & tools" checked={inputs.includeProtectiveGear} onChange={(v) => updateInputs({ includeProtectiveGear: v })} />
          <Checkbox label="Include feeding supplies" checked={inputs.includeFeeding} onChange={(v) => updateInputs({ includeFeeding: v })} />
          <Checkbox label="Include mite treatment" checked={inputs.includeMiteTreatment} onChange={(v) => updateInputs({ includeMiteTreatment: v })} />
          <Checkbox label="Include extraction equipment" checked={inputs.includeExtractor} onChange={(v) => updateInputs({ includeExtractor: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <ResultRow label="First year total" value={formatCurrency(result.firstYearTotal)} highlight />
        <ResultRow label="Annual recurring" value={formatCurrency(result.annualRecurring)} highlight />
        <ResultRow label="Per hive (first year)" value={formatCurrency(result.perHiveFirstYear)} />
        <ResultRow label="Per hive (annual)" value={formatCurrency(result.perHiveAnnual)} />
        <ResultRow label="Break-even honey (at $10/lb)" value={formatInteger(result.breakEvenLbsHoney)} unit="lbs" />
      </ResultPanel>

      <Card>
        <h3 className="font-display text-base text-smoke-800 mb-3">Budget Breakdown</h3>
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="mb-4 last:mb-0">
            <p className="text-sm font-medium text-smoke-700 mb-1">{cat}</p>
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1.5 border-b border-smoke-50">
                <span className="text-smoke-600">{item.item}{item.recurring ? <span className="text-xs text-smoke-400 ml-1">(annual)</span> : ''}</span>
                <span className="font-mono text-smoke-800 flex-shrink-0 ml-2">{formatCurrency(item.cost)}</span>
              </div>
            ))}
          </div>
        ))}
      </Card>

      {result.tips.length > 0 && (
        <Card>
          <h3 className="font-display text-base text-smoke-800 mb-3">Money-Saving Tips</h3>
          <ul className="space-y-2" role="list">{result.tips.map((t, i) => (
            <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{t}</li>
          ))}</ul>
        </Card>
      )}
    </div>
  );
}
