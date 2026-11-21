import React from 'react';
import type { Metadata } from 'next';
import { SITE_URL } from '@/data/constants';
import { CopyTemplateButton } from '@/components/ru/CopyTemplateButton';

export const metadata: Metadata = {
  title: 'Контакты',
  description: 'Свяжитесь с BeeCalc Hub: вопросы, сообщения об ошибках и идеи новых калькуляторов.',
  alternates: {
    canonical: `${SITE_URL}/ru/contact`,
    languages: { en: `${SITE_URL}/contact`, ru: `${SITE_URL}/ru/contact` },
  },
};

const EMAIL = 'beecalchub@gmail.com';

// Note: the email opens with a Russian subject only. Some mail programs garble
// pre-filled Russian text in the message body, so the questions are shown here instead.
const BUG_QUESTIONS = [
  'Какой калькулятор',
  'Что вы ввели',
  'Что ожидали увидеть',
  'Что показало на самом деле',
  'Браузер и устройство (например, Chrome на Windows, Safari на iPhone)',
];
const FEATURE_QUESTIONS = [
  'Какого калькулятора вам не хватает',
  'Какую задачу он должен решать',
  'Какие данные вы бы вводили',
  'Какой результат хотели бы получить',
];

const asTemplate = (items: string[]) => items.map((q) => `${q}:\n`).join('\n');

const cardClass =
  'flex items-center gap-4 p-5 rounded-xl border border-smoke-200 bg-white hover:border-honey-300 hover:shadow-warm transition-all group';

function Questions({ items }: { items: string[] }) {
  return (
    <div className="mt-2 ml-2 pl-4 border-l-2 border-honey-200">
      <p className="text-sm text-smoke-600 mb-1">В письме, пожалуйста, укажите:</p>
      <ul className="list-disc pl-5 text-sm text-smoke-600 space-y-0.5">
        {items.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ul>
      <CopyTemplateButton text={asTemplate(items)} />
    </div>
  );
}

export default function RuContactPage() {
  return (
    <div className="container-page py-8 sm:py-12 max-w-2xl">
      <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-3">Контакты</h1>
      <p className="text-smoke-600 mb-8">
        Вопросы, ошибки, идеи новых калькуляторов - напишите нам, мы читаем каждое письмо.
      </p>

      <div className="space-y-5">
        <a href={`mailto:${EMAIL}`} className={cardClass} style={{ minHeight: 44 }}>
          <span className="text-3xl flex-shrink-0" aria-hidden="true">✉️</span>
          <div>
            <p className="font-display text-lg text-smoke-900 group-hover:text-honey-800 transition-colors">
              Написать письмо
            </p>
            <p className="text-sm text-smoke-600">Общие вопросы и предложения - {EMAIL}</p>
          </div>
        </a>

        <div>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent('Ошибка на BeeCalc Hub')}`}
            className={cardClass}
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
          <Questions items={BUG_QUESTIONS} />
        </div>

        <div>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent('Идея калькулятора для BeeCalc Hub')}`}
            className={cardClass}
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
          <Questions items={FEATURE_QUESTIONS} />
        </div>
      </div>
    </div>
  );
}
