export interface SwarmRiskInputs { queenCellsSeen: boolean; framesOfBees: number; congested: boolean; swarmSeasonActive: boolean; queenAgeYears: number; lastInspection: number; }
export interface SwarmRiskResult { score: number; level: string; verdict: string; factors: Array<{ factor: string; score: number; note: string }>; actions: string[]; }
export function calculateSwarmRisk(inputs: SwarmRiskInputs): SwarmRiskResult {
  const factors = [
    { factor: 'Queen cells', score: inputs.queenCellsSeen ? 40 : 0, note: inputs.queenCellsSeen ? 'Swarm cells present' : 'None found' },
    { factor: 'Congestion', score: inputs.framesOfBees >= 16 ? 20 : inputs.framesOfBees >= 12 ? 10 : 0, note: `${inputs.framesOfBees} frames of bees` },
    { factor: 'Space', score: inputs.congested ? 15 : 0, note: inputs.congested ? 'Hive crowded' : 'Adequate space' },
    { factor: 'Season', score: inputs.swarmSeasonActive ? 15 : 0, note: inputs.swarmSeasonActive ? 'Active swarm season' : 'Off-season' },
    { factor: 'Queen age', score: inputs.queenAgeYears >= 2 ? 10 : 0, note: `${inputs.queenAgeYears} year queen` },
  ];
  const score = factors.reduce((s, f) => s + f.score, 0);
  const level = score >= 60 ? 'Critical' : score >= 40 ? 'High' : score >= 20 ? 'Moderate' : 'Low';
  const verdict = score >= 60 ? 'Swarm is imminent. Take action within days.' : score >= 40 ? 'High swarm risk. Intervene soon.' : score >= 20 ? 'Watch closely.' : 'Low risk currently.';
  const actions: string[] = [];
  if (inputs.queenCellsSeen) actions.push('Make a split immediately to prevent swarming.');
  if (inputs.framesOfBees >= 12) actions.push('Add a super or second brood box to relieve congestion.');
  if (inputs.swarmSeasonActive && inputs.queenAgeYears >= 2) actions.push('Consider requeening with a young queen (reduces swarm instinct).');
  if (inputs.lastInspection > 7) actions.push('Inspect at least weekly during swarm season.');
  if (actions.length === 0) actions.push('Continue regular inspections. No action needed.');
  return { score, level, verdict, factors, actions };
}
