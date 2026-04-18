export interface OverwinteringInputs {
  framesOfBees: number;
  honeyStoresLbs: number;
  queenConfirmed: boolean;
  varroaTreated: boolean;
  miteLevelPercent: number;
  entranceReducerInstalled: boolean;
  ventilationAdequate: boolean;
  diseaseSignsObserved: boolean;
}

export interface OverwinteringResult {
  totalScore: number;
  maxScore: number;
  percent: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  verdict: string;
  breakdown: Array<{ category: string; score: number; max: number; note: string }>;
}

export function calculateOverwintering(inputs: OverwinteringInputs): OverwinteringResult {
  const breakdown: OverwinteringResult['breakdown'] = [];

  // Population (0-25)
  let popScore = 0;
  if (inputs.framesOfBees >= 8) popScore = 25;
  else if (inputs.framesOfBees >= 6) popScore = 20;
  else if (inputs.framesOfBees >= 4) popScore = 12;
  else popScore = 5;
  breakdown.push({ category: 'Population', score: popScore, max: 25, note: `${inputs.framesOfBees} frames of bees` });

  // Stores (0-25)
  let storeScore = 0;
  if (inputs.honeyStoresLbs >= 70) storeScore = 25;
  else if (inputs.honeyStoresLbs >= 50) storeScore = 20;
  else if (inputs.honeyStoresLbs >= 30) storeScore = 12;
  else storeScore = 5;
  breakdown.push({ category: 'Honey Stores', score: storeScore, max: 25, note: `${inputs.honeyStoresLbs} lbs` });

  // Queen (0-15)
  const queenScore = inputs.queenConfirmed ? 15 : 3;
  breakdown.push({ category: 'Queen Confirmed', score: queenScore, max: 15, note: inputs.queenConfirmed ? 'Yes' : 'Not confirmed' });

  // Varroa (0-20)
  let varroaScore = 0;
  if (inputs.varroaTreated && inputs.miteLevelPercent < 1) varroaScore = 20;
  else if (inputs.varroaTreated && inputs.miteLevelPercent < 2) varroaScore = 15;
  else if (inputs.varroaTreated) varroaScore = 10;
  else varroaScore = 2;
  breakdown.push({ category: 'Varroa Management', score: varroaScore, max: 20, note: inputs.varroaTreated ? `Treated, ${inputs.miteLevelPercent}%` : 'Not treated' });

  // Equipment (0-10)
  let equipScore = 0;
  if (inputs.entranceReducerInstalled) equipScore += 5;
  if (inputs.ventilationAdequate) equipScore += 5;
  breakdown.push({ category: 'Equipment', score: equipScore, max: 10, note: `Reducer: ${inputs.entranceReducerInstalled ? '✓' : '✗'} Vent: ${inputs.ventilationAdequate ? '✓' : '✗'}` });

  // Disease (0-5)
  const diseaseScore = inputs.diseaseSignsObserved ? 0 : 5;
  breakdown.push({ category: 'Disease Free', score: diseaseScore, max: 5, note: inputs.diseaseSignsObserved ? 'Signs observed' : 'No signs' });

  const totalScore = breakdown.reduce((s, b) => s + b.score, 0);
  const maxScore = 100;
  const percent = totalScore;

  let grade: OverwinteringResult['grade'];
  let verdict: string;
  if (percent >= 85) { grade = 'A'; verdict = 'Excellent winter prospects. Colony is well-prepared.'; }
  else if (percent >= 70) { grade = 'B'; verdict = 'Good shape overall. Address any weak areas if possible.'; }
  else if (percent >= 55) { grade = 'C'; verdict = 'Some concerns. Take action on low-scoring areas before winter.'; }
  else if (percent >= 40) { grade = 'D'; verdict = 'Significant risks. Colony may not survive without intervention.'; }
  else { grade = 'F'; verdict = 'Critical - combine with a stronger colony or take emergency measures.'; }

  return { totalScore, maxScore, percent, grade, verdict, breakdown };
}
