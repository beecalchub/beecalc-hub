'use client';
import React, { useMemo, useState, useCallback } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { formatNumber, formatPercent } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateMiteDashboard, createDefaultHives } from './logic';
const riskColors: Record<string, string> = { Low: 'text-meadow-600', Moderate: 'text-yellow-600', High: 'text-orange-600', Critical: 'text-red-600' };
export function ApiaryWideMiteDashboardCalculator() {
  const [hiveCount, setHiveCount] = useState(5);
  const [hives, setHives] = useState(createDefaultHives(5));
  const adjustCount = useCallback((n: number) => { const c = Math.max(1, Math.min(30, n)); setHiveCount(c); setHives(p => c > p.length ? [...p, ...createDefaultHives(c - p.length).map((h, i) => ({ ...h, name: `Hive ${p.length + i + 1}` }))] : p.slice(0, c)); }, []);
  const updateHive = useCallback((i: number, f: string, v: string | number) => setHives(p => { const n = [...p]; n[i] = { ...n[i], [f]: v }; return n; }), []);
  const result = useMemo(() => calculateMiteDashboard({ hives }), [hives]);
  const reset = () => { setHiveCount(5); setHives(createDefaultHives(5)); };
  const copyText = () => formatResultsForCopy('Mite Dashboard', [{ label: 'Avg level', value: formatPercent(result.avgMiteLevel) }, { label: 'Above threshold', value: `${result.hivesAboveThreshold}/${hiveCount}` }]);
  return (
    <div className="space-y-6">
      <Card>
        <NumberInput label="Number of Hives" value={hiveCount} onChange={adjustCount} min={1} max={30} step={1} />
        <div className="space-y-2 mt-4 max-h-80 overflow-y-auto pr-1">{hives.map((h, i) => (
          <div key={i} className="flex flex-col sm:flex-row gap-2 p-3 bg-smoke-50 rounded-lg">
            <div className="flex-1"><label className="text-xs text-smoke-500">Name</label><input type="text" value={h.name} onChange={(e) => updateHive(i, 'name', e.target.value)} className="input-field text-sm" /></div>
            <div className="w-24"><label className="text-xs text-smoke-500">Mites/100</label><input type="number" value={h.mitesPerHundred} onChange={(e) => updateHive(i, 'mitesPerHundred', parseFloat(e.target.value) || 0)} className="input-field text-sm" min="0" step="0.5" /></div>
            <div className="w-36"><label className="text-xs text-smoke-500">Last test</label><input type="date" value={h.lastTestDate} onChange={(e) => updateHive(i, 'lastTestDate', e.target.value)} className="input-field text-sm" /></div>
          </div>
        ))}</div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={reset} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel title="Apiary Overview">
        <ResultRow label="Average mite level" value={formatPercent(result.avgMiteLevel)} highlight />
        <ResultRow label="Highest level" value={formatPercent(result.maxMiteLevel)} />
        <ResultRow label="Hives above threshold" value={`${result.hivesAboveThreshold} of ${hiveCount}`} highlight={result.hivesAboveThreshold > 0} />
        <ResultRow label="Hives needing retest (>30 days)" value={result.hivesNeedingTest} />
        <div className="mt-3 p-3 bg-smoke-50 rounded-lg text-sm text-smoke-600">{result.overallRisk}</div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Per-Hive Breakdown</h3>
        <div className="space-y-1">{result.perHive.map((h) => (
          <div key={h.name} className="flex items-center justify-between text-sm py-2 border-b border-smoke-100 last:border-0">
            <span className="text-smoke-700 font-medium">{h.name}</span>
            <div className="flex items-center gap-3">
              {h.daysSinceTest > 30 && <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded">Retest due</span>}
              <span className={`font-mono font-medium ${riskColors[h.risk]}`}>{formatPercent(h.level)} - {h.risk}</span>
            </div>
          </div>
        ))}</div>
      </Card>
    </div>
  );
}
