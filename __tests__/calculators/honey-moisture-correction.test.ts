import { calculateMoistureCorrection } from '@/calculators/honey-moisture-correction/logic';

describe('Honey Moisture Correction', () => {
  test('honey at 18% is acceptable', () => {
    const r = calculateMoistureCorrection({ currentMoisture: 18, targetMoisture: 18, honeyWeightLbs: 60 });
    expect(r.isAcceptable).toBe(true);
    expect(r.needsDrying).toBe(false);
    expect(r.waterToRemoveLbs).toBe(0);
  });

  test('honey at 20% needs drying', () => {
    const r = calculateMoistureCorrection({ currentMoisture: 20, targetMoisture: 18, honeyWeightLbs: 60 });
    expect(r.isAcceptable).toBe(false);
    expect(r.needsDrying).toBe(true);
    expect(r.waterToRemoveLbs).toBeGreaterThan(0);
  });

  test('weight loss is calculated correctly', () => {
    const r = calculateMoistureCorrection({ currentMoisture: 20, targetMoisture: 18, honeyWeightLbs: 100 });
    expect(r.finalWeightLbs).toBeLessThan(100);
    expect(r.finalWeightLbs).toBeGreaterThan(90);
    expect(r.weightLossPercent).toBeGreaterThan(0);
    expect(r.weightLossPercent).toBeLessThan(10);
  });

  test('low moisture gets excellent status', () => {
    const r = calculateMoistureCorrection({ currentMoisture: 16.5, targetMoisture: 18, honeyWeightLbs: 60 });
    expect(r.status.toLowerCase()).toContain('excellent');
  });
});
