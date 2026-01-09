<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <PortesNavbar @get-quote="scrollToCalc" />
    
    <!-- Floating Elements -->
    <PortesLanguageSwitcher :current-lang="lang" @lang-change="lang = $event" />
    <PortesOnlineAdvisor />

    <main class="flex-grow">
      <!-- Hero Section with Integrated Calculator -->
      <section id="hero-calculator" class="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              Logística de Mudanzas de Alto Standing
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Portes y Mudanzas
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              Cuidado artesanal y precisión tecnológica. Mudanzas en Marbella y Costa del Sol.
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
import { ref } from 'vue'

const lang = ref('es')

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO Meta Tags
const siteUrl = 'https://portespro.es'
const siteName = 'PortesPro'
const defaultImage = `${siteUrl}/og-image.jpg`

useHead({
  title: 'Portes y Mudanzas Marbella | Mudanzas Baratas Costa del Sol | PortesPro',
  meta: [
    {
      name: 'description',
      content: 'Mudanzas y portes profesionales en Marbella y Costa del Sol. Servicios de mudanzas baratas, embalajes, guardamuebles y transporte en frío. Calculadora de precio online. Presupuesto gratis sin compromiso.'
    },
    {
      name: 'keywords',
      content: 'mudanzas marbella, mudanzas costa del sol, mudanzas baratas, portes marbella, empresa mudanzas, mudanzas profesionales, mudanzas económicas, mudanzas rápidas, mudanzas urgentes'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: siteUrl },
    { property: 'og:title', content: 'Portes y Mudanzas Marbella | Mudanzas Baratas Costa del Sol | PortesPro' },
    { property: 'og:description', content: 'Mudanzas y portes profesionales en Marbella y Costa del Sol. Servicios de mudanzas baratas, embalajes, guardamuebles y transporte en frío. Calculadora de precio online.' },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: siteName },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: siteUrl },
    { name: 'twitter:title', content: 'Portes y Mudanzas Marbella | Mudanzas Baratas Costa del Sol' },
    { name: 'twitter:description', content: 'Mudanzas y portes profesionales en Marbella y Costa del Sol. Servicios de mudanzas baratas, embalajes, guardamuebles y transporte en frío.' },
    { name: 'twitter:image', content: defaultImage },
    // Canonical
    { rel: 'canonical', href: siteUrl }
  ],
  link: [
    { rel: 'canonical', href: siteUrl }
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
