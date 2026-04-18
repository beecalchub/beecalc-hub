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
import { formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateSugarSyrup, getAllRatios, type SyrupRatio, type SugarSyrupInputs } from './logic';

const DEFAULTS: SugarSyrupInputs = { ratio: '1:1', targetVolumeLiters: 5 };

export function SugarSyrupCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('sugar-syrup', DEFAULTS);
  const { isMetric } = useUnitSystem();

  const result = useMemo(() => calculateSugarSyrup(inputs), [inputs]);

  const ratioOptions = getAllRatios().map((r) => ({
    value: r.value,
    label: `${r.label} - ${r.use}`,
  }));

  const copyText = () =>
    formatResultsForCopy('Sugar Syrup', [
      { label: 'Ratio', value: inputs.ratio },
      { label: 'Sugar', value: isMetric ? `${formatNumber(result.sugarKg)} kg` : `${formatNumber(result.sugarLbs)} lbs` },
      { label: 'Water', value: isMetric ? `${formatNumber(result.waterLiters)} L` : `${formatNumber(result.waterGallons)} gal` },
    ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput
            label="Syrup Ratio"
            value={inputs.ratio}
            onChange={(v) => updateInputs({ ratio: v as SyrupRatio })}
            options={ratioOptions}
          />
          <NumberInput
            label="Target Volume"
            value={inputs.targetVolumeLiters}
            onChange={(v) => updateInputs({ targetVolumeLiters: v })}
            unit={isMetric ? 'liters' : 'liters (of final syrup)'}
            min={0.5}
            step={0.5}
            helpText="Total volume of finished syrup you want to make"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel visible={inputs.targetVolumeLiters > 0}>
        <ResultRow
          label="Sugar needed"
          value={isMetric ? formatNumber(result.sugarKg) : formatNumber(result.sugarLbs)}
          unit={isMetric ? 'kg' : 'lbs'}
          highlight
        />
        <ResultRow
          label="Water needed"
          value={isMetric ? formatNumber(result.waterLiters) : formatNumber(result.waterGallons)}
          unit={isMetric ? 'liters' : 'gallons'}
          highlight
        />
        <ResultRow
          label="Sugar (approx cups)"
          value={formatNumber(result.sugarCups, 0)}
          unit="cups"
        />
        <ResultRow
          label="Final volume"
          value={isMetric ? formatNumber(result.totalVolumeLiters) : formatNumber(result.totalVolumeGallons)}
          unit={isMetric ? 'liters' : 'gallons'}
        />
      </ResultPanel>

      <AssumptionsPanel
        assumptions={[
          { label: 'Sugar volume displacement', value: '0.63 L per kg dissolved' },
          { label: 'Sugar density', value: '~200 g per cup (granulated)' },
          { label: 'Ratio', value: 'Parts by weight (sugar : water)' },
        ]}
      />

      <div className="text-sm text-smoke-500 bg-smoke-50 rounded-lg p-4">
        <p className="font-medium text-smoke-700 mb-1">Example usage:</p>
        <p>Making 5 liters of 2:1 fall syrup? You&apos;ll need about 5.1 kg of sugar and 2.6 liters of water. Heat the water (don&apos;t boil), then stir in sugar until fully dissolved.</p>
      </div>
    </div>
  );
}
