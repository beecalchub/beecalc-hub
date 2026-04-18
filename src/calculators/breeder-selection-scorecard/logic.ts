export interface Inputs { honeyProduction: number; temperament: number; mitetolerance: number; overwintering: number; buildup: number; }
export interface Result { score: number; grade: string; breederWorthy: boolean; recommendation: string; }
export function calculate(i: Inputs): Result {
  const score = i.honeyProduction * 4 + i.temperament * 4 + i.mitetolerance * 5 + i.overwintering * 4 + i.buildup * 3;
  const grade = score >= 85 ? 'A - Exceptional breeder' : score >= 70 ? 'B - Good breeder candidate' : score >= 55 ? 'C - Average' : 'D - Not recommended';
  const worthy = score >= 70;
  const rec = worthy ? 'Graft from this queen. Reserve drone colonies nearby.' : 'Not recommended as breeder. Use for production only.';
  return { score, grade, breederWorthy: worthy, recommendation: rec };
}
