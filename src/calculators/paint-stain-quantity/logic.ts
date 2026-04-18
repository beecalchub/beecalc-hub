export interface Inputs { hiveCount: number; coatsPerSurface: number; surfaceType: 'paint' | 'stain'; boxCountPerHive: number; }
export interface Result { gallonsNeeded: number; costEstimate: number; coverageSqFt: number; }
export function calculate(i: Inputs): Result {
  const sqFtPerBox = 10;
  const coverage: Record<string, number> = { paint: 350, stain: 200 };
  const totalSqFt = i.hiveCount * i.boxCountPerHive * sqFtPerBox * i.coatsPerSurface;
  const gallons = Math.ceil(totalSqFt / coverage[i.surfaceType] * 10) / 10;
  const pricePerGallon: Record<string, number> = { paint: 45, stain: 35 };
  return { gallonsNeeded: gallons, costEstimate: Math.round(gallons * pricePerGallon[i.surfaceType] * 100) / 100, coverageSqFt: totalSqFt };
}
