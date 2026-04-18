'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { UnitSystem } from '@/types/units';

interface UnitSystemContextValue {
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
  toggleUnitSystem: () => void;
  isMetric: boolean;
  isImperial: boolean;
}

const UnitSystemContext = createContext<UnitSystemContextValue | undefined>(undefined);

export function UnitSystemProvider({ children }: { children: React.ReactNode }) {
  const [unitSystem, setUnitSystem] = useLocalStorage<UnitSystem>('beecalc-unit-system', 'imperial');

  const value = useMemo<UnitSystemContextValue>(() => ({
    unitSystem,
    setUnitSystem,
    toggleUnitSystem: () => setUnitSystem((prev) => (prev === 'metric' ? 'imperial' : 'metric')),
    isMetric: unitSystem === 'metric',
    isImperial: unitSystem === 'imperial',
  }), [unitSystem, setUnitSystem]);

  return (
    <UnitSystemContext.Provider value={value}>
      {children}
    </UnitSystemContext.Provider>
  );
}

export function useUnitSystemContext() {
  const context = useContext(UnitSystemContext);
  if (!context) {
    throw new Error('useUnitSystemContext must be used within UnitSystemProvider');
  }
  return context;
}
