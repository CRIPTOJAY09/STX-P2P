import type en from './locales/en';

export type Translation = typeof en;
export type Language = 'en' | 'es' | 'pt' | 'de' | 'ar' | 'zh' | 'ru';

export interface LanguageOption {
  code: Language;
  name: string;
  dir?: 'ltr' | 'rtl';
}