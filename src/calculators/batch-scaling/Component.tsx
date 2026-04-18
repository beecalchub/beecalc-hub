'use client';

import React, { useMemo, useState } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { Button } from '@/components/ui/Button';
import { formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateBatchScaling, EXAMPLE_RECIPES, type BatchIngredient } from './logic';

// Fix #11: mobile-friendly ingredient layout (stacked on small screens)
export function BatchScalingCalculator() {
  const [originalServings, setOriginalServings] = useState(1);
  const [targetServings, setTargetServings] = useState(5);
  const [ingredients, setIngredients] = useState<BatchIngredient[]>([
    { name: 'Sugar', amount: 5.3, unit: 'lbs' },
    { name: 'Water', amount: 0.63, unit: 'gal' },
  ]);

  const result = useMemo(
    () => calculateBatchScaling({ originalServings, targetServings, ingredients }),
    [originalServings, targetServings, ingredients]
  );

  const loadRecipe = (key: string) => {
    const recipe = EXAMPLE_RECIPES[key];
    if (recipe) {
      setOriginalServings(recipe.servings);
      setIngredients([...recipe.ingredients]);
    }
  };

  const updateIngredient = (idx: number, field: keyof BatchIngredient, value: string | number) => {
    setIngredients((prev) => {
      const n = [...prev];
      n[idx] = { ...n[idx], [field]: value };
      return n;
    });
  };

  const addIngredient = () =>
    setIngredients((prev) => [...prev, { name: '', amount: 0, unit: '' }]);

  const removeIngredient = (idx: number) =>
    setIngredients((prev) => prev.filter((_, i) => i !== idx));

  const reset = () => {
    setOriginalServings(1);
    setTargetServings(5);
    setIngredients([
      { name: 'Sugar', amount: 5.3, unit: 'lbs' },
      { name: 'Water', amount: 0.63, unit: 'gal' },
    ]);
  };

  const copyText = () =>
    formatResultsForCopy(
      `Batch Scaling (×${formatNumber(result.scaleFactor)})`,
      result.scaledIngredients.map((i) => ({
        label: i.name,
        value: `${formatNumber(i.amount, 3)} ${i.unit}`,
      }))
    );

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-4">
          <p className="text-sm text-smoke-600 mb-2">Load an example recipe:</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(EXAMPLE_RECIPES).map(([key, recipe]) => (
              <button
                key={key}
                type="button"
                onClick={() => loadRecipe(key)}
                className="px-3.5 py-2 text-sm bg-honey-50 text-honey-700 rounded-full hover:bg-honey-100 transition-colors font-medium"
                style={{ minHeight: 40 }}
              >
                {recipe.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <NumberInput
            label="Original Batch Size"
            value={originalServings}
            onChange={setOriginalServings}
            min={0.1}
            step={1}
            helpText="Original recipe yield"
          />
          <NumberInput
            label="Target Batch Size"
            value={targetServings}
            onChange={setTargetServings}
            min={0.1}
            step={1}
            helpText="Desired yield"
          />
        </div>

        <p className="text-sm font-medium text-smoke-700 mb-2">
          Ingredients (original amounts):
        </p>
        <div className="space-y-3">
          {ingredients.map((ing, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-2 sm:items-end p-3 bg-smoke-50 rounded-lg"
            >
              <div className="flex-1">
                <label className="text-xs text-smoke-500 mb-0.5 block">Name</label>
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) => updateIngredient(i, 'name', e.target.value)}
                  placeholder="e.g. Sugar"
                  className="input-field text-sm"
                  aria-label={`Ingredient ${i + 1} name`}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-24">
                  <label className="text-xs text-smoke-500 mb-0.5 block">Amount</label>
                  <input
                    type="number"
                    value={ing.amount}
                    onChange={(e) =>
                      updateIngredient(i, 'amount', parseFloat(e.target.value) || 0)
                    }
                    className="input-field text-sm"
                    step="0.1"
                    aria-label={`Ingredient ${i + 1} amount`}
                  />
                </div>
                <div className="w-20">
                  <label className="text-xs text-smoke-500 mb-0.5 block">Unit</label>
                  <input
                    type="text"
                    value={ing.unit}
                    onChange={(e) => updateIngredient(i, 'unit', e.target.value)}
                    placeholder="lbs"
                    className="input-field text-sm"
                    aria-label={`Ingredient ${i + 1} unit`}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeIngredient(i)}
                    className="p-2.5 text-smoke-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label={`Remove ingredient ${ing.name || i + 1}`}
                    style={{ minHeight: 44, minWidth: 44 }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addIngredient}
          className="mt-3 text-sm text-honey-600 hover:text-honey-700 font-medium px-1 py-2"
          style={{ minHeight: 44 }}
        >
          + Add ingredient
        </button>

        <div className="flex gap-2 mt-4">
          <ResetButton onReset={reset} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel title={`Scaled Recipe (×${formatNumber(result.scaleFactor)})`}>
        {result.scaledIngredients.map((ing, i) => (
          <ResultRow
            key={i}
            label={ing.name || `Ingredient ${i + 1}`}
            value={formatNumber(ing.amount, 3)}
            unit={ing.unit}
            highlight={i === 0}
          />
        ))}
        <ResultRow label="Scale factor" value={`×${formatNumber(result.scaleFactor)}`} />
      </ResultPanel>
    </div>
  );
}
