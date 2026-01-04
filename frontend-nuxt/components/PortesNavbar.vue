<template>
  <nav :class="`fixed w-full z-[70] transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-6'}`">
    <div class="container mx-auto px-4 md:px-6 flex justify-between items-center">
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="bg-slate-900 p-2 rounded-xl group-hover:bg-teal-600 transition-all duration-300 transform group-hover:rotate-12 shadow-lg">
          <svg class="text-white w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span class="text-2xl font-black tracking-tighter text-slate-900">
          PORTES<span class="text-teal-600">PRO</span>.es
        </span>
      </NuxtLink>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-10">
        <a 
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href" 
          class="text-sm font-black uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-all relative group"
        >
          {{ link.name }}
          <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 group-hover:w-full transition-all duration-300" />
        </a>
        <button 
          @click="$emit('get-quote')"
          class="bg-teal-600 hover:bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-teal-100 transition-all hover:scale-105 active:scale-95"
        >
          Presupuesto
        </button>
      </div>

      <!-- Mobile Toggle -->
      <button class="md:hidden p-2 rounded-xl bg-slate-100 text-slate-900" @click="isOpen = !isOpen">
        <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-screen"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 max-h-screen"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" class="md:hidden bg-white border-b absolute top-full w-full px-6 py-8 shadow-2xl overflow-hidden">
        <div class="flex flex-col gap-6">
          <a 
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href" 
            @click="isOpen = false"
            class="text-slate-900 font-black text-xl uppercase tracking-tighter"
          >
            {{ link.name }}
          </a>
          <div class="h-px bg-slate-100" />
          <button 
            @click="$emit('get-quote'); isOpen = false"
            class="bg-teal-600 text-white py-4 rounded-2xl font-black text-sm uppercase shadow-lg shadow-teal-100"
          >
            Calculadora Online
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineEmits(['get-quote'])

const scrolled = ref(false)
const isOpen = ref(false)

const navLinks = [
  { name: 'Inicio', href: '#' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Reseñas', href: '#testimonios' },
]

onMounted(() => {
  if (process.client) {
    const handleScroll = () => {
      scrolled.value = window.scrollY > 20
    }
    window.addEventListener('scroll', handleScroll)
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  }
})
</script>



