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
import { computed } from 'vue'

const { locale, locales } = useI18n()
const route = useRoute()

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO Meta Tags
const siteUrl = 'https://portespro.es'
const siteName = 'PortesPro'
const defaultImage = `${siteUrl}/og-image.jpg`

// Obtener path sin locale para canonical
const pathWithoutLocale = route.path.replace(/^\/(es|en|sv|ru)/, '') || '/'
const canonicalUrl = locale.value === 'es' 
  ? `${siteUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
  : `${siteUrl}/${locale.value}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`

// Hreflang links
const alternateLinks = computed(() => {
  const links = []
  const pathWithoutLocale = route.path.replace(/^\/(es|en|sv|ru)/, '') || '/'
  
  locales.value.forEach((loc) => {
    const localePath = loc.code === 'es' ? pathWithoutLocale : `/${loc.code}${pathWithoutLocale}`
    const fullUrl = `${siteUrl}${localePath === '/' ? '' : localePath}`
    
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

useHead({
  title: locale.value === 'es' ? 'Portes y Mudanzas Marbella | Mudanzas Baratas Costa del Sol | PortesPro' :
        locale.value === 'en' ? 'Moving and Transport Marbella | Cheap Moving Services Costa del Sol | PortesPro' :
        locale.value === 'sv' ? 'Flytt och Transport Marbella | Billiga Flytttjänster Costa del Sol | PortesPro' :
        'Переезды и Перевозки Марбелья | Дешевые Услуги Переездов Коста-дель-Соль | PortesPro',
  meta: [
    {
      name: 'description',
      content: locale.value === 'es' ? 'Mudanzas y portes profesionales en Marbella y Costa del Sol. Servicios de mudanzas baratas, embalajes, guardamuebles y transporte en frío. Calculadora de precio online. Presupuesto gratis sin compromiso.' :
        locale.value === 'en' ? 'Professional moving and transport services in Marbella and Costa del Sol. Cheap moving services, packing, storage and cold transport. Online price calculator. Free quote.' :
        locale.value === 'sv' ? 'Professionella flytt- och transporttjänster i Marbella och Costa del Sol. Billiga flytttjänster, inpackning, förvaring och kyltransport. Online prisräknare. Gratis offert.' :
        'Профессиональные услуги переездов и перевозок в Марбелье и Коста-дель-Соль. Дешевые услуги переездов, упаковка, хранение и холодная перевозка. Онлайн калькулятор цен. Бесплатная оценка.'
    },
    {
      name: 'keywords',
      content: locale.value === 'es' ? 'mudanzas marbella, mudanzas costa del sol, mudanzas baratas, portes marbella, empresa mudanzas, mudanzas profesionales, mudanzas económicas, mudanzas rápidas, mudanzas urgentes' :
        locale.value === 'en' ? 'moves marbella, moving costa del sol, cheap moving, transport marbella, moving company, professional moving, affordable moving, fast moving, urgent moving' :
        locale.value === 'sv' ? 'flytt marbella, flytt costa del sol, billig flytt, transport marbella, flyttfirma, professionell flytt, prisvärd flytt, snabb flytt, akut flytt' :
        'переезды марбелья, переезды коста-дель-соль, дешевые переезды, перевозки марбелья, компания переездов, профессиональные переезды, экономичные переезды, быстрые переезды, срочные переезды'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:locale', content: localeMap[locale.value] || 'es_ES' },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: siteName },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: canonicalUrl },
    { name: 'twitter:image', content: defaultImage },
    // Canonical
    { rel: 'canonical', href: canonicalUrl }
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl },
    ...alternateLinks.value
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'PortesPro',
        image: defaultImage,
        '@id': siteUrl,
        url: siteUrl,
        telephone: '+34-XXX-XXX-XXX',
        priceRange: '€€',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Calle Ejemplo',
          addressLocality: 'Marbella',
          addressRegion: 'Málaga',
          postalCode: '29600',
          addressCountry: 'ES'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 36.5102,
          longitude: -4.8860
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        },
        areaServed: {
          '@type': 'City',
          name: ['Marbella', 'Málaga', 'Costa del Sol']
        },
        sameAs: [
          'https://www.facebook.com/portespro',
          'https://www.instagram.com/portespro'
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'PortesPro',
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+34-XXX-XXX-XXX',
          contactType: 'customer service',
          areaServed: 'ES',
          availableLanguage: 'Spanish'
        }
      })
    }
  ]
})
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
