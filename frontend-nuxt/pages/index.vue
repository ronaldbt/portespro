<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <PortesNavbar @get-quote="scrollToCalc" />
    
    <!-- Floating Elements -->
    <PortesLanguageSwitcher />

    <main class="flex-grow">
      <Breadcrumbs />
      <!-- Hero Section with Integrated Calculator -->
      <section id="hero-calculator" class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              {{ $t('pages.index.heroTag') }}
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              {{ $t('pages.index.title') }}
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              {{ $t('pages.index.subtitle') }}
            </p>
          </div>

          <div class="animate-slide-up">
            <PortesCalculator :is-hero="true" />
          </div>
        </div>
      </section>
      
      <!-- Stats Section -->
      <PortesStats />

      <div class="bg-slate-100 py-24">
         <PortesFeatures />
      </div>

      <!-- Process Section -->
      <PortesProcess />
      
      <PortesQualityCommitment />
      
      <PortesTestimonials />

      <!-- FAQs Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.index.faqs.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.index.faqs.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto space-y-6">
            <div
              v-for="(faq, idx) in faqs"
              :key="idx"
              class="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                @click="toggleFaq(idx)"
                class="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-100 transition-all"
              >
                <h3 class="text-lg font-black text-slate-900 pr-8">{{ faq.question }}</h3>
                <svg
                  :class="['w-6 h-6 text-teal-600 transition-transform flex-shrink-0', faq.open ? 'rotate-180' : '']"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Transition
                enter-active-class="transition-all duration-300"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-screen"
                leave-active-class="transition-all duration-300"
                leave-from-class="opacity-100 max-h-screen"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="faq.open" class="px-8 pb-6">
                  <p class="text-slate-600 leading-relaxed font-medium">{{ faq.answer }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>
    </main>

    <PortesFooter />

    <!-- Modern Dynamic Background Orbs -->
    <div class="fixed top-0 left-0 w-full h-full -z-40 pointer-events-none opacity-30 overflow-hidden">
      <div class="absolute top-1/4 -right-1/4 w-[700px] h-[700px] bg-teal-200/20 rounded-full blur-[180px] animate-float-1" />
      <div class="absolute bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-slate-300/40 rounded-full blur-[180px] animate-float-2" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const { locale, locales, t } = useI18n()
const route = useRoute()

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Estado de apertura de FAQs
const faqOpenStates = ref([false, false, false, false, false, false, false, false])

// FAQs con traducciones - computed para reactividad al cambio de locale y estado de apertura
const faqs = computed(() => {
  // Forzar reactividad al cambio de locale y estado de apertura
  const currentLocale = locale.value
  const openStates = faqOpenStates.value
  
  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8']
  
  const result = faqKeys.map((key, index) => {
    const questionKey = `pages.index.faqs.${key}.question`
    const answerKey = `pages.index.faqs.${key}.answer`
    const question = t(questionKey)
    const answer = t(answerKey)
    
    return {
      question,
      answer,
      open: openStates[index]
    }
  })
  
  return result
})

// Función para alternar el estado de apertura de un FAQ
const toggleFaq = (index) => {
  faqOpenStates.value[index] = !faqOpenStates.value[index]
}

// SEO Meta Tags
const siteUrl = 'https://portespro.es'
const siteName = 'PortesPro'
const defaultImage = `${siteUrl}/og-image.jpg`
const logoUrl = `${siteUrl}/logo.png`

// Obtener path sin locale para canonical (con barra final estandarizada)
const pathWithoutLocale = route.path.replace(/^\/(es|en|sv|ru)/, '') || '/'
const canonicalPath = locale.value === 'es' 
  ? (pathWithoutLocale === '/' ? '/' : pathWithoutLocale)
  : `/${locale.value}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
const canonicalUrl = `${siteUrl}${canonicalPath}`

// Hreflang links
const alternateLinks = computed(() => {
  const links = []
  const pathWithoutLocale = route.path.replace(/^\/(es|en|sv|ru)/, '') || '/'
  
  locales.value.forEach((loc) => {
    const localePath = loc.code === 'es' 
      ? (pathWithoutLocale === '/' ? '/' : pathWithoutLocale)
      : `/${loc.code}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    const fullUrl = `${siteUrl}${localePath}`
    
    links.push({
      rel: 'alternate',
      hreflang: loc.iso || loc.code,
      href: fullUrl
    })
    
    // Agregar x-default para el idioma por defecto
    if (loc.code === 'es') {
      links.push({
        rel: 'alternate',
        hreflang: 'x-default',
        href: fullUrl
      })
    }
  })
  
  return links
})

// Locale mappings para OG
const localeMap = {
  'es': 'es_ES',
  'en': 'en_US',
  'sv': 'sv_SE',
  'ru': 'ru_RU'
}

// Titles optimizados (sin duplicación de marca, mejor CTR)
// Nota: No incluir "| PortesPro" porque el titleTemplate en app.vue ya lo agrega
const pageTitle = computed(() => {
  if (locale.value === 'es') return 'Mudanzas en Marbella desde 45€'
  if (locale.value === 'en') return 'Moving Services Marbella from 45€'
  if (locale.value === 'sv') return 'Flytttjänster Marbella från 45€'
  return 'Переезды Марбелья от 45€'
})

// Meta descriptions optimizadas (150-160 caracteres)
const pageDescription = computed(() => {
  if (locale.value === 'es') return 'Mudanzas profesionales en Marbella desde 45€. Calculadora de precio online, embalajes y guardamuebles. Presupuesto gratis. ☎ +34 600 000 000'
  if (locale.value === 'en') return 'Professional moving services in Marbella from 45€. Online price calculator, packing and storage. Free quote. ☎ +34 600 000 000'
  if (locale.value === 'sv') return 'Professionella flytttjänster i Marbella från 45€. Online prisräknare, inpackning och förvaring. Gratis offert. ☎ +34 600 000 000'
  return 'Профессиональные услуги переездов в Марбелье от 45€. Онлайн калькулятор цен, упаковка и хранение. Бесплатная оценка. ☎ +34 600 000 000'
})

// OG Titles y Descriptions
const ogTitle = computed(() => {
  if (locale.value === 'es') return 'Portes y Mudanzas Marbella | PortesPro'
  if (locale.value === 'en') return 'Moving and Transport Marbella | PortesPro'
  if (locale.value === 'sv') return 'Flytt och Transport Marbella | PortesPro'
  return 'Переезды и Перевозки Марбелья | PortesPro'
})

const ogDescription = computed(() => {
  if (locale.value === 'es') return 'Mudanzas y portes profesionales en Marbella y Costa del Sol. Calculadora de precio online. Presupuesto gratis sin compromiso.'
  if (locale.value === 'en') return 'Professional moving and transport services in Marbella and Costa del Sol. Online price calculator. Free quote.'
  if (locale.value === 'sv') return 'Professionella flytt- och transporttjänster i Marbella och Costa del Sol. Online prisräknare. Gratis offert.'
  return 'Профессиональные услуги переездов и перевозок в Марбелье и Коста-дель-Соль. Онлайн калькулятор цен. Бесплатная оценка.'
})

// BreadcrumbList Schema
const breadcrumbSchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: t('breadcrumbs.home'),
      item: locale.value === 'es' ? siteUrl : `${siteUrl}/${locale.value}`
    }
  ]
}))

// FAQPage Schema
const faqSchema = computed(() => {
  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8']
  const mainEntity = faqKeys.map((key, index) => ({
    '@type': 'Question',
    name: t(`pages.index.faqs.${key}.question`),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`pages.index.faqs.${key}.answer`)
    }
  }))
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity
  }
})

// MovingCompany Schema (corregido y completo)
const movingCompanySchema = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  name: 'PortesPro',
  url: siteUrl,
  logo: logoUrl,
  image: defaultImage,
  description: ogDescription.value,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Marbella',
    addressRegion: 'Andalucía',
    addressCountry: 'ES',
    postalCode: '29600'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '36.5102',
    longitude: '-4.8860'
  },
  telephone: '+34-600-000-000',
  priceRange: '$$',
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: '36.5102',
      longitude: '-4.8860'
    },
    geoRadius: {
      '@type': 'Distance',
      value: '50000',
      unitCode: 'MTR'
    }
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  sameAs: [
    'https://www.facebook.com/portespro',
    'https://www.instagram.com/portespro'
  ]
}))

// Head tags reactivos usando computed
useHead(computed(() => {
  try {
    const currentLocale = locale.value
    const currentPathWithoutLocale = route.path.replace(/^\/(es|en|sv|ru)/, '') || '/'
    const currentCanonicalPath = currentLocale === 'es' 
      ? (currentPathWithoutLocale === '/' ? '/' : currentPathWithoutLocale)
      : `/${currentLocale}${currentPathWithoutLocale === '/' ? '' : currentPathWithoutLocale}`
    const currentCanonicalUrl = `${siteUrl}${currentCanonicalPath}`
    
    // Construir schemas directamente aquí dentro del computed
    const movingCompany = {
      '@context': 'https://schema.org',
      '@type': 'MovingCompany',
      name: 'PortesPro',
      url: siteUrl,
      logo: logoUrl,
      image: defaultImage,
      description: ogDescription.value,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Marbella',
        addressRegion: 'Andalucía',
        addressCountry: 'ES',
        postalCode: '29600'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '36.5102',
        longitude: '-4.8860'
      },
      telephone: '+34-600-000-000',
      priceRange: '$$',
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: '36.5102',
          longitude: '-4.8860'
        },
        geoRadius: {
          '@type': 'Distance',
          value: '50000',
          unitCode: 'MTR'
        }
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      ],
      sameAs: [
        'https://www.facebook.com/portespro',
        'https://www.instagram.com/portespro'
      ]
    }

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('breadcrumbs.home'),
          item: currentLocale === 'es' ? siteUrl : `${siteUrl}/${currentLocale}`
        }
      ]
    }

    const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8']
    const faq = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqKeys.map((key) => ({
        '@type': 'Question',
        name: t(`pages.index.faqs.${key}.question`),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t(`pages.index.faqs.${key}.answer`)
        }
      }))
    }
    
    return {
      title: pageTitle.value,
      meta: [
        {
          name: 'description',
          content: pageDescription.value
        },
        {
          name: 'keywords',
          content: currentLocale === 'es' ? 'mudanzas marbella, mudanzas costa del sol, mudanzas baratas, portes marbella, empresa mudanzas, mudanzas profesionales, mudanzas económicas, mudanzas rápidas, mudanzas urgentes' :
            currentLocale === 'en' ? 'moves marbella, moving costa del sol, cheap moving, transport marbella, moving company, professional moving, affordable moving, fast moving, urgent moving' :
            currentLocale === 'sv' ? 'flytt marbella, flytt costa del sol, billig flytt, transport marbella, flyttfirma, professionell flytt, prisvärd flytt, snabb flytt, akut flytt' :
            'переезды марбелья, переезды коста-дель-соль, дешевые переезды, перевозки марбелья, компания переездов, профессиональные переезды, экономичные переезды, быстрые переезды, срочные переезды'
        },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: currentCanonicalUrl },
        { property: 'og:title', content: ogTitle.value },
        { property: 'og:description', content: ogDescription.value },
        { property: 'og:locale', content: localeMap[currentLocale] || 'es_ES' },
        { property: 'og:image', content: defaultImage },
        { property: 'og:site_name', content: siteName },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: currentCanonicalUrl },
        { name: 'twitter:title', content: ogTitle.value },
        { name: 'twitter:description', content: ogDescription.value },
        { name: 'twitter:image', content: defaultImage }
      ],
      link: [
        { rel: 'canonical', href: currentCanonicalUrl },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://www.google-analytics.com' },
        { rel: 'sitemap', type: 'application/xml', title: 'Sitemap', href: '/sitemap.xml' },
        ...alternateLinks.value
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(movingCompany)
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(breadcrumb)
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(faq)
        }
      ]
    }
  } catch (error) {
    console.error('Error generando head tags:', error)
    return {}
  }
}))
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float-1 {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(80px, -40px);
  }
  66% {
    transform: translate(-40px, 80px);
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translate(0, 0);
  }
  33% {
    transform: translate(-60px, 100px);
  }
  66% {
    transform: translate(100px, -60px);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out 0.3s both;
}

.animate-float-1 {
  animation: float-1 25s infinite linear;
}

.animate-float-2 {
  animation: float-2 30s infinite linear;
}
</style>
