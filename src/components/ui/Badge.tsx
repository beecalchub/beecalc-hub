import React from 'react';
import type { CalculatorType } from '@/types/calculator';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'honey' | 'green' | 'blue' | 'purple' | 'red';
  size?: 'sm' | 'md';
}

const variantClasses = {
  default: 'bg-smoke-100 text-smoke-600',
  honey: 'bg-honey-100 text-honey-800',
  green: 'bg-meadow-100 text-meadow-700',
  blue: 'bg-blue-50 text-blue-700',
  purple: 'bg-purple-50 text-purple-700',
  red: 'bg-red-50 text-red-700',
};

const sizeClasses = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2 py-0.5',
};

export function Badge({ children, variant = 'default', size = 'sm' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}

const typeVariantMap: Record<CalculatorType, BadgeProps['variant']> = {
  exact: 'green',
  estimate: 'honey',
  scorecard: 'blue',
  planner: 'purple',
  projection: 'honey',
  'decision-helper': 'blue',
  converter: 'default',
  dashboard: 'purple',
};

const typeLabelMap: Record<CalculatorType, string> = {
  exact: 'Exact Calculator',
  estimate: 'Estimate',
  scorecard: 'Scorecard',
  planner: 'Planner',
  projection: 'Projection',
  'decision-helper': 'Decision Helper',
  converter: 'Converter',
  dashboard: 'Dashboard',
};

export function CalculatorTypeBadge({ type }: { type: CalculatorType }) {
  return (
    <Badge variant={typeVariantMap[type]} size="sm">
      {typeLabelMap[type]}
    </Badge>
  );
}
