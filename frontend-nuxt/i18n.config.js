import es from './locales/es.json'
import en from './locales/en.json'
import sv from './locales/sv.json'
import ru from './locales/ru.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: {
    es,
    en,
    sv,
    ru
  }
}))

