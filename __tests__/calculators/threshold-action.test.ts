import { calculateThreshold } from '@/calculators/threshold-action/logic';

describe('Threshold Action', () => {
  test('zero mites = no action', () => {
    const r = calculateThreshold({
      mitesPerHundred: 0, season: 'summer', hasSupersOn: false,
      broodPresent: true, queenRightConfirmed: true, daysUntilFlow: 60,
    });
    expect(r.urgency).toBe('none');
    expect(r.aboveThreshold).toBe(false);
  });

  test('at threshold = plan treatment', () => {
    const r = calculateThreshold({
      mitesPerHundred: 2, season: 'summer', hasSupersOn: false,
      broodPresent: true, queenRightConfirmed: true, daysUntilFlow: 60,
    });
    expect(r.aboveThreshold).toBe(true);
    expect(r.urgency).toBe('plan');
  });

  test('critical levels = treat now', () => {
    const r = calculateThreshold({
      mitesPerHundred: 8, season: 'late-summer', hasSupersOn: false,
      broodPresent: true, queenRightConfirmed: true, daysUntilFlow: 60,
    });
    expect(r.urgency).toBe('treat-now');
  });

  test('fall has higher threshold than spring', () => {
    const spring = calculateThreshold({
      mitesPerHundred: 1.5, season: 'early-spring', hasSupersOn: false,
      broodPresent: true, queenRightConfirmed: true, daysUntilFlow: 90,
    });
    const fall = calculateThreshold({
      mitesPerHundred: 1.5, season: 'fall', hasSupersOn: false,
      broodPresent: true, queenRightConfirmed: true, daysUntilFlow: 90,
    });
    expect(spring.aboveThreshold).toBe(true);
    expect(fall.aboveThreshold).toBe(false);
  });

  test('supers on marks treatments unsuitable', () => {
    const r = calculateThreshold({
      mitesPerHundred: 3, season: 'summer', hasSupersOn: true,
      broodPresent: true, queenRightConfirmed: true, daysUntilFlow: 60,
    });
    const oav = r.treatmentOptions.find((t) => t.name.includes('OAV'));
    expect(oav?.suitable).toBe(false);
  });

  test('treatment options are always provided', () => {
    const r = calculateThreshold({
      mitesPerHundred: 3, season: 'summer', hasSupersOn: false,
      broodPresent: true, queenRightConfirmed: true, daysUntilFlow: 60,
    });
    expect(r.treatmentOptions.length).toBeGreaterThan(3);
  });
});
