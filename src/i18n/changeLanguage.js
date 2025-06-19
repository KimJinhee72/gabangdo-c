// src/i18n/changeLanguage.js
import { SUPPORTED_LANGUAGES } from './constants';
import i18n from './index.js';

export function changeLanguage(lang) {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    i18n.global.locale.value = lang;
    localStorage.setItem('language', lang);
    document.cookie = `language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  } else {
    console.warn(`Unsupported language: ${lang}`);
  }
}
