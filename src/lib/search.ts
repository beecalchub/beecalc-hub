import type { CalculatorMeta } from '@/types/calculator';

export function searchCalculators(
  calculators: CalculatorMeta[],
  query: string
): CalculatorMeta[] {
  if (!query || query.length < 2) return calculators;

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  return calculators
    .map((calc) => {
      const searchable = [
        calc.title,
        calc.shortTitle || '',
        calc.description,
        calc.shortDescription,
        ...calc.keywords,
      ]
        .join(' ')
        .toLowerCase();

      let score = 0;
      for (const term of terms) {
        if (calc.title.toLowerCase().includes(term)) score += 10;
        else if (calc.keywords.some((k) => k.includes(term))) score += 5;
        else if (searchable.includes(term)) score += 1;
        else return { calc, score: -1 };
      }
      return { calc, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.calc);
}

export function filterByCategory(
  calculators: CalculatorMeta[],
  categorySlug: string | null
): CalculatorMeta[] {
  if (!categorySlug) return calculators;
  return calculators.filter((c) => c.categorySlug === categorySlug);
}

export function filterByType(
  calculators: CalculatorMeta[],
  type: string | null
): CalculatorMeta[] {
  if (!type) return calculators;
  return calculators.filter((c) => c.type === type);
}

export function filterMvpOnly(
  calculators: CalculatorMeta[],
  mvpOnly: boolean
): CalculatorMeta[] {
  if (!mvpOnly) return calculators;
  return calculators.filter((c) => c.isMvp);
}
