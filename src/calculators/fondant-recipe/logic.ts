export interface FondantInputs {
  targetWeightLbs: number;
  recipe: 'standard' | 'no-cook' | 'cream';
}

export interface FondantResult {
  sugarLbs: number;
  sugarKg: number;
  waterCups: number;
  waterMl: number;
  vinegarTbsp: number;
  honeyCups: number;
  honeyMl: number;
  totalWeightLbs: number;
  totalWeightKg: number;
  servesHives: number;
  instructions: string[];
}

interface RecipeDef {
  label: string;
  sugarRatio: number;
  waterRatio: number;
  vinegarPerLb: number;
  honeyRatio: number;
  lbsPerHive: number;
  instructions: string[];
}

const RECIPES: Record<string, RecipeDef> = {
  standard: {
    label: 'Standard Cooked Fondant',
    sugarRatio: 0.83,
    waterRatio: 0.17,
    vinegarPerLb: 0.15,
    honeyRatio: 0,
    lbsPerHive: 2,
    instructions: [
      'Combine sugar and water in a heavy pot.',
      'Add vinegar (prevents crystallization).',
      'Heat to 234°F (112°C) - soft ball stage. Use a candy thermometer.',
      'Remove from heat, let cool to 200°F (93°C) without stirring.',
      'Beat vigorously until mixture turns white and thickens.',
      'Pour into molds or onto parchment paper before it sets.',
      'Store wrapped in plastic. Place directly on top bars.',
    ],
  },
  'no-cook': {
    label: 'No-Cook Sugar Board',
    sugarRatio: 0.94,
    waterRatio: 0.06,
    vinegarPerLb: 0.1,
    honeyRatio: 0,
    lbsPerHive: 4,
    instructions: [
      'Mix sugar with just enough water to make damp sand consistency.',
      'Add vinegar and mix thoroughly.',
      'Pack firmly into a mold (paper plate, rimmed frame, or shim).',
      'Let dry 24–48 hours until solid.',
      'Place directly on top bars over the cluster.',
    ],
  },
  cream: {
    label: 'Cream Fondant (with honey)',
    sugarRatio: 0.75,
    waterRatio: 0.15,
    vinegarPerLb: 0.1,
    honeyRatio: 0.10,
    lbsPerHive: 2,
    instructions: [
      'Combine sugar, water, and honey in a heavy pot.',
      'Add vinegar.',
      'Heat to 238°F (114°C) - soft ball stage.',
      'Cool to 200°F (93°C) without disturbing.',
      'Beat until white, creamy, and thick.',
      'Pour into molds. Bees take to this quickly due to honey content.',
    ],
  },
};

export function getRecipeOptions() {
  return Object.entries(RECIPES).map(([key, val]) => ({
    value: key,
    label: val.label,
  }));
}

export function calculateFondant(inputs: FondantInputs): FondantResult {
  const { targetWeightLbs, recipe } = inputs;
  const r = RECIPES[recipe];

  const sugarLbs = Math.round(targetWeightLbs * r.sugarRatio * 100) / 100;
  const waterLbs = targetWeightLbs * r.waterRatio;
  const waterCups = Math.round(waterLbs * 2 * 100) / 100; // ~2 cups per lb of water
  const waterMl = Math.round(waterLbs * 453.6);
  const vinegarTbsp = Math.round(targetWeightLbs * r.vinegarPerLb * 10) / 10;
  const honeyCups = Math.round(targetWeightLbs * r.honeyRatio * 2 * 100) / 100;
  const honeyMl = Math.round(targetWeightLbs * r.honeyRatio * 453.6);
  const sugarKg = Math.round(sugarLbs * 0.4536 * 100) / 100;
  const totalWeightKg = Math.round(targetWeightLbs * 0.4536 * 100) / 100;
  const servesHives = r.lbsPerHive > 0 ? Math.floor(targetWeightLbs / r.lbsPerHive) : 0;

  return {
    sugarLbs,
    sugarKg,
    waterCups,
    waterMl,
    vinegarTbsp,
    honeyCups,
    honeyMl,
    totalWeightLbs: targetWeightLbs,
    totalWeightKg,
    servesHives,
    instructions: r.instructions,
  };
}
