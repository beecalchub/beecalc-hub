export interface PollenPattyInputs {
  pattyCount: number;
  pattyWeightOz: number;
  proteinPercent: number;
  recipe: 'standard' | 'high-protein' | 'budget';
}

export interface PollenPattyResult {
  pollenSubLbs: number;
  pollenSubKg: number;
  sugarLbs: number;
  sugarKg: number;
  waterCups: number;
  waterMl: number;
  honeyOrSyrupCups: number;
  honeyOrSyrupMl: number;
  totalWeightLbs: number;
  totalWeightKg: number;
  costEstimate: number;
  proteinContentPercent: number;
}

interface RecipeDef {
  pollenSubRatio: number;
  sugarRatio: number;
  waterRatio: number;
  honeyRatio: number;
  proteinPercent: number;
  costPerLb: number;
}

const RECIPES: Record<string, RecipeDef> = {
  standard: {
    pollenSubRatio: 0.35,
    sugarRatio: 0.45,
    waterRatio: 0.10,
    honeyRatio: 0.10,
    proteinPercent: 15,
    costPerLb: 2.5,
  },
  'high-protein': {
    pollenSubRatio: 0.50,
    sugarRatio: 0.30,
    waterRatio: 0.10,
    honeyRatio: 0.10,
    proteinPercent: 22,
    costPerLb: 3.5,
  },
  budget: {
    pollenSubRatio: 0.25,
    sugarRatio: 0.55,
    waterRatio: 0.12,
    honeyRatio: 0.08,
    proteinPercent: 10,
    costPerLb: 1.8,
  },
};

export function calculatePollenPatty(inputs: PollenPattyInputs): PollenPattyResult {
  const { pattyCount, pattyWeightOz, recipe } = inputs;
  const r = RECIPES[recipe];

  const totalWeightOz = pattyCount * pattyWeightOz;
  const totalWeightLbs = totalWeightOz / 16;

  const pollenSubLbs = Math.round(totalWeightLbs * r.pollenSubRatio * 100) / 100;
  const sugarLbs = Math.round(totalWeightLbs * r.sugarRatio * 100) / 100;
  const waterLbs = totalWeightLbs * r.waterRatio;
  const honeyLbs = totalWeightLbs * r.honeyRatio;

  const waterCups = Math.round(waterLbs * 2 * 10) / 10;
  const honeyOrSyrupCups = Math.round(honeyLbs * 2 * 10) / 10;

  return {
    pollenSubLbs,
    pollenSubKg: Math.round(pollenSubLbs * 0.4536 * 100) / 100,
    sugarLbs,
    sugarKg: Math.round(sugarLbs * 0.4536 * 100) / 100,
    waterCups,
    waterMl: Math.round(waterCups * 236.6),
    honeyOrSyrupCups,
    honeyOrSyrupMl: Math.round(honeyOrSyrupCups * 236.6),
    totalWeightLbs: Math.round(totalWeightLbs * 100) / 100,
    totalWeightKg: Math.round(totalWeightLbs * 0.4536 * 100) / 100,
    costEstimate: Math.round(totalWeightLbs * r.costPerLb * 100) / 100,
    proteinContentPercent: r.proteinPercent,
  };
}
