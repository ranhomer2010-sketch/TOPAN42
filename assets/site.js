const serviceData = {
  detox: { category: 'Коррекция тела', title: 'Детокс', duration: '60 / 90 минут', price: 'от 3 500 ₽', description: 'Лимфодренажная программа для визуальной коррекции проблемных зон, уменьшения отёчности и возвращения коже тонуса.', benefits: ['живот и бока', 'руки и бёдра', 'ощущение лёгкости'] },
  postpartum: { category: 'Коррекция тела', title: 'Послеродовое восстановление', duration: '60 минут', price: '3 500 ₽', description: 'Бережная программа для возвращения ощущения собранности, лёгкости и уверенности в своём теле после родов. Возможность проведения процедуры определяется индивидуально.', benefits: ['работа с отёчностью', 'тонус кожи', 'бережное восстановление'] },
  'ideal-body': { category: 'Коррекция тела', title: 'Идеальное тело', duration: '60 / 90 минут', price: 'от 3 500 ₽', description: 'Комбинированная работа с качеством кожи, отёчностью и контурами тела для более гладкого и подтянутого силуэта.', benefits: ['тонус и гладкость', 'контуры коленей', 'обменные процессы'] },
  glutes: { category: 'Коррекция тела', title: 'Упругие ягодицы', duration: '60 минут', price: '3 500 ₽', description: 'Направленная ручная работа с нижней частью тела: бёдрами, ягодицами и зоной над коленями.', benefits: ['визуальный лифтинг', 'более чёткий силуэт', 'тонус тканей'] },
  'flat-stomach': { category: 'Коррекция тела', title: 'Плоский живот', duration: '60 минут', price: '3 500 ₽', description: 'Специализированная ручная техника для зоны живота и боков, направленная на тонус, уменьшение отёчности и визуальную коррекцию объёмов.', benefits: ['живот и бока', 'упругость кожи', 'ощущение лёгкости'] },
  'stop-age': { category: 'Омоложение лица', title: 'СтопВозраст', duration: '60 минут', price: '3 500 ₽', description: 'Глубокая ручная работа с мышцами лица для более чёткого овала, свежего тона и естественного эффекта омоложения.', benefits: ['мышечный тонус', 'овал лица', 'здоровое сияние'] },
  'face-plastic': { category: 'Омоложение лица', title: 'Ручная пластика лица', duration: '60 минут', price: '3 500 ₽', description: 'Техника для укрепления мышц, уменьшения отёчности и повышения упругости кожи без инъекций и хирургического вмешательства.', benefits: ['более мягкие складки', 'чёткий контур', 'упругость кожи'] },
  lifting: { category: 'Косметология', title: 'Лифтинг-комплекс', duration: '60 минут', price: '5 000 ₽', description: 'Пять этапов ухода работают последовательно: очищение, мягкое отшелушивание, ручной массаж, фонофорез и альгинатная маска.', benefits: ['интенсивное увлажнение', 'тонус кожи', 'свежий цвет лица'] },
  cleaning: { category: 'Косметология', title: 'Механическая чистка', duration: '105 минут', price: '3 600 ₽', description: 'Классическая ручная процедура для глубокого очищения кожи и работы с закупоренными порами.', benefits: ['чёрные точки', 'расширенные поры', 'неровный рельеф'] },
  regeneration: { category: 'Косметология', title: 'Очищение + регенерация', duration: '105 минут', price: '4 600 ₽', description: 'Механическая чистка, алмазный пилинг и фонофорез в одной программе для чистой, гладкой и увлажнённой кожи.', benefits: ['глубокое очищение', 'обновление текстуры', 'восстановительный уход'] }
};

const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.service-card');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.filter;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    cards.forEach((card) => {
      card.hidden = card.dataset.category !== category;
      if (!card.hidden) requestAnimationFrame(() => card.classList.add('is-visible'));
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const serviceDialog = document.querySelector('#service-dialog');
const serviceCategory = document.querySelector('#service-dialog-category');
const serviceTitle = document.querySelector('#service-dialog-title');
const serviceDuration = document.querySelector('#service-dialog-duration');
const servicePrice = document.querySelector('#service-dialog-price');
const serviceDescription = document.querySelector('#service-dialog-description');
const serviceBenefits = document.querySelector('#service-dialog-benefits');

cards.forEach((card) => {
  card.addEventListener('click', () => {
    const service = serviceData[card.dataset.service];
    if (!service) return;
    serviceCategory.textContent = service.category;
    serviceTitle.textContent = service.title;
    serviceDuration.textContent = service.duration;
    servicePrice.textContent = service.price;
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
document.querySelector('.service-book').addEventListener('click', () => serviceDialog.close());
serviceDialog.addEventListener('click', (event) => {
  if (event.target === serviceDialog) serviceDialog.close();
});

const certificateDialog = document.querySelector('#certificate-dialog');
document.querySelector('.certificate-more').addEventListener('click', () => certificateDialog.showModal());
document.querySelector('.certificate-dialog-close').addEventListener('click', () => certificateDialog.close());
certificateDialog.addEventListener('click', (event) => {
  if (event.target === certificateDialog) certificateDialog.close();
});

const contactDialog = document.querySelector('#contact-dialog');
document.querySelectorAll('[data-contact]').forEach((button) => {
  button.addEventListener('click', () => contactDialog.showModal());
});
document.querySelector('.contact-dialog-close').addEventListener('click', () => contactDialog.close());
document.querySelector('.dialog-ok').addEventListener('click', () => contactDialog.close());
contactDialog.addEventListener('click', (event) => {
  if (event.target === contactDialog) contactDialog.close();
});
