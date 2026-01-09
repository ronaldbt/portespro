<template>
  <div class="min-h-screen flex flex-col overflow-x-hidden bg-white selection:bg-teal-100 selection:text-teal-900">
    <PortesNavbar @get-quote="scrollToCalc" />
    
    <PortesLanguageSwitcher :current-lang="lang" @lang-change="lang = $event" />
    <PortesOnlineAdvisor />

    <main class="flex-grow">
      <!-- Hero Section -->
      <section class="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-slate-50">
        <div class="absolute top-0 right-0 w-full h-full bg-teal-600/[0.02] -skew-y-3 origin-top-right -z-10" />
        
        <div class="container mx-auto px-4 relative z-10">
          <div class="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <span class="inline-block bg-white text-teal-700 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm border border-slate-200">
              Logística de Última Milla y Entrega Final
            </span>
            <h1 class="text-5xl md:text-8xl font-black text-slate-950 leading-[0.9] tracking-tighter mb-8">
              Última Milla
            </h1>
            <p class="text-lg md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium">
              Servicio última milla, logística última milla y distribución última milla en Marbella, Málaga y Costa del Sol. Entrega última milla express y mismo día.
            </p>
          </div>

          <div class="animate-slide-up">
            <UltimaMillaCalculator />
          </div>
        </div>
      </section>

      <!-- Sectors Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Última Milla por Sector
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Especialistas en última milla para ecommerce, alimentación, farmacia y más sectores
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(sector, idx) in sectores"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="sector.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ sector.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium mb-6">{{ sector.desc }}</p>
              <ul class="space-y-2">
                <li v-for="(feature, i) in sector.features" :key="i" class="flex items-start gap-2">
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

      <!-- Delivery Types Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Tipos de Entrega Última Milla
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Última milla mismo día, express, urgente y programada según tus necesidades
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div
              v-for="(tipo, idx) in tiposEntrega"
              :key="idx"
              class="p-8 rounded-[2.5rem] border-2 border-slate-100 bg-white hover:border-teal-600 hover:shadow-xl transition-all text-center"
            >
              <div class="text-4xl font-black text-teal-600 mb-4">{{ tipo.icon }}</div>
              <h3 class="text-xl font-black text-slate-900 mb-2 tracking-tight">{{ tipo.title }}</h3>
              <p class="text-slate-500 text-sm font-medium">{{ tipo.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Technology Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Tecnología Última Milla
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Última milla digital con tracking, seguimiento GPS y plataforma avanzada
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div
              v-for="(tech, idx) in tecnologia"
              :key="idx"
              class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
            >
              <div class="text-5xl font-black text-teal-600 mb-4">{{ tech.number }}</div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ tech.title }}</h3>
              <p class="text-slate-500 leading-relaxed font-medium">{{ tech.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Coverage Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              Cobertura Última Milla
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Última milla local, urbana y rural en Marbella, Málaga y toda la Costa del Sol
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div
              v-for="(zona, idx) in zonas"
              :key="idx"
              class="p-10 rounded-[2.5rem] border border-slate-200 bg-white text-center hover:border-teal-600 hover:shadow-xl transition-all"
            >
              <div class="text-4xl font-black text-teal-600 mb-4">{{ zona.icon }}</div>
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
              ¿Necesitas Servicio de Última Milla?
            </h2>
            <p class="text-xl text-slate-300 mb-12 font-medium">
              Logística última milla, distribución última milla y entrega última milla en Marbella, Málaga y Costa del Sol. Última milla ecommerce, alimentación y farmacia.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink
                to="/"
                class="bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                Contratar Última Milla
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
              Preguntas Frecuentes sobre Última Milla
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Resolvemos tus dudas sobre última milla logística, entrega última milla y distribución última milla en Marbella y Costa del Sol
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

// Iconos
const IconShopping = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
])

const IconFood = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
])

const IconPill = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' })
])

const IconPackage = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const IconRestaurant = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' })
])

const sectores = [
  {
    icon: IconShopping,
    title: 'Última Milla Ecommerce',
    desc: 'Última milla comercio electrónico y tiendas online. Entrega última milla para ecommerce y retail online.',
    features: [
      'Última milla tiendas online',
      'Última milla retail',
      'Entrega paquetes ecommerce',
      'Tracking en tiempo real'
    ]
  },
  {
    icon: IconFood,
    title: 'Última Milla Alimentación',
    desc: 'Última milla supermercados y distribución alimentaria. Entrega de productos frescos y perecederos.',
    features: [
      'Última milla supermercados',
      'Entrega productos frescos',
      'Horarios flexibles',
      'Cadena frío garantizada'
    ]
  },
  {
    icon: IconRestaurant,
    title: 'Última Milla Restaurantes',
    desc: 'Última milla comida a domicilio y delivery. Servicio express para restaurantes y servicios de comida.',
    features: [
      'Última milla comida a domicilio',
      'Entrega express restaurantes',
      'Horarios ampliados',
      'Temperatura controlada'
    ]
  },
  {
    icon: IconPill,
    title: 'Última Milla Farmacia',
    desc: 'Última milla productos farmacéuticos y medicamentos. Entrega urgente y programada para farmacias.',
    features: [
      'Última milla farmacia',
      'Entrega medicamentos',
      'Servicio urgente disponible',
      'Cumplimiento normativo'
    ]
  },
  {
    icon: IconPackage,
    title: 'Última Milla Paquetería',
    desc: 'Última milla paquetes y mensajería. Entrega de envíos y paquetería general.',
    features: [
      'Última milla paquetes',
      'Mensajería última milla',
      'Entrega flexible',
      'Seguimiento completo'
    ]
  }
]

const tiposEntrega = [
  {
    icon: '⚡',
    title: 'Última Milla Mismo Día',
    desc: 'Entrega última milla mismo día para urgencias'
  },
  {
    icon: '🚀',
    title: 'Última Milla Express',
    desc: 'Última milla express y 24 horas disponible'
  },
  {
    icon: '📅',
    title: 'Última Milla Programada',
    desc: 'Última milla programada con horarios flexibles'
  },
  {
    icon: '🌙',
    title: 'Última Milla Nocturna',
    desc: 'Última milla nocturna y entrega tarde disponible'
  }
]

const tecnologia = [
  {
    number: '01',
    title: 'Última Milla Tracking',
    desc: 'Última milla seguimiento y tracking GPS en tiempo real. Monitoreo completo de cada entrega.'
  },
  {
    number: '02',
    title: 'Última Milla App',
    desc: 'Última milla digital con app móvil y plataforma web. Gestión completa desde tu dispositivo.'
  },
  {
    number: '03',
    title: 'Última Milla Sistema',
    desc: 'Última milla plataforma avanzada con integración API. Sistema completo de logística última milla.'
  }
]

const zonas = [
  {
    icon: '🏙️',
    title: 'Última Milla Urbana',
    desc: 'Última milla local en Marbella, Málaga y ciudades principales'
  },
  {
    icon: '🌆',
    title: 'Última Milla Periférica',
    desc: 'Última milla en zonas periféricas y áreas residenciales'
  },
  {
    icon: '🌳',
    title: 'Última Milla Rural',
    desc: 'Última milla rural y zonas menos accesibles de la Costa del Sol'
  }
]

const faqs = ref([
  {
    question: '¿Qué es el servicio de última milla?',
    answer: 'El servicio de última milla es la fase final de la distribución, desde el almacén o centro de distribución hasta el destino final del cliente. Ofrecemos última milla logística, última milla distribución y entrega última milla para ecommerce, alimentación, farmacia y paquetería en Marbella y Costa del Sol.',
    open: false
  },
  {
    question: '¿Cuánto tiempo tarda la entrega última milla?',
    answer: 'Ofrecemos última milla mismo día, última milla 24 horas y última milla express para entregas urgentes. También disponemos de última milla programada con horarios flexibles, última milla fin de semana y última milla nocturna. El tiempo de entrega última milla depende del tipo de servicio contratado.',
    open: false
  },
  {
    question: '¿Qué sectores cubre el servicio de última milla?',
    answer: 'Cubrimos última milla ecommerce y última milla comercio electrónico para tiendas online, última milla alimentación y última milla supermercados, última milla restaurantes y última milla comida a domicilio, última milla farmacia, última milla paquetería y última milla retail.',
    open: false
  },
  {
    question: '¿Cómo funciona el tracking de última milla?',
    answer: 'Nuestro servicio de última milla incluye última milla tracking y última milla seguimiento en tiempo real mediante última milla GPS. Disponemos de última milla app y última milla plataforma digital para que puedas seguir tu envío en cada momento. El última milla sistema te notifica cada actualización.',
    open: false
  },
  {
    question: '¿Cuánto cuesta el servicio de última milla?',
    answer: 'El precio de última milla varía según la zona (última milla urbana, última milla periférica o última milla rural), tipo de entrega y urgencia. Ofrecemos última milla local en Marbella, última milla Málaga y última milla Costa del Sol. Solicita un presupuesto personalizado sin compromiso.',
    open: false
  },
  {
    question: '¿Hacen reparto última milla los fines de semana?',
    answer: 'Sí, ofrecemos última milla fin de semana y última milla flexible con horarios adaptados a tus necesidades. El servicio de reparto última milla está disponible de lunes a domingo según el plan contratado.',
    open: false
  },
  {
    question: '¿Qué diferencia hay entre última milla y mensajería tradicional?',
    answer: 'La última milla logística se enfoca en la eficiencia y rapidez de la entrega final, con tecnología avanzada de tracking, rutas optimizadas y flexibilidad horaria. Nuestro servicio de mensajería última milla combina la velocidad del delivery última milla con la profesionalidad del transporte última milla.',
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

