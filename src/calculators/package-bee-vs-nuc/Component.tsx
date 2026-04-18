'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculatePkgVsNuc } from './logic';
const DEFAULTS = { packageCost: 160, nucCost: 200, hiveCount: 2, honeyPricePerLb: 10 };
export function PackageBeeVsNucCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('pkg-vs-nuc', DEFAULTS);
  const result = useMemo(() => calculatePkgVsNuc(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Package vs Nuc', [{ label: 'Package net cost', value: formatCurrency(result.packageNetCost) }, { label: 'Nuc net cost', value: formatCurrency(result.nucNetCost) }]);
  return (
    <div className="space-y-6">
      <Card><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NumberInput label="Package Cost" value={inputs.packageCost} onChange={(v) => updateInputs({ packageCost: v })} unit="$" min={0} step={10} />
        <NumberInput label="Nuc Cost" value={inputs.nucCost} onChange={(v) => updateInputs({ nucCost: v })} unit="$" min={0} step={10} />
        <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
        <NumberInput label="Honey Price" value={inputs.honeyPricePerLb} onChange={(v) => updateInputs({ honeyPricePerLb: v })} unit="$/lb" min={0} step={1} />
      </div><div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div></Card>
      <ResultPanel title="Side-by-Side Comparison">
        <div className="overflow-x-auto -mx-4 sm:-mx-6"><table className="w-full text-sm min-w-[400px]"><thead><tr className="border-b border-smoke-200 text-left"><th scope="col" className="py-2 px-4 sm:px-6 text-smoke-500 font-medium">Factor</th><th scope="col" className="py-2 px-2 text-smoke-500 font-medium">Package</th><th scope="col" className="py-2 px-4 sm:px-6 text-smoke-500 font-medium">Nuc</th></tr></thead>
          <tbody>{result.comparison.map(c => (<tr key={c.factor} className="border-b border-smoke-50"><td className="py-2 px-4 sm:px-6 text-smoke-700 font-medium">{c.factor}</td>
            <td className={`py-2 px-2 ${c.winner === 'package' ? 'text-meadow-700 font-medium' : 'text-smoke-600'}`}>{c.package_}{c.winner === 'package' ? ' ✓' : ''}</td>
            <td className={`py-2 px-4 sm:px-6 ${c.winner === 'nuc' ? 'text-meadow-700 font-medium' : 'text-smoke-600'}`}>{c.nuc}{c.winner === 'nuc' ? ' ✓' : ''}</td></tr>))}</tbody></table></div>
      </ResultPanel>
      <ResultPanel>
        <ResultRow label="Package net cost (after honey)" value={formatCurrency(result.packageNetCost)} />
        <ResultRow label="Nuc net cost (after honey)" value={formatCurrency(result.nucNetCost)} />
        <div className="mt-3 p-4 bg-honey-50 rounded-lg text-sm text-honey-800">{result.recommendation}</div>
      </ResultPanel>
    </div>
  );
}
