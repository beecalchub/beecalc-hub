export function formatNumber(value: number, decimals: number = 1): string {
  if (!isFinite(value)) return '-';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatInteger(value: number): string {
  if (!isFinite(value)) return '-';
  return Math.round(value).toLocaleString('en-US');
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  if (!isFinite(value)) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number, decimals: number = 1): string {
  if (!isFinite(value)) return '-';
  return `${value.toFixed(decimals)}%`;
}

export function formatWeight(value: number, unit: string, decimals: number = 1): string {
  return `${formatNumber(value, decimals)} ${unit}`;
}

export function formatVolume(value: number, unit: string, decimals: number = 1): string {
  return `${formatNumber(value, decimals)} ${unit}`;
}

export function formatArea(value: number, unit: string, decimals: number = 1): string {
  return `${formatNumber(value, decimals)} ${unit}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateShort(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function pluralize(count: number, singular: string, plural?: string): string {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + 's'}`;
}

export function formatRatio(a: number, b: number): string {
  return `${a}:${b}`;
}

export function toFixedSafe(value: number, decimals: number): number {
  return parseFloat(value.toFixed(decimals));
}
