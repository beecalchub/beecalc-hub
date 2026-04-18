'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { formatCurrency } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateTreatmentCost, DEFAULT_TREATMENTS } from './logic';

export function TreatmentCostCalculator() {
  const [hiveCount, setHiveCount] = useState(10);
  const [treatments, setTreatments] = useState([...DEFAULT_TREATMENTS]);

  const updateTreatment = useCallback((idx: number, field: string, value: number | boolean) => {
    setTreatments((prev) => { const n = [...prev]; n[idx] = { ...n[idx], [field]: value }; return n; });
  }, []);

  const result = useMemo(() => calculateTreatmentCost({ hiveCount, treatments }), [hiveCount, treatments]);

  const reset = () => { setHiveCount(10); setTreatments([...DEFAULT_TREATMENTS]); };
  const copyText = () => formatResultsForCopy('Treatment Cost', [
    { label: 'Per hive/year', value: formatCurrency(result.totalPerHive) },
    { label: 'Total', value: formatCurrency(result.totalAllHives) },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <NumberInput label="Number of Hives" value={hiveCount} onChange={setHiveCount} min={1} step={1} />

        <p className="text-sm font-medium text-smoke-700 mt-4 mb-2">Treatment plan (toggle on/off, adjust cost):</p>
        <div className="space-y-3">
          {treatments.map((t, i) => (
            <div key={t.name} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-smoke-50 rounded-lg">
              <div className="flex-1">
                <Checkbox label={t.name} checked={t.enabled} onChange={(v) => updateTreatment(i, 'enabled', v)} />
              </div>
              <div className="flex gap-2 pl-8 sm:pl-0">
                <div className="w-24">
                  <input type="number" value={t.costPerHive} onChange={(e) => updateTreatment(i, 'costPerHive', parseFloat(e.target.value) || 0)} className="input-field text-sm" step="0.5" min="0" disabled={!t.enabled} aria-label={`${t.name} cost per hive`} />
                </div>
                <span className="text-xs text-smoke-400 self-center flex-shrink-0">$/hive</span>
                <div className="w-16">
                  <input type="number" value={t.roundsPerYear} onChange={(e) => updateTreatment(i, 'roundsPerYear', parseInt(e.target.value) || 1)} className="input-field text-sm" step="1" min="1" max="6" disabled={!t.enabled} aria-label={`${t.name} rounds per year`} />
                </div>
                <span className="text-xs text-smoke-400 self-center flex-shrink-0">rounds</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={reset} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel>
        <ResultRow label="Total per hive / year" value={formatCurrency(result.totalPerHive)} highlight />
        <ResultRow label="Total all hives" value={formatCurrency(result.totalAllHives)} highlight />
        {result.perTreatment.map((t) => (
          <ResultRow key={t.name} label={t.name} value={formatCurrency(t.totalCost)} detail={`${formatCurrency(t.costPerHive)}/hive × ${t.rounds} round${t.rounds > 1 ? 's' : ''}`} />
        ))}
      </ResultPanel>

      <div className="text-sm text-smoke-500 bg-smoke-50 rounded-lg p-4">
        <p className="font-medium text-smoke-700 mb-1">Example usage:</p>
        <p>Running 10 hives with OAV in spring (3 rounds) and Formic Pro in late summer? Total treatment cost for the year is about {formatCurrency(result.totalAllHives)}.</p>
      </div>
    </div>
  );
}
