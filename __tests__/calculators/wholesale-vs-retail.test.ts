import { calculateWholesaleRetail } from '@/calculators/wholesale-vs-retail/logic';

describe('Wholesale vs Retail Comparison', () => {
  const BASE = {
    totalJars: 100, retailPricePerJar: 14, wholesalePricePerJar: 8,
    retailSellThroughPercent: 100, wholesaleSellThroughPercent: 100,
    retailTimeCostPerJar: 0, wholesaleTimeCostPerJar: 0, costPerJar: 4,
  };

  test('100% retail at full sell-through', () => {
    const r = calculateWholesaleRetail(BASE);
    expect(r.retail.jarsSold).toBe(100);
    expect(r.retail.grossRevenue).toBe(1400);
    expect(r.retail.netProfit).toBe(1000); // 1400 - 400
  });

  test('100% wholesale at full sell-through', () => {
    const r = calculateWholesaleRetail(BASE);
    expect(r.wholesale.jarsSold).toBe(100);
    expect(r.wholesale.grossRevenue).toBe(800);
    expect(r.wholesale.netProfit).toBe(400); // 800 - 400
  });

  test('retail profit higher than wholesale when prices differ', () => {
    const r = calculateWholesaleRetail(BASE);
    expect(r.retail.netProfit).toBeGreaterThan(r.wholesale.netProfit);
  });

  test('mixed is 60/40 split', () => {
    const r = calculateWholesaleRetail(BASE);
    // 60 retail + 40 wholesale = 100 jars
    expect(r.mixed.jarsSold).toBe(100);
  });

  test('recommendation mentions best scenario', () => {
    const r = calculateWholesaleRetail(BASE);
    expect(r.recommendation).toBeTruthy();
    expect(r.recommendation.length).toBeGreaterThan(10);
  });

  test('sell-through reduces jars sold', () => {
    const r = calculateWholesaleRetail({ ...BASE, retailSellThroughPercent: 50 });
    expect(r.retail.jarsSold).toBe(50);
    expect(r.retail.unsoldJars).toBe(50);
  });
});
