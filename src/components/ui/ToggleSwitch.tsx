'use client';

import React from 'react';

interface ToggleSwitchProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}

// Fix #9: Toggle meets 44px touch target. Knob and track enlarged.
export function ToggleSwitch({ labelLeft, labelRight, checked, onChange, ariaLabel }: ToggleSwitchProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`text-sm font-medium transition-colors select-none ${!checked ? 'text-honey-700' : 'text-smoke-400'}`}
        aria-hidden="true"
      >
        {labelLeft}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel || `Toggle between ${labelLeft} and ${labelRight}`}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-8 w-14 flex-shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-honey-400 focus:ring-offset-2 ${
          checked ? 'bg-honey-500' : 'bg-smoke-300'
        }`}
        style={{ minWidth: 56, minHeight: 44, padding: '8px 0' }}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${
            checked ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors select-none ${checked ? 'text-honey-700' : 'text-smoke-400'}`}
        aria-hidden="true"
      >
        {labelRight}
      </span>
    </div>
  );
}
