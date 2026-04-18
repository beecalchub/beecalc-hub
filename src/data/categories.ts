import type { CategoryMeta } from '@/types/calculator';

export const categories: CategoryMeta[] = [
  {
    slug: 'colony-and-hive-management',
    title: 'Colony & Hive Management',
    description: 'Track populations, plan splits, assess overwintering readiness, and manage your colonies with confidence.',
    icon: '🏠',
    color: 'honey',
    order: 1,
  },
  {
    slug: 'feeding-and-nutrition',
    title: 'Feeding & Nutrition',
    description: 'Mix syrup, plan winter stores, estimate feed costs, and keep your bees well-nourished year-round.',
    icon: '🍯',
    color: 'comb',
    order: 2,
  },
  {
    slug: 'honey-production-and-extraction',
    title: 'Honey Production & Extraction',
    description: 'Estimate yields, plan bottling, correct moisture, and maximize your honey harvest.',
    icon: '🫙',
    color: 'honey',
    order: 3,
  },
  {
    slug: 'wax-and-hive-products',
    title: 'Wax & Hive Products',
    description: 'Calculate wax rendering yields, plan candle batches, and value your hive byproducts.',
    icon: '🕯️',
    color: 'hive',
    order: 4,
  },
  {
    slug: 'varroa-and-pest-management',
    title: 'Varroa & Pest Management',
    description: 'Monitor mite loads, time treatments, track thresholds, and protect your colonies from pests.',
    icon: '🔬',
    color: 'meadow',
    order: 5,
  },
  {
    slug: 'disease-and-inspection-support',
    title: 'Disease & Inspection Support',
    description: 'Score colony health, schedule inspections, and catch problems early.',
    icon: '🩺',
    color: 'smoke',
    order: 6,
  },
  {
    slug: 'equipment-and-build',
    title: 'Equipment & Build Calculators',
    description: 'Plan hive configurations, calculate material needs, and optimize your equipment setup.',
    icon: '🔨',
    color: 'hive',
    order: 7,
  },
  {
    slug: 'seasonal-planning',
    title: 'Seasonal Planning',
    description: 'Prepare for each season with buildup plans, flow countdowns, and overwintering strategies.',
    icon: '📅',
    color: 'meadow',
    order: 8,
  },
  {
    slug: 'queen-breeding-and-genetics',
    title: 'Queen Breeding & Genetics',
    description: 'Time grafts, plan mating windows, and manage your queen rearing program.',
    icon: '👑',
    color: 'comb',
    order: 9,
  },
  {
    slug: 'pollination-services',
    title: 'Pollination Services',
    description: 'Price contracts, grade hive strength, plan deployments, and calculate pollination revenue.',
    icon: '🌻',
    color: 'meadow',
    order: 10,
  },
  {
    slug: 'business-and-profitability',
    title: 'Business & Profitability',
    description: 'Track costs, calculate profit margins, plan expansion, and run your apiary like a business.',
    icon: '💰',
    color: 'honey',
    order: 11,
  },
  {
    slug: 'education-and-hobbyist',
    title: 'Education & Hobbyist Tools',
    description: 'Get started with beekeeping, budget your first hive, and learn with guided decision tools.',
    icon: '📚',
    color: 'comb',
    order: 12,
  },
  {
    slug: 'environmental-and-forage',
    title: 'Environmental & Forage Tools',
    description: 'Map forage radius, plan pollinator habitat, and understand your bees\' environment.',
    icon: '🌿',
    color: 'meadow',
    order: 13,
  },
  {
    slug: 'data-conversion-and-utility',
    title: 'Data Conversion & Utility Tools',
    description: 'Convert units, scale batches, calculate date intervals, and handle everyday beekeeping math.',
    icon: '🔄',
    color: 'smoke',
    order: 14,
  },
  {
    slug: 'advanced-premium',
    title: 'Advanced & Premium Tools',
    description: 'Professional-grade dashboards, scoring models, and commercial operation planning.',
    icon: '⚡',
    color: 'honey',
    order: 15,
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryTitle(slug: string): string {
  return getCategoryBySlug(slug)?.title ?? slug;
}
