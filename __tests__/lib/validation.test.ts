import { validateRequired, validatePositive, validateNonNegative, validateRange, validateInteger, validatePercentage, validateAll, parseNumericInput, isValidNumber } from '@/lib/validation';

describe('Validation helpers', () => {
  describe('validateRequired', () => {
    test('fails on null/undefined/empty', () => {
      expect(validateRequired(null, 'field').valid).toBe(false);
      expect(validateRequired(undefined, 'field').valid).toBe(false);
      expect(validateRequired('', 'field').valid).toBe(false);
    });
    test('passes on valid values', () => {
      expect(validateRequired(0, 'field').valid).toBe(true);
      expect(validateRequired('text', 'field').valid).toBe(true);
      expect(validateRequired(false, 'field').valid).toBe(true);
    });
  });

  describe('validatePositive', () => {
    test('fails on zero and negative', () => {
      expect(validatePositive(0, 'field').valid).toBe(false);
      expect(validatePositive(-1, 'field').valid).toBe(false);
      expect(validatePositive(NaN, 'field').valid).toBe(false);
    });
    test('passes on positive', () => {
      expect(validatePositive(1, 'field').valid).toBe(true);
      expect(validatePositive(0.001, 'field').valid).toBe(true);
    });
  });

  describe('validateNonNegative', () => {
    test('fails on negative', () => {
      expect(validateNonNegative(-1, 'field').valid).toBe(false);
    });
    test('passes on zero and positive', () => {
      expect(validateNonNegative(0, 'field').valid).toBe(true);
      expect(validateNonNegative(100, 'field').valid).toBe(true);
    });
  });

  describe('validateRange', () => {
    test('fails outside range', () => {
      expect(validateRange(5, 10, 20, 'field').valid).toBe(false);
      expect(validateRange(25, 10, 20, 'field').valid).toBe(false);
    });
    test('passes within range inclusive', () => {
      expect(validateRange(10, 10, 20, 'field').valid).toBe(true);
      expect(validateRange(20, 10, 20, 'field').valid).toBe(true);
      expect(validateRange(15, 10, 20, 'field').valid).toBe(true);
    });
  });

  describe('validateInteger', () => {
    test('fails on float', () => {
      expect(validateInteger(3.5, 'field').valid).toBe(false);
    });
    test('passes on integer', () => {
      expect(validateInteger(3, 'field').valid).toBe(true);
      expect(validateInteger(0, 'field').valid).toBe(true);
    });
  });

  describe('validatePercentage', () => {
    test('fails outside 0-100', () => {
      expect(validatePercentage(-1, 'field').valid).toBe(false);
      expect(validatePercentage(101, 'field').valid).toBe(false);
    });
    test('passes within 0-100', () => {
      expect(validatePercentage(0, 'field').valid).toBe(true);
      expect(validatePercentage(50, 'field').valid).toBe(true);
      expect(validatePercentage(100, 'field').valid).toBe(true);
    });
  });

  describe('validateAll', () => {
    test('returns first failure', () => {
      const result = validateAll(
        validatePositive(5, 'a'),
        validatePositive(-1, 'b'),
        validatePositive(3, 'c'),
      );
      expect(result.valid).toBe(false);
      expect(result.error).toContain('b');
    });
    test('passes when all valid', () => {
      expect(validateAll(validatePositive(1, 'a'), validatePositive(2, 'b')).valid).toBe(true);
    });
  });

  describe('parseNumericInput', () => {
    test('parses valid numbers', () => {
      expect(parseNumericInput('42')).toBe(42);
      expect(parseNumericInput('3.14')).toBeCloseTo(3.14);
    });
    test('returns 0 for invalid', () => {
      expect(parseNumericInput('')).toBe(0);
      expect(parseNumericInput('abc')).toBe(0);
    });
  });

  describe('isValidNumber', () => {
    test('detects valid numbers', () => {
      expect(isValidNumber(42)).toBe(true);
      expect(isValidNumber(0)).toBe(true);
      expect(isValidNumber(-3.14)).toBe(true);
    });
    test('rejects invalid', () => {
      expect(isValidNumber(NaN)).toBe(false);
      expect(isValidNumber(Infinity)).toBe(false);
      expect(isValidNumber('42' as unknown as number)).toBe(false);
    });
  });
});
