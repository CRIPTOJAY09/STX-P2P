import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '../i18n/types';

const LANGUAGE_KEY = 'stx_language';

export function useLanguage() {
  const { i18n } = useTranslation();

  const setLanguage = useCallback(async (language: Language) => {
    try {
      await i18n.changeLanguage(language);
      localStorage.setItem(LANGUAGE_KEY, language);
      
      // Update document direction for RTL support
      const dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.dir = dir;
      document.documentElement.lang = language;
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }, [i18n]);

  const getStoredLanguage = useCallback((): Language => {
    return (localStorage.getItem(LANGUAGE_KEY) as Language) || 'en';
  }, []);

  return {
    currentLanguage: i18n.language as Language,
    setLanguage,
    getStoredLanguage,
  };
}