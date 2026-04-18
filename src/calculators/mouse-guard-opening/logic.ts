export interface MouseGuardInputs { hiveCount: number; entranceWidthInches: number; entranceType: 'full-width' | 'reduced' | 'disc'; guardType: 'metal' | 'wood-reducer' | '3d-printed'; }
export interface MouseGuardResult { guardsNeeded: number; maxOpeningHeight: number; maxOpeningHeightMm: number; ventilationAdequate: boolean; installBy: string; removeBy: string; tips: string[]; }
export function calculateMouseGuard(inputs: MouseGuardInputs): MouseGuardResult {
  const { hiveCount, entranceWidthInches, entranceType, guardType } = inputs;
  const guardsNeeded = hiveCount * (entranceType === 'full-width' ? 1 : entranceType === 'disc' ? 0 : 1);
  const maxOpeningHeight = 0.375; // 3/8 inch - bees pass, mice don't
  const ventilationAdequate = entranceWidthInches >= 6 || entranceType === 'disc';
  const tips = ['Install before first frost when nighttime temps drop below 50°F (10°C).', `Maximum opening: ${maxOpeningHeight}" (9.5mm) - bees pass, mice cannot.`, 'Ensure guard doesn\'t block dead bee removal.', 'Check monthly for debris buildup blocking the entrance.'];
  if (guardType === 'metal') tips.push('Metal guards are most durable and mouse-proof.');
  if (!ventilationAdequate) tips.push('Consider upper ventilation since entrance is small.');
  return { guardsNeeded, maxOpeningHeight, maxOpeningHeightMm: Math.round(maxOpeningHeight * 25.4 * 10) / 10, ventilationAdequate, installBy: 'Before first frost (Sept–Oct)', removeBy: 'After last frost (Apr–May)', tips };
}
