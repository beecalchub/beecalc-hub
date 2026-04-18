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
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"productType":"lip-balm","batchQuantity":50,"beeswaxPerUnit":0.3};
export function LipBalmSoapBatchCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('lip-balm-soap-batch', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('lip-balm-soap-batch', [{ label: 'Total beeswax', value: String(result.totalBeeswaxOz) }, { label: 'Total oils', value: String(result.totalOilsOz) }, { label: 'Essential oils', value: String(result.totalEssentialsOz) }, { label: 'Total cost', value: String(result.totalCost) }, { label: 'Revenue', value: String(result.sellingPrice) }, { label: 'Profit', value: String(result.profit) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Product Type" value={inputs.productType} onChange={(v) => updateInputs({ productType: v as Inputs['productType'] })} options={[{"value":"lip-balm","label":"Lip balm tubes"},{"value":"lotion-bar","label":"Lotion bars"},{"value":"soap","label":"Soap bars"}]} />
          <NumberInput label="Batch Quantity" value={inputs.batchQuantity} onChange={(v) => updateInputs({ batchQuantity: v })} min={1} step={10} />
          <NumberInput label="Beeswax per Unit" value={inputs.beeswaxPerUnit} onChange={(v) => updateInputs({ beeswaxPerUnit: v })} unit="oz" min={0.1} step={0.25} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total beeswax" value={result.totalBeeswaxOz} unit="oz" highlight />
        <ResultRow label="Total oils" value={result.totalOilsOz} unit="oz" />
        <ResultRow label="Essential oils" value={result.totalEssentialsOz} unit="oz" />
        <ResultRow label="Total cost" value={`$${result.totalCost.toFixed(2)}`} />
        <ResultRow label="Revenue" value={`$${result.sellingPrice.toFixed(2)}`} />
        <ResultRow label="Profit" value={`$${result.profit.toFixed(2)}`} highlight />
      </ResultPanel>
    </div>
  );
}
