<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="border-b border-white/20 px-6 py-2">
      <h3 class="text-base font-semibold text-white">Quick Actions</h3>
    </div>
    
    <div class="p-3 space-y-3">
      <button 
        @click="$emit('view-map')"
        class="bg-white hover:bg-gray-200 text-black font-medium py-0.5 px-3 rounded-full text-center block w-full transition-all duration-200 shadow-sm text-xs">
        View Parking Map
      </button>
      
      <NuxtLink to="/reports" class="border border-white/30 hover:bg-white/10 text-white font-medium py-0.5 px-3 rounded-full text-center block transition-all duration-200 text-xs">
        Parking Statistics
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['view-map'])
</script> 