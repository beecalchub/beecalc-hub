import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/data/constants';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с BeeCalc Hub: вопросы, сообщения об ошибках и идеи новых калькуляторов.',
  alternates: {
    canonical: `${SITE_URL}/ru/contact`,
    languages: { en: `${SITE_URL}/contact`, ru: `${SITE_URL}/ru/contact` },
  },
};

const EMAIL = 'beecalchub@gmail.com';

const bugBody = encodeURIComponent(
  `Опишите проблему:\n\n\nКакой калькулятор:\n\nЧто вы ввели:\n\nЧто ожидали увидеть:\n\nЧто показало на самом деле:\n\nБраузер и устройство (например, Chrome на Windows, Safari на iPhone):\n`
);
const featureBody = encodeURIComponent(
  `Какого калькулятора вам не хватает:\n\n\nКакую задачу он должен решать:\n\nКакие данные вы бы вводили:\n\nКакой результат хотели бы получить:\n`
);

export default function RuContactPage() {
  return (
    <div className="container-page py-8 sm:py-12 max-w-2xl">
      <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-3">Контакты</h1>
      <p className="text-smoke-600 mb-8">
        Вопросы, ошибки, идеи новых калькуляторов - напишите нам, мы читаем каждое письмо.
      </p>

      <div className="space-y-4">
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-4 p-5 rounded-xl border border-smoke-200 bg-white hover:border-honey-300 hover:shadow-warm transition-all group"
          style={{ minHeight: 44 }}
        >
          <span className="text-3xl flex-shrink-0" aria-hidden="true">✉️</span>
          <div>
            <p className="font-display text-lg text-smoke-900 group-hover:text-honey-800 transition-colors">
              Написать письмо
            </p>
            <p className="text-sm text-smoke-600">Общие вопросы и предложения - {EMAIL}</p>
          </div>
        </a>

        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent('Ошибка на BeeCalc Hub')}&body=${bugBody}`}
          className="flex items-center gap-4 p-5 rounded-xl border border-smoke-200 bg-white hover:border-honey-300 hover:shadow-warm transition-all group"
          style={{ minHeight: 44 }}
        >
          <span className="text-3xl flex-shrink-0" aria-hidden="true">🐛</span>
          <div>
            <p className="font-display text-lg text-smoke-900 group-hover:text-honey-800 transition-colors">
              Сообщить об ошибке
            </p>
            <p className="text-sm text-smoke-600">Что-то считает неправильно или не работает</p>
          </div>
        </a>

        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent('Идея калькулятора для BeeCalc Hub')}&body=${featureBody}`}
          className="flex items-center gap-4 p-5 rounded-xl border border-smoke-200 bg-white hover:border-honey-300 hover:shadow-warm transition-all group"
          style={{ minHeight: 44 }}
        >
          <span className="text-3xl flex-shrink-0" aria-hidden="true">💡</span>
          <div>
            <p className="font-display text-lg text-smoke-900 group-hover:text-honey-800 transition-colors">
              Предложить калькулятор
            </p>
            <p className="text-sm text-smoke-600">Какого инструмента вам не хватает на пасеке</p>
          </div>
        </a>
      </div>
    </div>
  );
}
