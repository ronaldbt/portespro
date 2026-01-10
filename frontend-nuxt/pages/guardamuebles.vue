<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <PortesNavbar @get-quote="scrollToCalc" />
    
    <PortesLanguageSwitcher :current-lang="lang" @lang-change="lang = $event" />

    <main class="flex-grow">
      <Breadcrumbs />
      <!-- Hero Section with Calculator -->
      <section class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              Almacenamiento Seguro y Climatizado
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Guardamuebles y Trasteros Marbella
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              Guardamuebles y trasteros barato, económico y seguro en Marbella, Málaga y Costa del Sol. Almacenes climatizados con acceso 24 horas.
            </p>
          </div>

          <div class="animate-slide-up">
            <GuardamueblesCalculator />
          </div>
        </div>
      </section>

      <!-- Sizes Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Guardamuebles y Trasteros por Tamaño
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Desde guardamuebles y trasteros pequeño hasta extra grande. Elige el tamaño perfecto para tus necesidades
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div
              v-for="(size, idx) in tamanos"
              :key="idx"
              class="p-8 rounded-[2.5rem] border-2 border-slate-100 bg-white hover:border-teal-600 hover:shadow-2xl hover:shadow-teal-100/40 transition-all group"
            >
              <div class="text-4xl font-black text-teal-600 mb-4">{{ size.metros }}</div>
              <h3 class="text-xl font-black text-slate-900 mb-2 tracking-tight">{{ size.title }}</h3>
              <p class="text-slate-500 text-sm font-medium mb-6">{{ size.desc }}</p>
              <div class="text-2xl font-black text-slate-900 mb-2">{{ size.precio }}</div>
              <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">mensual</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Características de Nuestros Guardamuebles y Trasteros
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Guardamuebles y trasteros seguro, vigilado y climatizado para la máxima protección de tus pertenencias
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(feature, idx) in features"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="feature.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ feature.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Use Cases Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Guardamuebles y Trasteros Temporal y de Largo Plazo
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Perfecto para mudanzas, reformas, obras o almacenamiento temporal. Guardamuebles y trasteros en Marbella.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(useCase, idx) in useCases"
              :key="idx"
              class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
            >
              <div class="text-5xl font-black text-teal-600 mb-4">{{ useCase.number }}</div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ useCase.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ useCase.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section id="hero-calculator" class="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.05] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              Reserva tu Guardamuebles o Trastero Ahora
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              Guardamuebles y trasteros Marbella, Málaga y Costa del Sol. Guardamuebles con mudanza incluido disponible.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/"
                class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                Ver Disponibilidad
              </NuxtLink>
              <button
                @click="scrollToCalc"
                class="bg-white hover:bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                Solicitar Presupuesto
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQs Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Preguntas Frecuentes sobre Guardamuebles y Trasteros
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Resolvemos tus dudas sobre guardamuebles y trasteros en Marbella, Málaga y Costa del Sol
            </p>
          </div>

          <div class="max-w-4xl mx-auto space-y-6">
            <div
              v-for="(faq, idx) in faqs"
              :key="idx"
              class="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"
            >
              <button
                @click="faq.open = !faq.open"
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

      <PortesStats />
      <PortesTestimonials />
    </main>

    <PortesFooter />

    <div class="fixed top-0 left-0 w-full h-full -z-40 pointer-events-none opacity-30 overflow-hidden">
      <div class="absolute top-1/4 -right-1/4 w-[700px] h-[700px] bg-teal-200/20 rounded-full blur-[180px] animate-float-1" />
      <div class="absolute bottom-1/4 -left-1/4 w-[700px] h-[700px] bg-slate-300/40 rounded-full blur-[180px] animate-float-2" />
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'

const lang = ref('es')

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// SEO Meta Tags
const siteUrl = 'https://portespro.es'
const currentUrl = `${siteUrl}/guardamuebles`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead({
  title: 'Guardamuebles y Trasteros Marbella | Desde 45€/mes | Climatizados | PortesPro',
  meta: [
    {
      name: 'description',
      content: 'Guardamuebles y trasteros en Marbella desde 45€/mes. Almacenes climatizados, vigilados 24h. Calculadora de guardamuebles online. Guardamuebles barato y económico en Marbella, Málaga y Costa del Sol.'
    },
    {
      name: 'keywords',
      content: 'guardamuebles marbella, trasteros marbella, guardamuebles barato, guardamuebles económico, guardamuebles climatizado, guardamuebles vigilado, guardamuebles 24 horas, trasteros barato, almacenes marbella'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: 'Guardamuebles y Trasteros Marbella | Desde 45€/mes | Climatizados' },
    { property: 'og:description', content: 'Guardamuebles y trasteros en Marbella desde 45€/mes. Almacenes climatizados, vigilados 24h. Calculadora de guardamuebles online.' },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'PortesPro' },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: 'Guardamuebles y Trasteros Marbella | Desde 45€/mes' },
    { name: 'twitter:description', content: 'Guardamuebles y trasteros en Marbella desde 45€/mes. Almacenes climatizados, vigilados 24h.' },
    { name: 'twitter:image', content: defaultImage }
  ],
  link: [
    { rel: 'canonical', href: currentUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Guardamuebles y Trasteros',
        provider: {
          '@type': 'LocalBusiness',
          name: 'PortesPro',
          url: siteUrl
        },
        areaServed: {
          '@type': 'City',
          name: ['Marbella', 'Málaga', 'Costa del Sol']
        },
        description: 'Guardamuebles y trasteros en Marbella desde 45€/mes. Almacenes climatizados, vigilados 24h.',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: '45',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            priceCurrency: 'EUR',
            price: '45',
            unitText: 'mes'
          }
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: siteUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Guardamuebles y Trasteros',
            item: currentUrl
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cuánto cuesta un guardamuebles o trastero en Marbella?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'El precio de guardamuebles y trasteros Marbella varía según el tamaño. Guardamuebles pequeño (5m²) desde 45€/mes, guardamuebles mediano (10m²) desde 85€/mes, guardamuebles grande (15m²) desde 120€/mes.'
            }
          },
          {
            '@type': 'Question',
            name: '¿Los guardamuebles y trasteros están climatizados?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí, todos nuestros guardamuebles y trasteros climatizado tienen aire acondicionado y temperatura controlada para proteger tus pertenencias del calor y la humedad.'
            }
          },
          {
            '@type': 'Question',
            name: '¿Qué seguridad tienen los guardamuebles y trasteros?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nuestros guardamuebles y trasteros seguro incluyen vigilancia 24 horas, alarma, cámaras de seguridad y acceso controlado.'
            }
          }
        ]
      })
    }
  ]
})

// Iconos
const IconTemperature = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
])

const IconShield = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const IconLock = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' })
])

const IconCamera = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 13a3 3 0 11-6 0 3 3 0 016 0z' })
])

const IconClock = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const IconKey = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z' })
])

const tamanos = [
  {
    metros: '5m²',
    title: 'Guardamuebles Pequeño',
    desc: 'Ideal para guardamuebles mini. Perfecto para objetos personales y cajas pequeñas.',
    precio: 'Desde 45€'
  },
  {
    metros: '10m²',
    title: 'Guardamuebles Mediano',
    desc: 'Guardamuebles tamaño mediano. Ideal para el contenido de un estudio o apartamento pequeño.',
    precio: 'Desde 85€'
  },
  {
    metros: '15m²',
    title: 'Guardamuebles Grande',
    desc: 'Guardamuebles grande perfecto para el contenido de un piso completo de 2-3 habitaciones.',
    precio: 'Desde 120€'
  },
  {
    metros: '20m²+',
    title: 'Guardamuebles Extra Grande',
    desc: 'Guardamuebles extra grande para casas, chalets o almacenamiento de negocios.',
    precio: 'Desde 180€'
  }
]

const features = [
  {
    icon: IconTemperature,
    title: 'Guardamuebles Climatizado',
    desc: 'Guardamuebles con aire acondicionado y temperatura controlada para proteger tus pertenencias del calor y la humedad.'
  },
  {
    icon: IconShield,
    title: 'Guardamuebles Seguro',
    desc: 'Guardamuebles vigilado con seguridad 24 horas, alarma y cámaras de vigilancia para máxima protección.'
  },
  {
    icon: IconLock,
    title: 'Acceso Fácil',
    desc: 'Guardamuebles con acceso fácil y horarios flexibles. Acceso 24 horas disponible según el plan elegido.'
  },
  {
    icon: IconCamera,
    title: 'Vigilancia 24h',
    desc: 'Guardamuebles con cámaras y sistema de seguridad avanzado. Tu almacén siempre protegido.'
  },
  {
    icon: IconClock,
    title: 'Temporal o Largo Plazo',
    desc: 'Guardamuebles temporal para reformas o guardamuebles largo plazo. Flexibilidad total en contratos.'
  },
  {
    icon: IconKey,
    title: 'Guardamuebles Interior',
    desc: 'Guardamuebles cubierto e interior. Protección total contra elementos externos y condiciones climáticas.'
  }
]

const useCases = [
  {
    number: '01',
    title: 'Guardamuebles Mudanza',
    desc: 'Guardamuebles mientras mudanza. Almacenamiento temporal durante el proceso de traslado.'
  },
  {
    number: '02',
    title: 'Guardamuebles Reforma',
    desc: 'Guardamuebles reforma y obras. Protege tus muebles durante las obras de renovación.'
  },
  {
    number: '03',
    title: 'Guardamuebles Verano',
    desc: 'Guardamuebles verano e invierno. Almacenamiento estacional para temporadas vacacionales.'
  }
]

const faqs = ref([
  {
    question: '¿Cuánto cuesta un guardamuebles o trastero en Marbella?',
    answer: 'El precio de guardamuebles y trasteros Marbella varía según el tamaño. Guardamuebles pequeño (5m²) desde 45€/mes, guardamuebles mediano (10m²) desde 85€/mes, guardamuebles grande (15m²) desde 120€/mes. Ofrecemos guardamuebles y trasteros barato y económico con diferentes opciones de pago. El precio mensual incluye el alquiler del espacio.',
    open: false
  },
  {
    question: '¿Los guardamuebles y trasteros están climatizados?',
    answer: 'Sí, todos nuestros guardamuebles y trasteros climatizado tienen aire acondicionado y temperatura controlada para proteger tus pertenencias del calor y la humedad. El guardamuebles temperatura controlada es ideal para objetos sensibles como muebles de madera fina, obras de arte o documentos importantes.',
    open: false
  },
  {
    question: '¿Qué seguridad tienen los guardamuebles y trasteros?',
    answer: 'Nuestros guardamuebles y trasteros seguro incluyen vigilancia 24 horas, alarma, cámaras de seguridad y acceso controlado. El guardamuebles vigilado y guardamuebles con seguridad garantizan la máxima protección de tus pertenencias. También ofrecemos seguro de contenido opcional para mayor tranquilidad.',
    open: false
  },
  {
    question: '¿Puedo acceder a mi guardamuebles o trastero 24 horas?',
    answer: 'Sí, ofrecemos guardamuebles y trasteros 24 horas con acceso fácil según el plan elegido. El guardamuebles acceso está disponible en diferentes horarios según tus necesidades. Algunos planes incluyen acceso ilimitado, mientras que otros tienen horarios específicos.',
    open: false
  },
  {
    question: '¿Cuánto tiempo puedo alquilar un guardamuebles o trastero?',
    answer: 'Ofrecemos guardamuebles y trasteros temporal para corto plazo (mínimo 1 mes) y guardamuebles largo plazo con descuentos. Perfecto para guardamuebles reforma, guardamuebles obras o guardamuebles mientras mudanza. Los contratos son flexibles y puedes cancelar con un mes de aviso.',
    open: false
  },
  {
    question: '¿Qué tamaño de guardamuebles o trastero necesito?',
    answer: 'Para un estudio pequeño: guardamuebles 5m². Para un piso de 2-3 habitaciones: guardamuebles 10-15m². Para una casa completa: guardamuebles 20m² o más. Nuestro guardamuebles tamaño se adapta a tus necesidades. Puedes usar nuestra calculadora online para estimar el volumen necesario.',
    open: false
  },
  {
    question: '¿Incluyen seguro en el guardamuebles o trastero?',
    answer: 'Sí, ofrecemos guardamuebles y trasteros con seguro opcional que cubre robo, incendio y daños. El guardamuebles seguro garantiza tranquilidad total durante el almacenamiento. El seguro básico está incluido, y puedes contratar seguro premium para objetos de mayor valor.',
    open: false
  },
  {
    question: '¿Qué diferencia hay entre guardamuebles y trastero?',
    answer: 'Guardamuebles y trasteros son términos similares. Los guardamuebles suelen ser espacios más grandes y profesionales con servicios adicionales como climatización y seguridad avanzada. Los trasteros suelen ser espacios más pequeños y básicos. Nosotros ofrecemos ambos servicios con las mismas garantías de seguridad y calidad.',
    open: false
  }
])
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

