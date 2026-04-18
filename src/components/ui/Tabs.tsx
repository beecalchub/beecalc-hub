'use client';

import React from 'react';

interface Tab {
  value: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`whitespace-nowrap px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === tab.value
              ? 'bg-honey-100 text-honey-800'
              : 'text-smoke-500 hover:text-smoke-700 hover:bg-smoke-50'
          }`}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-1.5 text-xs ${
              activeTab === tab.value ? 'text-honey-600' : 'text-smoke-400'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
