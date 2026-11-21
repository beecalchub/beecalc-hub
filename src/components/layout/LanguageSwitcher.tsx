'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANGUAGES } from '@/i18n/ru';
import { Flag } from './Flag';

function stripLocale(pathname: string): string {
  for (const lang of LANGUAGES) {
    if (lang.prefix && (pathname === lang.prefix || pathname.startsWith(lang.prefix + '/'))) {
      const rest = pathname.slice(lang.prefix.length);
      return rest === '' ? '/' : rest;
    }
  }
  return pathname;
}

export function useCurrentLocale(): 'en' | 'ru' {
  const pathname = usePathname() || '/';
  if (pathname === '/ru' || pathname.startsWith('/ru/')) return 'ru';
  return 'en';
}

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const locale = useCurrentLocale();
  const basePath = stripLocale(pathname);
  const soonLabel = locale === 'ru' ? 'скоро' : 'soon';

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg border border-smoke-200 bg-white text-smoke-700 hover:border-honey-300 hover:text-honey-700 transition-colors font-medium ${
          compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={locale === 'ru' ? 'Выбор языка' : 'Select language'}
      >
        <Flag code={locale} />
        <span className="uppercase">{locale}</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1 w-48 rounded-xl border border-smoke-100 bg-white shadow-xl py-1.5 z-50"
          role="listbox"
        >
          {LANGUAGES.map((lang) => {
            const isCurrent = lang.code === locale;
            if (lang.active) {
              const href = lang.prefix === '' ? basePath : lang.prefix + (basePath === '/' ? '' : basePath);
              return (
                <Link
                  key={lang.code}
                  href={href === '' ? '/' : href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                    isCurrent
                      ? 'bg-honey-50 text-honey-800 font-semibold'
                      : 'text-smoke-700 hover:bg-smoke-50 hover:text-honey-700'
                  }`}
                  role="option"
                  aria-selected={isCurrent}
                >
                  <span className="flex items-center gap-2"><Flag code={lang.code} />{lang.label}</span>
                  {isCurrent && <span aria-hidden="true">✓</span>}
                </Link>
              );
            }
            return (
              <div
                key={lang.code}
                className="flex items-center justify-between px-3 py-2 text-sm text-smoke-300 cursor-not-allowed select-none"
                aria-disabled="true"
                title={soonLabel}
              >
                <span className="flex items-center gap-2"><Flag code={lang.code} dimmed />{lang.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-smoke-100 text-smoke-400 font-medium">
                  {soonLabel}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
