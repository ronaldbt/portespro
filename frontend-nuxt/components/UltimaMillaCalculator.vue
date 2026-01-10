<template>
  <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
    <!-- Header -->
    <div class="bg-gradient-to-r from-teal-600 to-slate-900 p-4 md:p-6 text-white">
      <h2 class="text-xl md:text-2xl font-black mb-1 tracking-tighter">Calculadora de Última Milla</h2>
      <p class="text-sm text-teal-100">Calcula el precio de entrega última milla según distancia, tipo de envío y urgencia</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
      <!-- Left Panel: Selección -->
      <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        <!-- Distancia -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.distance') }}</span>
          </div>
          <div class="p-3 bg-white">
            <input
              type="number"
              v-model.number="distancia"
              min="0"
              step="1"
              :placeholder="$t('components.ultimaMillaCalculator.distancePlaceholder')"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-slate-900 font-medium text-sm"
            />
            <p class="text-[10px] text-slate-500 mt-1">{{ $t('components.ultimaMillaCalculator.distanceNote') }}</p>
          </div>
        </div>

        <!-- Tipo de Envío -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.shipmentType') }}</span>
          </div>
          <div class="p-2 space-y-1.5 bg-white">
            <label
              v-for="envio in tiposEnvio"
              :key="envio.id"
              class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all cursor-pointer"
              :class="{ 'ring-2 ring-teal-600 bg-teal-50': selectedEnvio === envio.id }"
            >
              <div class="flex-1">
                <p class="font-bold text-slate-900 text-[11px]">{{ envio.name }}</p>
                <p class="text-[10px] text-slate-500">{{ envio.desc }}</p>
              </div>
              <input
                type="radio"
                :value="envio.id"
                v-model="selectedEnvio"
                class="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>

        <!-- Tipo de Entrega -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.deliveryType') }}</span>
          </div>
          <div class="p-2 space-y-1.5 bg-white">
            <label
              v-for="entrega in tiposEntrega"
              :key="entrega.id"
              class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all cursor-pointer"
              :class="{ 'ring-2 ring-teal-600 bg-teal-50': selectedEntrega === entrega.id }"
            >
              <div class="flex-1">
                <p class="font-bold text-slate-900 text-[11px]">{{ entrega.name }}</p>
                <p class="text-[10px] text-slate-500">{{ entrega.desc }}</p>
              </div>
              <input
                type="radio"
                :value="entrega.id"
                v-model="selectedEntrega"
                class="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>

        <!-- Sector -->
        <div class="border border-slate-200 rounded-lg overflow-hidden">
          <div class="px-3 py-2 bg-slate-50">
            <span class="font-black text-slate-900 text-xs">{{ $t('components.ultimaMillaCalculator.sector') }}</span>
          </div>
          <div class="p-2 space-y-1.5 bg-white">
            <label
              v-for="sector in sectores"
              :key="sector.id"
              class="flex items-center justify-between p-1.5 bg-slate-50 rounded-md hover:bg-teal-50 transition-all cursor-pointer"
              :class="{ 'ring-2 ring-teal-600 bg-teal-50': selectedSector === sector.id }"
            >
              <div class="flex-1">
                <p class="font-bold text-slate-900 text-[11px]">{{ sector.name }}</p>
                <p class="text-[10px] text-slate-500">{{ sector.desc }}</p>
              </div>
              <input
                type="radio"
                :value="sector.id"
                v-model="selectedSector"
                class="w-3.5 h-3.5 text-teal-600 focus:ring-teal-500"
              />
            </label>
          </div>
        </div>
      </div>

      <!-- Right Panel: Resumen y Cálculo -->
      <div class="lg:sticky lg:top-6 h-fit">
        <div class="bg-slate-900 rounded-2xl p-4 md:p-6 text-white space-y-4">
          <h3 class="text-lg md:text-xl font-black mb-2">{{ $t('components.ultimaMillaCalculator.calculationSummary') }}</h3>
          
          <!-- Precio Base -->
          <div class="bg-slate-800 rounded-xl p-3">
            <div class="flex justify-between items-center mb-1">
              <span class="text-slate-300 text-xs font-medium">{{ $t('components.ultimaMillaCalculator.basePrice') }}</span>
              <span class="text-xl font-black text-teal-400">{{ basePrice.toFixed(2) }}€</span>
            </div>
            <div class="text-[10px] text-slate-400 space-y-0.5">
              <p>Distancia: {{ distancia }} km</p>
              <p v-if="distancia > 0">Tarifa: {{ getDistanceRate() }}€</p>
            </div>
          </div>

          <!-- Desglose de Precios -->
          <div class="space-y-1.5 border-t border-slate-700 pt-3">
            <div class="flex justify-between text-xs">
              <span class="text-slate-300">{{ $t('components.ultimaMillaCalculator.shipment') }} ({{ getEnvioName() }})</span>
              <span class="font-bold">{{ envioPrice.toFixed(2) }}€</span>
            </div>

            <div class="flex justify-between text-xs">
              <span class="text-slate-300">{{ $t('components.ultimaMillaCalculator.delivery') }} ({{ getEntregaName() }})</span>
              <span class="font-bold">{{ entregaPrice.toFixed(2) }}€</span>
            </div>

            <div class="flex justify-between text-xs">
              <span class="text-slate-300">{{ $t('components.ultimaMillaCalculator.sectorLabel') }} ({{ getSectorName() }})</span>
              <span class="font-bold">{{ sectorPrice.toFixed(2) }}€</span>
            </div>

            <div class="border-t border-slate-700 pt-2 mt-2">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-bold">{{ $t('components.ultimaMillaCalculator.totalPrice') }}</span>
                <span class="text-2xl font-black text-teal-400">{{ totalPrice.toFixed(2) }}€</span>
              </div>
              <p class="text-[10px] text-slate-400 mt-1">
                {{ $t('components.ultimaMillaCalculator.estimatedTime') }}: {{ estimatedTime }}
              </p>
            </div>
          </div>

          <!-- CTA -->
          <button
            @click="requestQuote"
            class="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all transform hover:scale-105 mt-3"
          >
            {{ $t('components.ultimaMillaCalculator.requestQuote') }}
          </button>

          <p class="text-[10px] text-slate-400 text-center">
            * {{ $t('calculator.estimatedPrice') }}. Presupuesto final tras inspección.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Estado
const distancia = ref(0)
const selectedEnvio = ref('paquete')
const selectedEntrega = ref('programada')
const selectedSector = ref('ecommerce')

// Tipos de envío
const tiposEnvio = [
  { id: 'paquete', name: 'Paquete Estándar', desc: 'Hasta 30 kg', factor: 1.0 },
  { id: 'palet', name: 'Palet', desc: 'Hasta 1000 kg', factor: 2.0 },
  { id: 'contenedor', name: 'Contenedor', desc: 'Más de 1000 kg', factor: 5.0 }
]

// Tipos de entrega
const tiposEntrega = [
  { id: 'programada', name: 'Programada', desc: 'Entrega estándar', factor: 1.0, time: '2-3 días' },
  { id: 'express', name: 'Express (24h)', desc: 'Entrega en 24 horas', factor: 1.3, time: '24 horas' },
  { id: 'mismo-dia', name: 'Mismo Día', desc: 'Entrega el mismo día', factor: 1.5, time: 'Mismo día' },
  { id: 'nocturna', name: 'Nocturna', desc: 'Entrega nocturna', factor: 1.2, time: 'Noche' },
  { id: 'fin-semana', name: 'Fin de Semana', desc: 'Entrega sábado/domingo', factor: 1.15, time: 'Fin de semana' }
]

// Sectores
const sectores = [
  { id: 'ecommerce', name: 'Ecommerce', desc: 'Tiendas online', factor: 1.0 },
  { id: 'alimentacion', name: 'Alimentación (Frío)', desc: 'Productos refrigerados', factor: 1.5 },
  { id: 'farmacia', name: 'Farmacia', desc: 'Productos farmacéuticos', factor: 1.3 },
  { id: 'restaurantes', name: 'Restaurantes', desc: 'Comida a domicilio', factor: 1.2 }
]

// Funciones
const getDistanceRate = () => {
  if (distancia.value <= 5) return 8
  if (distancia.value <= 10) return 12
  if (distancia.value <= 20) return 18
  if (distancia.value <= 30) return 25
  return 25 + ((distancia.value - 30) * 0.50)
}

const getEnvioName = () => {
  const envio = tiposEnvio.find(e => e.id === selectedEnvio.value)
  return envio ? envio.name : 'Paquete'
}

const getEntregaName = () => {
  const entrega = tiposEntrega.find(e => e.id === selectedEntrega.value)
  return entrega ? entrega.name : 'Programada'
}

const getSectorName = () => {
  const sector = sectores.find(s => s.id === selectedSector.value)
  return sector ? sector.name : 'Ecommerce'
}

// Cálculos
const basePrice = computed(() => {
  if (distancia.value <= 0) return 0
  return getDistanceRate()
})

const envio = computed(() => {
  return tiposEnvio.find(e => e.id === selectedEnvio.value) || tiposEnvio[0]
})

const entrega = computed(() => {
  return tiposEntrega.find(e => e.id === selectedEntrega.value) || tiposEntrega[0]
})

const sector = computed(() => {
  return sectores.find(s => s.id === selectedSector.value) || sectores[0]
})

const envioPrice = computed(() => {
  return basePrice.value * (envio.value.factor - 1.0)
})

const entregaPrice = computed(() => {
  return basePrice.value * (entrega.value.factor - 1.0)
})

const sectorPrice = computed(() => {
  return basePrice.value * (sector.value.factor - 1.0)
})

const totalPrice = computed(() => {
  if (distancia.value <= 0) return 0
  return basePrice.value * envio.value.factor * entrega.value.factor * sector.value.factor
})

const estimatedTime = computed(() => {
  return entrega.value.time || '2-3 días'
})

const requestQuote = () => {
  alert(`Presupuesto de última milla solicitado:\n\nTipo de envío: ${getEnvioName()}\nTipo de entrega: ${getEntregaName()}\nSector: ${getSectorName()}\nDistancia: ${distancia.value} km\nTiempo estimado: ${estimatedTime.value}\nPrecio total: ${totalPrice.value.toFixed(2)}€`)
}
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #14b8a6;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #0d9488;
}
</style>

