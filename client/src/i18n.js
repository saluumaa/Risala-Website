import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translateEn from './locale/en.json';
import translateAr from './locale/ar.json';
i18n
 
  .use(LanguageDetector)
  .use(initReactI18next)
 
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    },
    resources: {
      en: {
        translation: translateEn
      },
        ar: {
            translation: translateAr
        }
    }
  });

export default i18n;