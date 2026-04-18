'use client';
import React, { useMemo, useState, useCallback } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { formatResultsForCopy } from '@/lib/clipboard';
import { generateChecklist, type ChecklistInputs, type Season } from './logic';

const DEFAULTS: ChecklistInputs = { season: 'late-spring', hiveCount: 3, isFirstYear: false, hasSupers: false, lastMiteCheck: 'overdue' };
const priorityStyles = { must: 'bg-red-50 text-red-700 border-red-200', should: 'bg-yellow-50 text-yellow-700 border-yellow-200', optional: 'bg-smoke-50 text-smoke-500 border-smoke-200' };

export function ApiaryChecklistGeneratorCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('checklist', DEFAULTS);
  const result = useMemo(() => generateChecklist(inputs), [inputs]);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = useCallback((key: string) => {
    setChecked(prev => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });
  }, []);

  const doneCount = checked.size;
  const copyText = () => {
    const lines = result.checklist.flatMap(s => s.items.map(i => ({ label: `[${checked.has(s.section + i.task) ? 'x' : ' '}]`, value: i.task })));
    return formatResultsForCopy(`Apiary Checklist (${inputs.season})`, lines);
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SelectInput label="Season" value={inputs.season} onChange={(v) => updateInputs({ season: v as Season })} options={[
            { value: 'early-spring', label: 'Early Spring' }, { value: 'late-spring', label: 'Late Spring' },
            { value: 'summer', label: 'Summer' }, { value: 'fall', label: 'Fall' }, { value: 'winter', label: 'Winter' },
          ]} />
          <NumberInput label="Hive Count" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} max={50} step={1} />
          <SelectInput label="Last Mite Check" value={inputs.lastMiteCheck} onChange={(v) => updateInputs({ lastMiteCheck: v as ChecklistInputs['lastMiteCheck'] })} options={[
            { value: 'recent', label: 'Within 4 weeks' }, { value: 'overdue', label: 'Over 4 weeks ago' }, { value: 'never', label: 'Never / unknown' },
          ]} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-3">
          <Checkbox label="First year beekeeper" checked={inputs.isFirstYear} onChange={(v) => updateInputs({ isFirstYear: v })} />
          <Checkbox label="Honey supers currently on" checked={inputs.hasSupers} onChange={(v) => updateInputs({ hasSupers: v })} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={() => { resetInputs(); setChecked(new Set()); }} /><CopyResultButton getText={copyText} /></div>
      </Card>

      <ResultPanel title={`Checklist - ${doneCount}/${result.totalTasks} done`}>
        <div className="w-full bg-smoke-100 rounded-full h-2 mb-4"><div className="bg-honey-500 h-2 rounded-full transition-all" style={{ width: `${(doneCount / result.totalTasks) * 100}%` }} /></div>
        {result.checklist.map((section) => (
          <div key={section.section} className="mb-5 last:mb-0">
            <h4 className="text-sm font-medium text-smoke-700 mb-2">{section.section}</h4>
            <div className="space-y-1.5">
              {section.items.map((item) => {
                const key = section.section + item.task;
                const isDone = checked.has(key);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggle(key)}
                    className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors ${isDone ? 'bg-meadow-50 border border-meadow-200' : 'bg-white border border-smoke-100 hover:border-smoke-200'}`}
                    style={{ minHeight: 44 }}
                  >
                    <span className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center transition-colors ${isDone ? 'bg-meadow-500 border-meadow-500 text-white' : 'border-smoke-300'}`}>
                      {isDone && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </span>
                    <span className={`text-sm flex-1 ${isDone ? 'line-through text-smoke-400' : 'text-smoke-700'}`}>{item.task}</span>
                    <span className={`text-[10px] uppercase tracking-wide font-medium px-1.5 py-0.5 rounded border flex-shrink-0 ${priorityStyles[item.priority]}`}>{item.priority}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </ResultPanel>
    </div>
  );
}
