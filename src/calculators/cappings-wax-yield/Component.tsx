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
import { formatNumber, formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateCappingsWax, type CappingsWaxInputs } from './logic';

const DEFAULTS: CappingsWaxInputs = { honeyHarvestedLbs: 200, extractionMethod: 'knife', renderingMethod: 'solar' };

export function CappingsWaxYieldCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('cappings-wax', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateCappingsWax(inputs), [inputs]);

  const copyText = () => formatResultsForCopy('Cappings Wax Yield', [
    { label: 'Rendered wax', value: isMetric ? `${result.renderedWaxKg} kg` : `${result.renderedWaxOz} oz` },
    { label: 'Cappings honey', value: isMetric ? `${result.cappingsHoneyKg} kg` : `${result.cappingsHoneyLbs} lbs` },
    { label: 'Est. wax value', value: formatCurrency(result.waxValueEstimate) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput
            label="Honey Harvested"
            value={inputs.honeyHarvestedLbs}
            onChange={(v) => updateInputs({ honeyHarvestedLbs: v })}
            unit="lbs"
            min={10}
            step={10}
            helpText={isMetric ? `≈ ${formatNumber(inputs.honeyHarvestedLbs * 0.4536)} kg` : 'Total extracted honey'}
          />
          <SelectInput
            label="Uncapping Method"
            value={inputs.extractionMethod}
            onChange={(v) => updateInputs({ extractionMethod: v as CappingsWaxInputs['extractionMethod'] })}
            options={[
              { value: 'knife', label: 'Hot knife (most wax)' },
              { value: 'plane', label: 'Cappings plane' },
              { value: 'fork', label: 'Cappings fork (least wax)' },
            ]}
          />
          <SelectInput
            label="Rendering Method"
            value={inputs.renderingMethod}
            onChange={(v) => updateInputs({ renderingMethod: v as CappingsWaxInputs['renderingMethod'] })}
            options={[
              { value: 'solar', label: 'Solar melter (70% yield)' },
              { value: 'water-bath', label: 'Water bath (80% yield)' },
              { value: 'steam', label: 'Steam (85% yield)' },
            ]}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel>
        <ResultRow
          label="Rendered beeswax"
          value={isMetric ? formatNumber(result.renderedWaxKg) : formatNumber(result.renderedWaxOz)}
          unit={isMetric ? 'kg' : 'oz'}
          highlight
        />
        <ResultRow
          label="Raw cappings"
          value={isMetric ? formatNumber(result.rawCappingsKg) : formatNumber(result.rawCappingsLbs)}
          unit={isMetric ? 'kg' : 'lbs'}
        />
        <ResultRow
          label="Cappings honey recovered"
          value={isMetric ? formatNumber(result.cappingsHoneyKg) : formatNumber(result.cappingsHoneyLbs)}
          unit={isMetric ? 'kg' : 'lbs'}
        />
        <ResultRow label="Slumgum / waste" value={formatNumber(result.slumgumLbs)} unit="lbs" />
        <ResultRow label="Est. wax value" value={formatCurrency(result.waxValueEstimate)} highlight />
        <ResultRow label="Est. cappings honey value" value={formatCurrency(result.honeyValueEstimate)} />
      </ResultPanel>

      <AssumptionsPanel assumptions={[
        { label: 'Cappings as % of honey', value: '1–2% by weight (varies by method)' },
        { label: 'Cappings composition', value: '~50% honey, ~50% wax by weight' },
        { label: 'Beeswax value', value: '~$12/lb (clean rendered)' },
        { label: 'Cappings honey value', value: '~$10/lb (premium product)' },
      ]} />

      <div className="text-sm text-smoke-500 bg-smoke-50 rounded-lg p-4">
        <p className="font-medium text-smoke-700 mb-1">Example usage:</p>
        <p>Extracting 200 lbs of honey with a hot knife yields roughly 4 lbs of raw cappings. After solar rendering, expect about 1.4 lbs of clean beeswax (22 oz) worth around $17, plus about 2 lbs of cappings honey.</p>
      </div>
    </div>
  );
}
