export interface HiveStrengthInputs {
  framesOfBees: number;
  framesOfBrood: number;
  queenSeen: boolean;
  queenAge: 'new' | '1-year' | '2-year' | 'unknown';
  temperament: 'calm' | 'moderate' | 'aggressive';
  diseasePresent: boolean;
  framesOfHoney: number;
}

export interface HiveStrengthResult {
  totalScore: number;
  maxScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  gradeLabel: string;
  pollinationReady: boolean;
  pollinationMessage: string;
  breakdown: Array<{ category: string; score: number; max: number; note: string }>;
}

export function calculateHiveStrength(inputs: HiveStrengthInputs): HiveStrengthResult {
  const breakdown: HiveStrengthResult['breakdown'] = [];

  // Population (0–30)
  let popScore = 0;
  if (inputs.framesOfBees >= 10) popScore = 30;
  else if (inputs.framesOfBees >= 8) popScore = 25;
  else if (inputs.framesOfBees >= 6) popScore = 18;
  else if (inputs.framesOfBees >= 4) popScore = 10;
  else popScore = 3;
  breakdown.push({ category: 'Population', score: popScore, max: 30, note: `${inputs.framesOfBees} frames` });

  // Brood (0–25)
  let broodScore = 0;
  if (inputs.framesOfBrood >= 6) broodScore = 25;
  else if (inputs.framesOfBrood >= 4) broodScore = 20;
  else if (inputs.framesOfBrood >= 2) broodScore = 12;
  else broodScore = 4;
  breakdown.push({ category: 'Brood', score: broodScore, max: 25, note: `${inputs.framesOfBrood} frames` });

  // Queen (0–20)
  let queenScore = inputs.queenSeen ? 10 : 3;
  if (inputs.queenAge === 'new' || inputs.queenAge === '1-year') queenScore += 10;
  else if (inputs.queenAge === '2-year') queenScore += 5;
  else queenScore += 2;
  breakdown.push({ category: 'Queen Status', score: queenScore, max: 20, note: `${inputs.queenSeen ? 'Seen' : 'Not seen'}, ${inputs.queenAge}` });

  // Temperament (0–10)
  const tempScore = inputs.temperament === 'calm' ? 10 : inputs.temperament === 'moderate' ? 6 : 2;
  breakdown.push({ category: 'Temperament', score: tempScore, max: 10, note: inputs.temperament });

  // Health (0–10)
  const healthScore = inputs.diseasePresent ? 0 : 10;
  breakdown.push({ category: 'Disease Free', score: healthScore, max: 10, note: inputs.diseasePresent ? 'Disease present' : 'No disease' });

  // Stores (0–5)
  const storesScore = inputs.framesOfHoney >= 2 ? 5 : inputs.framesOfHoney >= 1 ? 3 : 0;
  breakdown.push({ category: 'Stores', score: storesScore, max: 5, note: `${inputs.framesOfHoney} frames honey` });

  const totalScore = breakdown.reduce((s, b) => s + b.score, 0);

  let grade: HiveStrengthResult['grade'];
  let gradeLabel: string;
  if (totalScore >= 85) { grade = 'A'; gradeLabel = 'Premium strength - top-tier pollination colony'; }
  else if (totalScore >= 70) { grade = 'B'; gradeLabel = 'Good strength - meets most pollination contracts'; }
  else if (totalScore >= 55) { grade = 'C'; gradeLabel = 'Adequate - may not meet premium contract standards'; }
  else if (totalScore >= 40) { grade = 'D'; gradeLabel = 'Below standard - not suitable for pollination'; }
  else { grade = 'F'; gradeLabel = 'Weak - needs intervention or combining'; }

  // Most pollination contracts require 6–8+ frames of bees
  const pollinationReady = totalScore >= 70 && inputs.framesOfBees >= 8 && !inputs.diseasePresent;
  const pollinationMessage = pollinationReady
    ? 'This colony meets typical pollination contract strength requirements.'
    : 'This colony does not currently meet standard pollination contract requirements. Build population and address any health issues.';

  return { totalScore, maxScore: 100, grade, gradeLabel, pollinationReady, pollinationMessage, breakdown };
}
