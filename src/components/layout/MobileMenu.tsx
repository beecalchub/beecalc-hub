'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: Array<{ href: string; label: string }>;
}

// Fix #14: Proper backdrop a11y, keyboard dismiss, focus trap basics
export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 sm:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-smoke-900/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl animate-slide-in-right">
        <div className="flex items-center justify-between px-4 h-14 border-b border-smoke-100">
          <span className="font-display text-lg text-honey-800">Menu</span>
          <button
            onClick={onClose}
            className="p-2.5 text-smoke-500 hover:text-smoke-800 rounded-lg hover:bg-smoke-50 transition-colors"
            aria-label="Close menu"
            style={{ minHeight: 44, minWidth: 44 }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-4 space-y-1">
          <Link
            href="/"
            onClick={onClose}
            className="block px-3 py-3 rounded-lg text-smoke-700 font-medium hover:bg-honey-50 hover:text-honey-800 transition-colors"
            style={{ minHeight: 44 }}
          >
            Home
          </Link>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-3 py-3 rounded-lg text-smoke-700 font-medium hover:bg-honey-50 hover:text-honey-800 transition-colors"
              style={{ minHeight: 44 }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
