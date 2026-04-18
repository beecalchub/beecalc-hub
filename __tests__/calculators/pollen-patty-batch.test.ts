import { calculatePollenPatty } from '@/calculators/pollen-patty-batch/logic';

describe('Pollen Patty Batch', () => {
  test('10 standard patties at 8oz produces correct totals', () => {
    const r = calculatePollenPatty({ pattyCount: 10, pattyWeightOz: 8, proteinPercent: 15, recipe: 'standard' });
    expect(r.totalWeightLbs).toBe(5); // 10 * 8oz = 80oz = 5 lbs
    expect(r.pollenSubLbs).toBeCloseTo(5 * 0.35, 1);
    expect(r.sugarLbs).toBeCloseTo(5 * 0.45, 1);
  });

  test('high protein recipe has more pollen sub', () => {
    const std = calculatePollenPatty({ pattyCount: 10, pattyWeightOz: 8, proteinPercent: 15, recipe: 'standard' });
    const hp = calculatePollenPatty({ pattyCount: 10, pattyWeightOz: 8, proteinPercent: 22, recipe: 'high-protein' });
    expect(hp.pollenSubLbs).toBeGreaterThan(std.pollenSubLbs);
    expect(hp.proteinContentPercent).toBeGreaterThan(std.proteinContentPercent);
  });

  test('budget recipe has lowest cost', () => {
    const std = calculatePollenPatty({ pattyCount: 10, pattyWeightOz: 8, proteinPercent: 15, recipe: 'standard' });
    const budget = calculatePollenPatty({ pattyCount: 10, pattyWeightOz: 8, proteinPercent: 10, recipe: 'budget' });
    expect(budget.costEstimate).toBeLessThan(std.costEstimate);
  });

  test('metric conversions are consistent', () => {
    const r = calculatePollenPatty({ pattyCount: 20, pattyWeightOz: 16, proteinPercent: 15, recipe: 'standard' });
    expect(r.pollenSubKg).toBeCloseTo(r.pollenSubLbs * 0.4536, 1);
    expect(r.totalWeightKg).toBeCloseTo(r.totalWeightLbs * 0.4536, 1);
  });
});
