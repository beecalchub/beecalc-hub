'use client';

import React, { useState } from 'react';
import type { Assumption } from '@/types/calculator';

interface AssumptionsPanelProps {
  assumptions: Assumption[];
  title?: string;
}

export function AssumptionsPanel({ assumptions, title = 'Assumptions' }: AssumptionsPanelProps) {
  const [open, setOpen] = useState(false);

  if (assumptions.length === 0) return null;

  return (
    <div className="mt-4 border border-smoke-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-smoke-600 hover:bg-smoke-50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <svg className="w-4 h-4 text-smoke-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-smoke-400 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-3 space-y-2 border-t border-smoke-100">
          {assumptions.map((a, i) => (
            <div key={i} className="flex items-start justify-between text-sm py-1.5">
              <span className="text-smoke-500">{a.label}</span>
              <span className="text-smoke-700 font-medium text-right ml-4">{a.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
