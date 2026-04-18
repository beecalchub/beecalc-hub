'use client';
import React, { useMemo, useState } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { Checkbox } from '@/components/ui/Checkbox';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateRotation, getAllTreatments } from './logic';
export function ResistanceRotationPlannerCalculator() {
  const [yearCount, setYearCount] = useState(3);
  const allTreatments = getAllTreatments();
  const [selected, setSelected] = useState(['oav', 'apivar', 'formic-pro']);
  const toggleTreatment = (v: string) => setSelected(p => p.includes(v) ? p.filter(x => x !== v) : [...p, v]);
  const result = useMemo(() => calculateRotation({ yearCount, treatmentsAvailable: selected }), [yearCount, selected]);
  const reset = () => { setYearCount(3); setSelected(['oav', 'apivar', 'formic-pro']); };
  const copyText = () => formatResultsForCopy('Resistance Rotation', result.plan.map(p => ({ label: `Year ${p.year}`, value: `Spring: ${p.spring}, Summer: ${p.summer}, Fall: ${p.fall}` })));
  return (
    <div className="space-y-6">
      <Card>
        <NumberInput label="Years to Plan" value={yearCount} onChange={setYearCount} min={1} max={5} step={1} />
        <p className="text-sm font-medium text-smoke-700 mt-4 mb-2">Available treatments:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">{allTreatments.map(t => (
          <Checkbox key={t.value} label={t.label} checked={selected.includes(t.value)} onChange={() => toggleTreatment(t.value)} />
        ))}</div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={reset} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel title="Rotation Plan">
        <div className="overflow-x-auto -mx-4 sm:-mx-6">
          <table className="w-full text-sm min-w-[400px]"><thead><tr className="border-b border-smoke-200"><th scope="col" className="py-2 px-4 sm:px-6 text-left text-smoke-500 font-medium">Year</th><th scope="col" className="py-2 px-2 text-smoke-500 font-medium">Spring</th><th scope="col" className="py-2 px-2 text-smoke-500 font-medium">Summer</th><th scope="col" className="py-2 px-4 sm:px-6 text-smoke-500 font-medium">Fall</th></tr></thead>
            <tbody>{result.plan.map(p => (<tr key={p.year} className="border-b border-smoke-50"><td className="py-2 px-4 sm:px-6 font-medium text-smoke-700">Year {p.year}</td><td className="py-2 px-2 text-smoke-600">{p.spring}</td><td className="py-2 px-2 text-smoke-600">{p.summer}</td><td className="py-2 px-4 sm:px-6 text-smoke-600">{p.fall}</td></tr>))}</tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-honey-50 rounded-lg text-sm text-honey-800">{result.explanation}</div>
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Chemistry Classes</h3>
        <div className="space-y-1">{result.chemistryClasses.map(c => (
          <div key={c.treatment} className="flex justify-between text-sm py-1.5 border-b border-smoke-100 last:border-0"><span className="text-smoke-700">{c.treatment}</span><span className="text-smoke-500">{c.class}</span></div>
        ))}</div>
      </Card>
    </div>
  );
}
