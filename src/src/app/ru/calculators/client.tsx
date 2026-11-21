'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { calculatorRegistry, getCalculatorBySlug } from '@/data/registry';
import { categories } from '@/data/categories';
import { SearchInput } from '@/components/ui/SearchInput';
import { Tabs } from '@/components/ui/Tabs';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentlyUsed } from '@/hooks/useRecentlyUsed';
import { RU_CATEGORIES, ruCalcTitle, ruCalcDesc, ruPlural } from '@/i18n/ru';

type ViewTab = 'all' | 'favorites' | 'recent';

const pill = (active: boolean) =>
  `px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
    active ? 'bg-honey-500 text-white' : 'bg-smoke-100 text-smoke-600 hover:bg-smoke-200'
  }`;

export function RuCalculatorsClient() {
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
      list = recentlyUsed
        .map(getCalculatorBySlug)
        .filter((c): c is NonNullable<typeof c> => c !== undefined);
    }
    if (category) list = list.filter((c) => c.categorySlug === category);

    // Search works in Russian and in English (title, description, keywords)
    const terms = query.toLowerCase().replace(/ё/g, 'е').split(/\s+/).filter(Boolean);
    if (query.trim().length >= 2 && terms.length > 0) {
      const norm = (s: string) => s.toLowerCase().replace(/ё/g, 'е');
      list = list
        .map((calc) => {
          const title = norm(ruCalcTitle(calc.slug, calc.title));
          const rest = norm(
            [
              ruCalcDesc(calc.slug, calc.shortDescription),
              RU_CATEGORIES[calc.categorySlug]?.title ?? '',
              calc.title,
              calc.shortDescription,
              ...calc.keywords,
            ].join(' ')
          );
          let score = 0;
          for (const term of terms) {
            if (title.includes(term)) score += 10;
            else if (rest.includes(term)) score += 1;
            else return { calc, score: -1 };
          }
          return { calc, score };
        })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.calc);
    }
    return list;
  }, [query, category, viewTab, favorites, recentlyUsed]);

  const tabs = [
    { value: 'all', label: 'Все', count: calculatorRegistry.length },
    { value: 'favorites', label: 'Избранное', count: favorites.length },
    { value: 'recent', label: 'Недавние', count: recentlyUsed.length },
  ];

  return (
    <div className="container-page py-6 sm:py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-2">Все калькуляторы</h1>
        <p className="text-smoke-500">
          Ищите, просматривайте и фильтруйте полную библиотеку калькуляторов для пчеловодов.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <SearchInput value={query} onChange={setQuery} placeholder="Поиск калькуляторов..." />
        <Tabs tabs={tabs} activeTab={viewTab} onChange={(v) => setViewTab(v as ViewTab)} />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по категории">
          <button
            onClick={() => setCategory(null)}
            className={pill(category === null)}
            style={{ minHeight: 40 }}
            aria-pressed={category === null}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug === category ? null : cat.slug)}
              className={pill(category === cat.slug)}
              style={{ minHeight: 40 }}
              aria-pressed={category === cat.slug}
            >
              <span className="mr-1" aria-hidden="true">{cat.icon}</span>
              {RU_CATEGORIES[cat.slug]?.title ?? cat.title}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-4xl mb-3 block" aria-hidden="true">🔍</span>
          <p className="text-smoke-600 font-medium">Ничего не найдено</p>
          <p className="text-smoke-400 text-sm mt-1">Попробуйте другой запрос или фильтр</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-smoke-400 mb-3" aria-live="polite">
            {ruPlural(filtered.length, 'калькулятор', 'калькулятора', 'калькуляторов')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((calc) => (
              <Link key={calc.slug} href={`/ru/calculator/${calc.slug}`} className="card-interactive group block p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl" aria-hidden="true">{calc.icon}</span>
                  <h3 className="font-display text-base sm:text-lg text-smoke-800 group-hover:text-honey-700 transition-colors leading-tight">
                    {ruCalcTitle(calc.slug, calc.title)}
                  </h3>
                </div>
                <p className="text-sm text-smoke-500 line-clamp-2">{ruCalcDesc(calc.slug, calc.shortDescription)}</p>
                <p className="text-xs text-honey-700 mt-2">
                  {RU_CATEGORIES[calc.categorySlug]?.title ?? ''}
                </p>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
