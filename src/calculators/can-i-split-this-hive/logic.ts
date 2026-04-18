export interface CanSplitInputs {
  framesOfBees: number; framesOfBrood: number; framesOfHoney: number;
  queenCellsPresent: boolean; month: number; queenAvailable: boolean;
  daysUntilFlow: number; miteLevel: number;
}
export interface CanSplitResult {
  canSplit: boolean; confidence: 'high' | 'moderate' | 'low' | 'no';
  verdict: string; reasons: string[]; warnings: string[]; steps: string[];
}
export function calculateCanSplit(inputs: CanSplitInputs): CanSplitResult {
  const { framesOfBees, framesOfBrood, framesOfHoney, queenCellsPresent, month, queenAvailable, daysUntilFlow, miteLevel } = inputs;
  const reasons: string[] = [];
  const warnings: string[] = [];

  let score = 0;
  if (framesOfBees >= 10) { score += 3; reasons.push('Strong population - 10+ frames of bees'); }
  else if (framesOfBees >= 8) { score += 2; reasons.push('Adequate population - 8+ frames'); }
  else { reasons.push(`Population of ${framesOfBees} frames is marginal for splitting`); }

  if (framesOfBrood >= 6) { score += 2; reasons.push('Plenty of brood to share'); }
  else if (framesOfBrood >= 4) { score += 1; reasons.push('Moderate brood - split will be smaller'); }
  else { warnings.push('Low brood count - split may struggle'); }

  if (framesOfHoney >= 3) { score += 1; reasons.push('Good honey stores to share'); }
  else { warnings.push('Low stores - feed both halves after splitting'); }

  const goodMonths = [4, 5, 6];
  const okMonths = [3, 7];
  if (goodMonths.includes(month)) { score += 2; reasons.push('Good timing - spring/early summer'); }
  else if (okMonths.includes(month)) { score += 1; reasons.push('Acceptable timing but not ideal'); }
  else { warnings.push(`Month ${month} is late in the season - split may not build up in time`); }

  if (queenAvailable || queenCellsPresent) { score += 1; reasons.push(queenCellsPresent ? 'Queen cells present - natural split opportunity' : 'Mated queen available for the split'); }
  else { warnings.push('No queen available - split will need to raise their own (add 4+ weeks)'); }

  if (miteLevel >= 3) { warnings.push('High mite levels - treat BEFORE splitting to avoid weakening both halves'); }
  if (daysUntilFlow < 21) { warnings.push('Flow is imminent - splitting now may reduce honey crop'); }

  let canSplit: boolean, confidence: CanSplitResult['confidence'], verdict: string;
  if (score >= 8) { canSplit = true; confidence = 'high'; verdict = 'Yes - this colony is an excellent candidate for splitting.'; }
  else if (score >= 6) { canSplit = true; confidence = 'moderate'; verdict = 'Probably - conditions are acceptable but watch the warnings.'; }
  else if (score >= 4) { canSplit = false; confidence = 'low'; verdict = 'Risky - consider waiting until conditions improve.'; }
  else { canSplit = false; confidence = 'no'; verdict = 'No - the colony is not strong enough to split right now.'; }

  const steps = canSplit ? [
    'Do a mite test on the parent colony first.',
    `Move ${Math.min(3, Math.floor(framesOfBrood / 2))} frames of brood + adhering bees to a new box.`,
    `Add ${Math.min(2, framesOfHoney)} frames of honey/pollen.`,
    queenAvailable ? 'Introduce your mated queen in a cage.' : queenCellsPresent ? 'Ensure a good queen cell is in the split.' : 'Include a frame with eggs so they can raise a queen.',
    'Fill remaining space with drawn comb or foundation.',
    'Move the split to a new location (2+ miles or use a screen) to retain foragers.',
    'Feed both halves 1:1 syrup for 2 weeks.',
    'Check for eggs/laying in the split after 3-4 weeks.',
  ] : ['Build the colony up before attempting a split.', 'Feed to boost population and stores.', 'Re-evaluate in 3-4 weeks.'];

  return { canSplit, confidence, verdict, reasons, warnings, steps };
}
