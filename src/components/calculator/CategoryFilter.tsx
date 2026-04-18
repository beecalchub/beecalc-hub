'use client';

import React from 'react';
import { categories } from '@/data/categories';

interface CategoryFilterProps {
  selected: string | null;
  onChange: (slug: string | null) => void;
}

// Fix #12: Larger touch targets on mobile for filter pills
export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      <button
        onClick={() => onChange(null)}
        className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === null
            ? 'bg-honey-500 text-white'
            : 'bg-smoke-100 text-smoke-600 hover:bg-smoke-200'
        }`}
        style={{ minHeight: 40 }}
        aria-pressed={selected === null}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug === selected ? null : cat.slug)}
          className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === cat.slug
              ? 'bg-honey-500 text-white'
              : 'bg-smoke-100 text-smoke-600 hover:bg-smoke-200'
          }`}
          style={{ minHeight: 40 }}
          aria-pressed={selected === cat.slug}
        >
          <span className="mr-1" aria-hidden="true">{cat.icon}</span>
          {cat.title}
        </button>
      ))}
    </div>
  );
}
