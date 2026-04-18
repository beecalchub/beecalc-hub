import { calculateOavDosing } from '@/calculators/oav-dosing/logic';

describe('OAV Dosing', () => {
  test('1 brood box = 1g per hive', () => {
    const r = calculateOavDosing({ broodBoxCount: 1, hiveCount: 1, hasScreenBottom: false });
    expect(r.gramsPerHive).toBe(1);
    expect(r.totalGrams).toBe(1);
  });

  test('2 brood boxes = 2g per hive', () => {
    const r = calculateOavDosing({ broodBoxCount: 2, hiveCount: 1, hasScreenBottom: false });
    expect(r.gramsPerHive).toBe(2);
  });

  test('max 4g per hive even with 5 boxes', () => {
    const r = calculateOavDosing({ broodBoxCount: 5, hiveCount: 1, hasScreenBottom: false });
    expect(r.gramsPerHive).toBe(4);
  });

  test('total scales with hive count', () => {
    const r = calculateOavDosing({ broodBoxCount: 2, hiveCount: 10, hasScreenBottom: false });
    expect(r.totalGrams).toBe(20);
  });

  test('screened bottom adds safety note', () => {
    const r = calculateOavDosing({ broodBoxCount: 2, hiveCount: 1, hasScreenBottom: true });
    expect(r.safetyNotes.some((n) => n.toLowerCase().includes('screen'))).toBe(true);
  });

  test('always includes safety notes', () => {
    const r = calculateOavDosing({ broodBoxCount: 1, hiveCount: 1, hasScreenBottom: false });
    expect(r.safetyNotes.length).toBeGreaterThan(3);
  });
});
