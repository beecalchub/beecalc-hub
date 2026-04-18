export interface Inputs { population: number; broodQuality: 'excellent' | 'good' | 'fair' | 'poor'; stores: number; mitesPerHundred: number; diseaseSigns: boolean; }
export interface Result { index: number; grade: string; breakdown: Array<{ factor: string; score: number; max: number }>; verdict: string; }
export function calculate(i: Inputs): Result {
  const popScore = i.population >= 10 ? 25 : i.population >= 7 ? 18 : i.population >= 4 ? 10 : 3;
  const broodScore: Record<string, number> = { excellent: 25, good: 20, fair: 10, poor: 3 };
  const storesScore = i.stores >= 4 ? 20 : i.stores >= 2 ? 12 : 5;
  const miteScore = i.mitesPerHundred < 1 ? 20 : i.mitesPerHundred < 2 ? 15 : i.mitesPerHundred < 3 ? 8 : 0;
  const diseaseScore = i.diseaseSigns ? 0 : 10;
  const breakdown = [
    { factor: 'Population', score: popScore, max: 25 },
    { factor: 'Brood quality', score: broodScore[i.broodQuality], max: 25 },
    { factor: 'Food stores', score: storesScore, max: 20 },
    { factor: 'Mite management', score: miteScore, max: 20 },
    { factor: 'Disease-free', score: diseaseScore, max: 10 },
  ];
  const index = breakdown.reduce((s, b) => s + b.score, 0);
  const grade = index >= 85 ? 'A - Thriving' : index >= 70 ? 'B - Healthy' : index >= 55 ? 'C - Average' : index >= 40 ? 'D - Struggling' : 'F - Critical';
  const verdict = index >= 70 ? 'Strong, productive colony.' : index >= 50 ? 'Needs attention in some areas.' : 'Multiple issues - intervene quickly.';
  return { index, grade, breakdown, verdict };
}
