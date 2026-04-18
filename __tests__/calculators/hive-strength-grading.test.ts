import { calculateHiveStrength } from '@/calculators/hive-strength-grading/logic';

describe('Hive Strength Grading', () => {
  test('strong colony gets high grade', () => {
    const r = calculateHiveStrength({
      framesOfBees: 12, framesOfBrood: 8, queenSeen: true,
      queenAge: 'new', temperament: 'calm', diseasePresent: false, framesOfHoney: 4,
    });
    expect(r.grade).toBe('A');
    expect(r.totalScore).toBeGreaterThanOrEqual(85);
    expect(r.pollinationReady).toBe(true);
  });

  test('weak colony gets low grade', () => {
    const r = calculateHiveStrength({
      framesOfBees: 3, framesOfBrood: 1, queenSeen: false,
      queenAge: 'unknown', temperament: 'aggressive', diseasePresent: true, framesOfHoney: 0,
    });
    expect(r.grade).toBe('F');
    expect(r.pollinationReady).toBe(false);
  });

  test('disease blocks pollination readiness', () => {
    const r = calculateHiveStrength({
      framesOfBees: 10, framesOfBrood: 6, queenSeen: true,
      queenAge: '1-year', temperament: 'calm', diseasePresent: true, framesOfHoney: 3,
    });
    expect(r.pollinationReady).toBe(false);
  });

  test('breakdown has 6 categories', () => {
    const r = calculateHiveStrength({
      framesOfBees: 8, framesOfBrood: 5, queenSeen: true,
      queenAge: '1-year', temperament: 'calm', diseasePresent: false, framesOfHoney: 3,
    });
    expect(r.breakdown.length).toBe(6);
    const totalMax = r.breakdown.reduce((s, b) => s + b.max, 0);
    expect(totalMax).toBe(100);
  });
});
