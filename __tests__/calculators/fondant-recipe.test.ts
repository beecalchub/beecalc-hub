import { calculateFondant } from '@/calculators/fondant-recipe/logic';

describe('Fondant Recipe', () => {
  test('standard recipe has ~83% sugar', () => {
    const r = calculateFondant({ targetWeightLbs: 10, recipe: 'standard' });
    expect(r.sugarLbs).toBeCloseTo(8.3, 1);
    expect(r.waterCups).toBeGreaterThan(0);
    expect(r.vinegarTbsp).toBeGreaterThan(0);
  });

  test('no-cook recipe has ~94% sugar', () => {
    const r = calculateFondant({ targetWeightLbs: 10, recipe: 'no-cook' });
    expect(r.sugarLbs).toBeCloseTo(9.4, 1);
  });

  test('cream recipe includes honey', () => {
    const r = calculateFondant({ targetWeightLbs: 10, recipe: 'cream' });
    expect(r.honeyCups).toBeGreaterThan(0);
    expect(r.honeyMl).toBeGreaterThan(0);
  });

  test('standard recipe does not include honey', () => {
    const r = calculateFondant({ targetWeightLbs: 10, recipe: 'standard' });
    expect(r.honeyCups).toBe(0);
  });

  test('serves hives calculated correctly', () => {
    const r = calculateFondant({ targetWeightLbs: 10, recipe: 'standard' });
    expect(r.servesHives).toBe(5); // 10 / 2 lbs per hive
  });

  test('metric conversion is accurate', () => {
    const r = calculateFondant({ targetWeightLbs: 10, recipe: 'standard' });
    expect(r.sugarKg).toBeCloseTo(r.sugarLbs * 0.4536, 1);
    expect(r.totalWeightKg).toBeCloseTo(10 * 0.4536, 1);
  });

  test('instructions are present', () => {
    const r = calculateFondant({ targetWeightLbs: 5, recipe: 'standard' });
    expect(r.instructions.length).toBeGreaterThan(3);
  });
});
