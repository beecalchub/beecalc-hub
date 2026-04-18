import { calculateVarroaRate } from '@/calculators/varroa-infestation-rate/logic';

describe('Varroa Infestation Rate', () => {
  test('0 mites = 0% = low risk', () => {
    const r = calculateVarroaRate({ method: 'alcohol', mitesFound: 0, beeSampleSize: 300 });
    expect(r.infestationPercent).toBe(0);
    expect(r.riskLevel).toBe('low');
  });

  test('3 mites in 300 bees = 1%', () => {
    const r = calculateVarroaRate({ method: 'alcohol', mitesFound: 3, beeSampleSize: 300 });
    expect(r.infestationPercent).toBe(1);
    expect(r.riskLevel).toBe('moderate');
  });

  test('9 mites in 300 bees = 3% = critical', () => {
    const r = calculateVarroaRate({ method: 'alcohol', mitesFound: 9, beeSampleSize: 300 });
    expect(r.infestationPercent).toBe(3);
    expect(r.riskLevel).toBe('critical');
  });

  test('high rate has urgent recommendation', () => {
    const r = calculateVarroaRate({ method: 'alcohol', mitesFound: 6, beeSampleSize: 300 });
    expect(r.riskLevel).toBe('high');
    expect(r.recommendation.toLowerCase()).toContain('treat');
  });

  test('handles 0 sample size gracefully', () => {
    const r = calculateVarroaRate({ method: 'alcohol', mitesFound: 5, beeSampleSize: 0 });
    expect(r.infestationPercent).toBe(0);
  });
});
