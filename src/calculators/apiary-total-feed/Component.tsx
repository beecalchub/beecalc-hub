'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { AssumptionsPanel } from '@/components/calculator/AssumptionsPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateApiaryFeed, createDefaultHives } from './logic';

export function ApiaryTotalFeedCalculator() {
  const { isMetric } = useUnitSystem();
  const [hiveCount, setHiveCount] = useState(5);
  const [hives, setHives] = useState(createDefaultHives(5));
  const [syrupRatio, setSyrupRatio] = useState<'1:1' | '2:1'>('2:1');
  const [sugarPrice, setSugarPrice] = useState(0.65);

  const adjustHiveCount = useCallback((count: number) => {
    const clamped = Math.max(1, Math.min(50, count));
    setHiveCount(clamped);
    setHives((prev) => {
      if (clamped > prev.length) {
        return [...prev, ...createDefaultHives(clamped - prev.length).map((h, i) => ({ ...h, id: prev.length + i + 1, label: `Hive ${prev.length + i + 1}` }))];
      }
      return prev.slice(0, clamped);
    });
  }, []);

  const updateHive = useCallback((idx: number, field: string, value: number | boolean) => {
    setHives((prev) => {
      const n = [...prev];
      n[idx] = { ...n[idx], [field]: value };
      return n;
    });
  }, []);

  const result = useMemo(
    () => calculateApiaryFeed({ hives, syrupRatio, sugarPricePerLb: sugarPrice }),
    [hives, syrupRatio, sugarPrice]
  );

  const resetAll = () => { setHiveCount(5); setHives(createDefaultHives(5)); setSyrupRatio('2:1'); setSugarPrice(0.65); };

  const copyText = () => formatResultsForCopy('Apiary Total Feed', [
    { label: 'Hives needing feed', value: result.hivesNeedingFeed },
    { label: 'Total sugar', value: isMetric ? `${result.totalSugarKg} kg` : `${result.totalSugarLbs} lbs` },
    { label: 'Total cost', value: formatCurrency(result.totalCost) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <NumberInput label="Number of Hives" value={hiveCount} onChange={adjustHiveCount} min={1} max={50} step={1} />
          <SelectInput label="Syrup Ratio" value={syrupRatio} onChange={(v) => setSyrupRatio(v as '1:1' | '2:1')} options={[{ value: '1:1', label: '1:1 (Spring)' }, { value: '2:1', label: '2:1 (Fall)' }]} />
          <NumberInput label="Sugar Price" value={sugarPrice} onChange={setSugarPrice} unit="$/lb" min={0.01} step={0.05} />
        </div>

        <p className="text-sm font-medium text-smoke-700 mb-2">Per-hive feed deficit:</p>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {hives.map((hive, i) => (
            <div key={hive.id} className="flex items-center gap-3 p-2 bg-smoke-50 rounded-lg">
              <Checkbox label="" checked={hive.needsFeeding} onChange={(v) => updateHive(i, 'needsFeeding', v)} id={`feed-hive-${hive.id}`} />
              <span className="text-sm text-smoke-600 w-16 flex-shrink-0">{hive.label}</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={hive.storesDeficitLbs}
                  onChange={(e) => updateHive(i, 'storesDeficitLbs', parseFloat(e.target.value) || 0)}
                  className="input-field text-sm"
                  min={0}
                  step={5}
                  aria-label={`${hive.label} deficit in lbs`}
                  disabled={!hive.needsFeeding}
                />
              </div>
              <span className="text-xs text-smoke-400 flex-shrink-0">lbs deficit</span>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetAll} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <ResultRow label="Hives needing feed" value={result.hivesNeedingFeed} unit={`of ${hiveCount}`} highlight />
        <ResultRow label="Total stores deficit" value={isMetric ? formatNumber(result.totalDeficitKg) : formatNumber(result.totalDeficitLbs)} unit={isMetric ? 'kg' : 'lbs'} />
        <ResultRow label="Syrup needed" value={isMetric ? formatNumber(result.totalSyrupLiters) : result.totalSyrupGallons} unit={isMetric ? 'liters' : 'gallons'} highlight />
        <ResultRow label="Sugar needed" value={isMetric ? formatNumber(result.totalSugarKg) : formatNumber(result.totalSugarLbs)} unit={isMetric ? 'kg' : 'lbs'} />
        <ResultRow label="Total cost" value={formatCurrency(result.totalCost)} highlight />
        <ResultRow label="Cost per fed hive" value={formatCurrency(result.costPerHive)} />
      </ResultPanel>

      <AssumptionsPanel assumptions={[
        { label: 'Syrup conversion efficiency', value: '~80% stored as honey equivalent' },
        { label: '1:1 syrup', value: '~5.3 lbs sugar per gallon' },
        { label: '2:1 syrup', value: '~10.6 lbs sugar per gallon' },
      ]} />
    </div>
  );
}
