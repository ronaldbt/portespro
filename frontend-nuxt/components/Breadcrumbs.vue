<template>
  <nav v-if="showBreadcrumb" aria-label="Breadcrumb" class="container mx-auto px-4 py-4">
    <ol class="flex items-center space-x-2 text-sm">
      <li>
        <NuxtLink :to="localePath('/')" class="text-slate-500 hover:text-teal-600 transition-colors font-medium">
          {{ $t('breadcrumbs.home') }}
        </NuxtLink>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
        <svg class="w-4 h-4 text-slate-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <NuxtLink
          v-if="index < crumbs.length - 1"
          :to="localePath(crumb.path)"
          class="text-slate-500 hover:text-teal-600 transition-colors font-medium"
        >
          {{ crumb.name }}
        </NuxtLink>
        <span v-else class="text-slate-900 font-bold">{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const { locale, locales } = useI18n()
const route = useRoute()
const localePath = useLocalePath()

const crumbs = computed(() => {
  // Filtrar el locale del path (es, en, sv, ru)
  const pathSegments = route.path.split('/').filter(Boolean)
  const localeCodes = ['es', 'en', 'sv', 'ru']
  
  // Si el primer segmento es un locale, ignorarlo
  const filteredSegments = localeCodes.includes(pathSegments[0]) 
    ? pathSegments.slice(1) 
    : pathSegments
  
  // Si no hay segmentos (estamos en la página principal), retornar vacío
  if (filteredSegments.length === 0) {
    return []
  }
  
  const breadcrumbs = []
  let currentPath = ''
  
  filteredSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      name: name,
      path: currentPath
    })
  })
  
  return breadcrumbs
})

// Ocultar breadcrumb completamente en la página principal
const showBreadcrumb = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const localeCodes = ['es', 'en', 'sv', 'ru']
  const filteredSegments = localeCodes.includes(pathSegments[0]) 
    ? pathSegments.slice(1) 
    : pathSegments
  return filteredSegments.length > 0
})
</script>

