import { calculateSugarSyrup } from '@/calculators/sugar-syrup/logic';

describe('Sugar Syrup Calculator', () => {
  test('1:1 ratio produces equal parts by weight', () => {
    const result = calculateSugarSyrup({ ratio: '1:1', targetVolumeLiters: 10 });
    expect(result.sugarKg).toBeGreaterThan(0);
    expect(result.waterLiters).toBeGreaterThan(0);
    // Sugar and water should be roughly equal by weight (water kg ≈ water liters)
    expect(result.sugarKg).toBeCloseTo(result.waterLiters, 0);
  });

  test('2:1 ratio has twice the sugar by weight', () => {
    const result = calculateSugarSyrup({ ratio: '2:1', targetVolumeLiters: 10 });
    expect(result.sugarKg / result.waterLiters).toBeCloseTo(2, 0);
  });

  test('imperial conversions are consistent', () => {
    const result = calculateSugarSyrup({ ratio: '1:1', targetVolumeLiters: 5 });
    expect(result.sugarLbs).toBeCloseTo(result.sugarKg * 2.20462, 1);
    expect(result.waterGallons).toBeCloseTo(result.waterLiters * 0.264172, 1);
  });

  test('zero volume returns zeros', () => {
    const result = calculateSugarSyrup({ ratio: '1:1', targetVolumeLiters: 0 });
    expect(result.sugarKg).toBe(0);
    expect(result.waterLiters).toBe(0);
  });

  test('sugar cups are reasonable', () => {
    const result = calculateSugarSyrup({ ratio: '1:1', targetVolumeLiters: 1 });
    expect(result.sugarCups).toBeGreaterThan(0);
    expect(result.sugarCups).toBeLessThan(20);
  });
});
