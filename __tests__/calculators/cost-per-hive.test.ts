import { calculateCostPerHive } from '@/calculators/cost-per-hive/logic';

describe('Cost Per Hive', () => {
  test('basic cost calculation', () => {
    const r = calculateCostPerHive({
      equipmentCost: 300, equipmentLifeYears: 10, beeCost: 0,
      feedCostPerYear: 30, treatmentCostPerYear: 25,
      laborHoursPerYear: 10, laborRatePerHour: 20, miscCostPerYear: 15,
    });
    // 300/10 + 0 + 30 + 25 + 200 + 15 = 300
    expect(r.totalAnnualCost).toBe(300);
    expect(r.monthlyCost).toBe(25);
  });

  test('breakdown percentages sum to 100', () => {
    const r = calculateCostPerHive({
      equipmentCost: 300, equipmentLifeYears: 10, beeCost: 200,
      feedCostPerYear: 30, treatmentCostPerYear: 25,
      laborHoursPerYear: 10, laborRatePerHour: 20, miscCostPerYear: 15,
    });
    const totalPercent = r.breakdown.reduce((s, b) => s + b.percent, 0);
    expect(totalPercent).toBeCloseTo(100, 0);
  });

  test('zero equipment life years handled', () => {
    const r = calculateCostPerHive({
      equipmentCost: 300, equipmentLifeYears: 0, beeCost: 0,
      feedCostPerYear: 30, treatmentCostPerYear: 25,
      laborHoursPerYear: 0, laborRatePerHour: 0, miscCostPerYear: 0,
    });
    expect(r.annualEquipmentCost).toBe(0);
  });
});
