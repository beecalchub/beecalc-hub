export interface Inputs { cellBarsCount: number; graftsPerBar: number; acceptanceRate: number; harvestCycles: number; }
export interface Result { totalGrafts: number; acceptedCells: number; gramsPerHarvest: number; totalGramsSeason: number; estimatedValue: number; note: string; }
export function calculate(i: Inputs): Result {
  const totalGrafts = i.cellBarsCount * i.graftsPerBar;
  const acceptedCells = Math.round(totalGrafts * i.acceptanceRate / 100);
  const mgPerCell = 300;
  const gramsPerHarvest = Math.round(acceptedCells * mgPerCell / 1000 * 10) / 10;
  const totalGramsSeason = Math.round(gramsPerHarvest * i.harvestCycles * 10) / 10;
  const pricePerGram = 2.5;
  return { totalGrafts, acceptedCells, gramsPerHarvest, totalGramsSeason, estimatedValue: Math.round(totalGramsSeason * pricePerGram * 100) / 100, note: 'Royal jelly is labor-intensive. Requires grafting skill and strong queenless starter colonies.' };
}
