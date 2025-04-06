<template>
  <div v-if="count > 0" class="mb-4">
    <h2 class="text-white text-lg font-medium">
      Found {{ count }} parking lots
      <span v-if="destination">
        near {{ destination }}
      </span>
    </h2>
    <p class="text-white/60 text-sm">
      Sorted by driving distance from your destination
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count: number;
  destination?: string;
}>()
</script> 