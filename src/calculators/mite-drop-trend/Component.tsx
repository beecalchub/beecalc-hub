'use client';
import React, { useMemo, useState } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateMiteDrop } from './logic';
export function MiteDropTrendCalculator() {
  const [boardDays, setBoardDays] = useState(3);
  const [readings, setReadings] = useState([{ date: new Date().toISOString().split('T')[0], count: 15 }]);
  const addReading = () => setReadings(p => [...p, { date: new Date().toISOString().split('T')[0], count: 0 }]);
  const updateReading = (i: number, f: string, v: string | number) => setReadings(p => { const n = [...p]; n[i] = { ...n[i], [f]: v }; return n; });
  const removeReading = (i: number) => setReadings(p => p.filter((_, j) => j !== i));
  const result = useMemo(() => calculateMiteDrop({ readings, boardDays }), [readings, boardDays]);
  const reset = () => { setBoardDays(3); setReadings([{ date: new Date().toISOString().split('T')[0], count: 15 }]); };
  const copyText = () => formatResultsForCopy('Mite Drop Trend', [{ label: 'Latest daily drop', value: result.latestDailyDrop }, { label: 'Trend', value: result.trend }]);
  const trendColors = { decreasing: 'bg-meadow-50 border-meadow-200 text-meadow-700', stable: 'bg-yellow-50 border-yellow-200 text-yellow-700', increasing: 'bg-red-50 border-red-200 text-red-700' };
  return (
    <div className="space-y-6">
      <Card>
        <NumberInput label="Days Board Was In" value={boardDays} onChange={setBoardDays} min={1} max={14} step={1} helpText="How many days the sticky board collected mites" />
        <p className="text-sm font-medium text-smoke-700 mt-4 mb-2">Mite counts (add multiple readings to see trend):</p>
        <div className="space-y-2">{readings.map((r, i) => (
          <div key={i} className="flex gap-2 items-end p-2 bg-smoke-50 rounded-lg">
            <div className="flex-1"><label className="text-xs text-smoke-500">Date</label><input type="date" value={r.date} onChange={(e) => updateReading(i, 'date', e.target.value)} className="input-field text-sm" /></div>
            <div className="w-24"><label className="text-xs text-smoke-500">Mites</label><input type="number" value={r.count} onChange={(e) => updateReading(i, 'count', parseInt(e.target.value) || 0)} className="input-field text-sm" min="0" /></div>
            {readings.length > 1 && <button type="button" onClick={() => removeReading(i)} className="p-2 text-smoke-400 hover:text-red-500" style={{ minHeight: 44, minWidth: 44 }} aria-label="Remove">✕</button>}
          </div>
        ))}</div>
        <button type="button" onClick={addReading} className="mt-2 text-sm text-honey-600 hover:text-honey-700 font-medium py-2" style={{ minHeight: 44 }}>+ Add reading</button>
        <div className="flex gap-2 mt-4"><ResetButton onReset={reset} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Latest daily mite drop" value={formatNumber(result.latestDailyDrop)} unit="mites/day" highlight />
        <ResultRow label="Projected weekly drop" value={formatNumber(result.projectedWeeklyDrop)} unit="mites/week" />
        <div className={`mt-3 p-4 rounded-lg border ${trendColors[result.trend]}`}><p className="font-medium capitalize mb-1">Trend: {result.trend}</p><p className="text-sm">{result.trendMessage}</p></div>
        {result.dailyAverages.length > 1 && <div className="mt-3 space-y-1">{result.dailyAverages.map((d, i) => (
          <div key={i} className="flex justify-between text-sm py-1 border-b border-smoke-100"><span className="text-smoke-500">{d.date}</span><span className="font-mono text-smoke-800">{d.dailyDrop} /day</span></div>
        ))}</div>}
      </ResultPanel>
    </div>
  );
}
