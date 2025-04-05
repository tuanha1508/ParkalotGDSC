<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="border-b border-white/20 px-6 py-4">
      <h3 class="text-xl font-semibold text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Occupancy Rate
      </h3>
    </div>
    <div class="p-5 space-y-4">
      <div class="w-full h-44 flex items-center justify-center">
        <div class="relative h-32 w-32">
          <svg class="h-full w-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#444"
              stroke-width="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4ade80"
              stroke-width="3"
              :stroke-dasharray="occupancyDasharray"
            />
            <text x="18" y="20.5" font-size="6" text-anchor="middle" fill="white">
              {{ occupancyPercentage }}%
            </text>
          </svg>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white/10 rounded-lg p-3">
          <div class="text-white/70 text-sm">Peak Hours</div>
          <div class="text-white font-medium">{{ peakHours }}</div>
        </div>
        
        <div class="bg-white/10 rounded-lg p-3">
          <div class="text-white/70 text-sm">Quiet Hours</div>
          <div class="text-white font-medium">{{ quietHours }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

interface PeakInfo {
  peakHours: string;
  quietHours: string;
}

const props = defineProps<{
  occupiedSlots: number;
  totalSlots: number;
  peakInfo: PeakInfo;
}>()

// Calculate occupancy percentage
const occupancyPercentage = computed(() => {
  if (props.totalSlots === 0) return 0
  // Ensure value is between 0 and 100
  return Math.min(100, Math.max(0, Math.round((props.occupiedSlots / props.totalSlots) * 100)))
})

const occupancyDasharray = computed(() => {
  return `${Math.min(100, occupancyPercentage.value)}, 100`
})

const peakHours = computed(() => props.peakInfo.peakHours)
const quietHours = computed(() => props.peakInfo.quietHours)
</script> 