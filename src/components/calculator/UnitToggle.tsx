'use client';

import React from 'react';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { useUnitSystem } from '@/hooks/useUnitSystem';

export function UnitToggle() {
  const { isMetric, toggleUnitSystem } = useUnitSystem();

  return (
    <ToggleSwitch
      labelLeft="Imperial"
      labelRight="Metric"
      checked={isMetric}
      onChange={toggleUnitSystem}
      ariaLabel="Toggle between imperial and metric units"
    />
  );
}
