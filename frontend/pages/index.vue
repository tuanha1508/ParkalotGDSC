<template>
  <div class="bg-black text-white h-screen flex flex-col overflow-hidden">
    <!-- Hero Section with flex-grow to take available space -->
    <div class="flex-grow overflow-hidden">
      <HeroSection />
    </div>
  </div>
</template>

<script setup lang="ts">
// Import components
import HeroSection from '@/components/home/HeroSection.vue'

definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
/* Ensure the page takes exactly the viewport height */
:deep(.min-h-screen) {
  min-height: 100vh;
  height: 100vh;
}

/* Remove any padding that might cause overflow */
:deep(main) {
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
}
</style> 