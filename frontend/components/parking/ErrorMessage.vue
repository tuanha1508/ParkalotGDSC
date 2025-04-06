<template>
  <div v-if="message" class="mb-6 p-3 bg-red-900/50 border border-red-700 rounded-lg text-white">
    <div class="flex items-start">
      <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script> 