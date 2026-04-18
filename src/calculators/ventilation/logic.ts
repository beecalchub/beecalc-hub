export interface Inputs { hiveCount: number; climateType: 'humid' | 'moderate' | 'arid'; winterOrSummer: 'winter' | 'summer'; }
export interface Result { ventilationArea: number; method: string; recommendation: string; }
export function calculate(i: Inputs): Result {
  const baseArea = i.winterOrSummer === 'winter' ? 2 : 6;
  const humidMult: Record<string, number> = { humid: 1.5, moderate: 1.0, arid: 0.8 };
  const area = Math.round(baseArea * humidMult[i.climateType] * 10) / 10;
  const method = i.winterOrSummer === 'winter' ? 'Upper entrance + quilt box or moisture absorber' : 'Screened bottom board + top entrance + inner cover';
  const rec = i.climateType === 'humid' ? 'Extra ventilation critical - moisture kills more bees than cold.' : 'Standard ventilation adequate for your climate.';
  return { ventilationArea: area, method, recommendation: rec };
}
