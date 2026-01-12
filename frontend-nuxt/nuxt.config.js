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
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxtjs/sitemap'
  ],
  
  // Configuración i18n
  i18n: {
    locales: [
      { code: 'es', iso: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'sv', iso: 'sv-SE', file: 'sv.json', name: 'Svenska' },
      { code: 'ru', iso: 'ru-RU', file: 'ru.json', name: 'Русский' }
    ],
    lazy: false,
    langDir: 'locales',
    defaultLocale: 'es',
    strategy: 'prefix_except_default',
    compilation: {
      strictMessage: false,
      escapeHtml: false
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    }
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
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo-portespro.png' },
        { rel: 'shortcut icon', type: 'image/png', href: '/logo-portespro.png' },
        { rel: 'apple-touch-icon', href: '/logo-portespro.png' }
      ],
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
  },
  
  // Configuración de Sitemap
  sitemap: {
    hostname: 'https://portespro.es',
    gzip: true,
    exclude: [
      '/dashboard-admin/**',
      '/dashboard-cliente/**',
      '/dashboard-conductor/**',
      '/login',
      '/register',
      '/cliente/**',
      '/conductor/**',
      '/test',
      '/no-disponible',
      '/api/**'
    ],
    routes: async () => {
      try {
        const { $content } = require('@nuxt/content')
        const posts = await $content('blog').only(['slug']).fetch()
        return posts.map((post) => `/blog/${post.slug}`)
      } catch (e) {
        // Si no hay posts o hay error, retornar array vacío
        return []
      }
    },
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    }
  }
})
