'use client';

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const MAX_RECENT = 12;

interface RecentlyUsedContextValue {
  recentlyUsed: string[];
  addRecentlyUsed: (slug: string) => void;
  clearRecentlyUsed: () => void;
}

const RecentlyUsedContext = createContext<RecentlyUsedContextValue | undefined>(undefined);

export function RecentlyUsedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyUsed, setRecentlyUsed] = useLocalStorage<string[]>('beecalc-recent', []);

  const addRecentlyUsed = useCallback(
    (slug: string) => {
      setRecentlyUsed((prev) => {
        const filtered = prev.filter((s) => s !== slug);
        return [slug, ...filtered].slice(0, MAX_RECENT);
      });
    },
    [setRecentlyUsed]
  );

  const clearRecentlyUsed = useCallback(
    () => setRecentlyUsed([]),
    [setRecentlyUsed]
  );

  const value = useMemo<RecentlyUsedContextValue>(() => ({
    recentlyUsed,
    addRecentlyUsed,
    clearRecentlyUsed,
  }), [recentlyUsed, addRecentlyUsed, clearRecentlyUsed]);

  return (
    <RecentlyUsedContext.Provider value={value}>
      {children}
    </RecentlyUsedContext.Provider>
  );
}

export function useRecentlyUsedContext() {
  const context = useContext(RecentlyUsedContext);
  if (!context) {
    throw new Error('useRecentlyUsedContext must be used within RecentlyUsedProvider');
  }
  return context;
}
