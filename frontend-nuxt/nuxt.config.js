// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  // SSR para mejor SEO
  ssr: true,
  
  // Módulos
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],
  
  // Configuración i18n
  i18n: {
    locales: [
      { code: 'es', iso: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'sv', iso: 'sv-SE', file: 'sv.json', name: 'Svenska' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    },
    vueI18n: './i18n.config.js'
  },
  
  // Runtime config para variables de entorno públicas
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.NUXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyD6_IKXikaZ2YFx5R8yKVpFPUe_S6WOKJI'
    }
  },
  
  // Configuración de SEO
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s - PortesPro',
      meta: [
        { name: 'description', content: 'PortesPro - Servicios de transporte y mudanzas profesionales en Marbella y Costa del Sol' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'PortesPro' },
        { name: 'language', content: 'Spanish' },
        { name: 'geo.region', content: 'ES-AN' },
        { name: 'geo.placename', content: 'Marbella' },
        { name: 'geo.position', content: '36.5102;-4.8860' },
        { name: 'ICBM', content: '36.5102, -4.8860' }
      ]
    }
  }
})
