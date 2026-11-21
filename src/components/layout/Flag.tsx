import React from 'react';

// Small drawn flags. Emoji flags are not used because Windows shows them as plain letters.
export function Flag({ code, dimmed = false }: { code: string; dimmed?: boolean }) {
  const common = {
    width: 20,
    height: 14,
    viewBox: '0 0 30 20',
    className: `rounded-[2px] flex-shrink-0 ring-1 ring-black/10 ${dimmed ? 'opacity-50' : ''}`,
    'aria-hidden': true as const,
  };

  switch (code) {
    case 'en':
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#012169" />
          <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
          <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="1.6" />
          <path d="M15,0 V20 M0,10 H30" stroke="#fff" strokeWidth="6.6" />
          <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="4" />
        </svg>
      );
    case 'ru':
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#fff" />
          <rect y="6.67" width="30" height="6.67" fill="#0039A6" />
          <rect y="13.33" width="30" height="6.67" fill="#D52B1E" />
        </svg>
      );
    case 'fr':
      return (
        <svg {...common}>
          <rect width="10" height="20" fill="#0055A4" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#EF4135" />
        </svg>
      );
    case 'es':
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#AA151B" />
          <rect y="5" width="30" height="10" fill="#F1BF00" />
        </svg>
      );
    case 'de':
      return (
        <svg {...common}>
          <rect width="30" height="6.67" fill="#000" />
          <rect y="6.67" width="30" height="6.67" fill="#DD0000" />
          <rect y="13.33" width="30" height="6.67" fill="#FFCE00" />
        </svg>
      );
    case 'ro':
      return (
        <svg {...common}>
          <rect width="10" height="20" fill="#002B7F" />
          <rect x="10" width="10" height="20" fill="#FCD116" />
          <rect x="20" width="10" height="20" fill="#CE1126" />
        </svg>
      );
    default:
      return null;
  }
}
