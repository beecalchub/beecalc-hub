import { lbsToKg, kgToLbs, gallonsToLiters, litersToGallons, acresToHectares, hectaresToAcres, milesToKm, kmToMiles, convertWeight, convertTemperature } from '@/lib/units';

describe('Unit conversions', () => {
  test('lbs to kg', () => {
    expect(lbsToKg(1)).toBeCloseTo(0.4536, 3);
    expect(lbsToKg(10)).toBeCloseTo(4.5359, 3);
    expect(lbsToKg(0)).toBe(0);
  });

  test('kg to lbs', () => {
    expect(kgToLbs(1)).toBeCloseTo(2.2046, 3);
    expect(kgToLbs(10)).toBeCloseTo(22.046, 2);
  });

  test('gallons to liters', () => {
    expect(gallonsToLiters(1)).toBeCloseTo(3.7854, 3);
    expect(gallonsToLiters(5)).toBeCloseTo(18.927, 2);
  });

  test('liters to gallons', () => {
    expect(litersToGallons(1)).toBeCloseTo(0.2642, 3);
    expect(litersToGallons(3.78541)).toBeCloseTo(1, 3);
  });

  test('acres to hectares', () => {
    expect(acresToHectares(1)).toBeCloseTo(0.4047, 3);
    expect(acresToHectares(640)).toBeCloseTo(259, 0);
  });

  test('hectares to acres', () => {
    expect(hectaresToAcres(1)).toBeCloseTo(2.471, 2);
  });

  test('miles to km', () => {
    expect(milesToKm(1)).toBeCloseTo(1.6093, 3);
    expect(milesToKm(3)).toBeCloseTo(4.828, 2);
  });

  test('km to miles', () => {
    expect(kmToMiles(1.60934)).toBeCloseTo(1, 3);
  });

  test('convertWeight same system returns same value', () => {
    expect(convertWeight(10, 'imperial', 'imperial')).toBe(10);
    expect(convertWeight(10, 'metric', 'metric')).toBe(10);
  });

  test('convertWeight imperial to metric', () => {
    expect(convertWeight(10, 'imperial', 'metric')).toBeCloseTo(4.536, 2);
  });

  test('convertTemperature F to C', () => {
    expect(convertTemperature(32, 'imperial', 'metric')).toBeCloseTo(0, 1);
    expect(convertTemperature(212, 'imperial', 'metric')).toBeCloseTo(100, 1);
  });

  test('convertTemperature C to F', () => {
    expect(convertTemperature(0, 'metric', 'imperial')).toBeCloseTo(32, 1);
    expect(convertTemperature(100, 'metric', 'imperial')).toBeCloseTo(212, 1);
  });

  test('round-trip conversions are consistent', () => {
    const original = 50;
    const kg = lbsToKg(original);
    const backToLbs = kgToLbs(kg);
    expect(backToLbs).toBeCloseTo(original, 2);
  });
});
