export interface BatchIngredient {
  name: string;
  amount: number;
  unit: string;
}

export interface BatchScalingInputs {
  originalServings: number;
  targetServings: number;
  ingredients: BatchIngredient[];
}

export interface BatchScalingResult {
  scaleFactor: number;
  scaledIngredients: BatchIngredient[];
}

export function calculateBatchScaling(inputs: BatchScalingInputs): BatchScalingResult {
  const { originalServings, targetServings, ingredients } = inputs;
  const scaleFactor = originalServings > 0 ? targetServings / originalServings : 1;

  const scaledIngredients = ingredients.map((ing) => ({
    ...ing,
    amount: Math.round(ing.amount * scaleFactor * 1000) / 1000,
  }));

  return { scaleFactor: Math.round(scaleFactor * 1000) / 1000, scaledIngredients };
}

export const EXAMPLE_RECIPES: Record<string, { name: string; servings: number; ingredients: BatchIngredient[] }> = {
  'sugar-syrup-1gal': {
    name: '1:1 Sugar Syrup (1 gallon)',
    servings: 1,
    ingredients: [
      { name: 'White sugar', amount: 5.3, unit: 'lbs' },
      { name: 'Water', amount: 0.63, unit: 'gal' },
    ],
  },
  'pollen-patty': {
    name: 'Pollen Patty (10 patties)',
    servings: 10,
    ingredients: [
      { name: 'Pollen substitute', amount: 4, unit: 'lbs' },
      { name: 'Sugar', amount: 6, unit: 'lbs' },
      { name: 'Water', amount: 2, unit: 'cups' },
      { name: 'Honey', amount: 1, unit: 'cup' },
    ],
  },
  'fondant': {
    name: 'Fondant (5 lbs)',
    servings: 1,
    ingredients: [
      { name: 'White sugar', amount: 5, unit: 'lbs' },
      { name: 'Water', amount: 1, unit: 'cup' },
      { name: 'White vinegar', amount: 1, unit: 'tbsp' },
    ],
  },
};
