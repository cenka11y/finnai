import { useState, useEffect } from 'react';
import i18n from './index';

export const useTranslation = () => {
  const [language, setLanguage] = useState(i18n.getCurrentLanguage());

  useEffect(() => {
    const handleLanguageChange = (event) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const changeLanguage = (lang) => {
    i18n.setLanguage(lang);
  };

  const t = (key, params) => i18n.t(key, params);

  return {
    t,
    language,
    changeLanguage,
    availableLanguages: i18n.getAvailableLanguages()
  };
};