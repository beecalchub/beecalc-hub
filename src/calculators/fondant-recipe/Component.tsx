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
import { calculateFondant, getRecipeOptions, type FondantInputs } from './logic';

const DEFAULTS: FondantInputs = { targetWeightLbs: 10, recipe: 'standard' };

export function FondantRecipeCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('fondant-recipe', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateFondant(inputs), [inputs]);

  const copyText = () =>
    formatResultsForCopy('Fondant Recipe', [
      { label: 'Sugar', value: isMetric ? `${result.sugarKg} kg` : `${result.sugarLbs} lbs` },
      { label: 'Water', value: isMetric ? `${result.waterMl} ml` : `${result.waterCups} cups` },
      { label: 'Vinegar', value: `${result.vinegarTbsp} tbsp` },
      { label: 'Serves', value: `${result.servesHives} hives` },
    ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput
            label="Recipe Type"
            value={inputs.recipe}
            onChange={(v) => updateInputs({ recipe: v as FondantInputs['recipe'] })}
            options={getRecipeOptions()}
          />
          <NumberInput
            label="Target Total Weight"
            value={inputs.targetWeightLbs}
            onChange={(v) => updateInputs({ targetWeightLbs: v })}
            unit="lbs"
            min={1}
            max={100}
            step={1}
            helpText={isMetric ? `≈ ${formatNumber(inputs.targetWeightLbs * 0.4536)} kg` : 'Total fondant to make'}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel>
        <ResultRow
          label="White sugar"
          value={isMetric ? formatNumber(result.sugarKg) : formatNumber(result.sugarLbs)}
          unit={isMetric ? 'kg' : 'lbs'}
          highlight
        />
        <ResultRow
          label="Water"
          value={isMetric ? formatNumber(result.waterMl) : formatNumber(result.waterCups)}
          unit={isMetric ? 'ml' : 'cups'}
        />
        <ResultRow label="White vinegar" value={formatNumber(result.vinegarTbsp)} unit="tbsp" />
        {result.honeyCups > 0 && (
          <ResultRow
            label="Honey"
            value={isMetric ? formatNumber(result.honeyMl) : formatNumber(result.honeyCups)}
            unit={isMetric ? 'ml' : 'cups'}
          />
        )}
        <ResultRow
          label="Total weight"
          value={isMetric ? formatNumber(result.totalWeightKg) : formatNumber(result.totalWeightLbs)}
          unit={isMetric ? 'kg' : 'lbs'}
        />
        <ResultRow label="Serves approximately" value={result.servesHives} unit="hives" />
      </ResultPanel>

      <Card>
        <h3 className="font-display text-base text-smoke-800 mb-3">Instructions</h3>
        <ol className="space-y-2">
          {result.instructions.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-smoke-700">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-honey-100 text-honey-700 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </Card>

      <AssumptionsPanel
        assumptions={[
          { label: 'Standard fondant per hive', value: '~2 lbs' },
          { label: 'No-cook board per hive', value: '~4 lbs' },
          { label: 'Vinegar purpose', value: 'Inverts sugar, prevents crystallization' },
          { label: 'Soft ball stage', value: '234–240°F (112–116°C)' },
        ]}
      />

      <div className="text-sm text-smoke-500 bg-smoke-50 rounded-lg p-4">
        <p className="font-medium text-smoke-700 mb-1">Example usage:</p>
        <p>Making fondant for 5 hives? Set target weight to 10 lbs with the standard recipe. You&apos;ll need about 8.3 lbs of sugar and 1.4 cups of water. A candy thermometer is essential for the cooked versions.</p>
      </div>
    </div>
  );
}
