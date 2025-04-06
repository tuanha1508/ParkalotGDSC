<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="p-4 border-b border-white/20">
      <h2 class="text-lg font-semibold text-white">Live Camera Feed</h2>
    </div>
    <div class="aspect-video bg-black/50 flex items-center justify-center">
      <div class="text-center p-8">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
        <p class="mt-4 text-white/70">Camera feed will be displayed here</p>
        <button @click="initializeCamera" class="mt-4 bg-white hover:bg-gray-200 text-black font-medium px-4 py-2 rounded-md transition-all">
          Initialize Camera
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isInitialized = ref(false)

const initializeCamera = () => {
  isInitialized.value = true
  // In a real app, this would connect to a camera feed
  console.log('Initializing camera feed')
}
</script> 