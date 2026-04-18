'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface ResultPanelProps {
  title?: string;
  children: React.ReactNode;
  visible?: boolean;
}

export function ResultPanel({ title = 'Results', children, visible = true }: ResultPanelProps) {
  if (!visible) return null;

  return (
    <Card className="border-honey-200 bg-gradient-to-br from-honey-50/50 to-white animate-fade-in">
      <h3 className="font-display text-lg text-honey-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-honey-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </Card>
  );
}
