import { calculateWaterRequirement } from '@/calculators/water-requirement-estimator/logic';

describe('Water Requirement Estimator', () => {
  test('summer needs more water than winter', () => {
    const summer = calculateWaterRequirement({ hiveCount: 5, season: 'summer', averageTempF: 85, nearestWaterSourceFt: 200 });
    const winter = calculateWaterRequirement({ hiveCount: 5, season: 'winter', averageTempF: 35, nearestWaterSourceFt: 200 });
    expect(summer.totalGallonsPerDay).toBeGreaterThan(winter.totalGallonsPerDay);
  });

  test('high temperature increases water need', () => {
    const normal = calculateWaterRequirement({ hiveCount: 5, season: 'summer', averageTempF: 80, nearestWaterSourceFt: 200 });
    const hot = calculateWaterRequirement({ hiveCount: 5, season: 'summer', averageTempF: 100, nearestWaterSourceFt: 200 });
    expect(hot.litersPerHivePerDay).toBeGreaterThan(normal.litersPerHivePerDay);
  });

  test('distant water source triggers supplemental recommendation', () => {
    const near = calculateWaterRequirement({ hiveCount: 5, season: 'summer', averageTempF: 85, nearestWaterSourceFt: 100 });
    const far = calculateWaterRequirement({ hiveCount: 5, season: 'summer', averageTempF: 85, nearestWaterSourceFt: 1000 });
    expect(near.needsSupplementalWater).toBe(false);
    expect(far.needsSupplementalWater).toBe(true);
  });

  test('weekly = daily × 7', () => {
    const r = calculateWaterRequirement({ hiveCount: 3, season: 'summer', averageTempF: 85, nearestWaterSourceFt: 200 });
    expect(r.totalGallonsPerWeek).toBeCloseTo(r.totalGallonsPerDay * 7, 0);
  });

  test('container and refill are positive', () => {
    const r = calculateWaterRequirement({ hiveCount: 10, season: 'summer', averageTempF: 90, nearestWaterSourceFt: 800 });
    expect(r.containerSizeGallons).toBeGreaterThan(0);
    expect(r.refillFrequencyDays).toBeGreaterThanOrEqual(1);
  });

  test('scales linearly with hive count', () => {
    const one = calculateWaterRequirement({ hiveCount: 1, season: 'summer', averageTempF: 85, nearestWaterSourceFt: 200 });
    const ten = calculateWaterRequirement({ hiveCount: 10, season: 'summer', averageTempF: 85, nearestWaterSourceFt: 200 });
    expect(ten.totalLitersPerDay).toBeCloseTo(one.totalLitersPerDay * 10, 1);
  });
});
