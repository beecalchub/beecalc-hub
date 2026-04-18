export interface Inputs { boxWidthInches: number; frameType: 'standard' | 'wide' | 'narrow'; }
export interface Result { framesFitting: number; spacingInches: number; recommendation: string; }
export function calculate(i: Inputs): Result {
  const frameWidth = { standard: 1.375, wide: 1.5, narrow: 1.25 }[i.frameType];
  const usableWidth = i.boxWidthInches - 0.5;
  const framesFitting = Math.floor(usableWidth / frameWidth);
  const spacing = Math.round((usableWidth / framesFitting - frameWidth) * 100) / 100;
  const rec = spacing < 0.25 ? 'Tight spacing - may be hard to remove frames.' : spacing > 0.5 ? 'Loose spacing - use spacers or bees will build bridge comb.' : 'Good spacing for natural comb building.';
  return { framesFitting, spacingInches: spacing, recommendation: rec };
}
