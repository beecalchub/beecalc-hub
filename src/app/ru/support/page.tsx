import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/data/constants';

export const metadata: Metadata = {
  title: 'Поддержать проект',
  description: 'Поддержите BeeCalc Hub - бесплатные калькуляторы для пчеловодов.',
  alternates: {
    canonical: `${SITE_URL}/ru/support`,
    languages: { en: `${SITE_URL}/support`, ru: `${SITE_URL}/ru/support` },
  },
};

const BMC_URL = 'https://www.buymeacoffee.com/beecalchub';
const DONATION_URL = 'https://donate.stripe.com/8x200k3mE1qH7z46T6eEo00';

export default function RuSupportPage() {
  return (
    <div className="container-page py-8 sm:py-12 max-w-2xl">
      <div className="text-center mb-10">
        <span className="text-5xl block mb-4" aria-hidden="true">💛</span>
        <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-3">Поддержать проект</h1>
        <p className="text-smoke-600 text-lg leading-relaxed">
          BeeCalc Hub бесплатен - и останется бесплатным. Если калькуляторы экономят вам время
          и помогают на пасеке, вы можете поддержать развитие проекта.
        </p>
      </div>

      <div className="space-y-4">
        <a
          href={BMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-xl border-2 border-honey-200 bg-honey-50 hover:border-honey-400 hover:shadow-warm transition-all group"
        >
          <span className="text-4xl flex-shrink-0" aria-hidden="true">☕</span>
          <div>
            <p className="font-display text-lg text-smoke-900 group-hover:text-honey-800 transition-colors">
              Buy Me a Coffee
            </p>
            <p className="text-sm text-smoke-600">
              Разовая поддержка «на кофе» - быстро и без регистрации.
            </p>
          </div>
        </a>

        <a
          href={DONATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-xl border-2 border-smoke-200 bg-white hover:border-honey-300 hover:shadow-warm transition-all group"
        >
          <span className="text-4xl flex-shrink-0" aria-hidden="true">💝</span>
          <div>
            <p className="font-display text-lg text-smoke-900 group-hover:text-honey-800 transition-colors">
              Сделать пожертвование
            </p>
            <p className="text-sm text-smoke-600">
              Безопасный платёж любой суммы через Stripe.
            </p>
          </div>
        </a>
      </div>

      <div className="mt-10 p-4 rounded-lg bg-smoke-50 border border-smoke-100 text-sm text-smoke-600 leading-relaxed">
        На что идут средства: хостинг и домен, разработка новых калькуляторов и перевод сайта
        на другие языки. Спасибо, что пользуетесь BeeCalc Hub! 🐝
      </div>
    </div>
  );
}
