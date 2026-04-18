export interface OavDosingInputs {
  broodBoxCount: number;
  hiveCount: number;
  hasScreenBottom: boolean;
}

export interface OavDosingResult {
  gramsPerHive: number;
  totalGrams: number;
  totalOunces: number;
  rounds: number;
  daysBetweenRounds: number;
  safetyNotes: string[];
}

export function calculateOavDosing(inputs: OavDosingInputs): OavDosingResult {
  const { broodBoxCount, hiveCount, hasScreenBottom } = inputs;

  // Standard: 1g per brood box, max 4g per hive
  const gramsPerHive = Math.min(broodBoxCount * 1, 4);
  const totalGrams = gramsPerHive * hiveCount;
  const totalOunces = totalGrams * 0.03527396;

  // Standard protocol: 3 rounds, 5-7 days apart when brood is present
  // Single treatment when broodless (winter)
  const rounds = 3;
  const daysBetweenRounds = 5;

  const safetyNotes = [
    'Always wear a proper respirator (P100/OV) rated for organic acid vapors.',
    'Wear chemical-resistant gloves and eye protection.',
    'Ensure proper seal around hive entrance during vaporization.',
    'Wait 10-15 minutes after treatment before opening the hive.',
    'Do not treat when honey supers are on - remove supers first.',
    'Treat in the evening or early morning when bees are inside.',
    'Follow all local regulations regarding OAV treatment.',
  ];

  if (hasScreenBottom) {
    safetyNotes.push('Close or block screened bottom board during treatment for maximum efficacy.');
  }

  return {
    gramsPerHive,
    totalGrams: Math.round(totalGrams * 100) / 100,
    totalOunces: Math.round(totalOunces * 100) / 100,
    rounds,
    daysBetweenRounds,
    safetyNotes,
  };
}
