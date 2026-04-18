export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateRequired(value: unknown, fieldName: string): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
}

export function validatePositive(value: number, fieldName: string): ValidationResult {
  if (isNaN(value) || value <= 0) {
    return { valid: false, error: `${fieldName} must be a positive number` };
  }
  return { valid: true };
}

export function validateNonNegative(value: number, fieldName: string): ValidationResult {
  if (isNaN(value) || value < 0) {
    return { valid: false, error: `${fieldName} cannot be negative` };
  }
  return { valid: true };
}

export function validateRange(
  value: number,
  min: number,
  max: number,
  fieldName: string
): ValidationResult {
  if (isNaN(value)) {
    return { valid: false, error: `${fieldName} must be a number` };
  }
  if (value < min || value > max) {
    return { valid: false, error: `${fieldName} must be between ${min} and ${max}` };
  }
  return { valid: true };
}

export function validateInteger(value: number, fieldName: string): ValidationResult {
  if (!Number.isInteger(value)) {
    return { valid: false, error: `${fieldName} must be a whole number` };
  }
  return { valid: true };
}

export function validatePercentage(value: number, fieldName: string): ValidationResult {
  return validateRange(value, 0, 100, fieldName);
}

export function validateAll(...results: ValidationResult[]): ValidationResult {
  for (const result of results) {
    if (!result.valid) return result;
  }
  return { valid: true };
}

export function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

export function parseNumericInput(value: string): number {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}
