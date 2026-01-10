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

const { t, locale, locales } = useI18n()

const isReady = ref(true) // Con lazy: false, las traducciones están disponibles inmediatamente

console.log('🟢 [PortesStats] Locale actual:', locale.value)
console.log('🟢 [PortesStats] Available locales:', locales.value?.map(l => l.code) || [])
console.log('🟢 [PortesStats] Test translation:', t('components.stats.movesCompleted'))

// Con lazy: false, las traducciones están disponibles inmediatamente
onMounted(() => {
  console.log('🟢 [PortesStats] Componente montado, traducciones disponibles:', t('components.stats.movesCompleted'))
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

// Watch locale changes - con lazy: false, las traducciones están disponibles inmediatamente
watch(locale, (newLocale) => {
  console.log('🟢 [PortesStats] Locale cambió a:', newLocale)
  console.log('🟢 [PortesStats] Test translation después de cambio:', t('components.stats.movesCompleted'))
}, { immediate: true })
</script>



