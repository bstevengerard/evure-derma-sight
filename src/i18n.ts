import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import rw from './locales/rw.json';
import sw from './locales/sw.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  rw: { translation: rw },
  ksw: { translation: sw },
  fr: { translation: fr }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
