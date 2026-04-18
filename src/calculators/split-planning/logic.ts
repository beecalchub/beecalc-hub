export interface SplitInputs {
  framesOfBees: number;
  framesOfBrood: number;
  framesOfHoney: number;
  queenAvailable: boolean;
  seasonMonth: number;
}

export interface SplitResult {
  canSplit: boolean;
  maxSplits: number;
  recommendation: string;
  perSplit: {
    beesFrames: number;
    broodFrames: number;
    honeyFrames: number;
  };
  parentRetains: {
    beesFrames: number;
    broodFrames: number;
    honeyFrames: number;
  };
  risks: string[];
  tips: string[];
}

export function calculateSplit(inputs: SplitInputs): SplitResult {
  const { framesOfBees, framesOfBrood, framesOfHoney, queenAvailable, seasonMonth } = inputs;

  // Minimum viable: parent keeps 5 frames bees, 3 brood, 2 honey
  // Each split needs minimum: 3 frames bees, 2 brood, 1 honey
  const minParentBees = 5;
  const minParentBrood = 3;
  const minParentHoney = 2;
  const minSplitBees = 3;
  const minSplitBrood = 2;
  const minSplitHoney = 1;

  const availBees = framesOfBees - minParentBees;
  const availBrood = framesOfBrood - minParentBrood;
  const availHoney = framesOfHoney - minParentHoney;

  const maxByBees = Math.floor(availBees / minSplitBees);
  const maxByBrood = Math.floor(availBrood / minSplitBrood);
  const maxByHoney = Math.floor(availHoney / minSplitHoney);

  const maxSplits = Math.max(0, Math.min(maxByBees, maxByBrood, maxByHoney));
  const canSplit = maxSplits >= 1 && framesOfBees >= 8 && framesOfBrood >= 5;

  const risks: string[] = [];
  const tips: string[] = [];

  if (!queenAvailable) {
    risks.push('No queen available - split will need to raise its own queen (adds 4+ weeks).');
    tips.push('Ensure the split has eggs/young larvae less than 3 days old for emergency queen cells.');
  }
  if (seasonMonth >= 7 && seasonMonth <= 9) {
    risks.push('Late-season split may not build up enough before winter.');
  }
  if (seasonMonth >= 3 && seasonMonth <= 5) {
    tips.push('Excellent time for splits - spring buildup provides strong recovery.');
  }
  if (framesOfHoney < 4) {
    risks.push('Low honey stores - plan to feed both parent and split.');
  }
  if (maxSplits > 1) {
    tips.push(`Colony can support up to ${maxSplits} splits, but 1 strong split is usually better than 2 weak ones.`);
  }

  let recommendation: string;
  if (!canSplit) {
    recommendation = 'Colony is not strong enough to split safely. Build up further before splitting.';
  } else if (maxSplits === 1) {
    recommendation = 'Colony can support 1 split. Make a strong nuc with the resources below.';
  } else {
    recommendation = `Colony can support up to ${maxSplits} splits. Consider your goals and available queens.`;
  }

  const splitBees = canSplit ? Math.min(minSplitBees, availBees) : 0;
  const splitBrood = canSplit ? Math.min(minSplitBrood, availBrood) : 0;
  const splitHoney = canSplit ? Math.min(minSplitHoney, availHoney) : 0;

  return {
    canSplit,
    maxSplits,
    recommendation,
    perSplit: { beesFrames: splitBees, broodFrames: splitBrood, honeyFrames: splitHoney },
    parentRetains: {
      beesFrames: framesOfBees - (canSplit ? splitBees : 0),
      broodFrames: framesOfBrood - (canSplit ? splitBrood : 0),
      honeyFrames: framesOfHoney - (canSplit ? splitHoney : 0),
    },
    risks,
    tips,
  };
}
