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
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculate, type Inputs } from './logic';
const DEFAULTS: Inputs = {"waxOz":32,"candleType":"votive","addWickCotton":true};
export function CandleYieldCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('candle-yield', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('candle-yield', [{ label: 'Candle count', value: String(result.candleCount) }, { label: 'Wick length needed', value: String(result.wickLengthFt) }, { label: 'Material cost', value: String(result.totalCost) }, { label: 'Potential revenue', value: String(result.potentialRevenue) }, { label: 'Profit', value: String(result.profit) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Beeswax Available" value={inputs.waxOz} onChange={(v) => updateInputs({ waxOz: v })} unit="oz" min={1} step={4} />
          <SelectInput label="Candle Type" value={inputs.candleType} onChange={(v) => updateInputs({ candleType: v as Inputs['candleType'] })} options={[{"value":"taper","label":"Taper (2 oz)"},{"value":"votive","label":"Votive (3 oz)"},{"value":"pillar","label":"Pillar (8 oz)"},{"value":"tealight","label":"Tealight (0.5 oz)"}]} />
        </div>
        <div className="mt-3"><Checkbox label="Include wick/cotton cost" checked={inputs.addWickCotton} onChange={(v) => updateInputs({ addWickCotton: v })} /></div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Candle count" value={result.candleCount} unit="candles" highlight />
        <ResultRow label="Wick length needed" value={result.wickLengthFt} unit="ft" />
        <ResultRow label="Material cost" value={`$${result.totalCost.toFixed(2)}`} />
        <ResultRow label="Potential revenue" value={`$${result.potentialRevenue.toFixed(2)}`} />
        <ResultRow label="Profit" value={`$${result.profit.toFixed(2)}`} highlight />
      </ResultPanel>
    </div>
  );
}
