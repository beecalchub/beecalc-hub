export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers / non-secure contexts
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

export function formatResultsForCopy(
  title: string,
  results: Array<{ label: string; value: string | number; unit?: string }>
): string {
  const lines = [`📐 ${title} - BeeCalc Hub`, ''];
  for (const r of results) {
    const unitStr = r.unit ? ` ${r.unit}` : '';
    lines.push(`${r.label}: ${r.value}${unitStr}`);
  }
  lines.push('', '🐝 beecalchub.com');
  return lines.join('\n');
}
