<template>
  <div class="border border-white/30 rounded-lg p-4 mb-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center flex-wrap gap-3">
        <div class="flex items-center shrink-0">
          <UIcon name="i-heroicons-funnel" class="h-5 w-5 text-white mr-2" />
          <span class="text-white font-medium">Filters:</span>
        </div>
        
        <div
          v-if="vehicleType"
          class="flex items-center bg-black border border-white/30 rounded-full py-1 px-3 text-sm"
        >
          <span class="text-white">{{ vehicleTypeLabel }}</span>
          <button @click="$emit('clear-vehicle-type')" class="ml-2 text-white opacity-70 hover:opacity-100">
            <UIcon name="i-heroicons-x-mark" class="h-4 w-4" />
          </button>
        </div>
        
        <div
          v-if="duration"
          class="flex items-center bg-black border border-white/30 rounded-full py-1 px-3 text-sm"
        >
          <span class="text-white">{{ durationLabel }}</span>
          <button @click="$emit('clear-duration')" class="ml-2 text-white opacity-70 hover:opacity-100">
            <UIcon name="i-heroicons-x-mark" class="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <UButton
        v-if="hasFilters"
        color="gray"
        variant="ghost"
        @click="$emit('clear-all')"
        class="text-white shrink-0"
      >
        Clear All
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  vehicleType: string
  duration: string
  vehicleTypeLabel: string
  durationLabel: string
  destination: string
  hasFilters: boolean
}>()

defineEmits<{
  'clear-vehicle-type': []
  'clear-duration': []
  'clear-all': []
}>()
</script> 