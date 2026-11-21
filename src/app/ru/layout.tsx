import React from 'react';
import type { Metadata } from 'next';
import { RuLangEffect } from './RuLangEffect';

export const metadata: Metadata = {
  title: {
    default: 'BeeCalc Hub - Калькуляторы для пчеловодов',
    template: '%s | BeeCalc Hub',
  },
  description:
    'Бесплатные практичные калькуляторы для пчеловодов: подкормка, медосбор, борьба с варроа, матководство и экономика пасеки.',
};

export default function RuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RuLangEffect />
      {children}
    </>
  );
}
