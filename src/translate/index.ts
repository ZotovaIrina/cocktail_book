import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './resourses/en'
import ru from './resourses/ru'
import LanguageDetector from 'i18next-browser-languagedetector'

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
  })

export default i18next
