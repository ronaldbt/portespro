<template>
  <nav aria-label="Breadcrumb" class="container mx-auto px-4 py-4">
    <ol class="flex items-center space-x-2 text-sm">
      <li>
        <NuxtLink to="/" class="text-slate-500 hover:text-teal-600 transition-colors font-medium">
          Inicio
        </NuxtLink>
      </li>
      <li v-for="(crumb, index) in crumbs" :key="index" class="flex items-center">
        <svg class="w-4 h-4 text-slate-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <NuxtLink
          v-if="index < crumbs.length - 1"
          :to="crumb.path"
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
import { useRoute } from '#app'

const route = useRoute()

const crumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const breadcrumbs = []
  
  let currentPath = ''
  
  pathSegments.forEach((segment, index) => {
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
</script>

