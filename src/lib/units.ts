import type { UnitSystem, UnitCategory, UnitConversion } from '@/types/units';

export const unitConversions: Record<UnitCategory, UnitConversion> = {
  weight: {
    toMetric: (lbs: number) => lbs * 0.453592,
    toImperial: (kg: number) => kg * 2.20462,
    labels: { metric: 'kg', imperial: 'lbs' },
  },
  volume: {
    toMetric: (gal: number) => gal * 3.78541,
    toImperial: (l: number) => l * 0.264172,
    labels: { metric: 'L', imperial: 'gal' },
  },
  length: {
    toMetric: (inches: number) => inches * 2.54,
    toImperial: (cm: number) => cm / 2.54,
    labels: { metric: 'cm', imperial: 'in' },
  },
  area: {
    toMetric: (acres: number) => acres * 0.404686,
    toImperial: (ha: number) => ha * 2.47105,
    labels: { metric: 'ha', imperial: 'acres' },
  },
  temperature: {
    toMetric: (f: number) => (f - 32) * (5 / 9),
    toImperial: (c: number) => c * (9 / 5) + 32,
    labels: { metric: '°C', imperial: '°F' },
  },
};

// Convenience functions
export function convertWeight(value: number, from: UnitSystem, to: UnitSystem): number {
  if (from === to) return value;
  return from === 'imperial'
    ? unitConversions.weight.toMetric(value)
    : unitConversions.weight.toImperial(value);
}

export function convertVolume(value: number, from: UnitSystem, to: UnitSystem): number {
  if (from === to) return value;
  return from === 'imperial'
    ? unitConversions.volume.toMetric(value)
    : unitConversions.volume.toImperial(value);
}

export function convertLength(value: number, from: UnitSystem, to: UnitSystem): number {
  if (from === to) return value;
  return from === 'imperial'
    ? unitConversions.length.toMetric(value)
    : unitConversions.length.toImperial(value);
}

export function convertArea(value: number, from: UnitSystem, to: UnitSystem): number {
  if (from === to) return value;
  return from === 'imperial'
    ? unitConversions.area.toMetric(value)
    : unitConversions.area.toImperial(value);
}

export function convertTemperature(value: number, from: UnitSystem, to: UnitSystem): number {
  if (from === to) return value;
  return from === 'imperial'
    ? unitConversions.temperature.toMetric(value)
    : unitConversions.temperature.toImperial(value);
}

export function getUnitLabel(category: UnitCategory, system: UnitSystem): string {
  return unitConversions[category].labels[system];
}

// Additional beekeeping-specific conversions
export function lbsToKg(lbs: number): number {
  return lbs * 0.453592;
}

export function kgToLbs(kg: number): number {
  return kg * 2.20462;
}

export function gallonsToLiters(gal: number): number {
  return gal * 3.78541;
}

export function litersToGallons(l: number): number {
  return l * 0.264172;
}

export function ouncesToGrams(oz: number): number {
  return oz * 28.3495;
}

export function gramsToOunces(g: number): number {
  return g / 28.3495;
}

export function acresToHectares(acres: number): number {
  return acres * 0.404686;
}

export function hectaresToAcres(ha: number): number {
  return ha * 2.47105;
}

export function milesToKm(miles: number): number {
  return miles * 1.60934;
}

export function kmToMiles(km: number): number {
  return km / 1.60934;
}

export function sqMilesToSqKm(sqMiles: number): number {
  return sqMiles * 2.58999;
}

export function sqKmToSqMiles(sqKm: number): number {
  return sqKm / 2.58999;
}

export function flOzToMl(flOz: number): number {
  return flOz * 29.5735;
}

export function mlToFlOz(ml: number): number {
  return ml / 29.5735;
}

export function cupsToMl(cups: number): number {
  return cups * 236.588;
}

export function mlToCups(ml: number): number {
  return ml / 236.588;
}
