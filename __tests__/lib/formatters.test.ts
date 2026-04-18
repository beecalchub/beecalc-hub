import { formatNumber, formatInteger, formatCurrency, formatPercent, pluralize, formatRatio, toFixedSafe } from '@/lib/formatters';

describe('Formatters', () => {
  test('formatNumber with decimals', () => {
    expect(formatNumber(3.14159, 2)).toBe('3.14');
    expect(formatNumber(1000, 0)).toBe('1,000');
    expect(formatNumber(0.5)).toBe('0.5');
  });

  test('formatNumber handles non-finite', () => {
    expect(formatNumber(Infinity)).toBe('-');
    expect(formatNumber(NaN)).toBe('-');
  });

  test('formatInteger', () => {
    expect(formatInteger(42)).toBe('42');
    expect(formatInteger(1234)).toBe('1,234');
    expect(formatInteger(3.7)).toBe('4');
  });

  test('formatCurrency', () => {
    expect(formatCurrency(42.5)).toBe('$42.50');
    expect(formatCurrency(1000)).toBe('$1,000.00');
    expect(formatCurrency(0)).toBe('$0.00');
  });

  test('formatPercent', () => {
    expect(formatPercent(42.567, 1)).toBe('42.6%');
    expect(formatPercent(100, 0)).toBe('100%');
  });

  test('pluralize', () => {
    expect(pluralize(1, 'hive')).toBe('1 hive');
    expect(pluralize(5, 'hive')).toBe('5 hives');
    expect(pluralize(0, 'box', 'boxes')).toBe('0 boxes');
    expect(pluralize(1, 'box', 'boxes')).toBe('1 box');
  });

  test('formatRatio', () => {
    expect(formatRatio(1, 1)).toBe('1:1');
    expect(formatRatio(2, 1)).toBe('2:1');
  });

  test('toFixedSafe', () => {
    expect(toFixedSafe(3.14159, 2)).toBe(3.14);
    expect(toFixedSafe(0.1 + 0.2, 1)).toBe(0.3);
  });
});
