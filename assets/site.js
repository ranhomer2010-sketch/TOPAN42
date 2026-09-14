document.documentElement.classList.add('js');

const serviceData = {
  detox: { category: 'Коррекция тела', title: 'Детокс', art: 'assets/art-detox.webp', artAlt: 'Иллюстрация лимфодренажного массажа тела', prices: [['60 минут', '3 500 ₽'], ['90 минут', '5 200 ₽']], description: 'Лимфодренажная программа для визуальной коррекции проблемных зон, уменьшения отёчности и возвращения коже тонуса.', benefits: ['живот и бока', 'руки и бёдра', 'ощущение лёгкости'] },
  postpartum: { category: 'Коррекция тела', title: 'Послеродовое восстановление', art: 'assets/art-postpartum.webp', artAlt: 'Иллюстрация бережного восстанавливающего массажа', prices: [['60 минут', '3 500 ₽']], description: 'Бережная программа для возвращения ощущения собранности, лёгкости и уверенности в своём теле после родов. Возможность проведения процедуры определяется индивидуально.', benefits: ['работа с отёчностью', 'тонус кожи', 'бережное восстановление'] },
  'ideal-body': { category: 'Коррекция тела', title: 'Идеальное тело', art: 'assets/art-ideal-body.webp', artAlt: 'Иллюстрация моделирующего массажа тела', prices: [['60 минут', '3 500 ₽'], ['90 минут', '5 200 ₽']], description: 'Комбинированная работа с качеством кожи, отёчностью и контурами тела для более гладкого и подтянутого силуэта.', benefits: ['тонус и гладкость', 'контуры коленей', 'обменные процессы'] },
  glutes: { category: 'Коррекция тела', title: 'Упругие ягодицы', art: 'assets/art-glutes.webp', artAlt: 'Иллюстрация массажа бёдер и ягодиц', prices: [['60 минут', '3 500 ₽']], description: 'Направленная ручная работа с нижней частью тела: бёдрами, ягодицами и зоной над коленями.', benefits: ['визуальный лифтинг', 'более чёткий силуэт', 'тонус тканей'] },
  'flat-stomach': { category: 'Коррекция тела', title: 'Плоский живот', art: 'assets/art-flat-stomach.webp', artAlt: 'Иллюстрация ручного массажа живота', prices: [['60 минут', '3 500 ₽']], description: 'Специализированная ручная техника для зоны живота и боков, направленная на тонус, уменьшение отёчности и визуальную коррекцию объёмов.', benefits: ['живот и бока', 'упругость кожи', 'ощущение лёгкости'] },
  'stop-age': { category: 'Омоложение лица', title: 'СтопВозраст', art: 'assets/art-stop-age.webp', artAlt: 'Иллюстрация омолаживающего массажа лица', prices: [['60 минут', '3 500 ₽']], description: 'Глубокая ручная работа с мышцами лица для более чёткого овала, свежего тона и естественного эффекта омоложения.', benefits: ['мышечный тонус', 'овал лица', 'здоровое сияние'] },
  'face-plastic': { category: 'Омоложение лица', title: 'Ручная пластика лица', art: 'assets/art-face-plastic.webp', artAlt: 'Иллюстрация скульптурного массажа лица', prices: [['60 минут', '3 500 ₽']], description: 'Техника для укрепления мышц, уменьшения отёчности и повышения упругости кожи без инъекций и хирургического вмешательства.', benefits: ['более мягкие складки', 'чёткий контур', 'упругость кожи'] },
  lifting: { category: 'Косметология', title: 'Лифтинг-комплекс', art: 'assets/art-lifting.webp', artAlt: 'Иллюстрация косметологического лифтинг-ухода', prices: [['60 минут', '5 000 ₽']], description: 'Пять этапов ухода работают последовательно: очищение, мягкое отшелушивание, ручной массаж, фонофорез и альгинатная маска.', benefits: ['интенсивное увлажнение', 'тонус кожи', 'свежий цвет лица'] },
  cleaning: { category: 'Косметология', title: 'Механическая чистка', art: 'assets/art-cleaning.webp', artAlt: 'Иллюстрация механической чистки лица', prices: [['105 минут', '3 600 ₽']], description: 'Классическая ручная процедура для глубокого очищения кожи и работы с закупоренными порами.', benefits: ['чёрные точки', 'расширенные поры', 'неровный рельеф'] },
  regeneration: { category: 'Косметология', title: 'Очищение + регенерация', art: 'assets/art-regeneration.webp', artAlt: 'Иллюстрация аппаратного очищения и ухода за лицом', prices: [['105 минут', '4 600 ₽']], description: 'Механическая чистка, алмазный пилинг и фонофорез в одной программе для чистой, гладкой и увлажнённой кожи.', benefits: ['глубокое очищение', 'обновление текстуры', 'восстановительный уход'] }
};

const tabs = Array.from(document.querySelectorAll('.tab'));
const cards = Array.from(document.querySelectorAll('.service-card'));
const programGrid = document.querySelector('#program-grid');

const activateTab = (tab, moveFocus = false) => {
  const category = tab.dataset.filter;
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('is-active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  cards.forEach((card) => {
    card.hidden = card.dataset.category !== category;
    if (!card.hidden) requestAnimationFrame(() => card.classList.add('is-visible'));
  });
  programGrid.setAttribute('aria-labelledby', tab.id);
  if (moveFocus) tab.focus();
};

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    activateTab(tabs[nextIndex], true);
  });
});
activateTab(tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0]);

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

const serviceDialog = document.querySelector('#service-dialog');
const serviceCategory = document.querySelector('#service-dialog-category');
const serviceTitle = document.querySelector('#service-dialog-title');
const serviceArt = document.querySelector('#service-dialog-art');
const servicePrices = document.querySelector('#service-dialog-prices');
const serviceDescription = document.querySelector('#service-dialog-description');
const serviceBenefits = document.querySelector('#service-dialog-benefits');

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const service = serviceData[card.dataset.service];
    if (!service) return;
    serviceCategory.textContent = service.category;
    serviceTitle.textContent = service.title;
    serviceArt.src = service.art;
    serviceArt.alt = service.artAlt;
    servicePrices.replaceChildren(...service.prices.map(([duration, price]) => {
      const row = document.createElement('div');
      const durationElement = document.createElement('span');
      const priceElement = document.createElement('strong');
      durationElement.textContent = duration;
      priceElement.textContent = price;
      row.append(durationElement, priceElement);
      return row;
    }));
    serviceDescription.textContent = service.description;
    serviceBenefits.replaceChildren(...service.benefits.map((benefit) => {
      const item = document.createElement('li');
      item.textContent = benefit;
      return item;
    }));
    serviceDialog.showModal();
  });
});

document.querySelector('.service-dialog-close').addEventListener('click', () => serviceDialog.close());
document.querySelectorAll('.service-book, .service-book-alternative').forEach((link) => {
  link.addEventListener('click', () => serviceDialog.close());
});
serviceDialog.addEventListener('click', (event) => {
  if (event.target === serviceDialog) serviceDialog.close();
});

const certificateDialog = document.querySelector('#certificate-dialog');
document.querySelector('.certificate-more').addEventListener('click', () => certificateDialog.showModal());
document.querySelector('.certificate-dialog-close').addEventListener('click', () => certificateDialog.close());
certificateDialog.addEventListener('click', (event) => {
  if (event.target === certificateDialog) certificateDialog.close();
});

const consentCookieName = 'angella_yandex_consent';
const mapContainer = document.querySelector('#yandex-map');
const mapConsentCard = document.querySelector('#map-consent-card');
const mapControls = document.querySelector('#map-controls');
const loadMapButton = document.querySelector('#load-yandex-map');
const unloadMapButton = document.querySelector('#unload-yandex-map');

const hasMapConsent = () => document.cookie.split(';').some((item) => item.trim() === `${consentCookieName}=1`);

const loadYandexMap = () => {
  if (mapContainer.querySelector('iframe')) return;
  const iframe = document.createElement('iframe');
  iframe.src = mapContainer.dataset.mapSrc;
  iframe.title = 'Студия Анжеллы Лукьяновой на Яндекс Картах: адрес и отзывы';
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer';
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox');
  iframe.setAttribute('allow', 'fullscreen');
  mapContainer.replaceChildren(iframe);
  mapContainer.classList.add('is-loaded');
  mapControls.hidden = false;
};

loadMapButton.addEventListener('click', () => {
  document.cookie = `${consentCookieName}=1; Max-Age=15552000; Path=/; SameSite=Lax; Secure`;
  loadYandexMap();
});

unloadMapButton.addEventListener('click', () => {
  document.cookie = `${consentCookieName}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
  mapContainer.replaceChildren(mapConsentCard);
  mapContainer.classList.remove('is-loaded');
  mapControls.hidden = true;
});

if (hasMapConsent()) loadYandexMap();
