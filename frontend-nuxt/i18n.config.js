export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'es',
    fallbackLocale: 'es',
    messages: {
      es: () => import('./locales/es.json').then(m => m.default || m),
      en: () => import('./locales/en.json').then(m => m.default || m),
      sv: () => import('./locales/sv.json').then(m => m.default || m),
      ru: () => import('./locales/ru.json').then(m => m.default || m)
    }
  }
})

