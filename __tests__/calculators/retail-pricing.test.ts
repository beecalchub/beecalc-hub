import { calculateRetailPricing } from '@/calculators/retail-pricing/logic';

describe('Retail Pricing', () => {
  test('50% margin doubles cost', () => {
    const r = calculateRetailPricing({ costPerLb: 4, jarSizeOz: 16, targetMarginPercent: 50, localAvgPrice: 10 });
    // Cost per jar: $4 (1 lb). At 50% margin: $4 / 0.5 = $8
    expect(r.costPerJar).toBe(4);
    expect(r.suggestedPrice).toBe(8);
  });

  test('local avg margin calculated', () => {
    const r = calculateRetailPricing({ costPerLb: 4, jarSizeOz: 16, targetMarginPercent: 50, localAvgPrice: 12 });
    // Margin at $12: (12-4)/12 = 66.67%
    expect(r.marginAtLocalAvg).toBeCloseTo(66.67, 0);
  });

  test('small jars have lower cost', () => {
    const r = calculateRetailPricing({ costPerLb: 8, jarSizeOz: 8, targetMarginPercent: 50, localAvgPrice: 10 });
    // 8oz = 0.5 lb, cost = $4
    expect(r.costPerJar).toBe(4);
  });
});
