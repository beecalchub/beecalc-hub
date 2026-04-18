'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useCallback, useRef } from 'react';

// Fix #7: Use ref for defaults to avoid stale closure in resetValues
export function useCalculatorInputs<T extends object>(
  slug: string,
  defaults: T
): [T, (updates: Partial<T>) => void, () => void] {
  const defaultsRef = useRef(defaults);
  const [values, setValues] = useLocalStorage<T>(`beecalc-inputs-${slug}`, defaults);

  const updateValues = useCallback(
    (updates: Partial<T>) => {
      setValues((prev) => ({ ...prev, ...updates }));
    },
    [setValues]
  );

  const resetValues = useCallback(() => {
    setValues(defaultsRef.current);
  }, [setValues]);

  return [values, updateValues, resetValues];
}
