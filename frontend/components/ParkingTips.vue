<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="border-b border-white/20 px-6 py-4">
      <h3 class="text-xl font-semibold text-white">Parking Tips</h3>
    </div>
    
    <div class="p-6 space-y-6">
      <div v-for="(tip, index) in tips" :key="index" class="flex space-x-4">
        <div 
          class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 border" 
          :style="{ backgroundColor: tip.color, borderColor: tip.color }"
        >
          <span :class="tip.icon + ' h-4 w-4 text-white'" />
        </div>
        <div>
          <h4 class="text-white font-medium">{{ tip.title }}</h4>
          <p class="text-white opacity-70 text-sm">{{ tip.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ParkingTip {
  title: string;
  description: string;
  color: string;
  icon: string;
}

defineProps({
  tips: {
    type: Array as () => ParkingTip[],
    default: () => [
      {
        title: 'Peak Hours',
        description: 'Avoid parking between 9-11 AM for easier spot finding.',
        color: '#F67280',
        icon: 'i-heroicons-light-bulb'
      },
      {
        title: 'Payment Options',
        description: 'All parking areas accept mobile payments and cards.',
        color: '#B0EBB4',
        icon: 'i-heroicons-currency-dollar'
      },
      {
        title: 'Time Limits',
        description: 'Some parking areas have restrictions after 5:30 pm.',
        color: '#EF9C66',
        icon: 'i-heroicons-clock'
      }
    ]
  }
})
</script> 