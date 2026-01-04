// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  
  // SSR para mejor SEO
  ssr: true,
  
  // Módulos
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  
  // Configuración de SEO
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: '%s - PortesPro',
      meta: [
        { name: 'description', content: 'PortesPro - Servicios de transporte y mudanzas' }
      ]
    }
  }
})
