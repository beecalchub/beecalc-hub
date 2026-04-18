import { calculateBroodArea } from '@/calculators/brood-area/logic';

describe('Brood Area Calculator', () => {
  test('100% coverage on all frames', () => {
    const frames = Array(8).fill({ coveragePercent: 100 });
    const r = calculateBroodArea({ frames, frameType: 'deep' });
    expect(r.effectiveFullFrames).toBe(8);
    expect(r.totalCells).toBe(56000); // 8 * 7000
  });

  test('50% average coverage', () => {
    const frames = Array(6).fill({ coveragePercent: 50 });
    const r = calculateBroodArea({ frames, frameType: 'deep' });
    expect(r.effectiveFullFrames).toBe(3);
    expect(r.totalCells).toBe(21000);
  });

  test('medium frames have fewer cells', () => {
    const frames = Array(8).fill({ coveragePercent: 100 });
    const r = calculateBroodArea({ frames, frameType: 'medium' });
    expect(r.totalCells).toBe(39200); // 8 * 4900
  });

  test('queen rating scales with frames', () => {
    const excellent = calculateBroodArea({ frames: Array(10).fill({ coveragePercent: 90 }), frameType: 'deep' });
    const poor = calculateBroodArea({ frames: Array(2).fill({ coveragePercent: 50 }), frameType: 'deep' });
    expect(excellent.queenRating.toLowerCase()).toContain('excellent');
    expect(poor.queenRating.toLowerCase()).toContain('poor');
  });
});
