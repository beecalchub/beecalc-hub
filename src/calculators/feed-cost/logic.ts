export interface FeedCostInputs {
  sugarPricePerLb: number;
  syrupRatio: '1:1' | '2:1';
  gallonsPerHive: number;
  hiveCount: number;
}

export interface FeedCostResult {
  sugarLbsPerGallon: number;
  totalSyrupGallons: number;
  totalSugarLbs: number;
  totalSugarKg: number;
  costPerHive: number;
  totalCost: number;
}

export function calculateFeedCost(inputs: FeedCostInputs): FeedCostResult {
  const { sugarPricePerLb, syrupRatio, gallonsPerHive, hiveCount } = inputs;

  // Sugar per gallon of syrup by ratio (by weight)
  // 1:1 syrup: ~8.35 lbs water per gallon, equal sugar = ~8.35 lbs sugar → but dissolved volume is less
  // Practical: 1:1 ≈ 5.3 lbs sugar/gal, 2:1 ≈ 10.6 lbs sugar/gal (standard reference values)
  const sugarLbsPerGallon = syrupRatio === '1:1' ? 5.3 : 10.6;

  const totalSyrupGallons = gallonsPerHive * hiveCount;
  const totalSugarLbs = Math.round(totalSyrupGallons * sugarLbsPerGallon * 10) / 10;
  const totalSugarKg = Math.round(totalSugarLbs * 0.453592 * 10) / 10;

  const totalCost = Math.round(totalSugarLbs * sugarPricePerLb * 100) / 100;
  const costPerHive = hiveCount > 0 ? Math.round((totalCost / hiveCount) * 100) / 100 : 0;

  return { sugarLbsPerGallon, totalSyrupGallons, totalSugarLbs, totalSugarKg, costPerHive, totalCost };
}
