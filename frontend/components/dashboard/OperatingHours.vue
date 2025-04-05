<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="border-b border-white/20 px-6 py-4">
      <h3 class="text-xl font-semibold text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Operating Hours
      </h3>
    </div>
    <div class="p-5 space-y-4">
      <div class="flex items-center space-x-3">
        <div class="rounded-full bg-green-400/20 flex items-center justify-center h-8 w-8 min-w-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div>
          <div class="text-white/70 text-sm">Opening Hours</div>
          <div class="text-white text-lg font-medium">{{ hours.opening }}</div>
        </div>
      </div>
      
      <div class="flex items-center space-x-3">
        <div class="rounded-full bg-blue-400/20 flex items-center justify-center h-8 w-8 min-w-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </div>
        <div>
          <div class="text-white/70 text-sm">Closing Hours</div>
          <div class="text-white text-lg font-medium">{{ hours.closing }}</div>
        </div>
      </div>
      
      <div class="flex items-center space-x-3">
        <div class="rounded-full bg-yellow-400/20 flex items-center justify-center h-8 w-8 min-w-8">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <div class="text-white/70 text-sm">Special Hours</div>
          <div class="text-white text-lg font-medium" v-html="hours.special"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface ParkingHours {
  opening: string;
  closing: string;
  special: string;
}

const props = defineProps<{
  hours: ParkingHours;
}>()
</script> 