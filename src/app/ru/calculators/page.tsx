import React from 'react';
import type { Metadata } from 'next';
import { RuCalculatorsClient } from './client';
import { SITE_URL } from '@/data/constants';

export const metadata: Metadata = {
  title: 'Все калькуляторы',
  description:
    'Полная библиотека калькуляторов BeeCalc Hub для пчеловодов: подкормка, мёд, варроа, матководство, оборудование и экономика пасеки.',
  alternates: {
    canonical: `${SITE_URL}/ru/calculators`,
    languages: { en: `${SITE_URL}/calculators`, ru: `${SITE_URL}/ru/calculators` },
  },
};

export default function RuCalculatorsPage() {
  return <RuCalculatorsClient />;
}
