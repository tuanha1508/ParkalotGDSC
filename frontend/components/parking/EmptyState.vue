<template>
  <div class="flex flex-col items-center justify-center py-20">
    <UIcon name="i-heroicons-face-frown" class="h-16 w-16 text-white opacity-50 mb-4" />
    <h3 class="text-xl font-semibold text-white">No parking lots found</h3>
    <p class="text-white opacity-70 mt-2 text-center">Try adjusting your filters or searching for a different location.</p>
    <div class="mt-4">
      <UButton @click="$emit('reset')" color="white" variant="outline" class="rounded-full">
        Reset Filters
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'reset'): void
}>()
</script> 