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

      <!-- Services Types Section -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ serviceTypesTitle || $t('pages.index.servicesTypes.title') || 'Tipos de Mudanzas y Servicios' }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ serviceTypesSubtitle || $t('pages.index.servicesTypes.subtitle') || 'Servicios completos de mudanzas, fletes y portes para particulares y empresas' }}
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(service, idx) in serviceTypes"
              :key="idx"
              class="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-teal-100/40 transition-all group hover:-translate-y-2"
            >
              <div class="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-md">
                <component :is="service.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-2xl font-black text-slate-900 mb-4 tracking-tight">{{ service.title }}</h3>
              <p class="text-slate-600 leading-relaxed font-medium mb-6">{{ service.description }}</p>
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

      <div class="bg-slate-100 py-24">
         <PortesFeatures />
      </div>

      <!-- Process Section -->
      <PortesProcess />
      
      <PortesQualityCommitment />
      
      <PortesTestimonials />

      <!-- Pricing Section -->
      <section class="py-24 bg-slate-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
              {{ $t('pages.index.pricing.title') }}
            </h2>
            <p class="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              {{ $t('pages.index.pricing.subtitle') }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="grid md:grid-cols-2 gap-8 mb-12">
              <div
                v-for="(price, idx) in pricingInfo"
                :key="idx"
                class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm"
              >
                <h3 class="text-xl font-black text-slate-900 mb-4">{{ price.title }}</h3>
                <p class="text-slate-600 leading-relaxed font-medium">{{ price.description }}</p>
              </div>
            </div>
            <div class="text-center">
              <p class="text-slate-600 font-medium mb-6">{{ $t('pages.index.pricing.ctaText') }}</p>
              <NuxtLink
                to="#hero-calculator"
                @click="scrollToCalc"
                class="inline-block bg-teal-600 hover:bg-teal-700 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:scale-105"
              >
                {{ $t('pages.index.pricing.ctaButton') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

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
import { computed, ref, h, watch, onMounted } from 'vue'

// ⚠️ LOG INMEDIATO - Debe aparecer siempre
console.log('🔥🔥🔥 [INDEX.VUE] Script setup INICIADO')

const { locale, locales, t } = useI18n()
const route = useRoute()
const { $i18n } = useNuxtApp()

// Console log inicial para debugging - EJECUTAR INMEDIATAMENTE
console.log('🔵🔵🔵 [INDEX.VUE] Script setup ejecutado')
console.log('🔵 [Index] Locale actual:', locale.value)
console.log('🔵 [Index] i18n disponible:', $i18n ? 'Sí' : 'No')

// Verificar traducciones inmediatamente
if ($i18n?.messages?.value) {
  console.log('🔵 [Index] Mensajes disponibles:', Object.keys($i18n.messages.value))
  if ($i18n.messages.value[locale.value]) {
    console.log('🔵 [Index] Mensajes para locale:', Object.keys($i18n.messages.value[locale.value]))
    if ($i18n.messages.value[locale.value].pages) {
      console.log('🔵 [Index] Páginas disponibles:', Object.keys($i18n.messages.value[locale.value].pages))
      if ($i18n.messages.value[locale.value].pages.index) {
        console.log('✅ [Index] pages.index ENCONTRADO!')
        console.log('✅ [Index] Keys en pages.index:', Object.keys($i18n.messages.value[locale.value].pages.index))
      } else {
        console.error('❌ [Index] pages.index NO ENCONTRADO')
      }
    } else {
      console.error('❌ [Index] pages NO ENCONTRADO')
    }
  } else {
    console.error('❌ [Index] Mensajes para locale', locale.value, 'NO ENCONTRADOS')
  }
} else {
  console.error('❌ [Index] NO HAY MENSAJES DISPONIBLES')
}

// Console log inicial para debugging
onMounted(() => {
  console.log('🔵🔵🔵 [INDEX.VUE] onMounted ejecutado - Verificando traducciones...')
  console.log('🔵 [Index] Componente montado - Verificando traducciones...')
  console.log('🔵 [Index] Locale actual:', locale.value)
  console.log('🔵 [Index] i18n disponible:', $i18n ? 'Sí' : 'No')
  console.log('🔵 [Index] Mensajes disponibles:', $i18n?.messages?.value ? Object.keys($i18n.messages.value) : 'No hay mensajes')
  
  // Verificar estructura de traducciones
  if ($i18n?.messages?.value?.[locale.value]?.pages?.index) {
    console.log('✅ [Index] Estructura pages.index encontrada')
    console.log('✅ [Index] Keys disponibles en pages.index:', Object.keys($i18n.messages.value[locale.value].pages.index))
    
    // Verificar FAQs específicamente
    if ($i18n.messages.value[locale.value].pages.index.faqs) {
      const faqKeys = Object.keys($i18n.messages.value[locale.value].pages.index.faqs).filter(k => k.startsWith('faq'))
      console.log(`✅ [Index] FAQs encontrados: ${faqKeys.length} (${faqKeys.join(', ')})`)
    } else {
      console.error('❌ [Index] NO se encontró pages.index.faqs en las traducciones')
    }
    
    // Verificar servicesTypes
    if ($i18n.messages.value[locale.value].pages.index.servicesTypes) {
      console.log('✅ [Index] servicesTypes encontrado')
    } else {
      console.error('❌ [Index] NO se encontró pages.index.servicesTypes en las traducciones')
    }
    
    // Verificar pricing
    if ($i18n.messages.value[locale.value].pages.index.pricing) {
      console.log('✅ [Index] pricing encontrado')
    } else {
      console.error('❌ [Index] NO se encontró pages.index.pricing en las traducciones')
    }
  } else {
    console.error('❌ [Index] NO se encontró pages.index en las traducciones')
    console.log('🔴 [Index] Estructura completa disponible:', $i18n?.messages?.value?.[locale.value] ? Object.keys($i18n.messages.value[locale.value]) : 'No hay datos')
  }
})

const scrollToCalc = () => {
  if (process.client) {
    document.getElementById('hero-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Estado de apertura de FAQs (ahora tenemos 12 FAQs)
const faqOpenStates = ref([false, false, false, false, false, false, false, false, false, false, false, false])

// FAQs con traducciones - computed para reactividad al cambio de locale y estado de apertura
const faqs = computed(() => {
  // Forzar reactividad al cambio de locale y estado de apertura
  const currentLocale = locale.value
  const openStates = faqOpenStates.value
  
  // Debug: Verificar que las traducciones estén disponibles
  console.log('🔵🔵🔵 [INDEX.VUE] FAQs COMPUTED EJECUTADO, locale:', currentLocale)
  const testKey = 'pages.index.faqs.faq1.question'
  const testTranslation = t(testKey)
  console.log('🔵 [Index] Test traducción FAQ1:', testKey, '→', testTranslation)
  
  if (process.client) {
    
    // Verificar si el mensaje existe directamente
    if ($i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs) {
      console.log('🔵 [Index] FAQs encontrados en mensajes:', Object.keys($i18n.messages.value[currentLocale].pages.index.faqs))
    } else {
      console.warn('🔴 [Index] No se encontraron FAQs en messages.pages.index.faqs')
      console.log('🔴 [Index] Estructura disponible:', $i18n?.messages?.value?.[currentLocale]?.pages ? Object.keys($i18n.messages.value[currentLocale].pages) : 'No hay pages')
    }
  }
  
  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8', 'faq9', 'faq10', 'faq11', 'faq12']
  
  const result = faqKeys.map((key, index) => {
    const questionKey = `pages.index.faqs.${key}.question`
    const answerKey = `pages.index.faqs.${key}.answer`
    let question = t(questionKey)
    let answer = t(answerKey)
    
    // Debug detallado para cada FAQ
    if (process.client && (question === questionKey || answer === answerKey)) {
      console.warn(`🔴 [Index] FAQ ${key} tiene problemas:`)
      console.warn(`  - Question key: ${questionKey}`)
      console.warn(`  - Question result: ${question}`)
      console.warn(`  - Answer key: ${answerKey}`)
      console.warn(`  - Answer result: ${answer}`)
      
      // Intentar acceso directo al objeto
      try {
        const directQuestion = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs?.[key]?.question
        const directAnswer = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs?.[key]?.answer
        console.warn(`  - Acceso directo question:`, directQuestion)
        console.warn(`  - Acceso directo answer:`, directAnswer)
      } catch (e) {
        console.error(`  - Error al acceder directamente:`, e)
      }
    }
    
    // Si la traducción devuelve la misma clave, significa que no existe
    if (question === questionKey) {
      console.error(`❌ [Index] Traducción faltante para pregunta: ${questionKey}`)
      // Intentar obtener del objeto directamente como fallback
      const directQ = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs?.[key]?.question
      if (directQ) {
        console.log(`✅ [Index] Encontrada traducción directa para ${questionKey}:`, directQ)
        question = directQ
      }
    }
    if (answer === answerKey) {
      console.error(`❌ [Index] Traducción faltante para respuesta: ${answerKey}`)
      // Intentar obtener del objeto directamente como fallback
      const directA = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.faqs?.[key]?.answer
      if (directA) {
        console.log(`✅ [Index] Encontrada traducción directa para ${answerKey}:`, directA)
        answer = directA
      }
    }
    
    return {
      question,
      answer,
      open: openStates[index]
    }
  })
  
  return result
})

// Watch locale changes para forzar reactividad
watch(locale, (newLocale) => {
  console.log('🟢 [Index] Locale cambió a:', newLocale)
  console.log('🟢 [Index] Mensajes disponibles para nuevo locale:', $i18n?.messages?.value?.[newLocale] ? Object.keys($i18n.messages.value[newLocale]) : 'No hay mensajes')
  // El computed se recalculará automáticamente
}, { immediate: true })

// Función para alternar el estado de apertura de un FAQ
const toggleFaq = (index) => {
  faqOpenStates.value[index] = !faqOpenStates.value[index]
}

// Service Types para la nueva sección
const IconHome = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
])
const IconBuilding = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' })
])
const IconGlobe = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])
const IconTruckIcon = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])
const IconBox = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])
const IconArrows = () => h('svg', { class: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' })
])

// Títulos de la sección ServiceTypes
const serviceTypesTitle = computed(() => {
  const currentLocale = locale.value
  return $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.title || t('pages.index.servicesTypes.title') || 'Tipos de Mudanzas y Servicios'
})

const serviceTypesSubtitle = computed(() => {
  const currentLocale = locale.value
  return $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.subtitle || t('pages.index.servicesTypes.subtitle') || 'Servicios completos de mudanzas, fletes y portes para particulares y empresas'
})

const serviceTypes = computed(() => {
  const currentLocale = locale.value
  
  // Debug para serviceTypes - EJECUTAR SIEMPRE
  console.log('🔵 [Index] ServiceTypes computed ejecutado, locale:', currentLocale)
  const testKey = 'pages.index.servicesTypes.type1.title'
  const testTranslation = t(testKey)
  console.log('🔵 [Index] Test traducción serviceTypes:', testKey, '→', testTranslation)
  
  // Verificar acceso directo
  const directAccess = $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.title
  console.log('🔵 [Index] Acceso directo serviceTypes type1.title:', directAccess)
  
  if (testTranslation === testKey || !testTranslation) {
    console.error('❌ [Index] ServiceTypes: Traducción faltante o no encontrada')
    console.error('❌ [Index] Estructura disponible:', $i18n?.messages?.value?.[currentLocale]?.pages?.index ? Object.keys($i18n.messages.value[currentLocale].pages.index) : 'No disponible')
  }
  
  return [
    {
      icon: IconHome,
      title: directAccess || t('pages.index.servicesTypes.type1.title') || 'pages.index.servicesTypes.type1.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.description || t('pages.index.servicesTypes.type1.description') || 'pages.index.servicesTypes.type1.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.feature1 || t('pages.index.servicesTypes.type1.feature1') || 'pages.index.servicesTypes.type1.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.feature2 || t('pages.index.servicesTypes.type1.feature2') || 'pages.index.servicesTypes.type1.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type1?.feature3 || t('pages.index.servicesTypes.type1.feature3') || 'pages.index.servicesTypes.type1.feature3'
      ]
    },
    {
      icon: IconBuilding,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.title || t('pages.index.servicesTypes.type2.title') || 'pages.index.servicesTypes.type2.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.description || t('pages.index.servicesTypes.type2.description') || 'pages.index.servicesTypes.type2.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.feature1 || t('pages.index.servicesTypes.type2.feature1') || 'pages.index.servicesTypes.type2.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.feature2 || t('pages.index.servicesTypes.type2.feature2') || 'pages.index.servicesTypes.type2.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type2?.feature3 || t('pages.index.servicesTypes.type2.feature3') || 'pages.index.servicesTypes.type2.feature3'
      ]
    },
    {
      icon: IconGlobe,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.title || t('pages.index.servicesTypes.type3.title') || 'pages.index.servicesTypes.type3.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.description || t('pages.index.servicesTypes.type3.description') || 'pages.index.servicesTypes.type3.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.feature1 || t('pages.index.servicesTypes.type3.feature1') || 'pages.index.servicesTypes.type3.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.feature2 || t('pages.index.servicesTypes.type3.feature2') || 'pages.index.servicesTypes.type3.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type3?.feature3 || t('pages.index.servicesTypes.type3.feature3') || 'pages.index.servicesTypes.type3.feature3'
      ]
    },
    {
      icon: IconTruckIcon,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.title || t('pages.index.servicesTypes.type4.title') || 'pages.index.servicesTypes.type4.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.description || t('pages.index.servicesTypes.type4.description') || 'pages.index.servicesTypes.type4.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.feature1 || t('pages.index.servicesTypes.type4.feature1') || 'pages.index.servicesTypes.type4.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.feature2 || t('pages.index.servicesTypes.type4.feature2') || 'pages.index.servicesTypes.type4.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type4?.feature3 || t('pages.index.servicesTypes.type4.feature3') || 'pages.index.servicesTypes.type4.feature3'
      ]
    },
    {
      icon: IconBox,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.title || t('pages.index.servicesTypes.type5.title') || 'pages.index.servicesTypes.type5.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.description || t('pages.index.servicesTypes.type5.description') || 'pages.index.servicesTypes.type5.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.feature1 || t('pages.index.servicesTypes.type5.feature1') || 'pages.index.servicesTypes.type5.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.feature2 || t('pages.index.servicesTypes.type5.feature2') || 'pages.index.servicesTypes.type5.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type5?.feature3 || t('pages.index.servicesTypes.type5.feature3') || 'pages.index.servicesTypes.type5.feature3'
      ]
    },
    {
      icon: IconArrows,
      title: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.title || t('pages.index.servicesTypes.type6.title') || 'pages.index.servicesTypes.type6.title',
      description: $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.description || t('pages.index.servicesTypes.type6.description') || 'pages.index.servicesTypes.type6.description',
      features: [
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.feature1 || t('pages.index.servicesTypes.type6.feature1') || 'pages.index.servicesTypes.type6.feature1',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.feature2 || t('pages.index.servicesTypes.type6.feature2') || 'pages.index.servicesTypes.type6.feature2',
        $i18n?.messages?.value?.[currentLocale]?.pages?.index?.servicesTypes?.type6?.feature3 || t('pages.index.servicesTypes.type6.feature3') || 'pages.index.servicesTypes.type6.feature3'
      ]
    }
  ]
})

const pricingInfo = computed(() => {
  const currentLocale = locale.value
  
  // Debug para pricingInfo
  if (process.client) {
    console.log('🔵 [Index] PricingInfo computed ejecutado, locale:', currentLocale)
    const testKey = 'pages.index.pricing.price1.title'
    const testTranslation = t(testKey)
    console.log('🔵 [Index] Test traducción pricing:', testKey, '→', testTranslation)
    if (testTranslation === testKey) {
      console.warn('❌ [Index] PricingInfo: Traducción faltante o no encontrada')
    }
  }
  
  return [
    {
      title: t('pages.index.pricing.price1.title'),
      description: t('pages.index.pricing.price1.description')
    },
    {
      title: t('pages.index.pricing.price2.title'),
      description: t('pages.index.pricing.price2.description')
    },
    {
      title: t('pages.index.pricing.price3.title'),
      description: t('pages.index.pricing.price3.description')
    },
    {
      title: t('pages.index.pricing.price4.title'),
      description: t('pages.index.pricing.price4.description')
    }
  ]
})

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
  if (locale.value === 'es') return 'Mudanzas y Portes Profesionales'
  if (locale.value === 'en') return 'Professional Moving Services'
  if (locale.value === 'sv') return 'Professionella Flytttjänster'
  return 'Профессиональные Услуги Переездов'
})

// Meta descriptions optimizadas (150-160 caracteres)
const pageDescription = computed(() => {
  if (locale.value === 'es') return 'Mudanzas profesionales en Marbella desde 45€. Fletes y mudanzas, portes baratos, mudanzas baratas. Cotizar mudanza online gratis. Presupuesto gratis. ☎ +34 600 000 000'
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
  const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8', 'faq9', 'faq10', 'faq11', 'faq12']
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

    const faqKeys = ['faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6', 'faq7', 'faq8', 'faq9', 'faq10', 'faq11', 'faq12']
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
          content: currentLocale === 'es' ? 'mudanzas marbella, mudanzas costa del sol, mudanzas baratas, mudanzas económicas, fletes y mudanzas, fletes baratos, portes baratos, mudanzas particulares, mudanzas empresas, mudanzas oficinas, mudanzas nacionales, mudanzas internacionales, mudanza pequeña, transporte de muebles, traslado de muebles, trasteos, camiones de mudanza, presupuesto mudanza, cotizar mudanza, precio mudanza, mudanzas cerca de mi, empresas de mudanzas, servicio de mudanza, mudanzas 24 horas, mudanzas urgentes, mudanzas online, contratar mudanza, comparador de mudanzas' :
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
