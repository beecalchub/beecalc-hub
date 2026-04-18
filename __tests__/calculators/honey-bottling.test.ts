import { calculateBottling } from '@/calculators/honey-bottling/logic';

describe('Honey Bottling', () => {
  test('basic jar count calculation', () => {
    const r = calculateBottling({ totalHoneyLbs: 60, jarSizeOz: 16, overheadPercent: 0 });
    // 60 lbs * 16 oz/lb = 960 oz / 16 oz/jar = 60 jars
    expect(r.jarCount).toBe(60);
  });

  test('overhead reduces usable honey', () => {
    const r = calculateBottling({ totalHoneyLbs: 60, jarSizeOz: 16, overheadPercent: 10 });
    expect(r.jarCount).toBe(54); // 960 * 0.9 = 864 / 16 = 54
  });

  test('small jars give more jars', () => {
    const r = calculateBottling({ totalHoneyLbs: 10, jarSizeOz: 2, overheadPercent: 0 });
    expect(r.jarCount).toBe(80); // 160 oz / 2 = 80
  });

  test('leftover honey is calculated', () => {
    const r = calculateBottling({ totalHoneyLbs: 10, jarSizeOz: 12, overheadPercent: 0 });
    // 160 oz / 12 = 13 jars with 4 oz leftover
    expect(r.jarCount).toBe(13);
    expect(r.leftoverOz).toBeCloseTo(4, 0);
  });
});
