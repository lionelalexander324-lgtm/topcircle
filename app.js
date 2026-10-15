'use strict';

(() => {
  const fallbackLanguage = 'en';
  const rtlLanguages = new Set(['ar']);
  const select = document.getElementById('langSelect');
  const status = document.getElementById('localeStatus');
  const statusMessage = document.getElementById('localeStatusMessage');
  const retryButton = document.getElementById('localeRetry');
  const supportedLanguages = new Set(
    select ? Array.from(select.options, option => option.value) : [fallbackLanguage]
  );

  let fallbackDictionaryCache = null;
  let failedLanguage = null;
  let languageRequest = 0;
  let statusTimer = null;

  function resolveSupportedLanguage(value) {
    const code = String(value || '').trim().toLowerCase();
    if (!code) return null;
    if (code === 'tl' || code.startsWith('fil-')) return supportedLanguages.has('fil') ? 'fil' : null;
    if (code === 'zh' || code.startsWith('zh-')) {
      if (supportedLanguages.has('zh-TW')) return 'zh-TW';
      if (supportedLanguages.has('zh')) return 'zh';
      return null;
    }

    for (const supported of supportedLanguages) {
      const normalized = supported.toLowerCase();
      if (normalized === code || code.startsWith(`${normalized}-`)) return supported;
    }
    return null;
  }

  function getSavedLanguage() {
    try {
      return resolveSupportedLanguage(localStorage.getItem('tc-language'));
    } catch (_error) {
      return null;
    }
  }

  function getBrowserLanguage() {
    const candidates = Array.from(navigator.languages || [navigator.language]);
    return candidates.map(resolveSupportedLanguage).find(Boolean) || null;
  }

  function getInitialLanguage() {
    const params = new URLSearchParams(location.search);
    if (params.has('lang')) return resolveSupportedLanguage(params.get('lang')) || fallbackLanguage;
    return getSavedLanguage() || getBrowserLanguage() || fallbackLanguage;
  }

  async function loadDictionary(language) {
    const response = await fetch(`locales/${encodeURIComponent(language)}.json`, {
      credentials: 'same-origin'
    });
    if (!response.ok) throw new Error(`Locale ${language} failed to load`);
    return response.json();
  }

  async function getFallbackDictionary() {
    if (fallbackDictionaryCache) return fallbackDictionaryCache;
    fallbackDictionaryCache = await loadDictionary(fallbackLanguage);
    return fallbackDictionaryCache;
  }

  function showLocaleStatus(type, dictionary = {}) {
    if (!status || !statusMessage || !retryButton) return;
    clearTimeout(statusTimer);
    status.hidden = false;
    status.classList.toggle('is-error', type === 'error');
    status.classList.toggle('is-success', type === 'success');
    status.setAttribute('role', type === 'error' ? 'alert' : 'status');
    status.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');
    retryButton.hidden = type !== 'error';
    statusMessage.textContent =
      type === 'error'
        ? dictionary.localeError || 'Language content could not be loaded. English is shown instead.'
        : type === 'success'
          ? dictionary.localeSuccess || 'Language updated.'
          : dictionary.localeLoading || 'Loading language…';
  }

  function hideLocaleStatus(delay = 0) {
    if (!status) return;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
      status.hidden = true;
    }, delay);
  }

  function applyAttributeTranslations(dictionary, fallbackDictionary) {
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.dataset.i18nAria;
      const value = dictionary[key] ?? fallbackDictionary[key];
      if (value != null) element.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
      element.dataset.i18nAttr.split(',').forEach(binding => {
        const separator = binding.includes(':') ? ':' : '=';
        const [attribute, key] = binding.split(separator).map(part => part.trim());
        const value = dictionary[key] ?? fallbackDictionary[key];
        if (attribute && key && value != null) element.setAttribute(attribute, value);
      });
    });
  }

  function applyDictionary(language, dictionary, fallbackDictionary) {
    document.documentElement.lang = language;
    document.documentElement.dir = rtlLanguages.has(language) ? 'rtl' : 'ltr';
    if (select) select.value = language;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      const value = dictionary[key] ?? fallbackDictionary[key];
      if (value != null) element.innerHTML = value;
    });
    applyAttributeTranslations(dictionary, fallbackDictionary);

    document.title = dictionary.pageTitle ?? fallbackDictionary.pageTitle ?? document.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = dictionary.pageDescription ?? fallbackDictionary.pageDescription ?? description.content;
    }

    document.querySelectorAll('.benefit-tile').forEach(element => {
      const url = new URL(element.href);
      url.searchParams.set('lang', language);
      element.href = url.toString();
    });
  }

  async function setLanguage(requestedLanguage, options = {}) {
    const request = ++languageRequest;
    const language = resolveSupportedLanguage(requestedLanguage) || fallbackLanguage;
    failedLanguage = null;
    document.body.setAttribute('aria-busy', 'true');
    if (select) select.disabled = true;
    showLocaleStatus('loading');

    let fallbackDictionary;
    try {
      fallbackDictionary = await getFallbackDictionary();
    } catch (_error) {
      if (request !== languageRequest) return false;
      failedLanguage = fallbackLanguage;
      document.documentElement.lang = fallbackLanguage;
      document.documentElement.dir = 'ltr';
      if (select) select.value = fallbackLanguage;
      document.body.removeAttribute('aria-busy');
      if (select) select.disabled = false;
      showLocaleStatus('error');
      return false;
    }

    let activeLanguage = language;
    let dictionary = fallbackDictionary;
    if (language !== fallbackLanguage) {
      try {
        dictionary = await loadDictionary(language);
      } catch (_error) {
        activeLanguage = fallbackLanguage;
        failedLanguage = language;
        dictionary = fallbackDictionary;
      }
    }
    if (request !== languageRequest) return false;

    applyDictionary(activeLanguage, dictionary, fallbackDictionary);
    document.body.removeAttribute('aria-busy');
    if (select) select.disabled = false;

    if (failedLanguage) {
      showLocaleStatus('error', fallbackDictionary);
      return false;
    }

    if (options.persist) {
      try {
        localStorage.setItem('tc-language', activeLanguage);
      } catch (_error) {}
    }
    if (options.updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', activeLanguage);
      history.replaceState(null, '', url.toString());
    }

    if (options.announceSuccess) {
      showLocaleStatus('success', dictionary);
      hideLocaleStatus(1400);
    } else {
      hideLocaleStatus();
    }
    return true;
  }

  function initSplash() {
    const splash = document.getElementById('welcomeSplash');
    const skip = document.getElementById('splashSkip');
    let seen = false;
    try {
      seen = sessionStorage.getItem('tc-welcome-v11-viewed') === 'yes';
    } catch (_error) {}

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!splash || !skip || seen || reducedMotion) return;

    let done = false;
    let timer;
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try {
        sessionStorage.setItem('tc-welcome-v11-viewed', 'yes');
      } catch (_error) {}
      splash.classList.add('is-exiting');
      document.body.classList.remove('splash-open');
      setTimeout(() => {
        splash.hidden = true;
        skip.disabled = true;
      }, 570);
    };

    splash.hidden = false;
    document.body.classList.add('splash-open');
    skip.addEventListener('click', finish);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') finish();
    });
    skip.focus({ preventScroll: true });
    timer = setTimeout(finish, 2900);
  }

  function initImageFallbacks() {
    document.querySelectorAll('img[data-fallback-src]').forEach(image => {
      image.addEventListener('error', () => {
        const fallback = image.dataset.fallbackSrc;
        if (!fallback || image.dataset.fallbackApplied === 'true') return;
        image.dataset.fallbackApplied = 'true';
        image.src = fallback;
      });
    });
  }

  if (select) {
    select.addEventListener('change', () => {
      setLanguage(select.value, {
        updateUrl: true,
        persist: true,
        announceSuccess: true
      });
    });
  }

  if (retryButton) {
    retryButton.addEventListener('click', () => {
      setLanguage(failedLanguage || fallbackLanguage, {
        updateUrl: true,
        persist: true,
        announceSuccess: true
      });
    });
  }

  initImageFallbacks();
  setLanguage(getInitialLanguage()).finally(initSplash);
})();
