<template>
  <section class="bg-white py-12 border-y border-slate-100">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(stat, i) in stats"
          :key="i"
          class="text-center"
        >
          <p class="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tighter">
            {{ stat.value }}
          </p>
          <p class="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue'

const { t, locale, loadLocaleMessages, availableLocales } = useI18n()
const app = useNuxtApp()

const isReady = ref(false)

console.log('🟢 [PortesStats] Locale actual:', locale.value)
console.log('🟢 [PortesStats] Available locales:', availableLocales.value.map(l => l.code))

// Esperar a que las traducciones se carguen
onMounted(async () => {
  try {
    // Intentar cargar las traducciones manualmente si no están disponibles
    const currentLocale = locale.value
    const localeObj = availableLocales.value.find(l => l.code === currentLocale)
    
    if (localeObj) {
      try {
        await loadLocaleMessages(currentLocale, await import(`~/locales/${localeObj.file}`).then(m => m.default))
        console.log('🟢 [PortesStats] Traducciones cargadas manualmente')
      } catch (e) {
        console.warn('🟢 [PortesStats] No se pudieron cargar traducciones manualmente, esperando...', e)
      }
    }
    
    // Esperar un poco para que las traducciones se carguen
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Verificar si las traducciones están disponibles
    const testTranslation = t('components.stats.movesCompleted')
    console.log('🟢 [PortesStats] Test translation después de cargar:', testTranslation)
    console.log('🟢 [PortesStats] Test translation === key?', testTranslation === 'components.stats.movesCompleted')
    
    // Si la traducción es diferente de la clave, están cargadas
    isReady.value = testTranslation !== 'components.stats.movesCompleted'
    
    if (!isReady.value) {
      console.warn('🟢 [PortesStats] Traducciones no disponibles después de intentar cargar, usando fallback')
      // Esperar un poco más
      await new Promise(resolve => setTimeout(resolve, 500))
      isReady.value = true // Fallback: usar aunque no estén disponibles
    }
  } catch (e) {
    console.error('🟢 [PortesStats] Error cargando traducciones:', e)
    isReady.value = true // Fallback
  }
})

const stats = computed(() => {
  // Forzar reactividad con locale.value
  const currentLocale = locale.value
  console.log('🟢 [PortesStats] Computed recalculando, locale:', currentLocale, 'ready:', isReady.value)
  
  // Si no está listo, retornar valores por defecto
  if (!isReady.value) {
    return [
      { label: '...', value: '12k+' },
      { label: '...', value: '15+' },
      { label: '...', value: '4k+' },
      { label: '...', value: '100%' },
    ]
  }
  
  return [
    { label: t('components.stats.movesCompleted'), value: '12k+' },
    { label: t('components.stats.yearsExperience'), value: '15+' },
    { label: t('components.stats.vipClients'), value: '4k+' },
    { label: t('components.stats.zonesCovered'), value: '100%' },
  ]
})

// Watch locale changes y esperar a que se carguen las traducciones
watch(locale, async (newLocale) => {
  console.log('🟢 [PortesStats] Locale cambió a:', newLocale)
  isReady.value = false
  
  try {
    // Intentar cargar las traducciones manualmente
    const localeObj = availableLocales.value.find(l => l.code === newLocale)
    
    if (localeObj) {
      try {
        await loadLocaleMessages(newLocale, await import(`~/locales/${localeObj.file}`).then(m => m.default))
        console.log('🟢 [PortesStats] Nuevas traducciones cargadas manualmente para:', newLocale)
      } catch (e) {
        console.warn('🟢 [PortesStats] No se pudieron cargar traducciones manualmente:', e)
      }
    }
    
    // Esperar un poco para que las traducciones se carguen
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Verificar si las traducciones están disponibles
    const testTranslation = t('components.stats.movesCompleted')
    isReady.value = testTranslation !== 'components.stats.movesCompleted'
    
    if (!isReady.value) {
      await new Promise(resolve => setTimeout(resolve, 500))
      isReady.value = true // Fallback
    }
    
    console.log('🟢 [PortesStats] Nuevas traducciones cargadas para:', newLocale, 'ready:', isReady.value)
  } catch (e) {
    console.error('🟢 [PortesStats] Error cargando traducciones:', e)
    isReady.value = true // Fallback
  }
}, { immediate: true })
</script>



