import { calculateTreatmentCost, DEFAULT_TREATMENTS } from '@/calculators/treatment-cost/logic';

describe('Treatment Cost', () => {
  test('single treatment calculates correctly', () => {
    const r = calculateTreatmentCost({
      hiveCount: 10,
      treatments: [{ name: 'OAV', enabled: true, costPerHive: 1.50, roundsPerYear: 3 }],
    });
    expect(r.totalPerHive).toBe(4.50); // 1.50 * 3
    expect(r.totalAllHives).toBe(45); // 4.50 * 10
  });

  test('disabled treatments excluded', () => {
    const r = calculateTreatmentCost({
      hiveCount: 10,
      treatments: [
        { name: 'OAV', enabled: true, costPerHive: 1.50, roundsPerYear: 3 },
        { name: 'Apivar', enabled: false, costPerHive: 5.00, roundsPerYear: 1 },
      ],
    });
    expect(r.perTreatment.length).toBe(1);
    expect(r.totalPerHive).toBe(4.50);
  });

  test('multiple treatments sum correctly', () => {
    const r = calculateTreatmentCost({
      hiveCount: 5,
      treatments: [
        { name: 'OAV', enabled: true, costPerHive: 1.50, roundsPerYear: 3 },
        { name: 'Formic', enabled: true, costPerHive: 4.50, roundsPerYear: 1 },
      ],
    });
    expect(r.totalPerHive).toBe(9); // 4.50 + 4.50
    expect(r.totalAllHives).toBe(45); // 9 * 5
  });

  test('default treatments are provided', () => {
    expect(DEFAULT_TREATMENTS.length).toBeGreaterThan(3);
  });
});
