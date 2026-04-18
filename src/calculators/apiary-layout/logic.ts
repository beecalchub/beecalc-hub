export interface Inputs { hiveCount: number; arrangement: 'row' | 'horseshoe' | 'cluster' | 'pairs'; spaceBetweenFt: number; }
export interface Result { totalLengthFt: number; totalAreaSqFt: number; configuration: string; note: string; }
export function calculate(i: Inputs): Result {
  if (i.arrangement === 'row') {
    return { totalLengthFt: i.hiveCount * i.spaceBetweenFt, totalAreaSqFt: i.hiveCount * i.spaceBetweenFt * 10, configuration: 'Single row', note: 'Good for easy access but bees may drift.' };
  }
  if (i.arrangement === 'pairs') {
    return { totalLengthFt: Math.ceil(i.hiveCount / 2) * i.spaceBetweenFt, totalAreaSqFt: Math.ceil(i.hiveCount / 2) * i.spaceBetweenFt * 15, configuration: 'Paired hives', note: 'Pairs reduce drift and save space.' };
  }
  if (i.arrangement === 'horseshoe') {
    const side = Math.ceil(Math.sqrt(i.hiveCount));
    return { totalLengthFt: side * i.spaceBetweenFt, totalAreaSqFt: side * i.spaceBetweenFt * side * i.spaceBetweenFt, configuration: 'U-shape / horseshoe', note: 'Horseshoe protects from wind and looks tidy.' };
  }
  return { totalLengthFt: 0, totalAreaSqFt: i.hiveCount * 25, configuration: 'Cluster', note: 'Cluster arrangement requires most space per hive.' };
}
