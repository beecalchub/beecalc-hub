'use client';

import { useEffect } from 'react';

// Sets <html lang="ru"> while a /ru page is mounted; restores lang="en" on leave.
export function RuLangEffect() {
  useEffect(() => {
    const prev = document.documentElement.lang;
    document.documentElement.lang = 'ru';
    return () => {
      document.documentElement.lang = prev || 'en';
    };
  }, []);
  return null;
}
