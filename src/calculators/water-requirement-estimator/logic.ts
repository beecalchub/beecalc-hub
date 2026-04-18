export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface WaterInputs {
  hiveCount: number;
  season: Season;
  averageTempF: number;
  nearestWaterSourceFt: number;
}

export interface WaterResult {
  litersPerHivePerDay: number;
  gallonsPerHivePerDay: number;
  totalLitersPerDay: number;
  totalGallonsPerDay: number;
  totalLitersPerWeek: number;
  totalGallonsPerWeek: number;
  needsSupplementalWater: boolean;
  recommendation: string;
  containerSizeGallons: number;
  refillFrequencyDays: number;
}

// Bees need roughly 1 quart (0.95L) per hive per day in summer, less in cool weather
const WATER_BASE_LITERS_PER_DAY = 0.95;

const SEASON_MULTIPLIERS: Record<Season, number> = {
  spring: 0.6,
  summer: 1.0,
  fall: 0.4,
  winter: 0.1,
};

export function calculateWaterRequirement(inputs: WaterInputs): WaterResult {
  const { hiveCount, season, averageTempF, nearestWaterSourceFt } = inputs;

  const seasonMult = SEASON_MULTIPLIERS[season];
  // Temperature adjustment: above 90°F increases water need
  const tempMult = averageTempF > 100 ? 1.5 : averageTempF > 90 ? 1.3 : averageTempF > 80 ? 1.1 : 1.0;

  const litersPerHivePerDay = Math.round(WATER_BASE_LITERS_PER_DAY * seasonMult * tempMult * 100) / 100;
  const gallonsPerHivePerDay = Math.round(litersPerHivePerDay * 0.264172 * 1000) / 1000;

  const totalLitersPerDay = Math.round(litersPerHivePerDay * hiveCount * 100) / 100;
  const totalGallonsPerDay = Math.round(gallonsPerHivePerDay * hiveCount * 100) / 100;
  const totalLitersPerWeek = Math.round(totalLitersPerDay * 7 * 10) / 10;
  const totalGallonsPerWeek = Math.round(totalGallonsPerDay * 7 * 10) / 10;

  // Bees typically forage for water within 200m (~650ft)
  const needsSupplementalWater = nearestWaterSourceFt > 500;

  let recommendation: string;
  if (!needsSupplementalWater && season === 'winter') {
    recommendation = 'Water needs are minimal in winter. Natural moisture is usually sufficient.';
  } else if (!needsSupplementalWater) {
    recommendation = 'A natural water source is nearby. Still helpful to provide a clean, consistent source close to hives to keep bees from bothering neighbors.';
  } else if (hiveCount <= 5) {
    recommendation = 'No reliable water source nearby. Set up a water station with a shallow basin, pebbles or corks for landing, and refill regularly.';
  } else {
    recommendation = 'Significant water demand with no nearby source. Consider a float-valve watering system or livestock waterer to ensure consistent supply.';
  }

  // Suggest a practical container size
  const containerSizeGallons = totalGallonsPerDay <= 1 ? 5 : totalGallonsPerDay <= 3 ? 10 : totalGallonsPerDay <= 8 ? 20 : 55;
  const refillFrequencyDays = totalGallonsPerDay > 0 ? Math.max(1, Math.floor(containerSizeGallons / totalGallonsPerDay)) : 7;

  return {
    litersPerHivePerDay,
    gallonsPerHivePerDay,
    totalLitersPerDay,
    totalGallonsPerDay,
    totalLitersPerWeek,
    totalGallonsPerWeek,
    needsSupplementalWater,
    recommendation,
    containerSizeGallons,
    refillFrequencyDays,
  };
}
