'use client';

import React, { useState, useMemo } from 'react';
import { calculatorRegistry, getCalculatorBySlug } from '@/data/registry';
import { CalculatorCard } from '@/components/calculator/CalculatorCard';
import { SearchInput } from '@/components/ui/SearchInput';
import { CategoryFilter } from '@/components/calculator/CategoryFilter';
import { Tabs } from '@/components/ui/Tabs';
import { searchCalculators, filterByCategory, filterMvpOnly } from '@/lib/search';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyUsed } from '@/hooks/useRecentlyUsed';

// Fix #1: removed dead Metadata import (client component can't use it)
// Fix #16: metadata now provided by calculators/layout.tsx

type ViewTab = 'all' | 'available' | 'favorites' | 'recent';

export default function CalculatorsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [viewTab, setViewTab] = useState<ViewTab>('all');
  const { favorites } = useFavorites();
  const { recentlyUsed } = useRecentlyUsed();

  const filtered = useMemo(() => {
    let list = [...calculatorRegistry];

    if (viewTab === 'favorites') {
      list = list.filter((c) => favorites.includes(c.slug));
    } else if (viewTab === 'recent') {
      const recentCalcs = recentlyUsed
        .map(getCalculatorBySlug)
        .filter((c): c is NonNullable<typeof c> => c !== undefined);
      list = recentCalcs;
    } else if (viewTab === 'available') {
      list = filterMvpOnly(list, true);
    }

    list = filterByCategory(list, category);
    list = searchCalculators(list, query);

    return list;
  }, [query, category, viewTab, favorites, recentlyUsed]);

  const tabs = [
    { value: 'all', label: 'All', count: calculatorRegistry.length },
    { value: 'available', label: 'Available Now', count: calculatorRegistry.filter((c) => c.isMvp).length },
    { value: 'favorites', label: 'Favorites', count: favorites.length },
    { value: 'recent', label: 'Recent', count: recentlyUsed.length },
  ];

  return (
    <div className="container-page py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-2">All Calculators</h1>
        <p className="text-smoke-500">Browse, search, and filter our complete library of beekeeping calculators.</p>
      </div>

      <div className="space-y-4 mb-6">
        <SearchInput value={query} onChange={setQuery} />
        <Tabs tabs={tabs} activeTab={viewTab} onChange={(v) => setViewTab(v as ViewTab)} />
        <CategoryFilter selected={category} onChange={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-4xl mb-3 block" aria-hidden="true">🔍</span>
          <p className="text-smoke-600 font-medium">No calculators found</p>
          <p className="text-smoke-400 text-sm mt-1">Try a different search or filter</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-smoke-400 mb-3" aria-live="polite">
            {filtered.length} calculator{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((calc) => (
              <CalculatorCard key={calc.slug} calculator={calc} showCategory />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
