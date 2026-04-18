import { calculateWinterStores } from '@/calculators/winter-stores/logic';

describe('Winter Stores', () => {
  test('north zone requires ~80 lbs', () => {
    const r = calculateWinterStores({ climateZone: 'north', colonyStrength: 'average', currentStoresLbs: 0, hiveCount: 1 });
    expect(r.requiredPerHiveLbs).toBe(80);
  });

  test('south zone requires ~40 lbs', () => {
    const r = calculateWinterStores({ climateZone: 'south', colonyStrength: 'average', currentStoresLbs: 0, hiveCount: 1 });
    expect(r.requiredPerHiveLbs).toBe(40);
  });

  test('strong colony needs slightly more', () => {
    const r = calculateWinterStores({ climateZone: 'moderate', colonyStrength: 'strong', currentStoresLbs: 0, hiveCount: 1 });
    expect(r.requiredPerHiveLbs).toBe(66); // 60 * 1.1 = 66
  });

  test('surplus when stores exceed requirement', () => {
    const r = calculateWinterStores({ climateZone: 'moderate', colonyStrength: 'average', currentStoresLbs: 100, hiveCount: 1 });
    expect(r.status).toBe('surplus');
    expect(r.deficitPerHiveLbs).toBe(0);
  });

  test('critical when stores very low', () => {
    const r = calculateWinterStores({ climateZone: 'north', colonyStrength: 'average', currentStoresLbs: 10, hiveCount: 1 });
    expect(r.status).toBe('critical');
  });

  test('syrup calculation for deficit', () => {
    const r = calculateWinterStores({ climateZone: 'moderate', colonyStrength: 'average', currentStoresLbs: 0, hiveCount: 1 });
    expect(r.syrupGallonsNeeded).toBeGreaterThan(0);
    expect(r.sugarLbsNeeded).toBeGreaterThan(0);
  });
});
