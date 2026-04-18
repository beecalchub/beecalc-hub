export interface InspectionInputs {
  queenSeen: boolean; eggsPresent: boolean; broodPattern: 'solid' | 'spotty' | 'none';
  framesOfBees: number; temperament: 'calm' | 'moderate' | 'defensive';
  honeyStoresFrames: number; diseaseSymptoms: boolean; queenCells: 'none' | 'supersedure' | 'swarm';
  pestsSeen: boolean; orientation: string;
}
export interface InspectionResult {
  totalScore: number; grade: string; gradeLabel: string;
  breakdown: Array<{ factor: string; score: number; max: number; note: string }>;
  alerts: string[]; actions: string[];
}
export function calculateInspectionScore(inputs: InspectionInputs): InspectionResult {
  const breakdown: InspectionResult['breakdown'] = [];
  const alerts: string[] = [];
  const actions: string[] = [];

  let queenScore = 0;
  if (inputs.queenSeen && inputs.eggsPresent) queenScore = 20;
  else if (inputs.eggsPresent) queenScore = 15;
  else if (inputs.queenSeen) queenScore = 12;
  else { queenScore = 3; alerts.push('No queen or eggs found - verify queenrightness next inspection.'); }
  breakdown.push({ factor: 'Queen Status', score: queenScore, max: 20, note: inputs.queenSeen ? (inputs.eggsPresent ? 'Queen seen + eggs' : 'Queen seen, no eggs') : (inputs.eggsPresent ? 'Eggs present' : 'Neither found') });

  const broodScore = inputs.broodPattern === 'solid' ? 20 : inputs.broodPattern === 'spotty' ? 10 : 0;
  if (inputs.broodPattern === 'spotty') alerts.push('Spotty brood pattern - could indicate poor queen, disease, or inbreeding.');
  if (inputs.broodPattern === 'none') alerts.push('No brood present - colony may be queenless or in winter cluster.');
  breakdown.push({ factor: 'Brood Pattern', score: broodScore, max: 20, note: inputs.broodPattern });

  const popScore = inputs.framesOfBees >= 10 ? 20 : inputs.framesOfBees >= 7 ? 15 : inputs.framesOfBees >= 4 ? 8 : 3;
  breakdown.push({ factor: 'Population', score: popScore, max: 20, note: `${inputs.framesOfBees} frames` });

  const tempScore = inputs.temperament === 'calm' ? 10 : inputs.temperament === 'moderate' ? 6 : 2;
  if (inputs.temperament === 'defensive') actions.push('Consider requeening with gentle stock.');
  breakdown.push({ factor: 'Temperament', score: tempScore, max: 10, note: inputs.temperament });

  const storesScore = inputs.honeyStoresFrames >= 4 ? 15 : inputs.honeyStoresFrames >= 2 ? 10 : inputs.honeyStoresFrames >= 1 ? 5 : 0;
  if (inputs.honeyStoresFrames < 2) actions.push('Feed 1:1 or 2:1 syrup to build stores.');
  breakdown.push({ factor: 'Stores', score: storesScore, max: 15, note: `${inputs.honeyStoresFrames} frames` });

  let healthScore = 15;
  if (inputs.diseaseSymptoms) { healthScore = 0; alerts.push('Disease symptoms observed - identify and treat immediately.'); }
  if (inputs.pestsSeen) { healthScore = Math.max(0, healthScore - 8); alerts.push('Pests observed - check for SHB, wax moth, or mites.'); }
  breakdown.push({ factor: 'Health', score: healthScore, max: 15, note: inputs.diseaseSymptoms ? 'Disease' : inputs.pestsSeen ? 'Pests' : 'Healthy' });

  if (inputs.queenCells === 'swarm') { alerts.push('Swarm cells found - colony preparing to swarm.'); actions.push('Make a split or remove queen cells if you want to prevent swarming.'); }
  if (inputs.queenCells === 'supersedure') actions.push('Supersedure cells - bees replacing their queen. Monitor but do not disturb.');

  const totalScore = breakdown.reduce((s, b) => s + b.score, 0);
  let grade: string, gradeLabel: string;
  if (totalScore >= 85) { grade = 'A'; gradeLabel = 'Excellent - thriving colony'; }
  else if (totalScore >= 70) { grade = 'B'; gradeLabel = 'Good - healthy and productive'; }
  else if (totalScore >= 55) { grade = 'C'; gradeLabel = 'Fair - needs attention in some areas'; }
  else if (totalScore >= 40) { grade = 'D'; gradeLabel = 'Concerning - multiple issues to address'; }
  else { grade = 'F'; gradeLabel = 'Critical - immediate intervention needed'; }

  return { totalScore, grade, gradeLabel, breakdown, alerts, actions };
}
