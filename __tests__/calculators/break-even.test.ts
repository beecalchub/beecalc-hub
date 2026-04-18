import { calculateBreakEven } from '@/calculators/break-even/logic';

describe('Break-Even Calculator', () => {
  test('basic break-even calculation', () => {
    const r = calculateBreakEven({ fixedCostsPerYear: 3000, variableCostPerUnit: 4, revenuePerUnit: 12, unitLabel: 'jars' });
    // Contribution margin = 12 - 4 = 8. Break-even = 3000 / 8 = 375
    expect(r.breakEvenUnits).toBe(375);
    expect(r.contributionMargin).toBe(8);
    expect(r.isProfitablePerUnit).toBe(true);
  });

  test('break-even revenue = units × price', () => {
    const r = calculateBreakEven({ fixedCostsPerYear: 1000, variableCostPerUnit: 2, revenuePerUnit: 10, unitLabel: 'jars' });
    expect(r.breakEvenRevenue).toBe(r.breakEvenUnits * 10);
  });

  test('unprofitable per unit returns 0 units and message', () => {
    const r = calculateBreakEven({ fixedCostsPerYear: 1000, variableCostPerUnit: 15, revenuePerUnit: 10, unitLabel: 'jars' });
    expect(r.isProfitablePerUnit).toBe(false);
    expect(r.breakEvenUnits).toBe(0);
    expect(r.message.toLowerCase()).toContain('cannot');
  });

  test('zero fixed costs = 0 break-even units', () => {
    const r = calculateBreakEven({ fixedCostsPerYear: 0, variableCostPerUnit: 4, revenuePerUnit: 12, unitLabel: 'jars' });
    expect(r.breakEvenUnits).toBe(0);
  });

  test('margin percent calculated correctly', () => {
    const r = calculateBreakEven({ fixedCostsPerYear: 1000, variableCostPerUnit: 4, revenuePerUnit: 10, unitLabel: 'jars' });
    // (10-4)/10 = 60%
    expect(r.contributionMarginPercent).toBe(60);
  });
});
