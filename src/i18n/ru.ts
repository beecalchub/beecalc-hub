// Russian translations for BeeCalc Hub (Phase 1: navigation, pages, calculator titles/descriptions)
// Reviewed terminology: pasека terminology per common RU beekeeping usage.

export interface LocaleCalcMeta {
  title: string;
  description: string;
}

export const LANGUAGES = [
  { code: 'en', label: 'English', active: true, prefix: '' },
  { code: 'ru', label: 'Русский', active: true, prefix: '/ru' },
  { code: 'fr', label: 'Français', active: false, prefix: '/fr' },
  { code: 'es', label: 'Español', active: false, prefix: '/es' },
  { code: 'de', label: 'Deutsch', active: false, prefix: '/de' },
  { code: 'ro', label: 'Română', active: false, prefix: '/ro' },
] as const;

export const RU_UI = {
  nav: {
    home: 'Главная',
    allCalculators: 'Все калькуляторы',
    about: 'О сайте',
    menu: 'Меню',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    language: 'Язык',
    soon: 'скоро',
  },
  hero: {
    titleLine1: 'Умные инструменты',
    titleAccent: 'для современной пасеки',
    subtitle:
      'Бесплатные практичные калькуляторы для всех задач пчеловода - от приготовления сиропа и борьбы с варроа до расчёта прибыли и планирования сезона.',
    browseAll: 'Все калькуляторы',
    newToBeekeeping: 'Новичок в пчеловодстве?',
  },
  featured: {
    title: 'Избранные калькуляторы',
    subtitle: 'Самые нужные инструменты на каждый день',
  },
  popular: {
    title: 'Популярные инструменты',
    subtitle: 'Чем пчеловоды пользуются чаще всего',
    reasons: {
      'sugar-syrup': 'Главный инструмент подкормки',
      'varroa-infestation-rate': 'Обязательный контроль клеща',
      'honey-moisture-correction': 'Контроль качества мёда',
      'cost-per-hive': 'Знайте свои цифры',
      'split-planning': 'Весенние работы',
      'oav-dosing': 'Безопасная обработка',
      'harvest-estimator': 'Планирование урожая',
      'overwintering-readiness': 'Подготовка к зиме',
    } as Record<string, string>,
  },
  categoriesSection: {
    title: 'Категории калькуляторов',
    subtitle: 'Инструменты сгруппированы по задачам',
  },
  beginner: {
    title: 'Новичок в пчеловодстве?',
    subtitle:
      'Начните с этих базовых калькуляторов. Каждый поможет принимать уверенные решения с первого сезона.',
    seeAll: 'Все инструменты для начинающих',
    tools: [
      { slug: 'beginner-hive-setup', icon: '🌱', label: 'Первый улей', desc: 'Список оборудования и бюджет' },
      { slug: 'sugar-syrup', icon: '🧪', label: 'Сахарный сироп', desc: 'Правильная пропорция с первого раза' },
      { slug: 'varroa-infestation-rate', icon: '🔬', label: 'Проверка заклещённости', desc: 'Когда пора обрабатывать' },
      { slug: 'honey-bottling', icon: '🫙', label: 'Розлив мёда', desc: 'Сколько банок нужно под урожай' },
    ],
  },
  footer: {
    brandDesc: 'Бесплатные практичные калькуляторы для пчеловодов - от любителей до промышленных пасек.',
    calculators: 'Калькуляторы',
    more: 'Ещё',
    info: 'Информация',
    feeding: 'Подкормка',
    honeyProduction: 'Производство мёда',
    varroa: 'Борьба с варроа',
    business: 'Бизнес-инструменты',
    beginners: 'Для начинающих',
    forage: 'Кормовая база',
    disclaimer: 'Отказ от ответственности',
    contact: 'Контакты',
    supportUs: 'Поддержать проект',
    copyright: 'Бесплатные инструменты для пчеловодов.',
  },
  calculator: {
    breadcrumbRoot: 'Калькуляторы',
    related: 'Похожие калькуляторы',
    availableNow: 'Доступны сейчас',
    disclaimer:
      'Расчёты носят справочный характер и основаны на общепринятых нормах. Всегда учитывайте местные условия, породу пчёл и собственный опыт.',
    disclaimerLink: 'Подробнее об условиях и допущениях',
  },
  allCalcsPage: {
    title: 'Все калькуляторы',
    subtitle: 'Полная библиотека калькуляторов для пчеловодов, сгруппированная по категориям.',
    searchNote: 'Поиск и фильтры доступны в английской версии; полный перевод - в работе.',
    count: (n: number) => ruPlural(n, 'калькулятор', 'калькулятора', 'калькуляторов'),
  },
  support: {
    title: 'Поддержать проект',
    intro:
      'BeeCalc Hub бесплатен и останется бесплатным. Если калькуляторы экономят вам время - поддержите развитие проекта.',
    coffee: 'Buy Me a Coffee',
    donate: 'Сделать пожертвование',
    bannerTitle: 'Нравится BeeCalc Hub?',
    bannerText: 'Поддержите разработку новых калькуляторов.',
  },
  contact: {
    title: 'Контакты',
    intro: 'Вопросы, ошибки, идеи новых калькуляторов - напишите нам.',
    email: 'Написать письмо',
    emailDesc: 'Общие вопросы и предложения',
    bug: 'Сообщить об ошибке',
    bugDesc: 'Что-то работает неправильно',
    feature: 'Предложить калькулятор',
    featureDesc: 'Какого инструмента вам не хватает',
  },
  about: {
    title: 'О сайте BeeCalc Hub',
    metaDesc: 'BeeCalc Hub - бесплатные практичные калькуляторы для пчеловодов любого уровня.',
  },
  disclaimerPage: {
    title: 'Отказ от ответственности и допущения',
    metaDesc: 'Допущения, ограничения и правила использования калькуляторов BeeCalc Hub.',
  },
  notFound: {
    title: 'Страница не найдена',
    text: 'Похоже, эта страница улетела на другой цветок. Такого калькулятора или страницы не существует.',
    browse: 'Все калькуляторы',
    home: 'На главную',
  },
} as const;

export function ruPlural(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  let word = many;
  if (abs < 11 || abs > 14) {
    if (last === 1) word = one;
    else if (last >= 2 && last <= 4) word = few;
  }
  return `${n} ${word}`;
}

export const RU_CATEGORIES: Record<string, { title: string; description: string }> = {
  'colony-and-hive-management': {
    title: 'Семьи и ульи',
    description: 'Учёт численности, планирование отводков, готовность к зимовке и уверенное управление семьями.',
  },
  'feeding-and-nutrition': {
    title: 'Подкормка и питание',
    description: 'Сироп, зимние запасы, стоимость корма - чтобы пчёлы были сыты круглый год.',
  },
  'honey-production-and-extraction': {
    title: 'Мёд: производство и откачка',
    description: 'Прогноз урожая, розлив, коррекция влажности и максимум от каждого медосбора.',
  },
  'wax-and-hive-products': {
    title: 'Воск и продукты улья',
    description: 'Перетопка воска, свечи, бальзамы и оценка побочных продуктов улья.',
  },
  'varroa-and-pest-management': {
    title: 'Варроа и вредители',
    description: 'Контроль заклещённости, сроки обработок и защита семей от вредителей.',
  },
  'disease-and-inspection-support': {
    title: 'Болезни и осмотры',
    description: 'Оценка здоровья семей, график осмотров и раннее выявление проблем.',
  },
  'equipment-and-build': {
    title: 'Оборудование и постройки',
    description: 'Конфигурации ульев, расчёт материалов и планирование оборудования пасеки.',
  },
  'seasonal-planning': {
    title: 'Сезонное планирование',
    description: 'Весеннее наращивание, отсчёт до взятка и подготовка к зимовке.',
  },
  'queen-breeding-and-genetics': {
    title: 'Матководство и генетика',
    description: 'Прививки личинок, облёты маток и программа племенной работы.',
  },
  'pollination-services': {
    title: 'Услуги опыления',
    description: 'Цены контрактов, оценка силы семей, расстановка и доход от опыления.',
  },
  'business-and-profitability': {
    title: 'Бизнес и прибыль',
    description: 'Затраты, маржа, точка безубыточности - управляйте пасекой как бизнесом.',
  },
  'education-and-hobbyist': {
    title: 'Обучение и начинающим',
    description: 'Первый улей, бюджет пчеловода и простые инструменты-решалки.',
  },
  'environmental-and-forage': {
    title: 'Среда и кормовая база',
    description: 'Радиус лёта, посадки медоносов и условия вокруг пасеки.',
  },
  'data-conversion-and-utility': {
    title: 'Конвертеры и утилиты',
    description: 'Единицы измерения, масштабирование рецептов и повседневные расчёты пчеловода.',
  },
  'advanced-premium': {
    title: 'Профессиональные инструменты',
    description: 'Панели показателей, модели оценки и планирование промышленной пасеки.',
  },
};

// 142 calculators: Russian title + one-sentence description (used for cards, page header and SEO meta)
export const RU_CALC: Record<string, LocaleCalcMeta> = {
  'hive-population-estimator': { title: 'Оценка численности пчёл', description: 'Оцените количество пчёл в семье по числу обсиживаемых рамок.' },
  'brood-area': { title: 'Площадь расплода', description: 'Рассчитайте площадь расплода в семье по рамкам и проценту заполнения.' },
  'queen-rearing-timeline': { title: 'График вывода маток', description: 'Календарь вывода маток от прививки личинок до начала яйцекладки, с датами.' },
  'split-planning': { title: 'Планирование отводков', description: 'Спланируйте деление семей: сколько отводков можно сформировать и какие рамки им дать.' },
  'overwintering-readiness': { title: 'Готовность к зимовке', description: 'Проверьте готовность семьи к зиме: запасы корма, сила семьи, обработка от клеща.' },
  'sugar-syrup': { title: 'Сахарный сироп', description: 'Рассчитайте сахар и воду для сиропа 1:1 или 2:1 на нужный объём.' },
  'winter-stores': { title: 'Зимние запасы корма', description: 'Определите, сколько корма нужно семье на зиму и сколько ещё докормить.' },
  'feed-cost': { title: 'Стоимость подкормки', description: 'Посчитайте затраты на сахар и сироп для подкормки пасеки за сезон.' },
  'fondant-recipe': { title: 'Рецепт канди', description: 'Рассчитайте ингредиенты для канди на нужное число семей.' },
  'pollen-patty-batch': { title: 'Белковая подкормка', description: 'Рассчитайте замес белкового теста (канди с пыльцой) на всю пасеку.' },
  'apiary-total-feed': { title: 'Подкормка всей пасеки', description: 'Суммарный расчёт сиропа и сахара для всех семей сразу.' },
  'feed-requirement': { title: 'Потребность в корме', description: 'Узнайте, сколько корма нужно семье в зависимости от сезона и силы.' },
  'emergency-feeding': { title: 'Экстренная подкормка', description: 'Быстрый расчёт спасательной подкормки для голодающей семьи.' },
  'protein-need-estimator': { title: 'Потребность в белке', description: 'Оцените потребность семьи в белковой подкормке при нехватке пыльцы.' },
  'syrup-concentration-converter': { title: 'Конвертер сиропа', description: 'Пересчитайте сироп между концентрациями 1:1, 3:2 и 2:1.' },
  'honey-bottling': { title: 'Розлив мёда', description: 'Спланируйте розлив: сколько банок каждого объёма получится из урожая.' },
  'honey-revenue': { title: 'Выручка от мёда', description: 'Рассчитайте выручку от продажи мёда по вашим ценам и объёмам.' },
  'honey-moisture-correction': { title: 'Коррекция влажности мёда', description: 'Определите, как снизить влажность мёда до нормы перед розливом.' },
  'harvest-estimator': { title: 'Прогноз медосбора', description: 'Оцените ожидаемый урожай мёда по силе семей и условиям взятка.' },
  'jar-inventory-planner': { title: 'Планировщик банок', description: 'Рассчитайте, сколько банок и крышек закупить под урожай.' },
  'super-requirement': { title: 'Потребность в магазинах', description: 'Узнайте, сколько магазинных надставок понадобится на время взятка.' },
  'jar-label-quantity': { title: 'Количество этикеток', description: 'Посчитайте этикетки для банок с запасом на брак.' },
  'cappings-wax-yield': { title: 'Воск из забруса', description: 'Оцените, сколько воска получится из забруса после откачки.' },
  'extraction-day-planner': { title: 'План дня откачки', description: 'Спланируйте день откачки мёда: время, людей и оборудование.' },
  'extractor-load': { title: 'Загрузка медогонки', description: 'Рассчитайте число циклов медогонки для вашего количества рамок.' },
  'honey-settling-tank-size': { title: 'Размер отстойника', description: 'Подберите объём отстойника для мёда под ваш урожай.' },
  'comb-honey-yield': { title: 'Выход сотового мёда', description: 'Оцените выход сотового (секционного) мёда с рамок.' },
  'honey-density-weight-converter': { title: 'Объём и вес мёда', description: 'Переведите мёд между литрами, килограммами и фунтами с учётом плотности.' },
  'moisture-shrink-loss': { title: 'Потери при усушке', description: 'Рассчитайте потери веса мёда при снижении влажности.' },
  'varroa-infestation-rate': { title: 'Заклещённость (варроа)', description: 'Рассчитайте процент заклещённости по смыву или сахарной обсыпке.' },
  'oav-dosing': { title: 'Возгонка щавелевой кислоты', description: 'Рассчитайте дозу щавелевой кислоты для возгонки по числу корпусов.' },
  'threshold-action': { title: 'Порог обработки', description: 'Узнайте, превышен ли порог заклещённости и пора ли обрабатывать.' },
  'treatment-cost': { title: 'Стоимость обработки', description: 'Посчитайте затраты на обработку пасеки от клеща.' },
  'pollination-contract-pricing': { title: 'Цена контракта на опыление', description: 'Рассчитайте справедливую цену контракта на опыление.' },
  'hive-strength-grading': { title: 'Оценка силы семей', description: 'Оцените силу семей по рамкам с пчелой и расплодом - для опыления и аудита.' },
  'cost-per-hive': { title: 'Затраты на семью', description: 'Посчитайте себестоимость содержания одной пчелосемьи в год.' },
  'apiary-profit': { title: 'Прибыль пасеки', description: 'Сведите доходы и расходы пасеки и узнайте прибыль за сезон.' },
  'retail-pricing': { title: 'Розничная цена мёда', description: 'Рассчитайте розничную цену с учётом себестоимости и наценки.' },
  'break-even': { title: 'Точка безубыточности', description: 'Узнайте, сколько мёда нужно продать, чтобы окупить затраты.' },
  'wholesale-vs-retail': { title: 'Опт или розница', description: 'Сравните выручку при оптовой и розничной продаже мёда.' },
  'beginner-hive-setup': { title: 'Первый улей: комплект и бюджет', description: 'Соберите список оборудования и бюджет для первого улья.' },
  'beekeeping-budget': { title: 'Бюджет пчеловода', description: 'Спланируйте годовой бюджет пасеки по статьям расходов.' },
  'inspection-note-to-score': { title: 'Оценка по записям осмотра', description: 'Переведите записи осмотра в балльную оценку состояния семьи.' },
  'apiary-checklist-generator': { title: 'Генератор чек-листов', description: 'Создайте сезонный чек-лист работ для вашей пасеки.' },
  'can-i-split-this-hive': { title: 'Можно ли делить эту семью?', description: 'Проверьте, достаточно ли сильна семья для формирования отводков.' },
  'do-i-need-to-feed': { title: 'Нужно ли подкармливать?', description: 'Определите, нуждается ли семья в подкормке прямо сейчас.' },
  'how-much-honey-can-i-expect': { title: 'Сколько мёда ожидать?', description: 'Быстрый прогноз урожая мёда для начинающих пчеловодов.' },
  'what-jar-price-should-i-charge': { title: 'Какую цену ставить за банку?', description: 'Рассчитайте цену банки мёда с учётом затрат и рынка.' },
  'bee-forage-radius': { title: 'Радиус лёта пчёл', description: 'Узнайте площадь кормовой базы в радиусе продуктивного лёта.' },
  'water-requirement-estimator': { title: 'Потребность в воде', description: 'Оцените потребность пасеки в воде и спланируйте поилку.' },
  'metric-imperial-converter': { title: 'Конвертер мер пчеловода', description: 'Переводите единицы: фунты и килограммы, галлоны и литры, °F и °C.' },
  'batch-scaling': { title: 'Масштабирование рецепта', description: 'Пересчитайте любой рецепт - сироп, канди, вощину - на другой объём.' },
  'date-interval': { title: 'Интервал между датами', description: 'Считайте дни между датами и прибавляйте сроки к датам.' },
  'egg-to-emergence-timeline': { title: 'От яйца до выхода пчелы', description: 'Календарь развития рабочей пчелы, трутня и матки с точными датами.' },
  'swarm-risk': { title: 'Риск роения', description: 'Оцените риск роения по маточникам, тесноте, сезону и возрасту матки.' },
  'hive-balancing': { title: 'Выравнивание семей', description: 'Рассчитайте перестановку рамок расплода от сильных семей слабым.' },
  'colony-growth-projection': { title: 'Прогноз роста семьи', description: 'Спрогнозируйте рост численности семьи по неделям.' },
  'apiary-carrying-capacity': { title: 'Ёмкость кормовой базы', description: 'Узнайте, сколько семей прокормит местность вокруг пасеки.' },
  'queen-replacement-timing': { title: 'Когда менять матку', description: 'Решите, пора ли менять матку, по возрасту, засеву и поведению семьи.' },
  'nuc-build-up': { title: 'Развитие отводка', description: 'Спрогнозируйте, через сколько недель отводок заполнит корпус.' },
  'wax-rendering-yield': { title: 'Выход воска при перетопке', description: 'Оцените чистый выход воска из сырья при перетопке и объём мервы.' },
  'foundation-sheet-requirement': { title: 'Потребность в вощине', description: 'Посчитайте листы вощины на все ульи и их стоимость.' },
  'candle-yield': { title: 'Выход свечей', description: 'Рассчитайте, сколько свечей получится из вашего воска, и прибыль.' },
  'lip-balm-soap-batch': { title: 'Бальзам и мыло из воска', description: 'Рассчитайте замес бальзама для губ или мыла на пчелином воске.' },
  'propolis-yield-value': { title: 'Сбор и стоимость прополиса', description: 'Оцените сбор прополиса по пасеке и его стоимость за сезон.' },
  'royal-jelly-production': { title: 'Маточное молочко', description: 'Оцените выход маточного молочка по числу прививок и проценту приёма.' },
  'pollen-harvest': { title: 'Сбор пыльцы', description: 'Оцените сбор пыльцы пыльцеуловителями по пасеке за сезон.' },
  'treatment-timing': { title: 'Сроки обработки от клеща', description: 'Подберите оптимальное окно обработки от варроа под ваш сезон.' },
  'mite-drop-trend': { title: 'Динамика осыпи клеща', description: 'Отслеживайте суточную осыпь клеща на поддоне и её тренд.' },
  'apiary-wide-mite-dashboard': { title: 'Сводка заклещённости пасеки', description: 'Сводная картина заклещённости по всем семьям пасеки.' },
  'varroa-growth-projection': { title: 'Прогноз роста варроа', description: 'Спрогнозируйте рост популяции клеща без обработки.' },
  'brood-break-effect': { title: 'Эффект перерыва в расплоде', description: 'Оцените, насколько перерыв в расплоде снизит численность клеща.' },
  'drone-brood-removal-impact': { title: 'Вырезание трутнёвого расплода', description: 'Оцените эффект удаления трутнёвого расплода в борьбе с варроа.' },
  'resistance-rotation-planner': { title: 'Ротация препаратов', description: 'Спланируйте чередование средств от клеща, чтобы избежать резистентности.' },
  'small-hive-beetle-trap': { title: 'Ловушки для ульевого жука', description: 'Рассчитайте число ловушек для малого ульевого жука.' },
  'mouse-guard-opening': { title: 'Летковый заградитель', description: 'Подберите размер летка и заградителя от мышей по сезону.' },
  'wax-moth-risk': { title: 'Риск восковой моли', description: 'Оцените риск поражения суши восковой молью при хранении.' },
  'inspection-interval': { title: 'Интервал осмотров', description: 'Получите рекомендуемую частоту осмотров по сезону и опыту.' },
  'disease-symptom-scoring': { title: 'Оценка симптомов болезней', description: 'Оцените симптомы и получите вероятные болезни: гнильцы, аскосфероз и другие.' },
  'queenrightness-checker': { title: 'Есть ли матка?', description: 'Проверьте признаки наличия матки: яйца, личинки, трутовки.' },
  'brood-pattern-scoring': { title: 'Качество засева', description: 'Оцените сплошность расплода и работу матки в баллах.' },
  'colony-health-index': { title: 'Индекс здоровья семьи', description: 'Сведите силу, расплод, корм и клеща в единый индекс здоровья.' },
  'deadout-analysis': { title: 'Анализ гибели семьи', description: 'Определите вероятную причину гибели семьи по признакам в улье.' },
  'langstroth-box-volume': { title: 'Объём корпуса Лангстрота', description: 'Рассчитайте объём и медовую ёмкость корпусов Лангстрота.' },
  'frame-count-by-config': { title: 'Рамки по конфигурации', description: 'Посчитайте рамки на все ульи по вашей конфигурации корпусов.' },
  'apiary-equipment-planner': { title: 'Планировщик оборудования', description: 'Соберите список и бюджет оборудования под размер пасеки.' },
  'foundationless-frame-spacing': { title: 'Безвощинные рамки', description: 'Рассчитайте расстановку безвощинных рамок для ровной отстройки сотов.' },
  'pallet-loading': { title: 'Погрузка на паллеты', description: 'Спланируйте паллеты и машины для перевозки ульев.' },
  'trailer-capacity': { title: 'Вместимость прицепа', description: 'Узнайте, сколько ульев поместится в прицеп, и вес загрузки.' },
  'storage-space': { title: 'Складские площади', description: 'Оцените площадь склада под оборудование вашей пасеки.' },
  'paint-stain-quantity': { title: 'Краска и пропитка', description: 'Посчитайте краску или пропитку для покраски корпусов.' },
  'nail-screw-material': { title: 'Гвозди и саморезы', description: 'Посчитайте крепёж для сборки корпусов и рамок.' },
  'hive-stand-height-footprint': { title: 'Подставки под ульи', description: 'Подберите высоту и площадь подставок под ульи.' },
  'apiary-layout': { title: 'Схема пасеки', description: 'Спланируйте расстановку ульев и нужную площадь пасеки.' },
  'electric-fence-requirement': { title: 'Электроизгородь от медведей', description: 'Рассчитайте электроизгородь: провод, энергизатор и стоимость.' },
  'spring-buildup': { title: 'Весеннее наращивание', description: 'Спланируйте наращивание силы семей к главному взятку.' },
  'main-flow-countdown': { title: 'Отсчёт до главного взятка', description: 'Считайте дни до взятка и планируйте постановку магазинов.' },
  'fall-preparation': { title: 'Подготовка к осени', description: 'Осенняя подготовка: запасы корма, обработка, утепление - по пунктам.' },
  'winter-loss-replacement': { title: 'Восполнение зимних потерь', description: 'Оцените ожидаемые потери за зиму и стоимость их восполнения.' },
  'local-bloom-calendar': { title: 'Календарь цветения', description: 'Ориентировочный календарь цветения основных медоносов региона.' },
  'forage-gap': { title: 'Безвзяточный период', description: 'Рассчитайте длину безвзяточного периода и потребность в подкормке.' },
  'super-addition-timing': { title: 'Когда ставить магазин', description: 'Решите, пора ли ставить следующий магазин, по заполнению и взятку.' },
  'wrapping-insulation': { title: 'Утепление на зиму', description: 'Подберите утепление ульев по климату и посчитайте материалы.' },
  'ventilation': { title: 'Вентиляция улья', description: 'Рассчитайте вентиляцию улья на зиму и лето против сырости и перегрева.' },
  'mating-window': { title: 'Окно облёта матки', description: 'Рассчитайте сроки брачного облёта матки по дате её выхода.' },
  'drone-saturation': { title: 'Насыщенность трутнями', description: 'Оцените, хватает ли трутней для качественного спаривания маток.' },
  'queen-cage-candy': { title: 'Канди для клеточек', description: 'Рассчитайте сахарную пудру и мёд для канди в маточные клеточки.' },
  'breeder-selection-scorecard': { title: 'Отбор племенных маток', description: 'Оцените маток по продуктивности, миролюбию, зимовке и устойчивости к клещу.' },
  'inbreeding-risk-lineage': { title: 'Риск инбридинга', description: 'Оцените риск близкородственного разведения в вашей линии.' },
  'graft-acceptance-rate': { title: 'Приём прививок', description: 'Отслеживайте процент приёма привитых личинок и улучшайте результат.' },
  'queen-production-profitability': { title: 'Рентабельность вывода маток', description: 'Посчитайте прибыльность продажи маток за сезон.' },
  'transport-load-pollination': { title: 'Перевозка на опыление', description: 'Спланируйте рейсы, время в пути и топливо для перевозки ульев.' },
  'pollination-deployment-planner': { title: 'Расстановка на опылении', description: 'Распределите ульи по полям и спланируйте сроки выставки.' },
  'pollination-revenue': { title: 'Доход от опыления', description: 'Рассчитайте доход от контрактов на опыление с бонусами за культуры.' },
  'travel-surcharge': { title: 'Надбавка за выезд', description: 'Рассчитайте справедливую транспортную надбавку к вашим услугам.' },
  'labor-cost': { title: 'Затраты на труд', description: 'Посчитайте трудозатраты по пасеке и их стоимость.' },
  'roi': { title: 'Окупаемость вложений (ROI)', description: 'Рассчитайте окупаемость вложений в пасеку.' },
  'expansion-planning': { title: 'План расширения', description: 'Спланируйте расширение пасеки: семьи, оборудование, бюджет.' },
  'package-bee-vs-nuc': { title: 'Пчелопакет или отводок', description: 'Сравните покупку пчелопакета и отводка по цене и скорости развития.' },
  'replacement-cost-winter-losses': { title: 'Стоимость восполнения потерь', description: 'Посчитайте, во что обойдётся восполнение зимних потерь разными способами.' },
  'inventory-value': { title: 'Стоимость имущества пасеки', description: 'Оцените стоимость оборудования и запасов вашей пасеки.' },
  'cash-flow-by-season': { title: 'Денежный поток по сезонам', description: 'Посмотрите приход и расход денег пасеки по сезонам года.' },
  'land-area-coverage': { title: 'Покрытие территории', description: 'Рассчитайте, какую площадь опыляют ваши пчёлы.' },
  'planting-calculator-pollinator': { title: 'Посадки для опылителей', description: 'Рассчитайте посадки медоносов для поддержки пчёл.' },
  'nectar-potential': { title: 'Нектарный потенциал', description: 'Оцените нектаропродуктивность местности вокруг пасеки.' },
  'shade-sun-exposure': { title: 'Тень и солнце', description: 'Оцените место для ульев: сколько там солнца и тени.' },
  'windbreak': { title: 'Ветрозащита пасеки', description: 'Спланируйте ветрозащиту пасеки и её размеры.' },
  'multiple-hive-totalizer': { title: 'Суммарный учёт по пасеке', description: 'Суммируйте урожай, расходы и прибыль по всем семьям.' },
  'honey-jar-case-pack': { title: 'Упаковка банок в коробки', description: 'Посчитайте коробки для упаковки банок с мёдом.' },
  'frame-coverage-percent': { title: 'Процент обсиживания рамки', description: 'Рассчитайте, на сколько процентов рамка покрыта пчёлами или расплодом.' },
  'moisture-temperature-log': { title: 'Журнал влажности и температуры', description: 'Проверьте по показаниям, стабилен ли мёд и готов ли к розливу.' },
  'yield-per-hive-benchmark': { title: 'Сравнение урожайности', description: 'Сравните ваш медосбор на семью со средними показателями.' },
  'inspection-recommendation-engine': { title: 'Рекомендации по осмотру', description: 'Получите рекомендацию, стоит ли осматривать семью сейчас.' },
  'apiary-kpi-dashboard': { title: 'Панель показателей пасеки', description: 'Ключевые показатели пасеки и общая оценка её состояния.' },
  'colony-scoring-sale-value': { title: 'Оценка семьи для продажи', description: 'Оцените семью в баллах и справедливую цену при продаже.' },
  'commercial-labor-scheduling': { title: 'График работ бригады', description: 'Спланируйте бригаду и сроки работ на промышленной пасеке.' },
  'migratory-route-profitability': { title: 'Рентабельность кочёвки', description: 'Посчитайте прибыльность кочевого маршрута с учётом топлива и труда.' },
  'weather-linked-nectar-flow': { title: 'Прогноз взятка по погоде', description: 'Спрогнозируйте силу взятка по температуре, осадкам и длине дня.' },
  'apiary-comparison': { title: 'Сравнение пасек', description: 'Сравните две пасеки по урожайности на семью и потерям.' },
  'queen-bank-capacity': { title: 'Ёмкость банка маток', description: 'Рассчитайте, сколько маток поместится в банк и сколько нужно пчёл-кормилиц.' },
  'nuc-shipment-planning': { title: 'Отправка отводков', description: 'Спланируйте пересылку отводков: тара, вентиляция, стоимость.' },
  'custom-quote-builder': { title: 'Конструктор сметы услуг', description: 'Соберите коммерческое предложение: база, выезд, допработы и аванс.' },
};

export function ruCalcTitle(slug: string, fallback: string): string {
  return RU_CALC[slug]?.title ?? fallback;
}

export function ruCalcDesc(slug: string, fallback: string): string {
  return RU_CALC[slug]?.description ?? fallback;
}

export function ruCategoryTitle(slug: string, fallback: string): string {
  return RU_CATEGORIES[slug]?.title ?? fallback;
}
