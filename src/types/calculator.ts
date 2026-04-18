export type CalculatorType =
  | 'exact'
  | 'estimate'
  | 'scorecard'
  | 'planner'
  | 'projection'
  | 'decision-helper'
  | 'converter'
  | 'dashboard';

export interface CalculatorMeta {
  slug: string;
  title: string;
  shortTitle?: string;
  categorySlug: string;
  type: CalculatorType;
  description: string;
  shortDescription: string;
  icon: string;
  isMvp: boolean;
  keywords: string[];
  relatedSlugs: string[];
}

export interface CategoryMeta {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export interface CalculatorResult {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
  detail?: string;
}

export interface Assumption {
  label: string;
  value: string;
  adjustable?: boolean;
}
