'use client';

import React, { useMemo, useState } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateDateInterval, QUICK_INTERVALS, type DateIntervalInputs } from './logic';

const today = new Date().toISOString().split('T')[0];

export function DateIntervalCalculator() {
  const [mode, setMode] = useState<DateIntervalInputs['mode']>('between');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [daysToAdd, setDaysToAdd] = useState(21);

  const result = useMemo(
    () => calculateDateInterval({ mode, startDate, endDate, daysToAdd }),
    [mode, startDate, endDate, daysToAdd]
  );

  const applyQuickInterval = (days: number) => {
    setMode('add');
    setDaysToAdd(days);
  };

  const reset = () => { setMode('between'); setStartDate(today); setEndDate(today); setDaysToAdd(21); };

  const copyText = () => {
    if (mode === 'between') {
      return formatResultsForCopy('Date Interval', [
        { label: 'Days', value: result.totalDays },
        { label: 'Weeks', value: `${result.totalWeeks}w ${result.remainderDays}d` },
      ]);
    }
    return formatResultsForCopy('Date Interval', [
      { label: `${mode === 'add' ? '+' : '-'}${daysToAdd} days`, value: result.resultDateFormatted },
    ]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <SelectInput
          label="Mode"
          value={mode}
          onChange={(v) => setMode(v as DateIntervalInputs['mode'])}
          options={[
            { value: 'between', label: 'Days between two dates' },
            { value: 'add', label: 'Add days to a date' },
            { value: 'subtract', label: 'Subtract days from a date' },
          ]}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="di-start" className="label-field">
              {mode === 'between' ? 'Start Date' : 'Date'}
            </label>
            <input
              id="di-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
          </div>

          {mode === 'between' ? (
            <div>
              <label htmlFor="di-end" className="label-field">End Date</label>
              <input
                id="di-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input-field"
              />
            </div>
          ) : (
            <NumberInput
              label={mode === 'add' ? 'Days to Add' : 'Days to Subtract'}
              value={daysToAdd}
              onChange={setDaysToAdd}
              min={1}
              max={365}
              step={1}
            />
          )}
        </div>

        {mode !== 'between' && (
          <div className="mt-4">
            <p className="text-sm text-smoke-600 mb-2">Quick beekeeping intervals:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_INTERVALS.map((qi) => (
                <button
                  key={qi.days}
                  type="button"
                  onClick={() => applyQuickInterval(qi.days)}
                  className={`px-3 py-2 text-sm rounded-full font-medium transition-colors ${
                    daysToAdd === qi.days
                      ? 'bg-honey-500 text-white'
                      : 'bg-honey-50 text-honey-700 hover:bg-honey-100'
                  }`}
                  style={{ minHeight: 40 }}
                >
                  {qi.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <ResetButton onReset={reset} />
          <CopyResultButton getText={copyText} />
        </div>
      </Card>

      <ResultPanel>
        {mode === 'between' ? (
          <>
            <ResultRow label="Days between" value={formatInteger(result.totalDays)} unit="days" highlight />
            <ResultRow label="Weeks" value={`${result.totalWeeks} weeks, ${result.remainderDays} days`} />
            {result.calendarMonths > 0 && (
              <ResultRow label="Calendar months" value={result.calendarMonths} unit="months" />
            )}
          </>
        ) : (
          <>
            <ResultRow label="Result date" value={result.resultDateFormatted} highlight />
            <ResultRow label="Days" value={formatInteger(result.totalDays)} unit={`days ${mode === 'add' ? 'forward' : 'back'}`} />
            <ResultRow label="That's" value={`${result.totalWeeks} weeks, ${result.remainderDays} days`} />
          </>
        )}

        {result.beekeepingContext && (
          <div className="mt-3 p-3 bg-honey-50 rounded-lg text-sm text-honey-800 font-medium">
            🐝 {result.beekeepingContext}
          </div>
        )}
      </ResultPanel>

      <div className="text-sm text-smoke-500 bg-smoke-50 rounded-lg p-4">
        <p className="font-medium text-smoke-700 mb-1">Example usage:</p>
        <p>Grafted queen cells on April 10? Use &quot;Add days&quot; mode with 16 days to see emergence date, or 28 days to know when to check for eggs. The quick-interval buttons cover common beekeeping timelines.</p>
      </div>
    </div>
  );
}
