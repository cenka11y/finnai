import { fi } from './locales/fi';
import { tr } from './locales/tr';
import { en } from './locales/en';

const translations = {
  fi,
  tr,
  en
};

// Varsayılan dil Finnish
const DEFAULT_LANGUAGE = 'fi';

class I18n {
  constructor() {
    this.currentLanguage = localStorage.getItem('language') || DEFAULT_LANGUAGE;
    this.translations = translations;
  }

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);
      // Event dispatch for component updates
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    }
  }

  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (!value) {
      // Fallback to Finnish if key not found
      value = this.translations['fi'];
      for (const k of keys) {
        value = value?.[k];
      }
    }
    
    if (!value) return key;
    
    // Simple parameter replacement
    return Object.keys(params).reduce((str, param) => {
      return str.replace(`{${param}}`, params[param]);
    }, value);
  }

  getCurrentLanguage() {
    return this.currentLanguage;
  }

  getAvailableLanguages() {
    return [
      { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
    ];
  }
}

export const i18n = new I18n();
export default i18n;