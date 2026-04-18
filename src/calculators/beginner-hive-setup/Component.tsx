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
import { formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateBeginnerSetup, type BeginnerSetupInputs } from './logic';

const DEFAULTS: BeginnerSetupInputs = { hiveCount: 2, hiveType: 'langstroth', beeSource: 'nuc', includeExtractor: false };

// Fix #15, #18: uses shared Checkbox; Fix #15: table has scope on th
export function BeginnerHiveSetupCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('beginner-setup', DEFAULTS);
  const result = useMemo(() => calculateBeginnerSetup(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Beginner Hive Setup', [
    { label: 'Total cost', value: formatCurrency(result.totalCost) },
    { label: 'Essential only', value: formatCurrency(result.essentialCost) },
    { label: 'Per hive', value: formatCurrency(result.perHiveCost) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} max={10} step={1} />
          <SelectInput label="Hive Type" value={inputs.hiveType} onChange={(v) => updateInputs({ hiveType: v as 'langstroth' | 'top-bar' })} options={[{ value: 'langstroth', label: 'Langstroth' }, { value: 'top-bar', label: 'Top Bar' }]} />
          <SelectInput label="Bee Source" value={inputs.beeSource} onChange={(v) => updateInputs({ beeSource: v as 'package' | 'nuc' })} options={[{ value: 'package', label: 'Package (~$160)' }, { value: 'nuc', label: '5-Frame Nuc (~$200)' }]} />
        </div>
        <div className="mt-3">
          <Checkbox
            label="Include extraction equipment"
            checked={inputs.includeExtractor}
            onChange={(v) => updateInputs({ includeExtractor: v })}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel title="Cost Estimate">
        <ResultRow label="Total estimated cost" value={formatCurrency(result.totalCost)} highlight />
        <ResultRow label="Essential items only" value={formatCurrency(result.essentialCost)} />
        <ResultRow label="Average per hive" value={formatCurrency(result.perHiveCost)} />
      </ResultPanel>

      <Card>
        <h3 className="font-display text-base text-smoke-800 mb-3">Equipment List</h3>
        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <table className="w-full text-sm min-w-[400px]">
            <thead>
              <tr className="border-b border-smoke-200 text-left">
                <th scope="col" className="py-2 px-4 sm:px-6 text-smoke-500 font-medium">Item</th>
                <th scope="col" className="py-2 px-2 text-smoke-500 font-medium text-right">Qty</th>
                <th scope="col" className="py-2 px-2 text-smoke-500 font-medium text-right">Unit</th>
                <th scope="col" className="py-2 px-4 sm:px-6 text-smoke-500 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {result.equipment.map((e, i) => (
                <tr key={i} className="border-b border-smoke-50">
                  <td className="py-2 px-4 sm:px-6 text-smoke-700">
                    {e.item}
                    {e.essential && <span className="text-honey-500 ml-1 text-xs" aria-label="essential">●</span>}
                  </td>
                  <td className="py-2 px-2 text-right text-smoke-600">{e.totalQty}</td>
                  <td className="py-2 px-2 text-right text-smoke-600">{formatCurrency(e.unitCost)}</td>
                  <td className="py-2 px-4 sm:px-6 text-right font-medium text-smoke-800">{formatCurrency(e.totalCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-smoke-400 mt-3">
          <span className="text-honey-500" aria-hidden="true">●</span> = essential item. Prices are approximate US averages.
        </p>
      </Card>
    </div>
  );
}
