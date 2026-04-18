import { calculateCappingsWax } from '@/calculators/cappings-wax-yield/logic';

describe('Cappings Wax Yield', () => {
  test('knife produces most raw cappings', () => {
    const knife = calculateCappingsWax({ honeyHarvestedLbs: 100, extractionMethod: 'knife', renderingMethod: 'solar' });
    const fork = calculateCappingsWax({ honeyHarvestedLbs: 100, extractionMethod: 'fork', renderingMethod: 'solar' });
    expect(knife.rawCappingsLbs).toBeGreaterThan(fork.rawCappingsLbs);
  });

  test('steam rendering has highest yield', () => {
    const solar = calculateCappingsWax({ honeyHarvestedLbs: 100, extractionMethod: 'knife', renderingMethod: 'solar' });
    const steam = calculateCappingsWax({ honeyHarvestedLbs: 100, extractionMethod: 'knife', renderingMethod: 'steam' });
    expect(steam.renderedWaxLbs).toBeGreaterThan(solar.renderedWaxLbs);
  });

  test('cappings are ~50% honey by weight', () => {
    const r = calculateCappingsWax({ honeyHarvestedLbs: 200, extractionMethod: 'knife', renderingMethod: 'water-bath' });
    expect(r.cappingsHoneyLbs).toBeCloseTo(r.rawCappingsLbs * 0.5, 1);
  });

  test('wax + slumgum + honey ≈ raw cappings', () => {
    const r = calculateCappingsWax({ honeyHarvestedLbs: 200, extractionMethod: 'knife', renderingMethod: 'water-bath' });
    const reconstructed = r.renderedWaxLbs + r.slumgumLbs + r.cappingsHoneyLbs;
    expect(reconstructed).toBeCloseTo(r.rawCappingsLbs, 1);
  });

  test('value estimates are positive', () => {
    const r = calculateCappingsWax({ honeyHarvestedLbs: 100, extractionMethod: 'knife', renderingMethod: 'solar' });
    expect(r.waxValueEstimate).toBeGreaterThan(0);
    expect(r.honeyValueEstimate).toBeGreaterThan(0);
  });

  test('metric conversions are accurate', () => {
    const r = calculateCappingsWax({ honeyHarvestedLbs: 100, extractionMethod: 'knife', renderingMethod: 'solar' });
    expect(r.renderedWaxKg).toBeCloseTo(r.renderedWaxLbs * 0.4536, 1);
  });
});
