import { calculatePopulation } from '@/calculators/hive-population-estimator/logic';

describe('Hive Population Estimator', () => {
  test('8 deep frames = ~20000 bees', () => {
    const r = calculatePopulation({ framesCoveredWithBees: 8, framesOfBrood: 5, boxType: 'deep' });
    expect(r.estimatedBees).toBe(20000);
    expect(r.strength).toBe('moderate');
  });

  test('20 deep frames = ~50000 bees = strong', () => {
    const r = calculatePopulation({ framesCoveredWithBees: 20, framesOfBrood: 10, boxType: 'deep' });
    expect(r.estimatedBees).toBe(50000);
    expect(r.strength).toBe('strong');
  });

  test('medium frames use lower bees-per-frame', () => {
    const r = calculatePopulation({ framesCoveredWithBees: 8, framesOfBrood: 5, boxType: 'medium' });
    expect(r.estimatedBees).toBe(14000);
    expect(r.beesPerFrame).toBe(1750);
  });

  test('weak colony detection', () => {
    const r = calculatePopulation({ framesCoveredWithBees: 3, framesOfBrood: 1, boxType: 'deep' });
    expect(r.strength).toBe('weak');
  });

  test('emerging bees are projected', () => {
    const r = calculatePopulation({ framesCoveredWithBees: 10, framesOfBrood: 6, boxType: 'deep' });
    expect(r.emergingBees).toBeGreaterThan(0);
    expect(r.projectedPeakPop).toBeGreaterThan(r.estimatedBees);
  });
});
