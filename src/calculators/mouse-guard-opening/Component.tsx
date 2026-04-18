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
import { formatNumber } from '@/lib/formatters';
import { formatResultsForCopy } from '@/lib/clipboard';
import { calculateMouseGuard, type MouseGuardInputs } from './logic';
const DEFAULTS: MouseGuardInputs = { hiveCount: 5, entranceWidthInches: 14, entranceType: 'full-width', guardType: 'metal' };
export function MouseGuardOpeningCalculator() {
  const [inputs, updateInputs, resetInputs] = useCalculatorInputs('mouse-guard', DEFAULTS);
  const { isMetric } = useUnitSystem();
  const result = useMemo(() => calculateMouseGuard(inputs), [inputs]);
  const copyText = () => formatResultsForCopy('Mouse Guard', [{ label: 'Guards needed', value: result.guardsNeeded }, { label: 'Max opening', value: isMetric ? `${result.maxOpeningHeightMm} mm` : `${result.maxOpeningHeight}"` }]);
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumberInput label="Number of Hives" value={inputs.hiveCount} onChange={(v) => updateInputs({ hiveCount: v })} min={1} step={1} />
          <NumberInput label="Entrance Width" value={inputs.entranceWidthInches} onChange={(v) => updateInputs({ entranceWidthInches: v })} unit="inches" min={1} max={18} step={1} />
          <SelectInput label="Entrance Type" value={inputs.entranceType} onChange={(v) => updateInputs({ entranceType: v as MouseGuardInputs['entranceType'] })} options={[{ value: 'full-width', label: 'Full width bottom' }, { value: 'reduced', label: 'Reduced entrance' }, { value: 'disc', label: 'Disc entrance (top)' }]} />
          <SelectInput label="Guard Type" value={inputs.guardType} onChange={(v) => updateInputs({ guardType: v as MouseGuardInputs['guardType'] })} options={[{ value: 'metal', label: 'Metal (hardware cloth)' }, { value: 'wood-reducer', label: 'Wood reducer' }, { value: '3d-printed', label: '3D printed' }]} />
        </div>
        <div className="flex gap-2 mt-4"><ResetButton onReset={resetInputs} /><CopyResultButton getText={copyText} /></div>
      </Card>
      <ResultPanel>
        <ResultRow label="Guards needed" value={result.guardsNeeded} highlight />
        <ResultRow label="Max opening height" value={isMetric ? formatNumber(result.maxOpeningHeightMm) : `${result.maxOpeningHeight}`} unit={isMetric ? 'mm' : 'inches'} highlight />
        <ResultRow label="Install by" value={result.installBy} />
        <ResultRow label="Remove by" value={result.removeBy} />
        <ResultRow label="Ventilation" value={result.ventilationAdequate ? 'Adequate' : 'Consider adding upper vent'} />
      </ResultPanel>
      <Card><h3 className="font-display text-base text-smoke-800 mb-3">Installation Tips</h3>
        <ul className="space-y-2" role="list">{result.tips.map((t, i) => (<li key={i} className="text-sm text-smoke-700 flex gap-2"><span className="text-honey-500" aria-hidden="true">•</span>{t}</li>))}</ul>
      </Card>
    </div>
  );
}
