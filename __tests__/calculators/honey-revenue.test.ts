import { calculateHoneyRevenue } from '@/calculators/honey-revenue/logic';

describe('Honey Revenue', () => {
  test('100% retail calculates correctly', () => {
    const r = calculateHoneyRevenue({ jarSizeOz: 16, jarCount: 100, pricePerJar: 10, wholesalePercent: 0, wholesaleDiscount: 30 });
    expect(r.totalRevenue).toBe(1000);
    expect(r.retailJars).toBe(100);
    expect(r.wholesaleJars).toBe(0);
  });

  test('wholesale split calculates correctly', () => {
    const r = calculateHoneyRevenue({ jarSizeOz: 16, jarCount: 100, pricePerJar: 10, wholesalePercent: 50, wholesaleDiscount: 30 });
    expect(r.retailJars).toBe(50);
    expect(r.wholesaleJars).toBe(50);
    expect(r.retailRevenue).toBe(500);
    expect(r.wholesaleRevenue).toBe(350); // 50 * 10 * 0.7
    expect(r.totalRevenue).toBe(850);
  });

  test('revenue per lb calculated', () => {
    const r = calculateHoneyRevenue({ jarSizeOz: 16, jarCount: 100, pricePerJar: 10, wholesalePercent: 0, wholesaleDiscount: 0 });
    expect(r.revenuePerLb).toBe(10); // 16oz = 1lb, $10 per jar
  });
});
