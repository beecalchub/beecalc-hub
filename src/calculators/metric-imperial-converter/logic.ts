export type ConversionCategory = 'weight' | 'volume' | 'length' | 'area' | 'temperature';

export interface ConverterInputs {
  category: ConversionCategory;
  value: number;
  direction: 'toMetric' | 'toImperial';
}

interface ConversionDef {
  imperialUnit: string;
  metricUnit: string;
  toMetric: (v: number) => number;
  toImperial: (v: number) => number;
}

const conversions: Record<ConversionCategory, ConversionDef[]> = {
  weight: [
    { imperialUnit: 'lbs', metricUnit: 'kg', toMetric: (v) => v * 0.453592, toImperial: (v) => v * 2.20462 },
    { imperialUnit: 'oz', metricUnit: 'g', toMetric: (v) => v * 28.3495, toImperial: (v) => v / 28.3495 },
  ],
  volume: [
    { imperialUnit: 'gallons', metricUnit: 'liters', toMetric: (v) => v * 3.78541, toImperial: (v) => v * 0.264172 },
    { imperialUnit: 'fl oz', metricUnit: 'ml', toMetric: (v) => v * 29.5735, toImperial: (v) => v / 29.5735 },
    { imperialUnit: 'cups', metricUnit: 'ml', toMetric: (v) => v * 236.588, toImperial: (v) => v / 236.588 },
  ],
  length: [
    { imperialUnit: 'inches', metricUnit: 'cm', toMetric: (v) => v * 2.54, toImperial: (v) => v / 2.54 },
    { imperialUnit: 'feet', metricUnit: 'm', toMetric: (v) => v * 0.3048, toImperial: (v) => v / 0.3048 },
    { imperialUnit: 'miles', metricUnit: 'km', toMetric: (v) => v * 1.60934, toImperial: (v) => v / 1.60934 },
  ],
  area: [
    { imperialUnit: 'acres', metricUnit: 'hectares', toMetric: (v) => v * 0.404686, toImperial: (v) => v * 2.47105 },
    { imperialUnit: 'sq ft', metricUnit: 'sq m', toMetric: (v) => v * 0.092903, toImperial: (v) => v / 0.092903 },
  ],
  temperature: [
    { imperialUnit: '°F', metricUnit: '°C', toMetric: (v) => (v - 32) * (5 / 9), toImperial: (v) => v * (9 / 5) + 32 },
  ],
};

export function getConversionsForCategory(category: ConversionCategory): ConversionDef[] {
  return conversions[category];
}

export interface ConversionResult {
  fromValue: number;
  fromUnit: string;
  toValue: number;
  toUnit: string;
}

export function convertAll(category: ConversionCategory, value: number, direction: 'toMetric' | 'toImperial'): ConversionResult[] {
  return conversions[category].map((conv) => {
    const toValue = direction === 'toMetric' ? conv.toMetric(value) : conv.toImperial(value);
    return {
      fromValue: value,
      fromUnit: direction === 'toMetric' ? conv.imperialUnit : conv.metricUnit,
      toValue: Math.round(toValue * 10000) / 10000,
      toUnit: direction === 'toMetric' ? conv.metricUnit : conv.imperialUnit,
    };
  });
}
