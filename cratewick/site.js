(() => {
  'use strict';
  // Set this only after the public App Store listing is verified. No polling or tracking.
  const launch = { publicAppStoreURL: '' };
  const translations = {
    en: { skip: 'Skip to content', game: 'The game', support: 'Support', privacy: 'Privacy Policy', terms: 'Terms of Use (EULA)', developer: 'Developer', navigation: 'Main navigation' },
    tr: { skip: 'İçeriğe geç', game: 'Oyun', support: 'Destek', privacy: 'Gizlilik Politikası', terms: 'Kullanım Koşulları (EULA)', developer: 'Geliştirici', navigation: 'Ana gezinme' }
  };
  const page = document.body.dataset.page || 'game';
  const titles = {
    game: { en: 'Cratewick — Every parcel. The right route.', tr: 'Cratewick — Her paket doğru yola.' },
    support: { en: 'Cratewick Support — A little help with your delivery', tr: 'Cratewick Destek — Teslimat için biraz yardım' },
    privacy: { en: 'Cratewick — Privacy Policy', tr: 'Cratewick — Gizlilik Politikası' }
  };
  let language = 'en';
  function hashLanguage() {
    const hash = location.hash.toLowerCase();
    if (['#tr', '#turkce'].includes(hash)) return 'tr';
    if (['#en', '#english'].includes(hash)) return 'en';
    if (hash.startsWith('#tr-')) return 'tr';
    if (hash.startsWith('#en-')) return 'en';
    return null;
  }
  function setLanguage(value) {
    language = value === 'tr' ? 'tr' : 'en';
    document.documentElement.lang = language;
    document.querySelectorAll('[data-language]').forEach(panel => { panel.hidden = panel.dataset.language !== language; });
    document.querySelectorAll('[data-i18n]').forEach(item => { item.textContent = translations[language][item.dataset.i18n]; });
    document.querySelectorAll('[data-lang-select]').forEach(item => { item.setAttribute('aria-current', String(item.dataset.langSelect === language)); });
    document.querySelectorAll('[data-lang-link]').forEach(item => {
      const target = new URL(item.getAttribute('href'), location.href);
      target.hash = language;
      item.href = target.href;
    });
    const nav = document.querySelector('.site-nav');
    if (nav) nav.setAttribute('aria-label', translations[language].navigation);
    document.title = titles[page][language];
  }
  document.querySelectorAll('[data-lang-select]').forEach(item => item.addEventListener('click', event => {
    event.preventDefault();
    history.replaceState(null, '', '#' + item.dataset.langSelect);
    setLanguage(item.dataset.langSelect);
  }));
  addEventListener('hashchange', () => { const next = hashLanguage(); if (next) setLanguage(next); });
  if (/^https:\/\/apps\.apple\.com\/[a-zA-Z0-9/_?&=.%+-]*id[0-9]+/.test(launch.publicAppStoreURL)) {
    document.querySelectorAll('.hero-actions').forEach(actions => {
      const storeLink = document.createElement('a');
      storeLink.className = 'button launch-cta';
      storeLink.href = launch.publicAppStoreURL;
      storeLink.textContent = actions.closest('[data-language]').dataset.language === 'tr' ? 'App Store’da görüntüle' : 'View on the App Store';
      actions.prepend(storeLink);
    });
  }
  setLanguage(hashLanguage() || (navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en'));
})();
