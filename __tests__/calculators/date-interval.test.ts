import { calculateDateInterval } from '@/calculators/date-interval/logic';

describe('Date Interval Calculator', () => {
  describe('between mode', () => {
    test('same date = 0 days', () => {
      const r = calculateDateInterval({ mode: 'between', startDate: '2025-06-01', endDate: '2025-06-01', daysToAdd: 0 });
      expect(r.totalDays).toBe(0);
      expect(r.totalWeeks).toBe(0);
    });

    test('one week apart = 7 days', () => {
      const r = calculateDateInterval({ mode: 'between', startDate: '2025-06-01', endDate: '2025-06-08', daysToAdd: 0 });
      expect(r.totalDays).toBe(7);
      expect(r.totalWeeks).toBe(1);
      expect(r.remainderDays).toBe(0);
    });

    test('21 days has beekeeping context', () => {
      const r = calculateDateInterval({ mode: 'between', startDate: '2025-06-01', endDate: '2025-06-22', daysToAdd: 0 });
      expect(r.totalDays).toBe(21);
      expect(r.beekeepingContext.toLowerCase()).toContain('worker');
    });

    test('order of dates does not matter', () => {
      const r = calculateDateInterval({ mode: 'between', startDate: '2025-06-10', endDate: '2025-06-01', daysToAdd: 0 });
      expect(r.totalDays).toBe(9);
    });
  });

  describe('add mode', () => {
    test('adding 21 days to June 1 = June 22', () => {
      const r = calculateDateInterval({ mode: 'add', startDate: '2025-06-01', endDate: '', daysToAdd: 21 });
      expect(r.resultDate).not.toBeNull();
      expect(r.resultDate!.getDate()).toBe(22);
      expect(r.resultDate!.getMonth()).toBe(5); // June = 5
    });

    test('adding 16 days matches queen emergence context', () => {
      const r = calculateDateInterval({ mode: 'add', startDate: '2025-06-01', endDate: '', daysToAdd: 16 });
      expect(r.beekeepingContext.toLowerCase()).toContain('queen');
    });
  });

  describe('subtract mode', () => {
    test('subtracting 10 days from June 15 = June 5', () => {
      const r = calculateDateInterval({ mode: 'subtract', startDate: '2025-06-15', endDate: '', daysToAdd: 10 });
      expect(r.resultDate!.getDate()).toBe(5);
    });

    test('crossing month boundary works', () => {
      const r = calculateDateInterval({ mode: 'subtract', startDate: '2025-06-05', endDate: '', daysToAdd: 10 });
      expect(r.resultDate!.getMonth()).toBe(4); // May
      expect(r.resultDate!.getDate()).toBe(26);
    });
  });

  test('weeks and remainder calculated correctly', () => {
    const r = calculateDateInterval({ mode: 'between', startDate: '2025-01-01', endDate: '2025-01-20', daysToAdd: 0 });
    expect(r.totalDays).toBe(19);
    expect(r.totalWeeks).toBe(2);
    expect(r.remainderDays).toBe(5);
  });
});
