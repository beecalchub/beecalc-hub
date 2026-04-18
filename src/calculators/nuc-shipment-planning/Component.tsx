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
const DEFAULTS: Inputs = {"nucsToShip":50,"boxType":"cardboard","shippingMethod":"freight"};
export function NucShipmentPlanningCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('nuc-shipment-planning', DEFAULTS);
  const result = useMemo(() => calculate(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('nuc-shipment-planning', [{ label: 'Boxes needed', value: String(result.boxesNeeded) }, { label: 'Screen area', value: String(result.screenAreaSqFt) }, { label: 'Shipping cost', value: String(result.estimatedShippingCost) }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Nucs to Ship" value={inputs.nucsToShip} onChange={(v) => updateInputs({ nucsToShip: v })} min={1} step={1} />
          <SelectInput label="Shipping Box" value={inputs.boxType} onChange={(v) => updateInputs({ boxType: v as Inputs['boxType'] })} options={[{"value":"cardboard","label":"Cardboard (cheap)"},{"value":"wood","label":"Wood (durable)"},{"value":"plastic","label":"Plastic"}]} />
          <SelectInput label="Shipping Method" value={inputs.shippingMethod} onChange={(v) => updateInputs({ shippingMethod: v as Inputs['shippingMethod'] })} options={[{"value":"freight","label":"Freight truck"},{"value":"air","label":"Air"},{"value":"hand","label":"Hand delivery"}]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Boxes needed" value={String(result.boxesNeeded)} highlight />
        <ResultRow label="Screen area" value={String(result.screenAreaSqFt)} unit="sq ft" />
        <ResultRow label="Shipping cost" value={`$${result.estimatedShippingCost.toFixed(2)}`} highlight />
      </ResultPanel>
      {result.recommendations.length > 0 && <Card><h3 className="font-display text-base text-smoke-800 mb-3">Tips</h3>
        <ul className="space-y-2" role="list">{result.recommendations.map((x: string, i: number) => <li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{x}</li>)}</ul>
      </Card>}
    </div>
  );
}
