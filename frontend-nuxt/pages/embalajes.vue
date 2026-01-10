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
              Servicio de Embalaje Profesional
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Embalaje Profesional
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              Servicio de embalaje profesional en Marbella y Costa del Sol. Nuestro equipo acude a tu domicilio con todos los materiales y realiza el embalaje completo.
            </p>
          </div>

          <div class="animate-slide-up">
            <EmbalajesCalculator />
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Materiales de Embalaje Profesional
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Protección máxima para tus pertenencias con materiales de embalaje de primera calidad
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(item, idx) in materiales"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="item.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ item.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Servicios de Embalaje
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Embalaje profesional incluido, completo o parcial según tus necesidades
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(service, idx) in servicios"
              :key="idx"
              class="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
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

      <!-- CTA Section -->
      <section id="hero-calculator" class="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.05] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              ¿Necesitas Materiales de Embalaje?
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              Compra o alquila cajas de cartón, papel burbuja, film plástico y más materiales de embalaje profesionales
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/"
                class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                Comprar Materiales
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
              Preguntas Frecuentes sobre Embalajes
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Resolvemos tus dudas sobre materiales de embalaje y servicios de embalaje profesional
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
const currentUrl = `${siteUrl}/embalajes`
const defaultImage = `${siteUrl}/og-image.jpg`

useHead({
  title: 'Embalaje Profesional Marbella | Servicio Completo con Materiales | PortesPro',
  meta: [
    {
      name: 'description',
      content: 'Servicio de embalaje profesional en Marbella. Embalaje completo de mudanzas con materiales incluidos. Embalaje cuidadoso para objetos frágiles. Presupuesto gratis sin compromiso.'
    },
    {
      name: 'keywords',
      content: 'embalaje profesional marbella, servicio embalaje, embalaje mudanza, embalaje completo, embalaje cuidadoso, embalaje frágiles, materiales embalaje, cajas embalaje, papel burbuja'
    },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: currentUrl },
    { property: 'og:title', content: 'Embalaje Profesional Marbella | Servicio Completo con Materiales' },
    { property: 'og:description', content: 'Servicio de embalaje profesional en Marbella. Embalaje completo de mudanzas con materiales incluidos. Embalaje cuidadoso para objetos frágiles.' },
    { property: 'og:image', content: defaultImage },
    { property: 'og:site_name', content: 'PortesPro' },
    { property: 'og:locale', content: 'es_ES' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: currentUrl },
    { name: 'twitter:title', content: 'Embalaje Profesional Marbella | Servicio Completo' },
    { name: 'twitter:description', content: 'Servicio de embalaje profesional en Marbella. Embalaje completo de mudanzas con materiales incluidos.' },
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
        serviceType: 'Embalaje Profesional',
        provider: {
          '@type': 'LocalBusiness',
          name: 'PortesPro',
          url: siteUrl
        },
        areaServed: {
          '@type': 'City',
          name: ['Marbella', 'Málaga', 'Costa del Sol']
        },
        description: 'Servicio de embalaje profesional en Marbella. Embalaje completo de mudanzas con materiales incluidos.'
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
            name: 'Embalajes',
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
            name: '¿Qué incluye el servicio de embalaje profesional?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nuestro servicio de embalaje profesional incluye que nuestros expertos vayan a tu domicilio con todos los materiales necesarios (cajas de cartón, papel burbuja, film plástico, mantas protección) y realicen el embalaje completo de tus objetos.'
            }
          },
          {
            '@type': 'Question',
            name: '¿Cuánto cuesta el servicio de embalaje?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'El precio del servicio de embalaje profesional varía según el tipo de mudanza y cantidad de objetos. Ofrecemos embalaje completo incluido en mudanzas completas sin coste adicional, o embalaje parcial solo para objetos frágiles.'
            }
          },
          {
            '@type': 'Question',
            name: '¿Tienen que venir a mi casa para hacer el embalaje?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí, nuestro servicio de embalaje profesional se realiza en tu domicilio. Nuestro equipo acude con todos los materiales necesarios y realiza el embalaje completo in situ.'
            }
          }
        ]
      })
    }
  ]
})

// Iconos
const IconBox = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const IconBubble = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' })
])

const IconShield = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' })
])

const IconPackage = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' })
])

const IconRuler = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' })
])

const IconTape = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' })
])

const materiales = [
  {
    icon: IconBox,
    title: 'Cajas de Cartón',
    desc: 'Cajas de cartón mudanza de diferentes tamaños: simple, doble y triple. Cajas embalaje baratas y económicas para mudanzas.'
  },
  {
    icon: IconBubble,
    title: 'Papel Burbuja',
    desc: 'Papel burbuja y plástico burbuja para protección de objetos frágiles, cristales, porcelana y vajillas.'
  },
  {
    icon: IconShield,
    title: 'Film Estirable',
    desc: 'Film plástico transparente y film protección para envolver muebles, electrodomésticos y objetos voluminosos.'
  },
  {
    icon: IconTape,
    title: 'Cinta Embalaje',
    desc: 'Cinta adhesiva, cinta carrocero y cinta papel de alta resistencia para sellar cajas de forma segura.'
  },
  {
    icon: IconPackage,
    title: 'Mantas Protección',
    desc: 'Mantas mudanza y mantas muebles para proteger sofás, mesas, armarios y muebles grandes durante el transporte.'
  },
  {
    icon: IconRuler,
    title: 'Fundas y Esquineras',
    desc: 'Fundas muebles, fundas colchones, fundas cama y esquineras cartón para protección adicional de esquinas y cantos.'
  }
]

const servicios = [
  {
    number: '01',
    title: 'Embalaje Completo',
    desc: 'Servicio de embalaje profesional completo incluido en tu mudanza',
    features: [
      'Embalaje de todos tus objetos',
      'Materiales incluidos sin coste adicional',
      'Protección multicapa personalizada',
      'Embalaje cuidadoso y seguro'
    ]
  },
  {
    number: '02',
    title: 'Embalaje Parcial',
    desc: 'Embalaje personalizado solo para objetos frágiles y delicados',
    features: [
      'Embalaje de frágiles y obras de arte',
      'Embalaje de electrodomésticos',
      'Embalaje de muebles grandes',
      'A medida según tus necesidades'
    ]
  },
  {
    number: '03',
    title: 'Venta de Materiales',
    desc: 'Compra o alquila materiales de embalaje online o en nuestras instalaciones',
    features: [
      'Cajas mudanza baratas',
      'Material embalaje económico',
      'Compra online o presencial',
      'Alquiler de cajas disponibles'
    ]
  }
]

const faqs = ref([
  {
    question: '¿Qué incluye el servicio de embalaje profesional?',
    answer: 'Nuestro servicio de embalaje profesional incluye que nuestros expertos vayan a tu domicilio con todos los materiales necesarios (cajas de cartón, papel burbuja, film plástico, mantas protección) y realicen el embalaje completo de tus objetos. No necesitas comprar nada, nosotros traemos el material y hacemos el trabajo.',
    open: false
  },
  {
    question: '¿Cuánto cuesta el servicio de embalaje?',
    answer: 'El precio del servicio de embalaje profesional varía según el tipo de mudanza y cantidad de objetos. Ofrecemos embalaje completo incluido en mudanzas completas sin coste adicional, o embalaje parcial solo para objetos frágiles. Solicita un presupuesto personalizado sin compromiso.',
    open: false
  },
  {
    question: '¿Incluyen el embalaje en el precio de la mudanza?',
    answer: 'Sí, ofrecemos embalaje incluido sin coste adicional en nuestros paquetes de mudanza completa. Nuestro equipo profesional acude a tu domicilio con todos los materiales y realiza el embalaje completo. También puedes contratar embalaje profesional completo o embalaje parcial solo para objetos frágiles.',
    open: false
  },
  {
    question: '¿Cómo embalan objetos frágiles como cristales y porcelana?',
    answer: 'Nuestro servicio de embalaje profesional para objetos frágiles incluye protección multicapa específica: papel burbuja o plástico burbuja, separadores cartón y esquineras protección. Nuestros expertos conocen las técnicas adecuadas para proteger cristales, porcelana, vajillas y obras de arte durante el transporte.',
    open: false
  },
  {
    question: '¿Tienen que venir a mi casa para hacer el embalaje?',
    answer: 'Sí, nuestro servicio de embalaje profesional se realiza en tu domicilio. Nuestro equipo acude con todos los materiales necesarios (cajas, papel burbuja, film, mantas) y realiza el embalaje completo in situ. No necesitas comprar ni preparar nada, nosotros nos encargamos de todo.',
    open: false
  },
  {
    question: '¿Qué tipo de embalaje hacen para electrodomésticos?',
    answer: 'Para electrodomésticos como neveras, frigoríficos y lavadoras, nuestro servicio de embalaje profesional incluye fundas protección especiales, film estirable y mantas muebles. Protegemos cada electrodoméstico con materiales específicos para evitar daños durante el transporte.',
    open: false
  },
  {
    question: '¿Puedo contratar solo el servicio de embalaje sin mudanza?',
    answer: 'Sí, puedes contratar nuestro servicio de embalaje profesional de forma independiente. Nuestro equipo acude a tu domicilio con todos los materiales y realiza el embalaje completo. Ideal si necesitas embalar para una mudanza que harás tú mismo o para almacenamiento.',
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

