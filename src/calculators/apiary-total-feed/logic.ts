export interface ApiaryFeedInputs {
  hives: Array<{
    id: number;
    label: string;
    storesDeficitLbs: number;
    needsFeeding: boolean;
  }>;
  syrupRatio: '1:1' | '2:1';
  sugarPricePerLb: number;
}

export interface ApiaryFeedResult {
  hivesNeedingFeed: number;
  totalDeficitLbs: number;
  totalDeficitKg: number;
  totalSyrupGallons: number;
  totalSyrupLiters: number;
  totalSugarLbs: number;
  totalSugarKg: number;
  totalCost: number;
  costPerHive: number;
}

export function calculateApiaryFeed(inputs: ApiaryFeedInputs): ApiaryFeedResult {
  const { hives, syrupRatio, sugarPricePerLb } = inputs;

  const feedingHives = hives.filter((h) => h.needsFeeding);
  const totalDeficitLbs = feedingHives.reduce((s, h) => s + Math.max(0, h.storesDeficitLbs), 0);

  // lbs sugar per gallon of syrup
  const sugarPerGallon = syrupRatio === '1:1' ? 5.3 : 10.6;
  // Conversion: ~80% of syrup weight converts to stored honey equivalent
  const conversionEfficiency = 0.8;

  const totalSyrupGallons = totalDeficitLbs > 0
    ? Math.ceil(totalDeficitLbs / (sugarPerGallon * conversionEfficiency))
    : 0;
  const totalSugarLbs = Math.round(totalSyrupGallons * sugarPerGallon * 10) / 10;
  const totalCost = Math.round(totalSugarLbs * sugarPricePerLb * 100) / 100;

  return {
    hivesNeedingFeed: feedingHives.length,
    totalDeficitLbs: Math.round(totalDeficitLbs * 10) / 10,
    totalDeficitKg: Math.round(totalDeficitLbs * 0.4536 * 10) / 10,
    totalSyrupGallons,
    totalSyrupLiters: Math.round(totalSyrupGallons * 3.7854 * 10) / 10,
    totalSugarLbs,
    totalSugarKg: Math.round(totalSugarLbs * 0.4536 * 10) / 10,
    totalCost,
    costPerHive: feedingHives.length > 0 ? Math.round((totalCost / feedingHives.length) * 100) / 100 : 0,
  };
}

export function createDefaultHives(count: number): ApiaryFeedInputs['hives'] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    label: `Hive ${i + 1}`,
    storesDeficitLbs: 20,
    needsFeeding: true,
  }));
}
