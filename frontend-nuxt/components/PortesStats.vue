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
const { t } = useI18n()

const stats = computed(() => [
  { label: t('components.stats.movesCompleted'), value: '12k+' },
  { label: t('components.stats.yearsExperience'), value: '15+' },
  { label: t('components.stats.vipClients'), value: '4k+' },
  { label: t('components.stats.zonesCovered'), value: '100%' },
])
</script>



