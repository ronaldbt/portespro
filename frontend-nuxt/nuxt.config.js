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
        { name: 'description', content: 'PortesPro - Servicios de transporte y mudanzas' }
      ]
    }
  }
})
