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

const { t, locale, setLocale, waitForPendingLocaleChange } = useI18n()

const isReady = ref(false)

console.log('🟢 [PortesStats] Locale actual:', locale.value)

// Esperar a que las traducciones se carguen
onMounted(async () => {
  try {
    await waitForPendingLocaleChange()
    isReady.value = true
    console.log('🟢 [PortesStats] Traducciones cargadas, test:', t('components.stats.movesCompleted'))
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
    await waitForPendingLocaleChange()
    isReady.value = true
    console.log('🟢 [PortesStats] Nuevas traducciones cargadas para:', newLocale)
  } catch (e) {
    console.error('🟢 [PortesStats] Error cargando traducciones:', e)
    isReady.value = true // Fallback
  }
}, { immediate: true })
</script>



