export interface CappingsWaxInputs {
  honeyHarvestedLbs: number;
  extractionMethod: 'knife' | 'plane' | 'fork';
  renderingMethod: 'solar' | 'water-bath' | 'steam';
}

export interface CappingsWaxResult {
  rawCappingsLbs: number;
  rawCappingsKg: number;
  renderedWaxLbs: number;
  renderedWaxKg: number;
  renderedWaxOz: number;
  slumgumLbs: number;
  cappingsHoneyLbs: number;
  cappingsHoneyKg: number;
  waxValueEstimate: number;
  honeyValueEstimate: number;
}

// Cappings wax is typically 1-2% of total honey weight
const CAPPINGS_RATIO: Record<string, number> = {
  knife: 0.020, // most wax removed
  plane: 0.015,
  fork: 0.010, // least wax
};

const RENDERING_YIELD: Record<string, number> = {
  solar: 0.70,       // 70% of raw cappings becomes clean wax
  'water-bath': 0.80,
  steam: 0.85,
};

// Cappings are ~50% honey by weight
const HONEY_IN_CAPPINGS = 0.50;

export function calculateCappingsWax(inputs: CappingsWaxInputs): CappingsWaxResult {
  const { honeyHarvestedLbs, extractionMethod, renderingMethod } = inputs;

  const cappingsRatio = CAPPINGS_RATIO[extractionMethod];
  const renderingYield = RENDERING_YIELD[renderingMethod];

  const rawCappingsLbs = honeyHarvestedLbs * cappingsRatio;
  const cappingsHoneyLbs = rawCappingsLbs * HONEY_IN_CAPPINGS;
  const rawWaxLbs = rawCappingsLbs - cappingsHoneyLbs;
  const renderedWaxLbs = rawWaxLbs * renderingYield;
  const slumgumLbs = rawWaxLbs - renderedWaxLbs;

  // Beeswax ~$8-15/lb, cappings honey ~$8-12/lb
  const waxValueEstimate = renderedWaxLbs * 12;
  const honeyValueEstimate = cappingsHoneyLbs * 10;

  return {
    rawCappingsLbs: Math.round(rawCappingsLbs * 100) / 100,
    rawCappingsKg: Math.round(rawCappingsLbs * 0.4536 * 100) / 100,
    renderedWaxLbs: Math.round(renderedWaxLbs * 100) / 100,
    renderedWaxKg: Math.round(renderedWaxLbs * 0.4536 * 100) / 100,
    renderedWaxOz: Math.round(renderedWaxLbs * 16 * 10) / 10,
    slumgumLbs: Math.round(slumgumLbs * 100) / 100,
    cappingsHoneyLbs: Math.round(cappingsHoneyLbs * 100) / 100,
    cappingsHoneyKg: Math.round(cappingsHoneyLbs * 0.4536 * 100) / 100,
    waxValueEstimate: Math.round(waxValueEstimate * 100) / 100,
    honeyValueEstimate: Math.round(honeyValueEstimate * 100) / 100,
  };
}
