'use client';
import React, { useMemo } from 'react';
import { NumberInput } from '@/components/ui/NumberInput';
import { SelectInput } from '@/components/ui/SelectInput';
import { Card } from '@/components/ui/Card';
import { ResultPanel } from '@/components/calculator/ResultPanel';
import { ResultRow } from '@/components/calculator/ResultRow';
import { ResetButton } from '@/components/calculator/ResetButton';
import { CopyResultButton } from '@/components/calculator/CopyResultButton';
import { useCalculatorInputs } from '@/hooks/useCalculatorInputs';
import { useUnitSystem } from '@/hooks/useUnitSystem';
import { formatNumber, formatInteger } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateExtractorLoad, type ExtractorLoadInputs } from './logic';
const DEFAULTS: ExtractorLoadInputs = { extractorFrameCapacity: 4, totalFrames: 30, frameType: 'medium' };
export function ExtractorLoadCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('extractor-load', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateExtractorLoad(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Extractor Load', [{ label: 'Loads', value: result.totalLoads }, { label: 'Total honey', value: isMetric ? `${result.totalHoneyKg} kg` : `${result.totalHoneyLbs} lbs` }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumberInput label="Extractor Capacity" value={inputs.extractorFrameCapacity} onChange={(v) => updateInputs({ extractorFrameCapacity: v })} unit="frames" min={2} max={72} step={2} />
          <NumberInput label="Total Frames" value={inputs.totalFrames} onChange={(v) => updateInputs({ totalFrames: v })} min={1} max={500} step={1} />
          <SelectInput label="Frame Type" value={inputs.frameType} onChange={(v) => updateInputs({ frameType: v as ExtractorLoadInputs['frameType'] })} options={[{ value: 'deep', label: 'Deep' }, { value: 'medium', label: 'Medium' }, { value: 'shallow', label: 'Shallow' }]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Total loads" value={formatInteger(result.totalLoads)} highlight />
        <ResultRow label="Frames per load" value={result.framesPerLoad} />
        <ResultRow label="Last load" value={result.lastLoadFrames} unit="frames" />
        <ResultRow label="Honey per load" value={formatNumber(result.estimatedHoneyPerLoadLbs)} unit="lbs" />
        <ResultRow label="Total honey estimate" value={isMetric ? formatNumber(result.totalHoneyKg) : formatNumber(result.totalHoneyLbs)} unit={isMetric ? 'kg' : 'lbs'} highlight />
        <div className="mt-3 p-3 bg-smoke-50 rounded-lg text-sm text-smoke-600">{result.balanceNote}</div>
      </ResultPanel>
    </div>
  );
}
