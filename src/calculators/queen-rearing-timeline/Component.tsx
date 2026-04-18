'use client';

import React, { useMemo, useState } from 'react';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { Button } from '@/components/ui/Button';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatDate } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { downloadICalFile, type ICalEvent } from '@/lib/ical';
import { calculateQueenTimeline, type QueenTimelineInputs } from './logic';

const today = new Date().toISOString().split('T')[0];
const DEFAULTS: QueenTimelineInputs = { graftDate: today, method: 'graft' };

export function QueenRearingTimelineCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('queen-timeline', DEFAULTS);
  const [exported, setExported] = useState(false);
  const result = useMemo(() => calculateQueenTimeline(inputs), [inputs]);

  const handleExportICal = () => {
    const events: ICalEvent[] = result.milestones.map((m) => ({
      title: `🐝 ${m.event}`,
      description: m.description,
      startDate: m.date,
      allDay: true,
    }));
    downloadICalFile(events, 'queen-rearing-timeline.ics');
    setExported(true);
    setTimeout(() => setExported(false), 3000);
  };

  const copyText = () => formatResultsForCopy('Queen Rearing Timeline', result.milestones.map((m) => ({
    label: `Day ${m.day} (${formatDate(m.date)})`,
    value: m.event,
  })));

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="graft-date" className="label-field">Graft / Split Date</label>
            <input
              id="graft-date"
              type="date"
              value={inputs.graftDate}
              onChange={(e) => updateInputs({ graftDate: e.target.value })}
              className="input-field"
            />
          </div>
          <SelectInput
            label="Method"
            value={inputs.method}
            onChange={(v) => updateInputs({ method: v as 'graft' | 'walk-away' | 'emergency' })}
            options={[
              { value: 'graft', label: 'Grafting (controlled)' },
              { value: 'walk-away', label: 'Walk-away split / Emergency' },
            ]}
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <ResetButton onReset={resetInputs} />
          <CopyResultButton getText={copyText} />
          <Button variant="secondary" size="sm" onClick={handleExportICal}>
            {exported ? '✓ Downloaded!' : '📅 Export to iCal'}
          </Button>
        </div>
      </Card>

      <ResultPanel title="Timeline">
        <div className="space-y-0">
          {result.milestones.map((m, i) => (
            <div
              key={i}
              className={`flex gap-3 py-3 ${i < result.milestones.length - 1 ? 'border-b border-smoke-100' : ''}`}
            >
              {/* Timeline dot */}
              <div className="flex flex-col items-center flex-shrink-0 w-8">
                <div className={`w-3 h-3 rounded-full ${m.critical ? 'bg-honey-500' : 'bg-smoke-300'}`} />
                {i < result.milestones.length - 1 && <div className="w-px flex-1 bg-smoke-200 mt-1" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xs font-mono text-smoke-400">Day {m.day}</span>
                  <span className="text-xs text-smoke-400">{formatDate(m.date)}</span>
                </div>
                <p className={`text-sm font-medium ${m.critical ? 'text-honey-800' : 'text-smoke-700'}`}>
                  {m.event}
                  {m.critical && <span className="text-honey-500 ml-1">★</span>}
                </p>
                <p className="text-xs text-smoke-500 mt-0.5">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </ResultPanel>

      <div className="text-sm text-smoke-500 bg-smoke-50 rounded-lg p-4">
        <p className="font-medium text-smoke-700 mb-1">Example usage:</p>
        <p>Select your graft date, review the timeline, then export to iCal to get reminders on your phone for each critical milestone. Star (★) marks the dates you must not miss.</p>
      </div>
    </div>
  );
}
