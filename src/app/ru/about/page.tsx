import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/data/constants';

export const metadata: Metadata = {
  title: 'О сайте',
  description: 'BeeCalc Hub - бесплатные практичные калькуляторы для пчеловодов любого уровня.',
  alternates: {
    canonical: `${SITE_URL}/ru/about`,
    languages: { en: `${SITE_URL}/about`, ru: `${SITE_URL}/ru/about` },
  },
};

export default function RuAboutPage() {
  return (
    <div className="container-page py-8 sm:py-12 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl text-smoke-900 mb-6">О сайте BeeCalc Hub</h1>

      <div className="prose prose-smoke max-w-none space-y-6 text-smoke-700 leading-relaxed">
        <p className="text-lg">
          BeeCalc Hub - это бесплатная открытая коллекция практичных калькуляторов, созданных специально
          для пчеловодов: от новичков с первым ульем до промышленных пасек на сотни семей.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Зачем мы это сделали</h2>
        <p>
          Пчеловодство - это постоянные решения, за которыми стоят цифры: сколько сиропа замешать,
          когда заклещённость требует обработки, сколько магазинов поставить, достаточно ли сильна семья
          для деления. Мы собрали всю эту математику в одном месте - быстро, удобно и с привязкой
          к реальной практике.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Как это работает</h2>
        <p>
          Каждый калькулятор построен вокруг конкретной задачи или решения пчеловода. Вы вводите свои
          данные - калькулятор показывает результат и допущения, на которых он основан. У каждого
          инструмента есть метка типа: точный расчёт, оценка, балльная карта, планировщик или помощник
          в принятии решения - вы всегда знаете, чего ожидать.
        </p>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Возможности</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Переключение единиц</strong> - метрическая и имперская системы на всём сайте</li>
          <li><strong>Избранное</strong> - отмечайте часто используемые калькуляторы звёздочкой</li>
          <li><strong>Недавние</strong> - быстро возвращайтесь к последним инструментам</li>
          <li><strong>Сохранение значений</strong> - введённые данные сохраняются в вашем браузере</li>
          <li><strong>Мобильный дизайн</strong> - удобно пользоваться с телефона прямо на пасеке</li>
          <li><strong>Без регистрации</strong> - всё работает прямо в браузере</li>
        </ul>

        <h2 className="font-display text-xl text-smoke-900 mt-8 mb-3">Языки</h2>
        <p>
          Сайт доступен на английском и русском языках. Французская, испанская, немецкая и румынская
          версии - в работе. Интерфейсы самих калькуляторов переводятся на русский поэтапно.
        </p>

        <p className="mt-8">
          Вопросы или идеи? <Link href="/ru/contact" className="text-honey-700 hover:underline font-medium">Напишите нам</Link>.
        </p>
      </div>
    </div>
  );
}
