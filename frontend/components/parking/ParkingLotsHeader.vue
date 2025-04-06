<template>
  <div class="mb-10">
    <h1 class="text-4xl font-bold text-white flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
      </svg>
      Available Parking
    </h1>
    <p class="text-white opacity-70 mt-1">
      {{ destination ? `Near ${destination}` : 'Showing all parking lots' }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  destination: string
}>()
</script> 