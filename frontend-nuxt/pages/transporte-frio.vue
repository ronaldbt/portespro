<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <PortesNavbar @get-quote="scrollToCalc" />
    
    <PortesLanguageSwitcher :current-lang="lang" @lang-change="lang = $event" />

    <main class="flex-grow">
      <Breadcrumbs />
      <!-- Hero Section -->
      <section class="relative pt-8 pb-24 md:pt-12 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              Logística Refrigerada y Cadena de Frío
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Transporte en Frío
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              Transporte refrigerado, transporte frigorífico y logística de cadena frío en Marbella, Málaga y Costa del Sol. Temperatura controlada garantizada.
            </p>
          </div>

          <div class="animate-slide-up">
            <TransporteFrioCalculator />
          </div>
        </div>
      </section>

      <!-- Temperature Types Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Transporte por Temperatura
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Transporte frío controlado para diferentes rangos de temperatura según tus necesidades
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(temp, idx) in temperaturas"
              :key="idx"
              class="p-10 rounded-[2.5rem] border-2 border-slate-100 bg-white hover:border-teal-600 hover:shadow-2xl hover:shadow-teal-100/40 transition-all group"
            >
              <div class="text-5xl font-black text-teal-600 mb-4">{{ temp.grados }}</div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ temp.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium mb-6">{{ temp.desc }}</p>
              <ul class="space-y-2">
                <li v-for="(producto, i) in temp.productos" :key="i" class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-slate-600 font-medium text-sm">{{ producto }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Types Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Transporte Frío por Tipo de Producto
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Especialistas en transporte de alimentos, productos farmacéuticos y perecederos
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(producto, idx) in productos"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="producto.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ producto.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ producto.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Servicios de Transporte Frío
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Logística frío completa: transporte, almacenaje y distribución refrigerada
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div
              v-for="(service, idx) in servicios"
              :key="idx"
              class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
            >
              <div class="text-5xl font-black text-teal-600 mb-4">{{ service.number }}</div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ service.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium mb-6">{{ service.desc }}</p>
              <ul class="space-y-3">
                <li v-for="(feature, i) in service.features" :key="i" class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-slate-600 font-medium text-sm">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Coverage Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Cobertura de Transporte Frío
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Transporte frío local, provincial, interprovincial, nacional e internacional
            </p>
          </div>

          <div class="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div
              v-for="(zona, idx) in zonas"
              :key="idx"
              class="p-8 rounded-[2.5rem] border border-slate-200 bg-white text-center hover:border-teal-600 hover:shadow-xl transition-all"
            >
              <div class="text-3xl font-black text-teal-600 mb-4">{{ zona.icon }}</div>
              <h3 class="text-xl font-black text-slate-900 mb-2 tracking-tight">{{ zona.title }}</h3>
              <p class="text-slate-500 text-sm font-medium">{{ zona.desc }}</p>
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
              ¿Necesitas Transporte Refrigerado?
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              Empresa transporte frío en Marbella, Málaga y Costa del Sol. Servicio refrigerado profesional con cadena frío garantizada.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/"
                class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                Solicitar Transporte Frío
              </NuxtLink>
              <button
                @click="scrollToCalc"
                class="bg-white hover:bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                Presupuesto Gratis
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
              Preguntas Frecuentes sobre Transporte en Frío
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Resolvemos tus dudas sobre transporte refrigerado, cadena frío y logística frío en Marbella y Costa del Sol
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
const currentUrl = `${siteUrl}/transporte-frio`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead({
  title: 'Transporte en Frío Marbella | Cadena Frío Garantizada | PortesPro',
  meta: [
    {
      name: 'description',
      content: 'Transporte en frío y cadena frío en Marbella. Transporte refrigerado para alimentos, productos farmacéuticos y perecederos. Temperatura controlada garantizada. Transporte frío local, provincial y nacional.'
    },
    {
      name: 'keywords',
      content: 'transporte frío marbella, transporte refrigerado, cadena frío, transporte frigorífico, transporte temperatura controlada, transporte alimentos, transporte farmacéutico, logística frío'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: 'Transporte en Frío Marbella | Cadena Frío Garantizada' },
    { property: 'og:description', content: 'Transporte en frío y cadena frío en Marbella. Transporte refrigerado para alimentos, productos farmacéuticos y perecederos. Temperatura controlada garantizada.' },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'PortesPro' },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: 'Transporte en Frío Marbella | Cadena Frío Garantizada' },
    { name: 'twitter:description', content: 'Transporte en frío y cadena frío en Marbella. Transporte refrigerado para alimentos, productos farmacéuticos y perecederos.' },
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
        serviceType: 'Transporte en Frío',
        provider: {
          '@type': 'LocalBusiness',
          name: 'PortesPro',
          url: siteUrl
        },
        areaServed: {
          '@type': 'City',
          name: ['Marbella', 'Málaga', 'Costa del Sol']
        },
        description: 'Transporte en frío y cadena frío en Marbella. Transporte refrigerado para alimentos, productos farmacéuticos y perecederos.'
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
            name: 'Transporte en Frío',
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
            name: '¿Qué temperatura mantiene el transporte en frío?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nuestro servicio de transporte en frío mantiene diferentes rangos de temperatura según el producto: transporte congelado a -18°C para congelados, transporte refrigerado a 0-4°C para productos frescos, y transporte temperatura controlada a 2-8°C para productos farmacéuticos.'
            }
          },
          {
            '@type': 'Question',
            name: '¿Qué productos pueden transportarse en frío?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Transportamos productos perecederos como alimentos frescos, pescado, carne, lácteos, frutas y verduras. También ofrecemos transporte frío para productos farmacéuticos, medicamentos, flores, bebidas y helados.'
            }
          },
          {
            '@type': 'Question',
            name: '¿Cómo garantizan la cadena de frío?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Garantizamos la cadena frío con vehículos frigoríficos equipados con sistemas de temperatura controlada, monitoreo en tiempo real y registro de temperatura.'
            }
          }
        ]
      })
    }
  ]
})

// Iconos
const IconSnowflake = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' })
])

const IconFood = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
])

const IconPill = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' })
])

const IconFlower = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' })
])

const IconFish = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const IconTruck = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const IconWarehouse = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
])

const temperaturas = [
  {
    grados: '-18°C',
    title: 'Transporte Congelación',
    desc: 'Transporte ultracongelado para productos congelados y helados.',
    productos: [
      'Helados',
      'Congelados',
      'Productos ultracongelados',
      'Alimentos congelados'
    ]
  },
  {
    grados: '0-4°C',
    title: 'Transporte Refrigerado',
    desc: 'Transporte refrigerado estándar para productos frescos y perecederos.',
    productos: [
      'Productos frescos',
      'Lácteos',
      'Carnes',
      'Pescado'
    ]
  },
  {
    grados: '2-8°C',
    title: 'Transporte Farmacéutico',
    desc: 'Transporte frío controlado para medicamentos y productos farmacéuticos.',
    productos: [
      'Medicamentos',
      'Productos farmacéuticos',
      'Vacunas',
      'Productos sanitarios'
    ]
  }
]

const productos = [
  {
    icon: IconFood,
    title: 'Transporte Frío Alimentos',
    desc: 'Transporte alimentos y productos frescos. Logística refrigerada para supermercados y restaurantes.'
  },
  {
    icon: IconFish,
    title: 'Transporte Frío Pescado',
    desc: 'Transporte pescado y mariscos frescos. Cadena frío garantizada desde el puerto hasta destino.'
  },
  {
    icon: IconFood,
    title: 'Transporte Frío Carne',
    desc: 'Transporte carne y productos cárnicos. Temperatura controlada para máxima frescura.'
  },
  {
    icon: IconPill,
    title: 'Transporte Frío Farmacéutico',
    desc: 'Transporte frío productos farmacéuticos y medicamentos. Cumplimiento normativo garantizado.'
  },
  {
    icon: IconFlower,
    title: 'Transporte Frío Flores',
    desc: 'Transporte flores y plantas. Temperatura controlada para mantener la frescura.'
  },
  {
    icon: IconFood,
    title: 'Transporte Frío Bebidas',
    desc: 'Transporte bebidas y productos líquidos refrigerados. Logística especializada.'
  }
]

const servicios = [
  {
    number: '01',
    title: 'Transporte Refrigerado',
    desc: 'Servicio de transporte frío con vehículos frigoríficos y temperatura controlada',
    features: [
      'Vehículos frigoríficos certificados',
      'Temperatura controlada en tiempo real',
      'Monitoreo GPS y temperatura',
      'Cadena frío garantizada'
    ]
  },
  {
    number: '02',
    title: 'Almacenaje Frío',
    desc: 'Cámaras frío y almacenaje refrigerado para productos perecederos',
    features: [
      'Cámaras refrigeración',
      'Almacenaje refrigerado',
      'Control de temperatura 24/7',
      'Distribución frío incluida'
    ]
  }
]

const zonas = [
  {
    icon: '📍',
    title: 'Transporte Frío Local',
    desc: 'Marbella, Málaga, Costa del Sol'
  },
  {
    icon: '🚚',
    title: 'Transporte Frío Provincial',
    desc: 'Toda la provincia de Málaga'
  },
  {
    icon: '🌍',
    title: 'Transporte Frío Nacional',
    desc: 'Toda España peninsular'
  },
  {
    icon: '✈️',
    title: 'Transporte Frío Internacional',
    desc: 'Europa y Unión Europea'
  }
]

const faqs = ref([
  {
    question: '¿Qué temperatura mantiene el transporte en frío?',
    answer: 'Nuestro servicio de transporte en frío mantiene diferentes rangos de temperatura según el producto: transporte congelado a -18°C para congelados, transporte refrigerado a 0-4°C para productos frescos, y transporte temperatura controlada a 2-8°C para productos farmacéuticos. El transporte cadena frío está garantizado durante todo el trayecto.',
    open: false
  },
  {
    question: '¿Qué productos pueden transportarse en frío?',
    answer: 'Transportamos productos perecederos como alimentos frescos, pescado, carne, lácteos, frutas y verduras. También ofrecemos transporte frío para productos farmacéuticos, medicamentos, flores, bebidas y helados. El transporte refrigerado es ideal para cualquier producto que requiera cadena frío.',
    open: false
  },
  {
    question: '¿Cuánto cuesta el transporte en frío?',
    answer: 'El precio del transporte en frío varía según la distancia, temperatura requerida y tipo de producto. Ofrecemos transporte frío local en Marbella y Málaga, transporte frío provincial en Costa del Sol, transporte frío interprovincial y transporte frío nacional. Solicita un presupuesto personalizado sin compromiso.',
    open: false
  },
  {
    question: '¿Cómo garantizan la cadena de frío?',
    answer: 'Garantizamos la cadena frío con vehículos frigoríficos equipados con sistemas de temperatura controlada, monitoreo en tiempo real y registro de temperatura. El transporte cadena frío está certificado y cumple con todas las normativas de seguridad alimentaria y farmacéutica.',
    open: false
  },
  {
    question: '¿Hacen transporte en frío internacional?',
    answer: 'Sí, ofrecemos transporte frío internacional para productos que requieren cadena frío. El transporte refrigerado internacional incluye documentación aduanera, certificados sanitarios y seguimiento completo. Cubrimos rutas internacionales con garantía de temperatura controlada.',
    open: false
  },
  {
    question: '¿Qué diferencia hay entre transporte frío y transporte refrigerado?',
    answer: 'El transporte frío generalmente se refiere a temperaturas bajo cero (congelación), mientras que el transporte refrigerado mantiene temperaturas positivas (0-4°C). Ambos servicios garantizan la cadena frío y están disponibles según las necesidades de tu producto.',
    open: false
  },
  {
    question: '¿Ofrecen almacenaje en frío además del transporte?',
    answer: 'Sí, además del transporte en frío, ofrecemos almacenaje frío y almacenaje refrigerado en cámaras frío y cámaras refrigeración. El servicio completo incluye almacenaje, distribución frío y reparto refrigerado para máxima comodidad.',
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

.animate-float-1 {
  animation: float-1 25s infinite linear;
}

.animate-float-2 {
  animation: float-2 30s infinite linear;
}
</style>

