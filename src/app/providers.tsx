'use client';

import React from 'react';
import { UnitSystemProvider } from '@/context/UnitSystemContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { RecentlyUsedProvider } from '@/context/RecentlyUsedContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UnitSystemProvider>
      <FavoritesProvider>
        <RecentlyUsedProvider>
          {children}
        </RecentlyUsedProvider>
      </FavoritesProvider>
    </UnitSystemProvider>
  );
}
