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

const { t, locale, locales, loadLocaleMessages, setLocale } = useI18n()
const { $i18n } = useNuxtApp()

console.log('🟢 [PortesStats] Locale actual:', locale.value)
console.log('🟢 [PortesStats] Available locales:', locales.value?.map(l => l.code) || [])
console.log('🟢 [PortesStats] Test translation:', t('components.stats.movesCompleted'))
console.log('🟢 [PortesStats] i18n global:', $i18n ? 'exists' : 'missing')
console.log('🟢 [PortesStats] i18n messages:', $i18n?.messages?.value ? Object.keys($i18n.messages.value) : 'no messages')
console.log('🟢 [PortesStats] Current locale messages:', $i18n?.messages?.value?.[locale.value] ? Object.keys($i18n.messages.value[locale.value]).slice(0, 5) : 'no messages for locale')

// Intentar cargar traducciones si no están disponibles
onMounted(async () => {
  console.log('🟢 [PortesStats] Componente montado')
  
  // Verificar si las traducciones están disponibles
  const testKey = 'components.stats.movesCompleted'
  const testTranslation = t(testKey)
  console.log('🟢 [PortesStats] Test translation en onMounted:', testTranslation)
  
  // Si la traducción es igual a la clave, no está cargada
  if (testTranslation === testKey) {
    console.warn('🟢 [PortesStats] Traducciones no disponibles, intentando cargar...')
    
    try {
      const currentLocale = locale.value
      const localeObj = locales.value?.find(l => l.code === currentLocale)
      
      if (localeObj && localeObj.file) {
        const messages = await import(`~/locales/${localeObj.file}`).then(m => m.default || m)
        await loadLocaleMessages(currentLocale, messages)
        console.log('🟢 [PortesStats] Traducciones cargadas manualmente:', t(testKey))
        
        // Forzar actualización del locale
        await setLocale(currentLocale)
      }
    } catch (e) {
      console.error('🟢 [PortesStats] Error cargando traducciones:', e)
    }
  } else {
    console.log('🟢 [PortesStats] Traducciones ya disponibles:', testTranslation)
  }
})

const stats = computed(() => {
  // Forzar reactividad con locale.value
  const currentLocale = locale.value
  console.log('🟢 [PortesStats] Computed recalculando, locale:', currentLocale)
  
  return [
    { label: t('components.stats.movesCompleted'), value: '12k+' },
    { label: t('components.stats.yearsExperience'), value: '15+' },
    { label: t('components.stats.vipClients'), value: '4k+' },
    { label: t('components.stats.zonesCovered'), value: '100%' },
  ]
})

// Watch locale changes y cargar traducciones si no están disponibles
watch(locale, async (newLocale) => {
  console.log('🟢 [PortesStats] Locale cambió a:', newLocale)
  
  // Verificar si las traducciones están disponibles
  const testKey = 'components.stats.movesCompleted'
  const testTranslation = t(testKey)
  console.log('🟢 [PortesStats] Test translation después de cambio:', testTranslation)
  
  // Si la traducción es igual a la clave, no está cargada
  if (testTranslation === testKey) {
    console.warn('🟢 [PortesStats] Traducciones no disponibles para nuevo locale, cargando...')
    
    try {
      const localeObj = locales.value?.find(l => l.code === newLocale)
      
      if (localeObj && localeObj.file) {
        const messages = await import(`~/locales/${localeObj.file}`).then(m => m.default || m)
        await loadLocaleMessages(newLocale, messages)
        await setLocale(newLocale)
        console.log('🟢 [PortesStats] Traducciones cargadas para nuevo locale:', t(testKey))
      }
    } catch (e) {
      console.error('🟢 [PortesStats] Error cargando traducciones para nuevo locale:', e)
    }
  }
}, { immediate: true })
</script>



