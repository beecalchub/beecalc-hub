// Automatic imperial -> metric display conversion for calculators that only work in imperial units.
// Calculators keep computing in imperial; shared inputs/results convert what the user sees and types.

export interface AutoUnit {
  unit: string; // metric unit label shown instead
  toMetric: (v: number) => number;
  toImperial: (v: number) => number;
  decimals: number; // rounding for input fields
}

const lin = (unit: string, factor: number, decimals = 2): AutoUnit => ({
  unit,
  toMetric: (v) => v * factor,
  toImperial: (v) => v / factor,
  decimals,
});

const LB = 0.453592;
const GAL = 3.78541;
const MI = 1.60934;

const TABLE: Record<string, AutoUnit> = {
  lbs: lin('kg', LB),
  lb: lin('kg', LB),
  'lbs/day': lin('kg/day', LB),
  oz: lin('g', 28.3495, 1),
  'oz each': lin('g each', 28.3495, 0),
  'fl oz': lin('ml', 29.5735, 0),
  'gallon container': lin('liter container', GAL, 0),
  gal: lin('L', GAL),
  gallons: lin('liters', GAL),
  in: lin('cm', 2.54, 1),
  inches: lin('cm', 2.54, 1),
  ft: lin('m', 0.3048),
  'linear ft': lin('linear m', 0.3048),
  'ft downwind': lin('m downwind', 0.3048, 1),
  'sq ft': lin('m²', 0.092903),
  'ft²': lin('m²', 0.092903),
  'sq in': lin('cm²', 6.4516, 1),
  'in²': lin('cm²', 6.4516, 1),
  'in³': lin('cm³', 16.3871, 0),
  'cu ft': lin('m³', 0.0283168),
  mi: lin('km', MI, 1),
  miles: lin('km', MI, 1),
  'miles (one-way)': lin('km (one-way)', MI, 1),
  mph: lin('km/h', MI, 1),
  acres: lin('hectares', 0.404686),
  'acres/colony': lin('ha/colony', 0.404686),
  '$/lb': lin('$/kg', 1 / LB),
  '$/gal': lin('$/L', 1 / GAL),
  '$/mile': lin('$/km', 1 / MI),
  'lbs/gal': lin('kg/L', LB / GAL, 3),
  '°F': {
    unit: '°C',
    toMetric: (f) => (f - 32) * (5 / 9),
    toImperial: (c) => c * (9 / 5) + 32,
    decimals: 1,
  },
};

export function metricOf(unit: string | undefined): AutoUnit | null {
  if (!unit) return null;
  return TABLE[unit.trim()] ?? null;
}

export function roundTo(v: number, decimals: number): number {
  const f = Math.pow(10, decimals);
  return Math.round(v * f) / f;
}

function formatConverted(n: number, originalDecimals: number): string {
  const abs = Math.abs(n);
  // keep at least the original precision; add a decimal for small values so nothing collapses to 0
  const decimals = Math.max(originalDecimals, abs < 10 ? 2 : abs < 100 ? 1 : 0);
  return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

const NUM = /-?\d[\d,]*(?:\.\d+)?/g;

// Convert a displayed result value (number, "1,234.5", "$3.20", "40–60") from imperial to metric.
export function convertDisplayValue(value: string | number, conv: AutoUnit): string | number | null {
  if (typeof value === 'number') {
    if (!isFinite(value)) return null;
    return formatConverted(conv.toMetric(value), (String(value).split('.')[1] || '').length);
  }
  const s = value.trim();
  if (!/^[~≈$<>≤≥]*\s?-?\d[\d,]*(?:\.\d+)?(?:\s?[–-]\s?\d[\d,]*(?:\.\d+)?)?$/.test(s)) return null;
  return s.replace(NUM, (m) => {
    const n = parseFloat(m.replace(/,/g, ''));
    if (isNaN(n)) return m;
    return formatConverted(conv.toMetric(n), (m.split('.')[1] || '').length);
  });
}

// "12.5 lbs" style strings where the unit is part of the value text
export function convertValueWithUnit(value: string): string | null {
  const m = /^([~≈<>≤≥]*\s?-?\d[\d,]*(?:\.\d+)?(?:\s?[–-]\s?\d[\d,]*(?:\.\d+)?)?)\s+([^\d\s].*)$/.exec(value.trim());
  if (!m) return null;
  const conv = metricOf(m[2]);
  if (!conv) return null;
  const converted = convertDisplayValue(m[1], conv);
  return converted === null ? null : `${converted} ${conv.unit}`;
}
