export interface WaxMothInputs { storedCombFrames: number; storageType: 'open-air' | 'sealed-container' | 'freezer-treated'; colonyStrength: 'strong' | 'average' | 'weak' | 'dead-out'; avgTempF: number; hasParadichlorobenzene: boolean; }
export interface WaxMothResult { riskScore: number; riskLevel: string; recommendations: string[]; breakdown: Array<{ factor: string; score: number; max: number; note: string }>; }
export function calculateWaxMothRisk(inputs: WaxMothInputs): WaxMothResult {
  const breakdown: WaxMothResult['breakdown'] = [];
  let tempScore = inputs.avgTempF > 90 ? 25 : inputs.avgTempF > 75 ? 18 : inputs.avgTempF > 60 ? 10 : 3;
  breakdown.push({ factor: 'Temperature', score: tempScore, max: 25, note: `${inputs.avgTempF}°F` });
  const storageScore = inputs.storageType === 'open-air' ? 25 : inputs.storageType === 'sealed-container' ? 10 : 2;
  breakdown.push({ factor: 'Storage method', score: storageScore, max: 25, note: inputs.storageType });
  const strengthScore = inputs.colonyStrength === 'dead-out' ? 25 : inputs.colonyStrength === 'weak' ? 20 : inputs.colonyStrength === 'average' ? 10 : 3;
  breakdown.push({ factor: 'Colony strength', score: strengthScore, max: 25, note: inputs.colonyStrength });
  const volumeScore = inputs.storedCombFrames > 40 ? 15 : inputs.storedCombFrames > 20 ? 10 : inputs.storedCombFrames > 5 ? 6 : 2;
  breakdown.push({ factor: 'Comb volume', score: volumeScore, max: 15, note: `${inputs.storedCombFrames} frames` });
  const chemScore = inputs.hasParadichlorobenzene ? 0 : 10;
  breakdown.push({ factor: 'Chemical protection', score: chemScore, max: 10, note: inputs.hasParadichlorobenzene ? 'PDB in use' : 'No chemical protection' });
  const riskScore = breakdown.reduce((s, b) => s + b.score, 0);
  const riskLevel = riskScore >= 70 ? 'High' : riskScore >= 45 ? 'Moderate' : 'Low';
  const recommendations: string[] = [];
  if (inputs.storageType === 'open-air') recommendations.push('Seal stored combs in bins or bags to prevent moth access.');
  if (inputs.avgTempF > 75) recommendations.push('Store combs in cool location or freeze frames for 48 hours before storage.');
  if (inputs.colonyStrength === 'weak' || inputs.colonyStrength === 'dead-out') recommendations.push('Remove empty comb from weak/dead hives immediately.');
  if (!inputs.hasParadichlorobenzene) recommendations.push('Consider using Certan (B. thuringiensis) for chemical-free protection.');
  if (recommendations.length === 0) recommendations.push('Current storage practices are good. Continue monitoring.');
  return { riskScore, riskLevel, recommendations, breakdown };
}
