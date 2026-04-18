import { calculateBatchScaling } from '@/calculators/batch-scaling/logic';

describe('Batch Scaling', () => {
  test('doubling scales ingredients 2x', () => {
    const r = calculateBatchScaling({
      originalServings: 1,
      targetServings: 2,
      ingredients: [{ name: 'Sugar', amount: 5, unit: 'lbs' }, { name: 'Water', amount: 1, unit: 'gal' }],
    });
    expect(r.scaleFactor).toBe(2);
    expect(r.scaledIngredients[0].amount).toBe(10);
    expect(r.scaledIngredients[1].amount).toBe(2);
  });

  test('halving scales ingredients 0.5x', () => {
    const r = calculateBatchScaling({
      originalServings: 10,
      targetServings: 5,
      ingredients: [{ name: 'Flour', amount: 100, unit: 'g' }],
    });
    expect(r.scaleFactor).toBe(0.5);
    expect(r.scaledIngredients[0].amount).toBe(50);
  });

  test('same servings = scale factor 1', () => {
    const r = calculateBatchScaling({
      originalServings: 5,
      targetServings: 5,
      ingredients: [{ name: 'Salt', amount: 3, unit: 'tbsp' }],
    });
    expect(r.scaleFactor).toBe(1);
    expect(r.scaledIngredients[0].amount).toBe(3);
  });

  test('zero original servings defaults to 1x', () => {
    const r = calculateBatchScaling({
      originalServings: 0,
      targetServings: 5,
      ingredients: [{ name: 'Sugar', amount: 10, unit: 'lbs' }],
    });
    expect(r.scaleFactor).toBe(1);
  });
});
