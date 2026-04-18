export interface PlantingInputs { areaSqFt: number; budget: number; region: 'northern' | 'southern' | 'arid' | 'temperate'; goalBloom: 'spring' | 'summer' | 'fall' | 'all-season'; }
interface PlantRec { name: string; bloomTime: string; nectarValue: 'high' | 'medium'; seedLbsPer1000sqft: number; costPerLb: number; }
export interface PlantingResult { plants: Array<PlantRec & { area: number; seedNeeded: number; cost: number }>; totalSeedLbs: number; totalCost: number; coveragePercent: number; bloomCalendar: string; tip: string; }
const PLANTS: Record<string, PlantRec[]> = {
  'all-season': [
    { name: 'White Dutch Clover', bloomTime: 'May–Sep', nectarValue: 'high', seedLbsPer1000sqft: 0.25, costPerLb: 12 },
    { name: 'Buckwheat', bloomTime: 'Jul–Sep', nectarValue: 'high', seedLbsPer1000sqft: 2, costPerLb: 3 },
    { name: 'Phacelia', bloomTime: 'Jun–Aug', nectarValue: 'high', seedLbsPer1000sqft: 0.5, costPerLb: 25 },
    { name: 'Sunflower', bloomTime: 'Jul–Oct', nectarValue: 'medium', seedLbsPer1000sqft: 0.5, costPerLb: 5 },
    { name: 'Aster (native)', bloomTime: 'Aug–Oct', nectarValue: 'high', seedLbsPer1000sqft: 0.1, costPerLb: 40 },
  ],
  spring: [{ name: 'Crocus', bloomTime: 'Mar–Apr', nectarValue: 'medium', seedLbsPer1000sqft: 0.05, costPerLb: 60 }, { name: 'Dandelion (allow)', bloomTime: 'Apr–May', nectarValue: 'high', seedLbsPer1000sqft: 0, costPerLb: 0 }, { name: 'Fruit trees', bloomTime: 'Apr–May', nectarValue: 'high', seedLbsPer1000sqft: 0, costPerLb: 0 }],
  summer: [{ name: 'Lavender', bloomTime: 'Jun–Aug', nectarValue: 'high', seedLbsPer1000sqft: 0.1, costPerLb: 50 }, { name: 'Borage', bloomTime: 'Jun–Sep', nectarValue: 'high', seedLbsPer1000sqft: 0.5, costPerLb: 15 }, { name: 'Buckwheat', bloomTime: 'Jul–Sep', nectarValue: 'high', seedLbsPer1000sqft: 2, costPerLb: 3 }],
  fall: [{ name: 'Goldenrod (native)', bloomTime: 'Aug–Oct', nectarValue: 'high', seedLbsPer1000sqft: 0.05, costPerLb: 80 }, { name: 'Aster (native)', bloomTime: 'Aug–Oct', nectarValue: 'high', seedLbsPer1000sqft: 0.1, costPerLb: 40 }, { name: 'Sedum', bloomTime: 'Sep–Oct', nectarValue: 'medium', seedLbsPer1000sqft: 0.01, costPerLb: 100 }],
};
export function calculatePlanting(inputs: PlantingInputs): PlantingResult {
  const { areaSqFt, budget, goalBloom } = inputs;
  const selectedPlants = PLANTS[goalBloom] || PLANTS['all-season'];
  const perPlantArea = areaSqFt / selectedPlants.length;
  const plants = selectedPlants.map(p => {
    const seedNeeded = Math.round(p.seedLbsPer1000sqft * (perPlantArea / 1000) * 100) / 100;
    const cost = Math.round(seedNeeded * p.costPerLb * 100) / 100;
    return { ...p, area: Math.round(perPlantArea), seedNeeded, cost };
  });
  const totalCost = plants.reduce((s, p) => s + p.cost, 0);
  const totalSeedLbs = Math.round(plants.reduce((s, p) => s + p.seedNeeded, 0) * 100) / 100;
  const coveragePercent = budget > 0 && totalCost > 0 ? Math.min(100, Math.round((budget / totalCost) * 100)) : 100;
  const bloomCalendar = Array.from(new Set(plants.map(p => p.bloomTime))).join(', ');
  const tip = coveragePercent < 100 ? `Budget covers ~${coveragePercent}% of the planting. Prioritize high-nectar species like clover and buckwheat.` : 'Budget is sufficient. Consider adding diversity with native wildflower mixes.';
  return { plants, totalSeedLbs, totalCost: Math.round(totalCost * 100) / 100, coveragePercent, bloomCalendar, tip };
}
